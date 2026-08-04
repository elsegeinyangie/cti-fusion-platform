import {
  Legend,
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

type SpiderChartProps = {
  data: Array<Record<string, number | string>>
  series: RadarSeries[]
  angleDataKey: string
  height?: number
  domain?: [number | string, number | string]
  tickFormatter?: (value: number) => string
  showLegend?: boolean
}

const TICK = {
  fontSize: 10,
  fill: '#8890AC',
  fontFamily: "'SF Mono','JetBrains Mono',Consolas,monospace",
  fontWeight: 500,
}

const TOOLTIP = {
  backgroundColor: '#121416',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  fontSize: 12,
  fontFamily: "'SF Mono','JetBrains Mono',Consolas,monospace",
  color: '#E8EAF3',
}

export default function SpiderChart({
  data,
  series,
  angleDataKey,
  height = 260,
  domain,
  tickFormatter,
  showLegend = false,
}: SpiderChartProps) {
  return (
    <div style={{ position: 'relative' }}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart data={data} outerRadius="90%">
          <PolarGrid stroke="rgba(136, 144, 172, 0.18)" gridType="polygon" />
          <PolarAngleAxis
            dataKey={angleDataKey}
            axisLine={false}
            tickLine={false}
            tick={{
              ...TICK,
              fill: '#8890AC',
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
          {showLegend ? (
            <Legend
              wrapperStyle={{ fontSize: 11, fontFamily: "'SF Mono','JetBrains Mono',Consolas,monospace" }}
              iconType="square"
              iconSize={9}
            />
          ) : null}
          {series.map((s) => (
            <Radar
              key={s.dataKey}
              name={s.name}
              dataKey={s.dataKey}
              stroke={s.color}
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
  )
}
