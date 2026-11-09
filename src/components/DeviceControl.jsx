export default function DeviceControl({ device, settings, onSettingChange }) {
  const enabled = settings[device.enabledKey]

  return (
    <div className="device-control">
      <div className="device-heading">
        <div><h3>{device.name}</h3><p>{device.description}</p></div>
        <button type="button" className={`device-toggle ${enabled ? 'is-on' : ''}`} aria-label={`${device.name} ON/OFF`} aria-pressed={enabled} onClick={() => onSettingChange(device.enabledKey, !enabled)}>
          <span className="small-dot" aria-hidden="true" />{enabled ? 'ON' : 'OFF'}
        </button>
      </div>
      {device.settingKey && (
        <div className="control-field">
          <div className="field-heading">
            <label htmlFor={`${device.id}-setting`}>{device.settingLabel}</label>
            <output htmlFor={`${device.id}-setting`}>{settings[device.settingKey]}{device.unit && ` ${device.unit}`}</output>
          </div>
          <input id={`${device.id}-setting`} type="range" min={device.min} max={device.max} step="1" value={settings[device.settingKey]} onChange={(event) => onSettingChange(device.settingKey, Number(event.target.value))} />
          <div className="range-labels"><span>{device.min}{device.unit && ` ${device.unit}`}</span><span>{device.max}{device.unit && ` ${device.unit}`}</span></div>
          {device.hint && <p className="setting-hint">{device.hint}</p>}
        </div>
      )}
    </div>
  )
}
