# PEAF Dashboard Mockup

A simple fiber extrusion dashboard built with React, Vite, JavaScript (JSX), and standard CSS. The Vite project lives directly in this repository root.

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

## Dashboard

- Fiber extrusion schematic: feed, extrusion, cooling, and collection stages.
- Machine controls: temperature and screw-speed sliders, start/pause, and reset.
- Sensor readings: fixed example temperature, pressure, and take-up speed.
- Fiber diameter monitoring: a fixed example trace and nominal diameter.

Start/pause changes the demo status and decorative spool animation. Sliders update local setpoints; reset restores defaults and pauses the demo. Readings and chart samples remain fixed. There are no physical simulation models, live machine connections, backend, database, or required environment variables.

## Project structure

```text
index.html
vite.config.js
src/
  App.jsx
  main.jsx
  components/   # Dashboard sections and shared panel
  simulation/   # Fixed placeholder data and default setpoints
  styles/       # Standard CSS and responsive layout
  assets/       # Local SVG mark
```

## Validation

Run `npm run build` to validate the production bundle. For a manual smoke check, start the dev server, open the dashboard, adjust both sliders, start/pause the demo, and reset. Confirm that reset restores 185 °C and 30 rpm and that the layout works on desktop and mobile. No automated test suite is configured yet.
