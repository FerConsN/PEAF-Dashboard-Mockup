import Panel from './Panel.jsx'
import { sensorReadings } from '../simulation/placeholderData.js'

export default function SensorReadings() {
  return (
    <Panel id="sensors-title" eyebrow="Instrumentation" title="Sensor readings" badge="Sample data">
      <div className="sensor-grid">
        {sensorReadings.map((sensor) => (
          <div className="sensor-card" key={sensor.label}>
            <p>{sensor.label}</p>
            <div className="sensor-value">{sensor.value}<span>{sensor.unit}</span></div>
            <span className="sensor-detail">{sensor.detail}</span>
          </div>
        ))}
      </div>
      <p className="help-text">Fixed, simulated readings for layout development.</p>
    </Panel>
  )
}
