import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

export type DonutSegment = {
  name: string
  value: number
  color: string
}

type DonutChartProps = {
  data: DonutSegment[]
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
  fontFamily: "'SF Mono','JetBrains Mono',Consolas,monospace",
  color: '#E8EAF3',
}

export default function DonutChart({
  data,
  height = 260,
  innerRadius = '62%',
  outerRadius = '88%',
  centerValue,
  centerLabel,
  showLegend = false,
}: DonutChartProps) {
  return (
    <div className="relative" style={{ height, cursor: 'default' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={1}
            stroke="#121416"
            strokeWidth={2}
            isAnimationActive={true}
          >
            {data.map((segment) => (
              <Cell key={segment.name} fill={segment.color} />
            ))}
          </Pie>
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
        </RechartsPieChart>
      </ResponsiveContainer>
      {centerValue ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold text-foreground">{centerValue}</p>
          {centerLabel ? (
            <p className="text-xs text-muted-foreground">{centerLabel}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
