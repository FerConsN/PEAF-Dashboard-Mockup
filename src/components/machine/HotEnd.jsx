export default function HotEnd({ visual, temperature, setpoint, heaterOn }) {
  return (
    <g className="machine-part" data-part="hot-end">
      <rect x="222" y="111" width="70" height="68" rx="6" fill={visual.heatColor} className="hot-end-body" />
      <path className="heater-trace" d="M232 121v48h12v-48h12v48h12v-48h12v48" />
      <path className="nozzle" d="M292 127l30 12v12l-30 12zM322 140h10v10h-10" />
      <circle className="temperature-sensor" cx="273" cy="112" r="5" />
      <path className="machine-outline" d="M273 106V86h35" />
      <text className="machine-label" x="222" y="70">Temperature sensor</text>
      <text className="machine-value" x="222" y="203">{temperature.toFixed(1)} °C</text>
      <rect className="heat-meter-track" x="222" y="213" width="90" height="5" rx="2" />
      <rect className="heat-meter" x="222" y="213" width={visual.heatPercent * 0.9} height="5" rx="2" fill={visual.heatColor} />
      <text className="machine-label" x="222" y="240">{heaterOn ? `Set ${setpoint} °C` : 'Heater OFF'}</text>
      <text className="machine-label" x="302" y="181">Nozzle</text>
    </g>
  )
}
