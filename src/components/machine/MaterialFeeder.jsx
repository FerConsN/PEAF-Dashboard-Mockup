import useMotion from './useMotion.js'

function FeedWheel({ x, y, reverse, visual }) {
  const ref = useMotion({ kind: reverse ? 'reverse' : 'rotate', moving: visual.feedMoving, rate: visual.feedRate, reset: visual.reset, duration: 2400 })
  return <g transform={`translate(${x} ${y})`}><g ref={ref} className="rotating-part" data-motion="feed-wheel"><circle r="16" /><circle r="5" /><path d="M-13 0h8M5 0h8M0-13v8M0 5v8" /></g></g>
}

export default function MaterialFeeder({ visual }) {
  const stripes = useMotion({ kind: 'feed', moving: visual.feedMoving, rate: visual.feedRate, reset: visual.reset })
  return (
    <g className="machine-part" data-part="feeder">
      <rect className="material-stick" x="30" y="139" width="192" height="12" rx="2" />
      <path ref={stripes} className="stick-markings" data-motion="stick" d="M30 145H220" />
      <path className="machine-outline" d="M106 109V93h76v16M106 181v15h76v-15" />
      <FeedWheel x={144} y={123} visual={visual} />
      <FeedWheel x={144} y={167} reverse visual={visual} />
      <rect x="179" y="103" width="26" height="28" rx="4" /><path d="M184 111h16M184 117h16M184 123h16" />
      <text className="machine-label" x="30" y="119">Solid stick</text>
      <text className="machine-label" x="107" y="215">Feed motor</text>
    </g>
  )
}
