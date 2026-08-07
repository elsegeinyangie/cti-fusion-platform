import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export type LineSeries = {
  name: string
  dataKey: string
  color: string
  fill?: string
  strokeWidth?: number
}

type LegendItem = {
  label: string
  color: string
}

type LineChartProps = {
  data: Array<Record<string, number | string>>
  series: LineSeries[]
  xDataKey: string
  title?: string
  legend?: LegendItem[]
  height?: number
  min?: number
  max?: number
  tickFormatter?: (value: number) => string
  showLegend?: boolean
  dot?: boolean
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
  borderRadius: 8,
  fontSize: 12,
  fontFamily: "'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'",
  color: '#E8EAF3',
}

export default function LineChart({
  data,
  series,
  xDataKey,
  title,
  legend,
  height = 200,
  min,
  max,
  tickFormatter,
  showLegend = false,
  dot = true,
  titleMarginBottom,
}: LineChartProps) {
  const legendItems =
    legend ??
    (showLegend ? series.map((s) => ({ label: s.name, color: s.color })) : [])

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
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, bottom: 4, left: 0 }}
        >
          <CartesianGrid stroke="#262626" strokeWidth={1} vertical={false} />
          <XAxis
            dataKey={xDataKey}
            tick={TICK}
            axisLine={false}
            tickLine={false}
            minTickGap={24}
          />
          <YAxis
            domain={
              min !== undefined || max !== undefined
                ? [min ?? 'auto', max ?? 'auto']
                : ['auto', 'auto']
            }
            tick={TICK}
            tickFormatter={tickFormatter}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <Tooltip
            contentStyle={TOOLTIP}
            labelStyle={{ color: '#8890AC' }}
            itemStyle={{ color: '#E8EAF3' }}
          />
          {series.map((s) => {
            const seriesDot =
              dot === false
                ? false
                : { r: 3, strokeWidth: 2, fill: '#121416', stroke: s.color }
            return s.fill ? (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                stroke={s.color}
                strokeWidth={s.strokeWidth ?? 2}
                fill={s.fill}
                dot={seriesDot}
                isAnimationActive={false}
              />
            ) : (
              <Line
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                stroke={s.color}
                strokeWidth={s.strokeWidth ?? 2}
                dot={seriesDot}
                isAnimationActive={true}
              />
            )
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
