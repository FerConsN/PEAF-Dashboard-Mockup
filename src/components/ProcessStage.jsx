const icons = {
  feed: <><path d="M15 12h50v12H15zM33 26v24M48 26v24" /><circle cx="33" cy="40" r="7" /><circle cx="48" cy="40" r="7" /><path d="M40 48v20" /></>,
  hotEnd: <><path d="M40 8v14M21 23h38v27H21zM27 50l13 15 13-15M40 65v7M59 31h9v13h-9" /><path d="M29 30v12M40 30v12M51 30v12" /></>,
  fan: <><circle cx="40" cy="40" r="28" /><circle cx="40" cy="40" r="5" /><path d="M40 35C18 14 58 7 49 28zM45 41C73 32 62 68 46 56zM37 45C31 74 5 45 26 38zM40 68v7" /></>,
  camera: <><path d="M13 24h46v33H13zM23 24l5-9h17l5 9M59 33l13-7v29l-13-7M29 57l-8 15M44 57l8 15" /><circle cx="36" cy="40" r="10" /></>,
  spool: <><circle cx="36" cy="35" r="25" /><circle cx="36" cy="35" r="17" /><circle cx="36" cy="35" r="5" /><path d="M36 60v7h18M54 55h18v19H54zM61 60v9M66 60v9" /></>,
}

export default function ProcessStage({ stage, number, enabled }) {
  return (
    <li className={`process-stage ${enabled ? 'stage-enabled' : ''}`}>
      <div className="stage-art" aria-hidden="true"><svg viewBox="0 0 80 80">{icons[stage.icon]}</svg></div>
      <span className="stage-number">{String(number).padStart(2, '0')}</span>
      <h3>{stage.name}</h3><p>{stage.detail}</p>
      <span className="stage-state">{stage.enabledKey ? (enabled ? 'ON' : 'OFF') : 'Simulated'}</span>
    </li>
  )
}
