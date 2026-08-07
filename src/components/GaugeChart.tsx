import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart } from 'recharts'

const WIDTH = 256
const HEIGHT = 230
const CX = 128
const CY = 178
const OUTER_RADIUS = 118
const INNER_RADIUS = 86
const CORNER_RADIUS = 14
const TRACK_COLOR = 'rgba(136, 144, 172, 0.18)'

type GaugeChartProps = {
  value: number
  max?: number
  suffix?: string
  label?: string
  labelColor?: string
  bands?: string[]
  bandLabels?: string[]
  title?: string
  showLegend?: boolean
  className?: string
  gradientColorStart?: string
  gradientColorMid?: string
  gradientColorEnd?: string
  gradientName?: string
}

export default function GaugeChart({
  value,
  max = 100,
  suffix = '',
  label = 'Score',
  labelColor = 'var(--foreground)',
  bands = ['#22C55E', '#E8A33D', '#E2483B'],
  bandLabels = ['Low', 'Medium', 'High'],
  title,
  showLegend = false,
  className,
  gradientColorStart,
  gradientColorMid,
  gradientColorEnd,
  gradientName = 'gauge-gradient',
}: GaugeChartProps) {
  const useGradient = Boolean(gradientColorStart && gradientColorEnd)
  const gradientId = gradientName
  const fraction = Math.min(Math.max(value / max, 0), 1)
  const bandIndex = Math.min(
    Math.floor(fraction * bands.length),
    bands.length - 1,
  )
  const barColor = bands[bandIndex]
  const endAngle = 180 - 180 * fraction
  const needleLength = OUTER_RADIUS - 16

  const [displayAngle, setDisplayAngle] = useState(180)
  useEffect(() => {
    let raf2: number
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setDisplayAngle(endAngle))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [endAngle])

  return (
    <div
      className={`gauge-card flex-col${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={`Gauge showing ${value}${suffix} out of ${max}`}
      style={{
        cursor: 'default',
        height: '100%',
      }}
    >
      {title ? <p className="section-label ">{title}</p> : null}
      <div className="flex flex-1 items-center justify-center">
        <PieChart width={WIDTH} height={HEIGHT}>
          {useGradient ? (
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={gradientColorStart} />
                {gradientColorMid ? (
                  <stop offset="50%" stopColor={gradientColorMid} />
                ) : null}
                <stop offset="100%" stopColor={gradientColorEnd} />
              </linearGradient>
            </defs>
          ) : null}
          <Pie
            data={[{ value: 1 }]}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            cx={CX}
            cy={CY}
            innerRadius={INNER_RADIUS}
            outerRadius={OUTER_RADIUS}
            cornerRadius={CORNER_RADIUS}
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill={TRACK_COLOR} style={{ pointerEvents: 'none' }} />
          </Pie>
          {fraction > 0 ? (
            <Pie
              data={[{ value: 1 }]}
              dataKey="value"
              startAngle={180}
              endAngle={endAngle}
              cx={CX}
              cy={CY}
              innerRadius={INNER_RADIUS}
              outerRadius={OUTER_RADIUS}
              cornerRadius={CORNER_RADIUS}
              stroke="none"
              isAnimationActive={true}
            >
              <Cell
                fill={useGradient ? `url(#${gradientId})` : barColor}
                style={{ pointerEvents: 'none' }}
              />
            </Pie>
          ) : null}
          <g
            style={{
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none',
            }}
            transform={`rotate(${90 - displayAngle} ${CX} ${CY})`}
          >
            <line
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY - needleLength}
              stroke="var(--foreground)"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </g>
          <circle
            cx={CX}
            cy={CY}
            r={5}
            fill="var(--foreground)"
            style={{ pointerEvents: 'none' }}
          />
          <text
            x={CX}
            y={135}
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
            y={204}
            textAnchor="middle"
            fontSize={14}
            fill={labelColor}
            style={{ pointerEvents: 'none' }}
          >
            {label}
          </text>
          {bands.length > 0 ? (
            <g style={{ pointerEvents: 'none' }}>
              {bands.map((_, index) => {
                const centerFraction = (index + 0.5) / bands.length
                const angle = 180 - 180 * centerFraction
                const angleRad = (-angle * Math.PI) / 180
                const labelRadius = OUTER_RADIUS + 18
                const x = CX + Math.cos(angleRad) * labelRadius
                const y = CY + Math.sin(angleRad) * labelRadius
                return (
                  <text
                    key={index}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={500}
                    fill="#8890AC"
                  >
                    {bandLabels[index] ?? `Band ${index + 1}`}
                  </text>
                )
              })}
            </g>
          ) : null}
        </PieChart>
      </div>
      {showLegend ? (
        <div className="mb-1 flex flex-wrap items-center justify-center gap-4">
          {bands.map((color, index) => (
            <span
              key={color}
              className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
            >
              <span
                className="inline-block h-2 w-2 rounded-sm"
                style={{ background: color }}
              />
              {bandLabels[index] ?? `Band ${index + 1}`}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
