import { useId } from 'react'
import MaterialFeeder from './MaterialFeeder.jsx'
import HotEnd from './HotEnd.jsx'
import CoolingFan from './CoolingFan.jsx'
import MeasurementCamera from './MeasurementCamera.jsx'
import TakeUpSpool from './TakeUpSpool.jsx'
import FiberPath from './FiberPath.jsx'

export default function MachineSchematic({ state, process, visual, selectedId }) {
  const titleId = useId()
  const descriptionId = useId()
  return (
    <div className="machine-canvas" tabIndex="0" role="region" aria-label="Animated machine schematic. Scroll horizontally on small screens.">
      <svg data-selected={selectedId} className="machine-schematic" viewBox="0 0 810 310" role="img" aria-labelledby={`${titleId} ${descriptionId}`}>
        <title id={titleId}>Animated AlFrEDo extrusion schematic</title>
        <desc id={descriptionId}>A solid stick is fed through the hot-end and nozzle. Generated fiber passes fan cooling and a simulated camera before a DC motor spool. Movement follows simulation and device states. Current simulated diameter: {state.diameter.toFixed(2)} millimeters. Shapes and dimensions are illustrative.</desc>
        <path className="process-baseline" d="M30 145H697" />
        <MaterialFeeder visual={visual} />
        <HotEnd visual={visual} temperature={state.temperature} setpoint={state.settings.temperature} heaterOn={state.settings.heaterOn} />
        <CoolingFan x={412} y={83} visual={visual} />
        <CoolingFan x={412} y={211} visual={visual} />
        <path className={`air-stream ${visual.fanMoving ? 'air-stream-active' : ''}`} d="M402 119v10M412 119v10M422 119v10M402 161v10M412 161v10M422 161v10" />
        <text className="machine-label" x="381" y="264">Fan cooling</text>
        <FiberPath visual={visual} />
        <MeasurementCamera sampling={process.extruding} />
        <TakeUpSpool visual={visual} speed={state.settings.spoolSpeed} />
      </svg>
    </div>
  )
}
