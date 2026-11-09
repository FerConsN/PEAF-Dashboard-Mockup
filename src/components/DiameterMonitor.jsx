import Panel from './Panel.jsx'
import { INITIAL_DIAMETER, MAX_SAMPLES } from '../simulation/engine.js'

export default function DiameterMonitor({ diameter, samples, extruding }) {
  const values = [INITIAL_DIAMETER, ...samples.map((sample) => sample.diameter)]
  const lower = Math.max(0, Math.floor((Math.min(...values) - 0.1) * 10) / 10)
  const upper = Math.ceil((Math.max(...values) + 0.1) * 10) / 10
  const y = (value) => 135 - (value - lower) / (upper - lower) * 100
  const first = samples[0]?.time ?? 0
  const last = samples.at(-1)?.time ?? 0
  const x = (time) => 55 + (time - first) / Math.max(last - first, 0.5) * 420
  const points = samples.map((sample) => `${x(sample.time)},${y(sample.diameter)}`).join(' ')
  const ticks = [upper, (upper + lower) / 2, lower]

  return (
    <Panel id="diameter-title" eyebrow="Simulated camera observation" title="Fiber diameter" badge="Simulated trace">
      <div className="diameter-summary"><div className="diameter-value">{diameter.toFixed(2)} <span>mm</span></div><p>Illustrative initial value<strong>1.75 mm · not a target</strong></p></div>
      <svg className="diameter-chart" viewBox="0 0 500 170" role="img" aria-labelledby="chart-title chart-description">
        <title id="chart-title">Simulated fiber diameter over simulation time</title>
        <desc id="chart-description">{samples.length} of up to {MAX_SAMPLES} generated samples. Horizontal axis: simulation seconds. Vertical axis: simulated diameter in millimeters. The dashed line is an illustrative initial value, not an AlFrEDo target.</desc>
        {ticks.map((value) => <g key={value}><line className="chart-grid" x1="55" y1={y(value)} x2="475" y2={y(value)} /><text className="chart-labels" x="0" y={y(value) + 4}>{value.toFixed(2)}</text></g>)}
        <g className="chart-labels"><text x="55" y="164">{first.toFixed(1)} s</text><text x="425" y="164">{last.toFixed(1)} s</text></g>
        <line className="nominal-line" x1="55" y1={y(INITIAL_DIAMETER)} x2="475" y2={y(INITIAL_DIAMETER)} />
        {samples.length > 0 && <polyline className="diameter-line" points={points} />}
        {samples.length === 1 && <circle className="sample-dot" cx="55" cy={y(samples[0].diameter)} r="3" />}
        {samples.length === 0 && <text className="chart-empty" x="265" y="65" textAnchor="middle">Waiting for simulated extrusion</text>}
      </svg>
      <p className="help-text">{samples.length} / {MAX_SAMPLES} samples · {extruding ? 'Sampling every 0.5 s' : samples.length ? 'Trace held until extrusion resumes' : 'No generated samples yet'}. Artificial values only.</p>
      <div className="chart-legend"><span><i />Simulated diameter</span><span><i className="legend-nominal" />Illustrative initial value</span></div>
    </Panel>
  )
}
