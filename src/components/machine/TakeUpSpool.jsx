import useMotion from './useMotion.js'

export default function TakeUpSpool({ visual, speed }) {
  const reel = useMotion({ kind: 'rotate', moving: visual.spoolMoving, rate: visual.spoolRate, reset: visual.reset, duration: 3200 })
  return (
    <g className="machine-part" data-part="spool">
      <g transform="translate(697 190)"><g ref={reel} className="rotating-part spool-reel" data-motion="spool">
        <circle r="45" /><circle className="spool-winding" r="36" /><circle r="11" />
        <path className="spool-spokes" d="M0-42v28M0 14v28M-42 0h28M14 0h28M-29-29l20 20M9 9l20 20M29-29L9-9M-9 9l-20 20" />
      </g></g>
      <path className="machine-outline" d="M697 235v14h51" />
      <rect x="741" y="230" width="34" height="31" rx="4" /><path d="M748 238h20M748 244h20M748 250h20" />
      <text className="machine-label" x="652" y="281">DC motor · {speed} RPM setting</text>
    </g>
  )
}
