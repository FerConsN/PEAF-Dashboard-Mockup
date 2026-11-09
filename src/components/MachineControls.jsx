import Panel from './Panel.jsx'
import DeviceControl from './DeviceControl.jsx'
import { deviceControls } from '../simulation/systemDefinition.js'

export default function MachineControls({ settings, onSettingChange, onReset }) {
  return (
    <Panel id="controls-title" eyebrow="Operator station" title="Machine controls" badge="Local demo">
      <p className="control-intro">Independent demo controls for the AlFrEDo system.</p>
      <div className="device-controls">
        {deviceControls.map((device) => <DeviceControl key={device.id} device={device} settings={settings} onSettingChange={onSettingChange} />)}
      </div>
      <div className="control-actions"><button type="button" className="button-secondary" onClick={onReset}>Reset controls</button></div>
      <p className="help-text">ON/OFF affects demo state only. Setpoints can be prepared while OFF. Simulated readings stay fixed.</p>
    </Panel>
  )
}
