import Panel from './Panel.jsx'

const stages = [
  { number: '01', name: 'Feed', detail: 'Polymer pellets', shape: 'hopper' },
  { number: '02', name: 'Extrude', detail: 'Heated barrel & die', shape: 'barrel' },
  { number: '03', name: 'Cool', detail: 'Cooling bath', shape: 'bath' },
  { number: '04', name: 'Collect', detail: 'Take-up spool', shape: 'spool' },
]

export default function ProcessVisualization({ running }) {
  return (
    <Panel id="process-title" eyebrow="Process overview" title="From pellet to fiber" badge="Schematic">
      <div className={`process-track ${running ? 'is-running' : ''}`}>
        {stages.map((stage) => (
          <div className="process-stage" key={stage.number}>
            <div className="stage-art" aria-hidden="true"><div className={stage.shape} /></div>
            <span className="stage-number">{stage.number}</span>
            <h3>{stage.name}</h3><p>{stage.detail}</p>
          </div>
        ))}
      </div>
      <div className="panel-note"><span className="small-dot" />Illustrative process path <span className="note-end">No physical model connected</span></div>
    </Panel>
  )
}
