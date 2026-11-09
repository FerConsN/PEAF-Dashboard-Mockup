# PEAF Dashboard Mockup

A simple dashboard for the AlFrEDo fiber extrusion system, based on MIT FrED, built with React, Vite, JavaScript (JSX), and standard CSS. The Vite project lives directly in this repository root.

## Requirements

- Node.js 20.19+ (20.x), or 22.12+; Node.js 24 is recommended.
- npm (included with Node.js).

## Installation and development

From the repository root:

```sh
npm install
npm run dev
```

Open the local address printed by Vite. In a cloud environment, use `npm run dev -- --host 0.0.0.0` when access through the environment's port forwarding is needed.

## Production build

```sh
npm run build
npm run preview
```

The production build is generated in `dist/`. Preview serves that build locally. For repeatable dependency installation with the committed lockfile, use `npm ci`.

## AlFrEDo process and controls

The schematic follows the system's five stages:

1. A motorized feed mechanism drives a solid thermoplastic stick.
2. A hot-end with a heater, temperature sensor, and extrusion nozzle heats and extrudes the material.
3. A fan cools the extruded fiber.
4. A simulated camera observes the fiber for diameter measurement.
5. A DC motor drives a take-up spool to collect the fiber.

Each device has an independent local ON/OFF toggle:

| Device | Setting | Range |
| --- | --- | --- |
| Extruder / stick-feed mechanism | Speed, units unspecified | 10–100 |
| Heater | Temperature setpoint | 0–300 °C |
| Fan | ON/OFF only | — |
| DC spool motor | Nominal RPM setting, not a measured speed | 0–100 |

All devices start OFF. Setpoints may be prepared while OFF. Reset turns every device OFF and restores extruder speed 30, temperature 185 °C, and nominal spool speed 30 RPM. These are interface defaults, not validated operating parameters.

Sensor cards show **fixed simulated** hot-end temperature and camera diameter values. The diameter chart is an illustrative simulated camera trace; its 1.75 mm reference is not a verified system specification. The readings do not respond to setpoints or device ON/OFF states. There is no pressure measurement, physical model, live camera feed, hardware communication, backend, database, or required environment variable.

## Project structure

```text
index.html
vite.config.js
src/
  App.jsx
  main.jsx
  components/   # Dashboard sections and shared panel
  simulation/   # System definitions, local control state, and fixed sample data
  styles/       # Standard CSS and responsive layout
  assets/       # Local SVG mark
```

## Validation

Run `npm run build` to validate the production bundle. For a manual smoke check, start the dev server, toggle each device independently, adjust the three sliders through their full ranges, and reset. Confirm all devices return to OFF and default setpoints are restored. Readings should remain fixed and labeled as simulated. Check the layout on desktop and mobile. No automated test suite is configured yet.

## Next development phase

`simulation/systemDefinition.js` describes the devices and ordered process stages. `simulation/useMachineControls.js` owns local control state independently of presentation. `DeviceControl` renders each device's toggle and optional setpoint, while `ProcessStage` renders each stage with its associated demo state. Future animation and simulation consumers can use these settings without embedding physical models in the UI components. `placeholderData.js` remains a separate source of illustrative readings.
