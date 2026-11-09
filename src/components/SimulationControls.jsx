export default function SimulationControls({ status, elapsed, message, onStart, onPause, onReset }) {
  return (
    <section className="simulation-controls" aria-label="Simulation controls">
      <div className="simulation-actions">
        <button type="button" className="button-primary" disabled={status === 'running'} onClick={onStart}>{status === 'paused' ? 'Resume simulation' : 'Start simulation'}</button>
        <button type="button" className="button-secondary" disabled={status !== 'running'} onClick={onPause}>Pause simulation</button>
        <button type="button" className="button-secondary" onClick={onReset}>Reset simulation</button>
        <span className="simulation-clock">Simulated time · {elapsed.toFixed(1)} s</span>
      </div>
      <p className="simulation-message" role="status">{message}</p>
    </section>
  )
}
