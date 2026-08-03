type StatCardProps = {
  title: string
  value: string
  description?: string
  change?: string
  variant?: 'standard' | 'grouped'
}

export default function StatCard({
  title,
  value,
  description,
  change,
  variant = 'standard',
}: StatCardProps) {
  const isGrouped = variant === 'grouped'

  return (
    <div
      className={`surface-card rounded-2xl p-5 ${isGrouped ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-sm ${isGrouped ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
        </div>
        {change ? (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${isGrouped ? 'bg-primary-foreground/15 text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
          >
            {change}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className={`mt-3 text-sm ${isGrouped ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
