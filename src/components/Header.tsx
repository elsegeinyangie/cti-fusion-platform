type HeaderProps = {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="island-shell rounded-3xl p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">CTI Fusion Platform</p>
      <h1 className="mt-2 text-3xl font-semibold text-foreground">{title}</h1>
      {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
    </header>
  )
}
