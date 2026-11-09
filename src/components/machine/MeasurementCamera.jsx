export default function MeasurementCamera({ sampling }) {
  return (
    <g className="machine-part" data-part="camera">
      <path className={`camera-field ${sampling ? 'is-sampling' : ''}`} d="M527 105L496 162h92l-35-57" />
      <rect x="511" y="65" width="57" height="38" rx="5" />
      <path d="M523 65l6-9h21l6 9M568 76l12-5v25l-12-5" />
      <circle cx="540" cy="84" r="11" /><circle cx="540" cy="84" r="5" />
      <circle className={sampling ? 'camera-led active-led' : 'camera-led'} cx="520" cy="74" r="2" />
      <path className="measurement-guide" d="M504 126v38M577 126v38" />
      <text className="machine-label" x="498" y="199">Simulated camera</text>
    </g>
  )
}
