import { IncreaseArrowIcon } from './icons/IncreasedArrowIcon'
import { DecreaseArrowIcon } from './icons/DecreasedArrowIcon'
import { NoChangeIcon } from './icons/NoChangeIcon'

type StatCardProps = {
  title: string
  value: string
  suffix?: string
  delta?: string
  deltaDirection?: 'up' | 'down' | 'flat'
  valueColor?: string
  variant?: 'standard' | 'grouped'
}

export default function StatCard({
  title,
  value,
  suffix,
  delta,
  deltaDirection = 'flat',
  valueColor,
  variant = 'standard',
}: StatCardProps) {
  if (variant === 'grouped') {
    return (
      <div className="metric-card">
        <div className="value">{value}</div>
        <div className="label-row">
          <span className="label text-base">{title}</span>
          {delta ? (
            <>
              {deltaDirection === 'up' ? (
                <IncreaseArrowIcon />
              ) : deltaDirection === 'down' ? (
                <DecreaseArrowIcon />
              ) : (
                <NoChangeIcon />
              )}
              <span className="delta">{delta}</span>
            </>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className="mini-stat">
      <p className="label font-bold text-base">{title}</p>
      <p className="value" style={valueColor ? { color: valueColor } : undefined}>
        {value}
        {suffix ? <span className="suffix"> {suffix}</span> : null}
      </p>
    </div>
  )
}