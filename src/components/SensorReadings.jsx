import Panel from './Panel.jsx'
import { sensorReadings } from '../simulation/placeholderData.js'

export default function SensorReadings() {
  return (
    <Panel id="sensors-title" eyebrow="Instrumentation" title="Simulated sensor readings" badge="Simulated">
      <div className="sensor-grid">
        {sensorReadings.map((sensor) => (
          <div className="sensor-card" key={sensor.label}>
            <p>{sensor.label}</p>
            <div className="sensor-value">{sensor.value}<span>{sensor.unit}</span></div>
            <span className="sensor-detail">{sensor.detail}</span>
          </div>
        ))}
      </div>
      <p className="help-text">Illustrative values only, even when devices are OFF. Not measured or calculated from the setpoints.</p>
    </Panel>
  )
}
