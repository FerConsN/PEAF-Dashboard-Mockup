import test from 'node:test'
import assert from 'node:assert/strict'
import {
  createInitialState, simulationReducer, advanceSimulation, selectProcess,
  MAX_SAMPLES, INITIAL_DIAMETER, AMBIENT_TEMPERATURE,
} from '../src/simulation/engine.js'

function running(overrides = {}) {
  const initial = createInitialState()
  return {
    ...initial,
    status: 'running',
    temperature: 185,
    settings: { ...initial.settings, extruderOn: true, heaterOn: true, fanOn: true, spoolOn: true, ...overrides },
  }
}
function advance(state, count = 1) {
  for (let i = 0; i < count; i++) state = advanceSimulation(state)
  return state
}

test('idle and paused states do not advance; start resumes the retained state', () => {
  const initial = createInitialState()
  assert.strictEqual(advance(initial, 20), initial)
  const active = advance(running(), 4)
  const paused = simulationReducer(active, { type: 'pause' })
  assert.strictEqual(advance(paused, 50), paused)
  const resumed = advance(simulationReducer(paused, { type: 'start' }))
  assert.equal(resumed.elapsed, active.elapsed + 0.5)
  assert.equal(resumed.samples.length, active.samples.length + 1)
})

test('repeated start does not reset the simulation; pause before start is harmless', () => {
  const active = advance(running(), 5)
  assert.strictEqual(simulationReducer(active, { type: 'start' }), active)
  const initial = createInitialState()
  assert.strictEqual(simulationReducer(initial, { type: 'pause' }), initial)
})

test('temperature approaches both higher and lower setpoints progressively without overshoot', () => {
  const state = { ...running(), temperature: AMBIENT_TEMPERATURE }
  const first = advance(state)
  assert(first.temperature > AMBIENT_TEMPERATURE && first.temperature < 185)
  assert.equal(advance(state, 200).temperature, 185)
  const lower = running({ temperature: 0 })
  assert(advance(lower).temperature < 185 && advance(lower).temperature > 0)
  assert.equal(advance(lower, 200).temperature, 0)
})

test('heater OFF cools toward ambient; fan accelerates artificial cooling', () => {
  const still = running({ heaterOn: false, fanOn: false })
  const fan = running({ heaterOn: false, fanOn: true })
  assert(advance(fan).temperature < advance(still).temperature)
  assert(advance(still).temperature < 185)
  assert.equal(advance(fan, 200).temperature, AMBIENT_TEMPERATURE)
})

test('extrusion requires an enabled extruder, heater, and the artificial warm-up gate', () => {
  for (const state of [running({ extruderOn: false }), running({ heaterOn: false }), { ...running(), temperature: 25 }]) {
    const next = advance(state)
    assert.equal(next.samples.length, 0)
    assert.equal(next.diameter, INITIAL_DIAMETER)
    assert.equal(selectProcess(next).extruding, false)
  }
  assert(advance({ ...running(), temperature: 25 }, 20).samples.length > 0)
})

test('greater extruder speed thickens fiber; greater spool speed thins fiber', () => {
  const baseline = advance(running(), 80).diameter
  assert(advance(running({ extruderSpeed: 100 }), 80).diameter > baseline)
  assert(advance(running({ spoolSpeed: 100 }), 80).diameter < baseline)
  assert(advance(running({ extruderSpeed: 10 }), 80).diameter < baseline)
})

test('spool OFF removes take-up regardless of its setpoint; zero speed means stopped', () => {
  const stopped = advance(running({ spoolOn: false, spoolSpeed: 100 }), 80)
  const zero = advance(running({ spoolSpeed: 0 }), 80)
  assert.equal(stopped.diameter, zero.diameter)
  assert(stopped.diameter > advance(running(), 80).diameter)
  assert.equal(selectProcess(zero).stages.collection.active, false)
})

test('fan ON changes fiber behavior and reduces artificial variation', () => {
  const fan = advance(running({ fanOn: true }), 80)
  const noFan = advance(running({ fanOn: false }), 80)
  assert.notEqual(fan.diameter, noFan.diameter)
  const spread = (samples) => Math.max(...samples.map(s => s.diameter)) - Math.min(...samples.map(s => s.diameter))
  assert(spread(fan.samples.slice(-20)) < spread(noFan.samples.slice(-20)))
})

test('history retains exactly the latest 100 timestamped samples and stays finite', () => {
  const state = advance(running(), 250)
  assert.equal(state.samples.length, MAX_SAMPLES)
  assert.equal(state.samples[0].time, 75.5)
  assert.equal(state.samples.at(-1).time, 125)
  for (const sample of state.samples) {
    assert(Number.isFinite(sample.diameter))
    assert(sample.diameter >= 0.25 && sample.diameter <= 5)
  }
})

test('extruder OFF holds diameter and history while time and temperature continue', () => {
  const active = advance(running(), 10)
  const stopped = { ...active, settings: { ...active.settings, extruderOn: false, temperature: 220 } }
  const next = advance(stopped, 20)
  assert.strictEqual(next.samples, stopped.samples)
  assert.equal(next.diameter, stopped.diameter)
  assert(next.temperature > stopped.temperature)
  assert(next.elapsed > stopped.elapsed)
})

test('process operating states reflect pause, heater warm-up, switches, and sampling', () => {
  const active = running()
  assert(Object.values(selectProcess(active).stages).every(stage => stage.active))
  assert(Object.values(selectProcess({ ...active, status: 'paused' }).stages).every(stage => !stage.active))
  const warm = selectProcess({ ...active, temperature: 25 })
  assert.equal(warm.stages.feed.label, 'Waiting')
  assert.equal(warm.stages.measurement.label, 'Standby')
  assert.equal(warm.stages['hot-end'].active, true)
})

test('reset clears history, time, temperature, diameter, and device settings without restarting', () => {
  const reset = simulationReducer(advance(running({ extruderSpeed: 100 }), 150), { type: 'reset' })
  assert.deepEqual(reset, createInitialState())
  assert.strictEqual(advance(reset, 10), reset)
})

test('settings remain editable while paused and are bounded centrally', () => {
  let state = { ...running(), status: 'paused' }
  state = simulationReducer(state, { type: 'setting', key: 'extruderSpeed', value: 0 })
  assert.equal(state.settings.extruderSpeed, 10)
  state = simulationReducer(state, { type: 'setting', key: 'temperature', value: 400 })
  assert.equal(state.settings.temperature, 300)
  for (const action of [
    { key: 'spoolSpeed', value: NaN }, { key: 'fanOn', value: 'yes' }, { key: 'unknown', value: 1 },
  ]) assert.strictEqual(simulationReducer(state, { type: 'setting', ...action }), state)
  assert.equal(state.status, 'paused')
})
