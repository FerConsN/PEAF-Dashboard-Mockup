# PEAF Dashboard Mockup · v0.4

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

All devices start OFF. Setpoints may be prepared while idle or paused. They are interface settings, not validated operating parameters.

## Interactive simulation

1. Turn the heater and extruder ON; optionally turn on the fan and DC spool motor.
2. Select **Start simulation**. The hot-end temperature progressively approaches the chosen setpoint.
3. At the **artificial 100 °C demo threshold**, extrusion begins and generates a diameter sample every 0.5 simulation seconds. This threshold is not a confirmed AlFrEDo operating temperature.
4. Change the controls while running to explore the generated behavior. **Pause simulation** freezes time, readings, and history; **Resume simulation** continues the same session.
5. **Reset simulation** stops the engine, clears the chart and elapsed time, turns all devices OFF, and restores defaults: 25 °C initial temperature, 1.75 mm illustrative initial diameter, extruder speed 30, heater setpoint 185 °C, and nominal spool setting 30 RPM.

### Artificial behavior, not physics

- Higher extruder speed increases simulated diameter; higher spool speed reduces it. A stopped or disabled spool removes take-up influence and collection, but extrusion can continue.
- Heater ON progressively approaches its setpoint, including lower setpoints. Heater OFF stops extrusion and cools toward an artificial ambient value of 25 °C. Extruder OFF stops new diameter samples. A temperature below the demo threshold also stops sampling.
- Fan ON reduces generated diameter variation and speeds artificial cooling when the heater is OFF.
- Diameter transitions are smoothed with a small deterministic oscillation. The relationships, limits, and temperature threshold are arbitrary demonstration rules with no physical equations or calibration.
- The chart retains the **last 100 actual simulation samples**, timestamped in simulation seconds; it starts empty and auto-scales its diameter axis. During an extrusion interruption, the last diameter and trace are held, while temperature and time continue if the simulation is running. Stopped periods produce no new diameter samples.
- The process diagram highlights operating components and distinguishes ready, waiting, paused, and OFF states. The simulated camera stage samples only during extrusion; no browser camera access is requested.

All temperature and diameter readings are **simulated**. The **1.75 mm value is only an illustrative initial value, not a confirmed AlFrEDo target**. There are no pressure or additional machine measurements, physical models, hardware connections, camera permissions, backend, database, or required environment variables. State is kept in memory and resets on page reload. Each browser timer tick advances 0.5 simulated seconds; browser throttling can make simulated time slower than wall-clock time.

## Animated visualization (v0.4)

The process panel contains a detailed SVG schematic, selectable stage descriptions, and a synthetic camera observation view. All geometry and motion are illustrative, not verified machine dimensions or physical behavior.

- Stick markings and the feed drive move when the engine reports active material feed. During warm-up, feed waits for the existing extrusion gate.
- Hot-end color and a temperature indicator track the simulated temperature, including cooling after the heater is switched OFF.
- Fiber progressively appears from the nozzle when generated samples arrive. Traveling markings show active extrusion; its thickness follows the engine diameter with exaggerated scaling. Stopped extrusion holds the last illustrated fiber.
- Cooling fans rotate only while the simulation runs and their switch is ON.
- The DC take-up spool rotates only when its motor is operating at a nonzero speed. Higher nominal speed settings increase visual rotation rate; this is not calibrated RPM.
- The camera panel draws a synthetic fiber and dashed detected edges from the same diameter used by the sensors and graph. It shows an illustrative preview before the first sample, sampling during extrusion, and a held frame when stopped or paused. No images are captured, processed, or requested from any camera.
- Pause freezes animation phases. Resume continues them; Reset rewinds all motion and clears generated fiber. Device switches stop their respective motion without affecting independent motors. Speed changes preserve the current rotational phase.
- Reduced-motion preferences disable moving effects while retaining readings, colors, dimensions, and operating labels. The engine continues running. On narrow screens the schematic scrolls horizontally within its panel; stage inspection is keyboard accessible.

## Project structure

```text
index.html
vite.config.js
src/
  App.jsx
  main.jsx
  components/   # Dashboard sections, stage inspection, and shared panel
    machine/    # Reusable SVG parts, synthetic camera, and motion hook
  simulation/   # Pure engine/reducer, React clock hook, and device definitions
  styles/       # Standard CSS and responsive layout
  assets/       # Local SVG mark
```

## Validation

```sh
npm test
npm run build
```

The Node test suite checks temperature progression, artificial control relationships, device gating, pause/resume/reset, timestamped history limits, bounded settings, and visualization state mappings. For a browser smoke check, start the dev server, enable devices and start the simulation, wait for warm-up, then adjust the sliders. Check that Pause freezes values, Resume continues, and Reset clears history and turns devices OFF. Check stick/fiber movement, temperature color, fan and spool rotation, speed changes, and camera edges. Pause must freeze every motion; Reset must rewind them. Compare the camera diameter with the graph and sensor reading. Inspect stages with the keyboard, check reduced-motion preferences, and check desktop/mobile layouts.

## Simulation architecture

- `simulation/engine.js`: deterministic pure state transitions, artificial process relationships, and derived operating states. This is the single source for simulated readings and history.
- `simulation/useSimulation.js`: React reducer integration and a single 500 ms interval, cleaned up on pause/reset/unmount. Controls dispatch actions to the same reducer, so ticks always use current settings.
- `simulation/systemDefinition.js`: device ranges, defaults, and ordered process stages.
- `simulation/visualization.js`: display-only thickness, temperature-color, and animation-speed mappings derived from the unchanged engine state.
- `components/machine/`: reusable SVG feeder, hot-end/nozzle, fans, camera, spool, and fiber path, composed by `MachineSchematic`. `CameraObservation` renders the synthetic observation view.
- `components/machine/useMotion.js`: browser compositor animation lifecycle. It preserves phase across playback-rate changes, pauses/resumes, rewinds on Reset, cleans up on unmount, and respects reduced motion. It does not advance the simulation.
- `SimulationControls`, `DeviceControl`, and `ProcessStage`: presentation and user actions, including keyboard-accessible stage inspection.
- `DiameterMonitor`: dynamic SVG time-series rendering with no chart dependency.
