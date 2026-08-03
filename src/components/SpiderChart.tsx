type SpiderChartProps = {
  data: Array<{ label: string; value: number }>
}

export default function SpiderChart({ data }: SpiderChartProps) {
  const center = 60
  const radius = 42
  const maxValue = Math.max(...data.map((item) => item.value), 1)
  const points = data
    .map((item, index) => {
      const angle = (Math.PI / 2) + (index / data.length) * Math.PI * 2
      const scaled = (item.value / maxValue) * radius
      const x = center + Math.cos(angle) * scaled
      const y = center - Math.sin(angle) * scaled
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="surface-card rounded-2xl p-5">
      <svg viewBox="0 0 120 120" className="h-48 w-full">
        <polygon points="60,18 95,38 95,82 60,102 25,82 25,38" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        <polygon points={points} fill="rgba(79, 184, 178, 0.22)" stroke="var(--color-primary)" strokeWidth="2" />
      </svg>
      <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
        {data.map((item) => (
          <span key={item.label} className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}
