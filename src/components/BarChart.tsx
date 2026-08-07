import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export type BarDatum = {
  label: string
  value: number | [number, number]
  color?: string
}

type LegendItem = {
  label: string
  color: string
}

type BarChartProps = {
  data: BarDatum[]
  title?: string
  legend?: LegendItem[]
  showLegend?: boolean
  horizontal?: boolean
  height?: number
  min?: number
  max?: number
  tickFormatter?: (value: number) => string
  barSize?: number
  radius?: number
  perBarGradient?: boolean
  gradientColorStart?: string
  gradientColorEnd?: string
  gradientName?: string
  titleMarginBottom?: number
}

const TICK = {
  fontSize: 11,
  fill: '#fff',
  fontFamily: "'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'",
}

const TOOLTIP = {
  backgroundColor: '#121416',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  fontSize: 12,
  fontFamily: "'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'",
  color: '#E8EAF3',
  fontDisplay: 'dashed',
}

const DEFAULT_BAR_COLOR = '#e11d48'

function sanitizeId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, '')
}

function mixShade(hex: string, amount: number) {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return hex
  const to = amount > 0 ? 255 : 0
  const p = Math.min(Math.abs(amount), 1)
  const channel = (channelHex: string) => {
    const value = Math.round(
      (to - parseInt(channelHex, 16)) * p + parseInt(channelHex, 16),
    )
    return Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0')
  }
  return `#${channel(clean.slice(0, 2))}${channel(clean.slice(2, 4))}${channel(clean.slice(4, 6))}`
}

export default function BarChart({
  data,
  title,
  legend,
  showLegend = false,
  horizontal = true,
  height = 220,
  min,
  max,
  tickFormatter,
  barSize = 18,
  radius = 8,
  perBarGradient = false,
  gradientColorStart,
  gradientColorEnd,
  gradientName = 'bar-gradient',
  titleMarginBottom,
}: BarChartProps) {
  const useGradient = Boolean(gradientColorStart && gradientColorEnd)
  const gradientId = gradientName
  const perBarGradientId = (index: number, label: string) =>
    `${gradientId}-per-bar-${index}-${sanitizeId(label)}`
  const barFill = (item: BarDatum, index: number) => {
    if (useGradient) return `url(#${gradientId})`
    if (perBarGradient) return `url(#${perBarGradientId(index, item.label)})`
    return item.color ?? DEFAULT_BAR_COLOR
  }
  const legendItems =
    legend ??
    (showLegend
      ? data
          .map((item) => ({
            label: item.label,
            color: item.color ?? DEFAULT_BAR_COLOR,
          }))
          .filter(
            (item, index, arr) =>
              arr.findIndex((other) => other.label === item.label) === index,
          )
      : [])

  return (
    <div className="chart-card" style={{ cursor: 'default' }}>
      {title ? (
        <p
          className="section-label"
          style={
            titleMarginBottom !== undefined
              ? { marginBottom: titleMarginBottom }
              : undefined
          }
        >
          {title}
        </p>
      ) : null}
      {legendItems.length ? (
        <div className="legend-row">
          {legendItems.map((item) => (
            <span key={item.label}>
              <span
                className="legend-swatch"
                style={{ background: item.color }}
              />
              {item.label}
            </span>
          ))}
        </div>
      ) : null}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 4, right: 8, bottom: 4, left: 0 }}
          barCategoryGap="25%"
        >
          <CartesianGrid
            stroke="#262626"
            strokeWidth={1}
            horizontal={horizontal}
            vertical={!horizontal}
          />
          {horizontal ? (
            <>
              <XAxis
                type="number"
                dataKey="value"
                domain={[min ?? 0, max ?? 'auto']}
                tick={TICK}
                tickFormatter={tickFormatter}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="label"
                width={120}
                tick={TICK}
                axisLine={false}
                tickLine={false}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey="label"
                tick={TICK}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="number"
                domain={[min ?? 0, max ?? 'auto']}
                tick={TICK}
                tickFormatter={tickFormatter}
                axisLine={false}
                tickLine={false}
              />
            </>
          )}
          <Tooltip
            cursor={false}
            contentStyle={TOOLTIP}
            labelStyle={{ color: '#8890AC' }}
            itemStyle={{ color: '#E8EAF3' }}
          />
          {useGradient ? (
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={gradientColorStart} />
                <stop offset="100%" stopColor={gradientColorEnd} />
              </linearGradient>
            </defs>
          ) : null}
          {perBarGradient && !useGradient ? (
            <defs>
              {data.map((item, index) => {
                const color = item.color ?? DEFAULT_BAR_COLOR
                return (
                  <linearGradient
                    key={index}
                    id={perBarGradientId(index, item.label)}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor={mixShade(color, 0.3)} />
                    <stop offset="100%" stopColor={mixShade(color, -0.3)} />
                  </linearGradient>
                )
              })}
            </defs>
          ) : null}
          <Bar
            dataKey="value"
            barSize={barSize}
            radius={radius}
            isAnimationActive={true}
            activeBar={false}
          >
            {data.map((item, index) => (
              <Cell key={item.label} fill={barFill(item, index)} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
