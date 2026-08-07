import { useState } from 'react'

type DetailCardProps = {
  id: string
  status: string
  severity?: 'crit' | 'high' | 'med' | 'low'
  badges?: string[]
  confidence?: number
  severityLabel?: string
  children: React.ReactNode
  extra?: React.ReactNode
}

export default function DetailCard({
  id,
  status,
  severity = 'low',
  badges = [],
  confidence,
  severityLabel,
  children,
  extra,
}: DetailCardProps) {
  const [open, setOpen] = useState(false)

  const sevClass = severity === 'crit' ? 'crit' : severity === 'high' ? 'high' : severity === 'med' ? 'med' : 'low'
  const sevColor = severity === 'crit' ? 'sev-crit' : severity === 'high' ? 'sev-high' : severity === 'med' ? 'sev-med' : 'sev-low'
  const pillClass = severity === 'crit' ? 'pill-crit' : severity === 'high' ? 'pill-high' : severity === 'med' ? 'pill-med' : 'pill-low'

  return (
    <div
      className={`feed-card ${sevClass} ${open ? 'open' : ''}`}
      tabIndex={0}
      onClick={() => setOpen((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setOpen((value) => !value)
        }
      }}
    >
      <div className="feed-top">
        <span className="case-id">{id}</span>
        <span className={`status-pill ${pillClass}`}>{status}</span>
      </div>
      {badges.length ? (
        <div>
          {badges.map((badge) => (
            <span key={badge} className="src-badge">
              {badge}
            </span>
          ))}
        </div>
      ) : null}
      <p className="case-desc">{children}</p>
      {confidence !== undefined ? (
        <div className="case-bottom">
          <span>
            CONFIDENCE <span className="conf-val">{confidence}%</span>
          </span>
          {severityLabel ? <span className={sevColor}>{severityLabel}</span> : null}
        </div>
      ) : null}
      {extra ? <div className="case-extra">{extra}</div> : null}
    </div>
  )
}
