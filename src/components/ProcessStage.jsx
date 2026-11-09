export default function ProcessStage({ stage, number, operation, selected, onSelect }) {
  return (
    <li className={`process-stage ${operation.active ? 'stage-enabled' : ''}`}>
      <button type="button" className="stage-inspect" aria-pressed={selected} onClick={onSelect}>
        <span className="stage-number">{String(number).padStart(2, '0')}</span>
        <span className="stage-name">{stage.name}</span>
        <span className="stage-state">{operation.label}</span>
      </button>
    </li>
  )
}
