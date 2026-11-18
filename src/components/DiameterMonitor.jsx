import { useId } from 'react'
import Panel from './Panel.jsx'
import { MAX_SAMPLES, TICK_MS } from '../simulation/engine.js'

const center = 250
const pixelsPerMm = 30
const scanRows = [19, 35, 51, 67, 83, 99, 115, 131]
const latestRow = 137
const rowSpacing = (latestRow - 12) / (MAX_SAMPLES - 1)

export default function DiameterMonitor({ diameter, samples, extruding }) {
  const gridId = useId()
  const nominalWidth = diameter * pixelsPerMm
  const left = center - nominalWidth / 2
  const right = center + nominalWidth / 2
  const reading = diameter.toFixed(2)
  const hasSamples = samples.length > 0
  const frameStatus = !hasSamples ? 'Awaiting samples' : extruding ? 'Sampling' : 'History held'

  return (
    <Panel id="diameter-title" eyebrow="Simulated diameter history" title="Fiber diameter" badge={frameStatus}>
      <div className="diameter-summary">
        <div className="diameter-value">{reading} <span>mm</span></div>
        <p>Simulated diameter</p>
      </div>
      <svg className="camera-frame diameter-observation" viewBox="0 0 500 170" role="img" aria-label={`${frameStatus}. Simulated fiber diameter ${reading} millimeters. ${samples.length} recorded samples, newest at the bottom.`}>
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
        {samples.map((sample, index) => {
          const halfWidth = sample.diameter * pixelsPerMm / 2
          const y = latestRow - (samples.length - 1 - index) * rowSpacing
          return (
            <line key={sample.time} className="diameter-fiber-stroke"
              x1={center - halfWidth} x2={center + halfWidth}
              y1={y} y2={y}
            />
          )
        })}
        {hasSamples && <path className="diameter-measurement" d={`M${left} 145v9H${right}v-9`} />}
        <text className="camera-overlay-label" x="18" y="25">SIMULATED</text>
        {hasSamples && <text className="camera-overlay-label" x="350" y={latestRow + 3}>NEWEST SAMPLE</text>}
      </svg>
      <p className="help-text">{hasSamples
        ? `One line per simulated reading (${TICK_MS / 1000} s during extrusion). The bracket marks the latest diameter.`
        : 'Start simulated extrusion to record diameter readings.'}</p>
    </Panel>
  )
}
