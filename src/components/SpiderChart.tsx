import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

export type RadarSeries = {
  name: string
  dataKey: string
  color: string
  fill?: string
  dashed?: boolean
}

type LegendItem = {
  label: string
  color: string
}

type SpiderChartProps = {
  data: Array<Record<string, number | string>>
  series: RadarSeries[]
  angleDataKey: string
  title?: string
  legend?: LegendItem[]
  height?: number
  domain?: [number | string, number | string]
  tickFormatter?: (value: number) => string
  showLegend?: boolean
}

const TICK = {
  fontSize: 10,
  fill: '#fff',
  fontFamily: "'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'",
  fontWeight: 500,
}

const TOOLTIP = {
  backgroundColor: '#121416',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  fontSize: 12,
  fontFamily: "'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'",
  color: '#E8EAF3',
}

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return hex
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function SpiderChart({
  data,
  series,
  angleDataKey,
  title,
  legend,
  height = 260,
  domain,
  tickFormatter,
  showLegend = false,
}: SpiderChartProps) {
  const legendItems =
    legend ??
    (showLegend ? series.map((s) => ({ label: s.name, color: s.color })) : [])

  return (
    <div className="chart-card" style={{ cursor: 'default' }}>
      {title ? <p className="section-label">{title}</p> : null}
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
      <div className="relative">
        <ResponsiveContainer width="100%" height={height}>
          <RechartsRadarChart data={data} outerRadius="90%">
            <PolarGrid stroke="rgba(136, 144, 172, 0.18)" gridType="polygon" />
            <PolarAngleAxis
              dataKey={angleDataKey}
              axisLine={false}
              tickLine={false}
              tick={{
                ...TICK,
                fill: '#fff',
                fontSize: 10,
              }}
            />
            <PolarRadiusAxis
              domain={domain}
              axisLine={false}
              tickLine={false}
              angle={60}
              orientation="middle"
              tick={{
                ...TICK,
                fill: '#8890AC82',
                fontSize: 10,
              }}
              tickFormatter={tickFormatter}
              tickCount={10}
            />
            <Tooltip
              contentStyle={TOOLTIP}
              itemStyle={{ color: '#E8EAF3' }}
              labelStyle={{ color: '#8890AC' }}
            />
            {series.map((s) => (
              <Radar
                key={s.dataKey}
                name={s.name}
                dataKey={s.dataKey}
                stroke={s.dashed ? s.color : hexToRgba(s.color, 0.7)}
                strokeWidth={s.dashed ? 1.5 : 2.5}
                strokeDasharray={s.dashed ? '4 3' : undefined}
                fill={s.fill ?? 'rgba(0,0,0,0)'}
                fillOpacity={s.dashed ? 0 : 0.24}
                dot={{ fill: s.color, strokeWidth: 0, r: 4 }}
                isAnimationActive={true}
              />
            ))}
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
