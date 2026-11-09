// AlFrEDo interface definitions. Speeds are settings, not measured motion.
export const defaultSettings = {
  extruderOn: false,
  extruderSpeed: 30,
  heaterOn: false,
  temperature: 185,
  fanOn: false,
  spoolOn: false,
  spoolSpeed: 30,
}

export const deviceControls = [
  { id: 'extruder', name: 'Extruder', enabledKey: 'extruderOn', description: 'Motorized solid-stick feed', settingKey: 'extruderSpeed', settingLabel: 'Extruder speed', min: 10, max: 100, unit: '', hint: 'Speed setting · units unspecified' },
  { id: 'heater', name: 'Heater', enabledKey: 'heaterOn', description: 'Hot-end heater', settingKey: 'temperature', settingLabel: 'Temperature setpoint', min: 0, max: 300, unit: '°C' },
  { id: 'fan', name: 'Fan', enabledKey: 'fanOn', description: 'Air cooling for the extruded fiber' },
  { id: 'spool', name: 'DC spool motor', enabledKey: 'spoolOn', description: 'Take-up spool drive', settingKey: 'spoolSpeed', settingLabel: 'Spool motor speed', min: 0, max: 100, unit: 'RPM', hint: 'Nominal RPM setting · not a measured speed' },
]

export const processStages = [
  { id: 'feed', name: 'Material feed', detail: 'Solid thermoplastic stick · motorized feed', enabledKey: 'extruderOn', icon: 'feed' },
  { id: 'hot-end', name: 'Heat & extrude', detail: 'Hot-end · heater · temperature sensor · nozzle', enabledKey: 'heaterOn', icon: 'hotEnd' },
  { id: 'cooling', name: 'Fan cooling', detail: 'Fan-based cooling of the extruded fiber', enabledKey: 'fanOn', icon: 'fan' },
  { id: 'measurement', name: 'Measure', detail: 'Simulated camera observing fiber diameter', icon: 'camera' },
  { id: 'collection', name: 'Collect', detail: 'DC motor driving the take-up spool', enabledKey: 'spoolOn', icon: 'spool' },
]
