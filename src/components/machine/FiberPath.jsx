import { useId } from 'react'
import useMotion from './useMotion.js'

export default function FiberPath({ visual }) {
  const clipId = useId()
  const flow = useMotion({ kind: 'flow', moving: visual.fiberMoving, reset: visual.reset, duration: 1200 })
  return (
    <g data-part="fiber" visibility={visual.hasFiber ? 'visible' : 'hidden'}>
      <defs><clipPath id={clipId}><rect x="330" y="130" width={367 * visual.fiberReveal} height="30" /></clipPath></defs>
      <g clipPath={`url(#${clipId})`}>
        <path className="extruded-fiber" d="M330 145H697" strokeWidth={visual.fiberWidth} />
        <path ref={flow} data-motion="fiber" className="fiber-flow" d="M330 145H697" strokeWidth={Math.max(1, visual.fiberWidth / 3)} />
      </g>
    </g>
  )
}
