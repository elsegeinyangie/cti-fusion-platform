import { Cell, Pie, PieChart } from 'recharts'

const WIDTH = 256
const HEIGHT = 220
const CX = 128
const CY = 178
const OUTER_RADIUS = 118
const INNER_RADIUS = 86

type GaugeChartProps = {
  value: number
  max?: number
  suffix?: string
  label?: string
  labelColor?: string
  bands?: string[]
  className?: string
}

export default function GaugeChart({
  value,
  max = 100,
  suffix = '',
  label = 'Score',
  labelColor = 'var(--foreground)',
  bands = ['#22C55E', '#E8A33D', '#E2483B'],
  className,
}: GaugeChartProps) {
  const fraction = Math.min(Math.max(value / max, 0), 1)
  const needleAngle = 180 * (1 - fraction)
  const bandData = bands.map((color) => ({ color, value: 1 }))

  const needleLength = OUTER_RADIUS - 12
  const needleRadians = (Math.PI / 180) * needleAngle
  const needleTipX = CX + needleLength * Math.cos(needleRadians)
  const needleTipY = CY - needleLength * Math.sin(needleRadians)

  return (
    <div
      className={`gauge-card${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={`Gauge showing ${value}${suffix} out of ${max}`}
      style={{
        cursor: 'default',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PieChart width={WIDTH} height={HEIGHT}>
        <Pie
          data={bandData}
          dataKey="value"
          startAngle={180}
          endAngle={0}
          cx={CX}
          cy={CY}
          innerRadius={INNER_RADIUS}
          outerRadius={OUTER_RADIUS}
          stroke="none"
          isAnimationActive={true}
        >
          {bandData.map((band) => (
            <Cell key={band.color} fill={band.color} style={{ pointerEvents: 'none' }} />
          ))}
        </Pie>
        <line
          x1={CX}
          y1={CY}
          x2={needleTipX}
          y2={needleTipY}
          stroke="var(--foreground)"
          strokeWidth={4}
          strokeLinecap="round"
          style={{ pointerEvents: 'none' }}
        />
        <circle cx={CX} cy={CY} r={7} fill="var(--foreground)" style={{ pointerEvents: 'none' }} />
        <text
          x={CX}
          y={40}
          textAnchor="middle"
          fontSize={30}
          fontWeight={600}
          fill="var(--foreground)"
          style={{ pointerEvents: 'none' }}
        >
          {value}
          {suffix}
        </text>
        <text
          x={CX}
          y={212}
          textAnchor="middle"
          fontSize={14}
          fill={labelColor}
          style={{ pointerEvents: 'none' }}
        >
          {label}
        </text>
      </PieChart>
    </div>
  )
}