import fiberMark from './assets/fiber-mark.svg'
import ProcessVisualization from './components/ProcessVisualization.jsx'
import MachineControls from './components/MachineControls.jsx'
import SensorReadings from './components/SensorReadings.jsx'
import DiameterMonitor from './components/DiameterMonitor.jsx'
import useMachineControls from './simulation/useMachineControls.js'

export default function App() {
  const { settings, changeSetting, resetControls } = useMachineControls()
  const anyDeviceOn = settings.extruderOn || settings.heaterOn || settings.fanOn || settings.spoolOn

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
          <div className={`status-pill ${anyDeviceOn ? 'active' : ''}`} role="status"><span className="small-dot" />{anyDeviceOn ? 'Demo controls active' : 'All demo devices OFF'}</div>
        </div>
        <div className="demo-banner"><span className="demo-label">PROTOTYPE</span><p>AlFrEDo interface prototype. All readings are simulated, with no hardware connection.</p><span className="version-label">v0.2</span></div>
        <div className="dashboard-grid">
          <ProcessVisualization settings={settings} />
          <MachineControls settings={settings} onSettingChange={changeSetting} onReset={resetControls} />
          <SensorReadings />
          <DiameterMonitor />
        </div>
        <footer className="app-footer"><span>PEAF · AlFrEDo workspace</span><span>Local demo / No machine connection</span></footer>
      </main>
    </>
  )
}
