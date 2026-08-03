type LineChartProps = {
  data: Array<{ label: string; value: number }>
}

export default function LineChart({ data }: LineChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1)
  const points = data
    .map((item, index) => {
      const x = 12 + (index / (data.length - 1)) * 76
      const y = 84 - (item.value / maxValue) * 56
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="surface-card rounded-2xl p-5">
      <svg viewBox="0 0 88 88" className="h-48 w-full">
        <line x1="12" y1="84" x2="88" y2="84" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        <line x1="12" y1="12" x2="12" y2="84" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        <polyline fill="none" stroke="var(--color-primary)" strokeWidth="3" points={points} />
        {data.map((item, index) => {
          const x = 12 + (index / (data.length - 1)) * 76
          const y = 84 - (item.value / maxValue) * 56
          return <circle key={item.label} cx={x} cy={y} r="3.2" fill="var(--color-primary)" />
        })}
      </svg>
      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  )
}
