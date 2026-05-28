// SVG ring that uses sage color — only for progress visualization
interface ProgressRingProps {
  value: number // 0–1
  size?: number
  stroke?: number
}

export function ProgressRing({ value, size = 64, stroke = 5 }: ProgressRingProps) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" strokeWidth={stroke}
        className="ring-track"
      />
      {/* Fill (sage) */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" strokeWidth={stroke}
        className="ring-fill"
        strokeDasharray={`${c * value} ${c}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}
