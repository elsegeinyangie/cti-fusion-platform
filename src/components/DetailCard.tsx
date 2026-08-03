type DetailCardProps = {
  title: string
  children: React.ReactNode
  accent?: string
}

export default function DetailCard({ title, children,   accent = 'from-[#da507a] to-[#ce364c]' }: DetailCardProps) {
  return (
    <div className="surface-card rounded-2xl p-5">
      <div className={`mb-4 h-1.5 rounded-full bg-gradient-to-r ${accent}`} />
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="mt-3 space-y-2 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}
