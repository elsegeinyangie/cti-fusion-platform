type StatCardProps = {
  title: string
  value: string
  suffix?: string
  delta?: string
  deltaDirection?: 'up' | 'down' | 'flat'
  deltaTone?: 'good' | 'bad' | 'flat'
  valueColor?: string
  variant?: 'standard' | 'grouped'
}

const DELTA_COLORS: Record<'good' | 'bad' | 'flat', string> = {
  good: '#4F7CFF',
  bad: '#E8A33D',
  flat: 'var(--muted-foreground)',
}

export default function StatCard({
  title,
  value,
  suffix,
  delta,
  deltaDirection = 'flat',
  deltaTone = 'flat',
  valueColor,
  variant = 'standard',
}: StatCardProps) {
  if (variant === 'grouped') {
    const arrow =
      deltaDirection === 'up' ? '↑ ' : deltaDirection === 'down' ? '↓ ' : ''
    return (
      <div className="metric-card">
        <div className="label">{title}</div>
        <div className="value">{value}</div>
        {delta ? (
          <div className="delta" style={{ color: DELTA_COLORS[deltaTone] }}>
            {arrow}
            {delta}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="mini-stat">
      <p className="label">{title}</p>
      <p className="value" style={valueColor ? { color: valueColor } : undefined}>
        {value}
        {suffix ? <span className="suffix"> {suffix}</span> : null}
      </p>
    </div>
  )
}
