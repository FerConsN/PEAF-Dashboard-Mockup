import useMotion from './useMotion.js'

export default function CoolingFan({ x, y, visual }) {
  const rotor = useMotion({ kind: 'rotate', moving: visual.fanMoving, reset: visual.reset, duration: 900 })
  return (
    <g transform={`translate(${x} ${y})`} className="machine-part" data-part="fan">
      <rect x="-29" y="-29" width="58" height="58" rx="8" />
      <circle className="fan-ring" r="24" />
      <g ref={rotor} className="rotating-part fan-rotor" data-motion="fan">
        <circle r="21" fill="none" stroke="none" />
        <path d="M0-4C-25-23 17-31 8-10zM4 2C33-8 20 30 7 15zM-3 4C-10 32-35 0-14-3z" />
        <circle r="4" />
      </g>
    </g>
  )
}
