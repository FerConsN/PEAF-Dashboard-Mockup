import { useId } from 'react'
import Panel from './Panel.jsx'

const center = 250
const pixelsPerMm = 30
const scanRows = [19, 35, 51, 67, 83, 99, 115, 131]
const fiberProfile = Array.from({ length: 56 }, (_, index) => ({
  y: 13 + index * 2.25,
  factor: 1 + 0.025 * Math.sin(index * 0.35) + 0.012 * Math.sin(index * 0.91),
  opacity: 0.72 + 0.22 * Math.cos(index * 0.65),
}))

export default function DiameterMonitor({ diameter, samples, extruding }) {
  const gridId = useId()
  const nominalWidth = diameter * pixelsPerMm
  const left = center - nominalWidth / 2
  const right = center + nominalWidth / 2
  const reading = diameter.toFixed(2)
  const frameStatus = samples.length === 0 ? 'Initial preview' : extruding ? 'Sampling' : 'Held frame'

  return (
    <Panel id="diameter-title" eyebrow="Simulated camera observation" title="Fiber diameter" badge={frameStatus}>
      <div className="diameter-summary">
        <div className="diameter-value">{reading} <span>mm</span></div>
        <p>Simulated diameter</p>
      </div>
      <svg className="camera-frame diameter-observation" viewBox="0 0 500 170" role="img" aria-label={`${frameStatus}. Simulated fiber diameter ${reading} millimeters. The bracket marks the diameter at a fixed display scale.`}>
        <defs>
          <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
            <path className="diameter-grid" d="M20 0H0V20" />
          </pattern>
        </defs>
        <rect width="500" height="170" fill={`url(#${gridId})`} />
        <line className="diameter-center-guide" x1={center} x2={center} y1="0" y2="170" />
        {scanRows.map((y) => (
          <path key={y} className="diameter-scan-tick" d={`M164 ${y}h6M330 ${y}h6`} />
        ))}
        {fiberProfile.map(({ y, factor, opacity }) => {
          const segmentWidth = nominalWidth * factor
          return (
            <line key={y} className="diameter-fiber-stroke"
              x1={center - segmentWidth / 2} x2={center + segmentWidth / 2}
              y1={y} y2={y} opacity={opacity}
            />
          )
        })}
        <path className="diameter-measurement" d={`M${left} 145v9H${right}v-9`} />
        <text className="camera-overlay-label" x="18" y="25">SIMULATED</text>
      </svg>
      <p className="help-text">The bracket marks the simulated diameter at a fixed display scale.</p>
    </Panel>
  )
}
