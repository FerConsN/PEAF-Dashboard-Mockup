import { useState } from 'react'
import fiberMark from './assets/fiber-mark.svg'
import ProcessVisualization from './components/ProcessVisualization.jsx'
import MachineControls from './components/MachineControls.jsx'
import SensorReadings from './components/SensorReadings.jsx'
import DiameterMonitor from './components/DiameterMonitor.jsx'
import { defaultSettings } from './simulation/placeholderData.js'

export default function App() {
  const [running, setRunning] = useState(false)
  const [settings, setSettings] = useState({ ...defaultSettings })

  function resetDemo() {
    setRunning(false)
    setSettings({ ...defaultSettings })
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to dashboard</a>
      <header className="app-header">
        <a className="brand" href="./" aria-label="PEAF dashboard home"><img src={fiberMark} alt="" /><span>PEAF<span className="brand-divider">/</span><span className="brand-caption">Process lab</span></span></a>
        <span className="environment-label"><span className="small-dot" />Simulation workspace</span>
      </header>
      <main id="main" className="dashboard">
        <div className="page-heading">
          <div><p className="eyebrow">Fiber extrusion · Dashboard</p><h1>A closer look at the process.</h1><p className="page-description">Your workspace for exploring fiber production, one stage at a time.</p></div>
          <div className={`status-pill ${running ? 'active' : ''}`} role="status"><span className="small-dot" />{running ? 'Demo running' : 'Demo paused'}</div>
        </div>
        <div className="demo-banner"><span className="demo-label">PROTOTYPE</span><p>A starting point for the PEAF dashboard. All readings are illustrative.</p><span className="version-label">v0.1</span></div>
        <div className="dashboard-grid">
          <ProcessVisualization running={running} />
          <MachineControls running={running} settings={settings} onSettingChange={(key, value) => setSettings((current) => ({ ...current, [key]: value }))} onToggle={() => setRunning((current) => !current)} onReset={resetDemo} />
          <SensorReadings />
          <DiameterMonitor />
        </div>
        <footer className="app-footer"><span>PEAF · Fiber extrusion workspace</span><span>Local demo / No machine connection</span></footer>
      </main>
    </>
  )
}
