type BarChartProps = {
  data: Array<{ label: string; value: number }>
}

export default function BarChart({ data }: BarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1)

  return (
    <div className="surface-card rounded-2xl p-5">
      <div className="flex h-48 items-end gap-3">
        {data.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-36 w-full items-end rounded-xl bg-muted p-1">
              <div
                className="w-full rounded-lg bg-gradient-to-t from-[#da507a] to-[#ce364c]"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
