import { defaultSettings, deviceControls } from './systemDefinition.js'

export const TICK_MS = 500
export const MAX_SAMPLES = 100
export const INITIAL_DIAMETER = 1.75
export const AMBIENT_TEMPERATURE = 25
// Arbitrary demo gate, not an AlFrEDo operating specification.
export const DEMO_EXTRUSION_TEMPERATURE = 100

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export function createInitialState() {
  return {
    status: 'idle',
    settings: { ...defaultSettings },
    elapsed: 0,
    temperature: AMBIENT_TEMPERATURE,
    diameter: INITIAL_DIAMETER,
    samples: [],
  }
}

export function selectProcess(state) {
  const { settings, status, temperature } = state
  const running = status === 'running'
  const ready = settings.heaterOn && temperature >= DEMO_EXTRUSION_TEMPERATURE
  const extruding = running && settings.extruderOn && ready
  const collecting = running && settings.spoolOn && settings.spoolSpeed > 0
  let message = 'Ready to start. Enable devices and select Start simulation.'
  if (status === 'paused') message = 'Simulation paused. Values and history are frozen.'
  if (running) {
    if (!settings.extruderOn) message = 'Extruder OFF. Temperature can evolve; no new fiber samples.'
    else if (!settings.heaterOn) message = 'Heater OFF. Extrusion stopped; hot-end cooling toward ambient.'
    else if (!ready) message = settings.temperature < DEMO_EXTRUSION_TEMPERATURE
      ? 'Setpoint below the artificial 100 °C demo threshold. Raise it to enable extrusion.'
      : 'Warming up to the artificial 100 °C demo threshold.'
    else message = collecting ? 'Extruding and collecting simulated fiber.' : 'Extruding without take-up. Spool is stopped.'
  }
  const deviceState = (on, active) => ({
    active,
    label: !on ? 'OFF' : !running ? (status === 'paused' ? 'Paused' : 'Ready') : active ? 'Operating' : 'Waiting',
  })
  return {
    extruding,
    collecting,
    message,
    stages: {
      feed: deviceState(settings.extruderOn, extruding),
      'hot-end': deviceState(settings.heaterOn, running && settings.heaterOn),
      cooling: deviceState(settings.fanOn, running && settings.fanOn),
      measurement: { active: extruding, label: extruding ? 'Sampling' : 'Standby' },
      collection: deviceState(settings.spoolOn, collecting),
    },
  }
}

// Artificial, deterministic UI relationships only. No material/thermal physics.
export function advanceSimulation(state) {
  if (state.status !== 'running') return state
  const { settings } = state
  const elapsed = state.elapsed + TICK_MS / 1000
  const targetTemperature = settings.heaterOn ? settings.temperature : AMBIENT_TEMPERATURE
  const temperatureStep = settings.heaterOn ? 0.08 : settings.fanOn ? 0.08 : 0.04
  const difference = targetTemperature - state.temperature
  const temperature = Math.abs(difference) < 0.05
    ? targetTemperature
    : state.temperature + difference * temperatureStep
  const next = { ...state, elapsed, temperature }
  if (!selectProcess(next).extruding) return next

  const takeUp = settings.spoolOn ? settings.spoolSpeed : 0
  const targetDiameter = clamp(
    INITIAL_DIAMETER + (settings.extruderSpeed - 30) * 0.015
      - (takeUp - 30) * 0.012 + (settings.fanOn ? 0 : 0.15),
    0.25, 5,
  )
  const variation = Math.sin(elapsed * 2) * (settings.fanOn ? 0.015 : 0.06)
  const diameter = clamp(state.diameter + (targetDiameter - state.diameter) * 0.18 + variation, 0.25, 5)
  return {
    ...next,
    diameter,
    samples: [...state.samples, { time: elapsed, diameter }].slice(-MAX_SAMPLES),
  }
}

export function simulationReducer(state, action) {
  switch (action.type) {
    case 'start': return state.status === 'running' ? state : { ...state, status: 'running' }
    case 'pause': return state.status === 'running' ? { ...state, status: 'paused' } : state
    case 'reset': return createInitialState()
    case 'tick': return advanceSimulation(state)
    case 'setting': {
      const device = deviceControls.find((item) => item.enabledKey === action.key || item.settingKey === action.key)
      if (!device) return state
      const isToggle = device.enabledKey === action.key
      if (isToggle ? typeof action.value !== 'boolean' : !Number.isFinite(action.value)) return state
      const value = isToggle ? action.value : clamp(Math.round(action.value), device.min, device.max)
      return { ...state, settings: { ...state.settings, [action.key]: value } }
    }
    default: return state
  }
}
