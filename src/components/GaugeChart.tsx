type GaugeChartProps = {
  value: number
  max?: number
  label?: string
}

export default function GaugeChart({ value, max = 100, label = 'Score' }: GaugeChartProps) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const percent = Math.min(Math.max(value / max, 0), 1)
  const offset = circumference * (1 - percent)

  return (
    <div className="surface-card rounded-2xl p-5">
      <div className="flex items-center justify-center">
        <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
          <circle cx="80" cy="80" r={radius} stroke="rgba(255,255,255,0.12)" strokeWidth="16" fill="none" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="var(--color-primary)"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
      </div>
      <div className="-mt-12 text-center">
        <p className="text-4xl font-semibold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
