import type { PieSectorShapeProps } from 'recharts'
import {
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from 'recharts'

export type DonutSegment = {
  name: string
  value: number
  color: string
}

type LegendItem = {
  label: string
  color: string
}

type DonutChartProps = {
  data: DonutSegment[]
  title?: string
  legend?: LegendItem[]
  height?: number
  innerRadius?: string | number
  outerRadius?: string | number
  centerValue?: string
  centerLabel?: string
  showLegend?: boolean
}

const TOOLTIP = {
  backgroundColor: '#121416',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  fontSize: 12,
  fontFamily: "'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'",
  color: '#E8EAF3',
}

function GradientSector(props: PieSectorShapeProps<DonutSegment>) {
  const color = props.payload.color
  const fillId = `donut-gradient-${props.index}`
  return (
    <>
      <defs>
        <radialGradient
          id={fillId}
          cx={props.cx}
          cy={props.cy}
          r={props.outerRadius}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={color} stopOpacity={0} />
          <stop offset="100%" stopColor={color} stopOpacity={0.8} />
        </radialGradient>
      </defs>
      <Sector {...props} fill={`url(#${fillId})`} stroke="none" />
    </>
  )
}

export default function DonutChart({
  data,
  title,
  legend,
  height = 260,
  innerRadius = '62%',
  outerRadius = '88%',
  centerValue,
  centerLabel,
  showLegend = false,
}: DonutChartProps) {
  const legendItems =
    legend ??
    (showLegend ? data.map((s) => ({ label: s.name, color: s.color })) : [])

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
      <div className="relative" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={1}
              isAnimationActive={true}
              shape={GradientSector}
            />
            <Tooltip
              contentStyle={TOOLTIP}
              itemStyle={{ color: '#E8EAF3' }}
              labelStyle={{ color: '#8890AC' }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
        {centerValue ? (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold text-foreground">
              {centerValue}
            </p>
            {centerLabel ? (
              <p className="text-xs text-muted-foreground">{centerLabel}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
