import { useEffect, useReducer } from 'react'
import { createInitialState, selectProcess, simulationReducer, TICK_MS } from './engine.js'

export default function useSimulation() {
  const [state, dispatch] = useReducer(simulationReducer, undefined, createInitialState)

  useEffect(() => {
    if (state.status !== 'running') return undefined
    const timer = setInterval(() => dispatch({ type: 'tick' }), TICK_MS)
    return () => clearInterval(timer)
  }, [state.status])

  return {
    state,
    process: selectProcess(state),
    changeSetting: (key, value) => dispatch({ type: 'setting', key, value }),
    start: () => dispatch({ type: 'start' }),
    pause: () => dispatch({ type: 'pause' }),
    reset: () => dispatch({ type: 'reset' }),
  }
}
