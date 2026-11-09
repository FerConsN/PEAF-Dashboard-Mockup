import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const motions = {
  rotate: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
  reverse: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-360deg)' }],
  feed: [{ strokeDashoffset: 12 }, { strokeDashoffset: 0 }],
  flow: [{ strokeDashoffset: 24 }, { strokeDashoffset: 0 }],
  scan: [{ transform: 'translateY(0px)' }, { transform: 'translateY(110px)' }],
}

// A compositor animation, not a second simulation clock. Playback-rate updates
// preserve the current phase; pausing freezes it and Reset rewinds it.
export default function useMotion({ kind, moving, rate = 1, reset, duration = 1600 }) {
  const ref = useRef(null)
  const animationRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const changed = () => setReducedMotion(query.matches)
    changed()
    query.addEventListener('change', changed)
    return () => query.removeEventListener('change', changed)
  }, [])

  useLayoutEffect(() => {
    const animation = ref.current.animate(motions[kind], { duration, iterations: Infinity })
    animation.pause()
    animation.currentTime = 0
    animationRef.current = animation
    return () => {
      animation.cancel()
      animationRef.current = null
    }
  }, [kind, duration])

  useLayoutEffect(() => {
    const animation = animationRef.current
    if (moving && !reset && !reducedMotion) {
      animation.updatePlaybackRate(Math.max(0.01, rate))
      animation.play()
    } else {
      animation.pause()
      // Set rate synchronously while stopped: an outstanding asynchronous rate
      // update can otherwise advance Reset by a frame before the pause settles.
      animation.playbackRate = Math.max(0.01, rate)
      if (reset) animation.currentTime = 0
    }
  }, [kind, duration, moving, rate, reset, reducedMotion])

  return ref
}
