import Panel from './Panel.jsx'
import DeviceControl from './DeviceControl.jsx'
import { deviceControls } from '../simulation/systemDefinition.js'

export default function MachineControls({ settings, onSettingChange }) {
  return (
    <Panel id="controls-title" eyebrow="Operator station" title="Machine controls" badge="Simulated">
      <p className="control-intro">Set devices and speeds, then start the simulation.</p>
      <div className="device-controls">
        {deviceControls.map((device) => <DeviceControl key={device.id} device={device} settings={settings} onSettingChange={onSettingChange} />)}
      </div>
      <p className="help-text">Setpoints can be prepared while OFF or paused. Device states affect only the artificial simulation.</p>
    </Panel>
  )
}
