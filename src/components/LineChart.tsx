import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
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

type LineChartProps = {
  data: Array<Record<string, number | string>>
  series: LineSeries[]
  xDataKey: string
  height?: number
  min?: number
  max?: number
  tickFormatter?: (value: number) => string
  showLegend?: boolean
  dot?: boolean
}

const TICK = {
  fontSize: 11,
  fill: '#8890AC',
  fontFamily: "'SF Mono','JetBrains Mono',Consolas,monospace",
}

const TOOLTIP = {
  backgroundColor: '#121416',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  fontSize: 12,
  fontFamily: "'SF Mono','JetBrains Mono',Consolas,monospace",
  color: '#E8EAF3',
}

export default function LineChart({
  data,
  series,
  xDataKey,
  height = 200,
  min,
  max,
  tickFormatter,
  showLegend = false,
  dot = false,
}: LineChartProps) {
  return (
    <div style={{ cursor: 'default' }}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid stroke="#262626" strokeWidth={1} vertical={false} />
          <XAxis
            dataKey={xDataKey}
            tick={TICK}
            axisLine={false}
            tickLine={false}
            minTickGap={24}
          />
          <YAxis
            domain={min !== undefined || max !== undefined ? [min ?? 'auto', max ?? 'auto'] : ['auto', 'auto']}
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
          {showLegend ? (
            <Legend
              wrapperStyle={{ fontSize: 11, fontFamily: "'SF Mono','JetBrains Mono',Consolas,monospace" }}
              iconType="square"
              iconSize={9}
            />
          ) : null}
          {series.map((s) =>
            s.fill ? (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                stroke={s.color}
                strokeWidth={s.strokeWidth ?? 2}
                fill={s.fill}
                dot={dot}
                isAnimationActive={false}
              />
            ) : (
              <Line
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                stroke={s.color}
                strokeWidth={s.strokeWidth ?? 2}
                dot={dot}
                isAnimationActive={true}
              />
            )
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
