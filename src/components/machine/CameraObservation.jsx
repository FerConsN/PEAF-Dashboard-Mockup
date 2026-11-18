import { useId } from 'react'
import useMotion from './useMotion.js'

export default function CameraObservation({ state, process, visual }) {
  const titleId = useId()
  const gridId = useId()
  const scanner = useMotion({ kind: 'scan', moving: visual.fiberMoving, reset: visual.reset, duration: 1800 })
  const left = 240 - visual.cameraWidth / 2
  const right = 240 + visual.cameraWidth / 2
  const frameStatus = !visual.hasFiber ? 'Illustrative preview' : process.extruding ? 'Sampling' : 'Held frame'
  return (
    <section className="camera-observation" aria-labelledby={titleId}>
      <div className="camera-heading">
        <div><p className="eyebrow">Synthetic observation · no camera access</p><h3 id={titleId}>Simulated camera</h3></div>
        <span className="tag">{frameStatus}</span>
      </div>
      <svg className="camera-frame" viewBox="0 0 480 165" role="img" aria-label={`Simulated fiber with detected edges, ${state.diameter.toFixed(2)} millimeters. ${frameStatus}. Exaggerated scale.`}>
        <defs><pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" fill="none" stroke="#e2eae4" strokeWidth="0.5" /></pattern></defs>
        <rect width="480" height="165" fill={`url(#${gridId})`} />
        <path className="camera-crosshair" d="M240 0v165M0 82.5h480" />
        <g opacity={visual.hasFiber ? 1 : 0.45}>
          <rect className="observed-fiber" x={left} y="10" width={visual.cameraWidth} height="135" rx="2" />
          <path className="detected-edge" d={`M${left} 10V145M${right} 10V145`} />
          <path className="camera-dimension" d={`M${left} 152H${right}M${left} 148v8M${right} 148v8`} />
        </g>
        <path ref={scanner} className="camera-scan" data-motion="scan" d="M155 20H325" opacity={visual.hasFiber ? 1 : 0} />
        <text className="camera-overlay-label" x="18" y="25">SIMULATED</text>
        <text className="camera-overlay-label" x="18" y="146">Edges illustrated from engine diameter</text>
      </svg>
      <div className="camera-readout"><span><i className="edge-legend" />Detected edges · simulated</span><strong>{state.diameter.toFixed(2)} <span>mm</span></strong></div>
      <p className="help-text">{visual.hasFiber ? 'Uses the same generated diameter as the Fiber diameter panel and sensors.' : '1.75 mm is an illustrative initial value, not an AlFrEDo target.'} Thickness is exaggerated. No images are captured or analyzed.</p>
    </section>
  )
}
