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

type BarChartProps = {
  data: BarDatum[]
  horizontal?: boolean
  height?: number
  min?: number
  max?: number
  tickFormatter?: (value: number) => string
  barSize?: number
  radius?: number
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

export default function BarChart({
  data,
  horizontal = true,
  height = 220,
  min,
  max,
  tickFormatter,
  barSize = 18,
  radius = 0,
}: BarChartProps) {
  return (
    <div style={{ cursor: 'default' }}>
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
              <XAxis dataKey="label" tick={TICK} axisLine={false} tickLine={false} />
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
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            contentStyle={TOOLTIP}
            labelStyle={{ color: '#8890AC' }}
            itemStyle={{ color: '#E8EAF3' }}
          />
          <Bar dataKey="value" barSize={barSize} radius={radius} isAnimationActive={true}>
            {data.map((item) => (
              <Cell key={item.label} fill={item.color ?? '#e11d48'} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
