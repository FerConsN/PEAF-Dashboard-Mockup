import { useId } from 'react'
import Panel from './Panel.jsx'

const center = 250
const fiberProfile = [
  { y: 12, scale: 0.98 },
  { y: 45, scale: 1.04 },
  { y: 85, scale: 1 },
  { y: 125, scale: 0.96 },
  { y: 158, scale: 1.02 },
]

export default function DiameterMonitor({ diameter, samples, extruding }) {
  const gridId = useId()
  const halfWidth = diameter * 12
  const reading = diameter.toFixed(2)
  const frameStatus = samples.length === 0 ? 'Initial preview' : extruding ? 'Sampling' : 'Held frame'
  const edges = fiberProfile.map(({ y, scale }) => ({
    y,
    left: center - halfWidth * scale,
    right: center + halfWidth * scale,
  }))
  const outline = [
    ...edges.map(({ left, y }) => `${left},${y}`),
    ...edges.toReversed().map(({ right, y }) => `${right},${y}`),
  ].join(' ')

  return (
    <Panel id="diameter-title" eyebrow="Simulated camera observation" title="Fiber diameter" badge={frameStatus}>
      <div className="diameter-summary">
        <div className="diameter-value">{reading} <span>mm</span></div>
        <p>Simulated diameter</p>
      </div>
      <svg className="camera-frame diameter-observation" viewBox="0 0 500 170" role="img" aria-label={`${frameStatus}. Simulated fiber diameter ${reading} millimeters. Three scan lines span the fiber. Width is exaggerated.`}>
        <defs>
          <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
            <path className="diameter-grid" d="M20 0H0V20" />
          </pattern>
        </defs>
        <rect width="500" height="170" fill={`url(#${gridId})`} />
        <path className="camera-crosshair" d="M250 0V170" />
        <polygon className="diameter-fiber" points={outline} />
        {edges.slice(1, -1).map(({ y, left, right }) => (
          <g key={y}>
            <path className="camera-scan" d={`M155 ${y}H${left}M${right} ${y}H345`} />
            <path className="camera-dimension" d={`M${left} ${y}H${right}M${left} ${y - 5}v10M${right} ${y - 5}v10`} />
          </g>
        ))}
        <text className="camera-overlay-label" x="18" y="25">SIMULATED</text>
      </svg>
      <p className="help-text">Scan lines mark the simulated fiber edges. Display width is exaggerated.</p>
    </Panel>
  )
}
