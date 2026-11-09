// Display scaling only. These mappings do not alter the v0.3 engine.
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export function selectVisualization(state, process) {
  const heat = clamp(state.temperature / 300, 0, 1)
  return {
    reset: state.status === 'idle',
    hasFiber: state.samples.length > 0,
    fiberReveal: Math.min(1, state.samples.length / 6),
    fiberWidth: clamp(2 + state.diameter * 2, 2.5, 12),
    cameraWidth: clamp(12 + state.diameter * 16, 16, 92),
    heatColor: `hsl(${Math.max(20, 145 - heat * 180)} 55% ${90 - heat * 25}%)`,
    heatPercent: heat * 100,
    feedMoving: process.stages.feed.active,
    fanMoving: process.stages.cooling.active,
    spoolMoving: process.collecting,
    fiberMoving: process.extruding,
    feedRate: state.settings.extruderSpeed / 30,
    spoolRate: state.settings.spoolSpeed / 30,
  }
}
