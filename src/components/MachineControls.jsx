import Panel from './Panel.jsx'

export default function MachineControls({ running, settings, onSettingChange, onToggle, onReset }) {
  return (
    <Panel id="controls-title" eyebrow="Operator station" title="Machine controls" badge="Demo">
      <p className="control-intro">Explore the interface with local demo controls.</p>
      <div className="control-field">
        <div className="field-heading"><label htmlFor="temperature">Temperature setpoint</label><output htmlFor="temperature">{settings.temperature} °C</output></div>
        <input id="temperature" type="range" min="150" max="220" step="1" value={settings.temperature} onChange={(event) => onSettingChange('temperature', Number(event.target.value))} />
        <div className="range-labels"><span>150 °C</span><span>220 °C</span></div>
      </div>
      <div className="control-field">
        <div className="field-heading"><label htmlFor="screw-speed">Screw speed</label><output htmlFor="screw-speed">{settings.screwSpeed} rpm</output></div>
        <input id="screw-speed" type="range" min="0" max="60" step="1" value={settings.screwSpeed} onChange={(event) => onSettingChange('screwSpeed', Number(event.target.value))} />
        <div className="range-labels"><span>0 rpm</span><span>60 rpm</span></div>
      </div>
      <div className="control-actions">
        <button className="button-primary" onClick={onToggle}>{running ? 'Pause demo' : 'Start demo'}<span aria-hidden="true">{running ? 'Ⅱ' : '→'}</span></button>
        <button className="button-secondary" onClick={onReset}>Reset</button>
      </div>
      <p className="help-text">Controls update this demo only. Sensor values remain fixed.</p>
    </Panel>
  )
}
