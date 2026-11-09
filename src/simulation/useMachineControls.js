import { useState } from 'react'
import { defaultSettings } from './systemDefinition.js'

// Local interface state only; a future simulation can consume these settings.
export default function useMachineControls() {
  const [settings, setSettings] = useState(() => ({ ...defaultSettings }))

  function changeSetting(key, value) {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  function resetControls() {
    setSettings({ ...defaultSettings })
  }

  return { settings, changeSetting, resetControls }
}
