import fiberMark from './assets/fiber-mark.svg'
import ProcessVisualization from './components/ProcessVisualization.jsx'
import MachineControls from './components/MachineControls.jsx'
import SensorReadings from './components/SensorReadings.jsx'
import DiameterMonitor from './components/DiameterMonitor.jsx'
import useSimulation from './simulation/useSimulation.js'
import SimulationControls from './components/SimulationControls.jsx'

export default function App() {
  const { state, process, changeSetting, start, pause, reset } = useSimulation()

  return (
    <>
      <a className="skip-link" href="#main">Skip to dashboard</a>
      <header className="app-header">
        <a className="brand" href="./" aria-label="PEAF dashboard home"><img src={fiberMark} alt="" /><span>PEAF<span className="brand-divider">/</span><span className="brand-caption">Process lab</span></span></a>
        <span className="environment-label"><span className="small-dot" />Simulation workspace</span>
      </header>
      <main id="main" className="dashboard">
        <div className="page-heading">
          <div><p className="eyebrow">AlFrEDo · Fiber extrusion</p><h1>From solid stick to fiber.</h1><p className="page-description">Explore the AlFrEDo system, based on MIT FrED, one stage at a time.</p></div>
          <div className={`status-pill ${state.status === 'running' ? 'active' : ''}`} role="status"><span className="small-dot" />{state.status === 'running' ? 'Simulation running' : state.status === 'paused' ? 'Simulation paused' : 'Simulation ready'}</div>
        </div>
        <div className="demo-banner"><span className="demo-label">PROTOTYPE</span><p>Interactive AlFrEDo simulation. All measurements are artificial; no hardware or camera connection.</p><span className="version-label">v0.4</span></div>
        <SimulationControls status={state.status} elapsed={state.elapsed} message={process.message} onStart={start} onPause={pause} onReset={reset} />
        <div className="dashboard-grid">
          <ProcessVisualization state={state} process={process} />
          <MachineControls settings={state.settings} onSettingChange={changeSetting} />
          <SensorReadings temperature={state.temperature} diameter={state.diameter} hasSamples={state.samples.length > 0} extruding={process.extruding} />
          <DiameterMonitor diameter={state.diameter} samples={state.samples} extruding={process.extruding} />
        </div>
        <footer className="app-footer"><span>PEAF · AlFrEDo workspace</span><span>Local demo / No machine connection</span></footer>
      </main>
    </>
  )
}
