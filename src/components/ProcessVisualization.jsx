import { useState } from 'react'
import Panel from './Panel.jsx'
import ProcessStage from './ProcessStage.jsx'
import { processStages } from '../simulation/systemDefinition.js'
import { selectVisualization } from '../simulation/visualization.js'
import MachineSchematic from './machine/MachineSchematic.jsx'
import CameraObservation from './machine/CameraObservation.jsx'

export default function ProcessVisualization({ state, process }) {
  const [selectedId, setSelectedId] = useState('feed')
  const selected = processStages.find((stage) => stage.id === selectedId)
  const visual = selectVisualization(state, process)
  return (
    <Panel id="process-title" eyebrow="AlFrEDo · based on MIT FrED" title="From solid stick to fiber" badge="Animated schematic">
      <div className="process-visualization" data-status={state.status}>
        <MachineSchematic state={state} process={process} visual={visual} selectedId={selectedId} />
        <p className="schematic-hint">Scroll horizontally to explore the schematic.</p>
        <ol className="process-track" aria-label="Inspect process stages">
          {processStages.map((stage, index) => <ProcessStage key={stage.id} stage={stage} number={index + 1} operation={process.stages[stage.id]} selected={selectedId === stage.id} onSelect={() => setSelectedId(stage.id)} />)}
        </ol>
        <p className="stage-description"><strong>{selected.name}</strong> · {selected.detail}. <span>{process.stages[selected.id].label} · simulated</span></p>
        <CameraObservation state={state} process={process} visual={visual} />
      </div>
      <div className="panel-note"><span className="small-dot" />Illustrative geometry and motion <span className="note-end">Driven by simulated state</span></div>
    </Panel>
  )
}
