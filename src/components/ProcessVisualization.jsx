import Panel from './Panel.jsx'
import ProcessStage from './ProcessStage.jsx'
import { processStages } from '../simulation/systemDefinition.js'

export default function ProcessVisualization({ process }) {
  return (
    <Panel id="process-title" eyebrow="AlFrEDo · based on MIT FrED" title="From solid stick to fiber" badge="Schematic">
      <ol className="process-track">
        {processStages.map((stage, index) => <ProcessStage key={stage.id} stage={stage} number={index + 1} operation={process.stages[stage.id]} />)}
      </ol>
      <div className="panel-note"><span className="small-dot" />Illustrative process path <span className="note-end">Operating states · simulated</span></div>
    </Panel>
  )
}
