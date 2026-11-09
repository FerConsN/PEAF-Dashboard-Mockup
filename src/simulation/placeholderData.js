// Fixed demonstration values only. No physical model or live sensor connection.
export const sensorReadings = [
  { label: 'Barrel temperature', value: '185', unit: '°C', detail: 'Heating zone 01' },
  { label: 'Extrusion pressure', value: '42.6', unit: 'bar', detail: 'Die inlet' },
  { label: 'Take-up speed', value: '12.0', unit: 'm/min', detail: 'Winding station' },
]

export const diameterSamples = [
  1.75, 1.76, 1.74, 1.75, 1.77, 1.76, 1.75, 1.73,
  1.74, 1.75, 1.76, 1.75, 1.74, 1.76, 1.75, 1.75,
]

export const defaultSettings = { temperature: 185, screwSpeed: 30 }
