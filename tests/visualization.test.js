import test from 'node:test'
import assert from 'node:assert/strict'
import { createInitialState, simulationReducer, advanceSimulation, selectProcess } from '../src/simulation/engine.js'
import { selectVisualization } from '../src/simulation/visualization.js'

function visual(state) {
  return selectVisualization(state, selectProcess(state))
}
function active() {
  const state = createInitialState()
  return {
    ...state, status: 'running', temperature: 185,
    settings: { ...state.settings, heaterOn: true, extruderOn: true, fanOn: true, spoolOn: true },
  }
}

test('visual motion follows engine gates, including warm-up and independent fan/spool motors', () => {
  const state = { ...active(), temperature: 25 }
  const warming = visual(state)
  assert.equal(warming.feedMoving, false)
  assert.equal(warming.fiberMoving, false)
  assert.equal(warming.fanMoving, true)
  assert.equal(warming.spoolMoving, true)
  assert.equal(warming.hasFiber, false)
  const hot = visual(active())
  assert.equal(hot.feedMoving, true)
  assert.equal(hot.fiberMoving, true)
  assert.equal(visual({ ...active(), settings: { ...active().settings, spoolSpeed: 0 } }).spoolMoving, false)
})

test('pause freezes all motion but retains geometry, readings, and fiber; Reset restores a clean scene', () => {
  const generated = advanceSimulation(active())
  const before = structuredClone(generated)
  const paused = simulationReducer(generated, { type: 'pause' })
  const v = visual(paused)
  assert.equal(v.hasFiber, true)
  assert.equal(v.reset, false)
  for (const key of ['feedMoving', 'fiberMoving', 'fanMoving', 'spoolMoving']) assert.equal(v[key], false)
  assert.equal(v.cameraWidth, visual(generated).cameraWidth)
  assert.equal(v.heatColor, visual(generated).heatColor)
  assert.deepEqual(generated, before, 'presentation must not mutate the engine')
  const reset = visual(simulationReducer(generated, { type: 'reset' }))
  assert.equal(reset.reset, true)
  assert.equal(reset.hasFiber, false)
  assert.equal(reset.fiberReveal, 0)
})

test('shared diameter changes both illustrated fiber and camera width without changing simulation values', () => {
  const thin = { ...active(), diameter: 0.7 }
  const thick = { ...active(), diameter: 3 }
  assert(visual(thick).fiberWidth > visual(thin).fiberWidth)
  assert(visual(thick).cameraWidth > visual(thin).cameraWidth)
  assert.equal(thin.diameter, 0.7)
  assert.equal(thick.diameter, 3)
  assert.notEqual(visual({ ...active(), temperature: 25 }).heatColor, visual(active()).heatColor)
})

test('feed and spool speed settings drive independent visual playback rates', () => {
  const state = active()
  const fasterSpool = { ...state, settings: { ...state.settings, spoolSpeed: 100 } }
  assert(visual(fasterSpool).spoolRate > visual(state).spoolRate)
  assert.equal(visual(fasterSpool).feedRate, visual(state).feedRate)
  const fasterFeed = { ...state, settings: { ...state.settings, extruderSpeed: 100 } }
  assert(visual(fasterFeed).feedRate > visual(state).feedRate)
  assert.equal(visual(fasterFeed).spoolRate, visual(state).spoolRate)
})
