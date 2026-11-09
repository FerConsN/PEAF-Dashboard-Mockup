import Panel from './Panel.jsx'
import { diameterSamples } from '../simulation/placeholderData.js'

export default function DiameterMonitor() {
  const points = diameterSamples.map((value, index) => `${55 + index * 28},${85 - (value - 1.75) * 1000}`).join(' ')

  return (
    <Panel id="diameter-title" eyebrow="Quality monitoring" title="Fiber diameter" badge="Sample trace">
      <div className="diameter-summary"><div className="diameter-value">1.75 <span>mm</span></div><p>Nominal diameter <strong>1.75 mm</strong></p></div>
      <svg className="diameter-chart" viewBox="0 0 500 170" role="img" aria-labelledby="chart-title chart-description">
        <title id="chart-title">Placeholder fiber diameter readings</title>
        <desc id="chart-description">Sixteen fixed samples between 1.73 and 1.77 millimeters. The dashed line marks the 1.75 millimeter nominal diameter.</desc>
        <g className="chart-grid"><line x1="55" y1="35" x2="475" y2="35" /><line x1="55" y1="85" x2="475" y2="85" /><line x1="55" y1="135" x2="475" y2="135" /></g>
        <g className="chart-labels"><text x="0" y="39">1.80</text><text x="0" y="89">1.75</text><text x="0" y="139">1.70</text><text x="55" y="164">Sample 01</text><text x="415" y="164">Sample 16</text></g>
        <line className="nominal-line" x1="55" y1="85" x2="475" y2="85" />
        <polyline className="diameter-line" points={points} />
      </svg>
      <div className="chart-legend"><span><i />Sample diameter</span><span><i className="legend-nominal" />Nominal</span></div>
    </Panel>
  )
}
