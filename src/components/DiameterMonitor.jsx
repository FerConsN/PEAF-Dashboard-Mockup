import { useId } from 'react'
import Panel from './Panel.jsx'

const center = 250
const strokeCount = 94
const measurementRows = [55, 58, 88, 115]
const fiberProfile = Array.from({ length: strokeCount }, (_, index) => {
  const position = index / (strokeCount - 1)
  const shoulder = Math.exp(-(((position - 0.28) / 0.085) ** 2))
  const bulge = Math.exp(-(((position - 0.68) / 0.055) ** 2))
  const taper = Math.min(1, position / 0.18, (1 - position) / 0.16)

  return {
    y: 9 + position * 152,
    scale: 0.2 + taper * (0.52 + 0.3 * shoulder + 0.54 * bulge + 0.05 * Math.sin(position * 31)),
    opacity: 0.12 + 0.88 * taper,
    accent: (shoulder > 0.72 || bulge > 0.58) && index % 3 === 0,
    warm: index % 11 < 4,
  }
})

export default function DiameterMonitor({ diameter, samples, extruding }) {
  const gridId = useId()
  const halfWidth = diameter * 5.5
  const reading = diameter.toFixed(2)
  const frameStatus = samples.length === 0 ? 'Initial preview' : extruding ? 'Sampling' : 'Held frame'

  return (
    <Panel id="diameter-title" eyebrow="Simulated camera observation" title="Fiber diameter" badge={frameStatus}>
      <div className="diameter-summary">
        <div className="diameter-value">{reading} <span>mm</span></div>
        <p>Simulated diameter</p>
      </div>
      <svg className="camera-frame diameter-observation" viewBox="0 0 500 170" role="img" aria-label={`${frameStatus}. Simulated fiber diameter ${reading} millimeters. Cyan measurement lines cross the fiber profile. Width is exaggerated.`}>
        <defs>
          <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
            <path className="diameter-grid" d="M20 0H0V20" />
          </pattern>
        </defs>
        <rect width="500" height="170" fill={`url(#${gridId})`} />
        <line className="diameter-center-guide" x1={center} x2={center} y1="0" y2="170" />
        {fiberProfile.map(({ y, scale, opacity, accent, warm }) => (
          <line
            key={y}
            className={`diameter-fiber-stroke ${accent ? 'is-accent' : warm ? 'is-warm' : ''}`}
            x1={center - halfWidth * scale}
            x2={center + halfWidth * scale}
            y1={y}
            y2={y}
            opacity={opacity}
          />
        ))}
        {measurementRows.map((y) => (
          <line key={y} className="diameter-measurement" x1={center - 44} x2={center + 44} y1={y} y2={y} />
        ))}
        <text className="camera-overlay-label" x="18" y="25">SIMULATED</text>
      </svg>
      <p className="help-text">Cyan lines cross the simulated fiber profile. Display width is exaggerated.</p>
    </Panel>
  )
}
