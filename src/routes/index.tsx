import { createFileRoute } from '@tanstack/react-router'
import PageLayout from '../components/PageLayout'
import StatCard from '../components/StatCard'
import GaugeChart from '../components/GaugeChart'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import SpiderChart from '../components/SpiderChart'
import DonutChart from '../components/DonutChart'

export const Route = createFileRoute('/')({ component: Home })

const MONTHS = [
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
]

function bandColor(value: number) {
  return value >= 70 ? '#E2483B' : value >= 50 ? '#E8A33D' : '#22C55E'
}

const catData = [
  { label: 'Attack surface', value: 80, color: bandColor(80) },
  { label: 'External CTI', value: 72, color: bandColor(72) },
  { label: 'Vulnerabilities', value: 65, color: bandColor(65) },
  { label: 'Dark web', value: 58, color: bandColor(58) },
  { label: 'Internal events', value: 40, color: bandColor(40) },
  { label: 'Crypto intel', value: 30, color: bandColor(30) },
]

const riskScores = [
  52, 53, 54, 53, 55, 56, 55, 57, 58, 57, 59, 60, 59, 61, 62, 61, 63, 64, 63,
  65, 64, 66, 65, 67, 66, 68, 67, 69, 68, 68,
]

const riskTrendData = MONTHS.map((month, index) => ({
  month,
  value: [0.92, 0.88, 0.85, 0.81, 0.78, 0.74, 0.7, 0.65, 0.61, 0.57, 0.53, 0.5][
    index
  ],
}))

const radarData = [
  { category: 'Fraud', exposure: 70, residual: 16 },
  { category: 'Brand risk', exposure: 48, residual: 12 },
  { category: 'Dark web', exposure: 42, residual: 10 },
  { category: 'Crypto/AML', exposure: 34, residual: 6 },
  { category: 'Threat intel', exposure: 26, residual: 4 },
  { category: 'Deception', exposure: 20, residual: 2 },
]

const bankData = [
  { label: 'Bank 1', value: 62 },
  { label: 'Bank 2', value: 54 },
  { label: 'Bank 3', value: 41 },
  { label: 'Bank 4', value: 33 },
  { label: 'Bank 5', value: 28 },
  { label: 'Bank 6', value: 24 },
  { label: 'Bank 7', value: 19 },
  { label: 'Bank 8', value: 15 },
]

const fairData = [
  { label: 'Premium CTI', value: 78, color: '#8B5CF6' },
  { label: 'Dark web intel', value: 70, color: '#8B5CF6' },
  { label: 'OSINT-CTI', value: 55, color: '#8B5CF6' },
  { label: 'Deception events', value: 40, color: '#8B5CF6' },
  { label: 'Attack surface monitoring', value: 82, color: '#4F7CFF' },
  { label: 'Vuln databases', value: 60, color: '#4F7CFF' },
  { label: 'Internal events', value: 35, color: '#4F7CFF' },
]

const ale = [
  3.1, 3.15, 3.2, 3.18, 3.3, 3.35, 3.4, 3.5, 3.55, 3.6, 3.65, 3.7, 3.75, 3.72,
  3.8, 3.85, 3.9, 3.88, 3.95, 4.0, 3.98, 4.05, 4.1, 4.08, 4.15, 4.12, 4.18,
  4.15, 4.2, 4.2,
]

const aleData = ale.map((value, index) => ({ day: index + 1, value }))
const riskTrendSeries = riskScores.map((value, index) => ({
  day: index + 1,
  value,
}))

function Home() {
  return (
    <PageLayout>
      {/* <div className="view-meta">
            <div className="view-title">Cyber risk exposure &amp; score &mdash; quantified likelihood and impact</div>
          </div> */}

      {/* <h2 className="sr-only">
            Cyber risk dashboard: overall risk score 68 of 100, rated high, with breakdown by intelligence
            category and a 30-day trend
          </h2> */}

      <div className="subhead mt-2">
        <span className="subhead-title">Risk Score</span>
      </div>

      <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
        <StatCard
          title="Overall Risk Score"
          value="68"
          suffix="/100"
          valueColor="#e11d48"
        />
        <StatCard title="Critical Findings" value="12" />
        <StatCard title="Active Campaigns" value="5" />
        <StatCard title="Exposed Assets" value="34" />
      </div>

      <div className=" flex flex-wrap gap-6">
        <div className="w-75 shrink-0">
          <div className="flex-1">
            <GaugeChart
              title="Risk Level"
              value={68}
              label="High"
              labelColor="#e11d48"
              gradientColorStart="#22C55E"
              gradientColorMid="#E8A33D"
              gradientColorEnd="#E2483B"
              gradientName="risk-gauge"
            />
          </div>
        </div>
        <div className="min-w-70 flex-1">
          <BarChart
            title="Risk by Category"
            data={catData}
            height={230}
            min={0}
            max={100}
            barSize={12}
            radius={10}
            gradientColorStart="hsl(49, 93%, 64%)"
            gradientColorEnd="hsl(0, 64%, 40%)"
          />
        </div>
      </div>

      <LineChart
        title="30-Day Risk Score Trend"
        data={riskTrendSeries}
        series={[
          {
            name: 'Risk score',
            dataKey: 'value',
            color: '#4F7CFF',
            fill: 'rgba(79,124,255,0.1)',
          },
        ]}
        xDataKey="day"
        height={200}
        min={0}
        max={100}
        titleMarginBottom={26}
      />

      <div className="subhead">
        <span className="subhead-title">Quarterly Risk Exposure</span>
      </div>

      <div className="cards-grid">
        <StatCard
          variant="grouped"
          title="Risk Exposure"
          value="2.4B"
          delta="5% vs last qtr"
          deltaDirection="up"
        />
        <StatCard
          variant="grouped"
          title="Risk Avoided"
          value="1.1B"
          delta="18% vs last qtr"
          deltaDirection="up"
        />
        <StatCard
          variant="grouped"
          title="Risk Mitigated"
          value="0.8B"
          delta="9% vs last qtr"
          deltaDirection="up"
        />
        <StatCard
          variant="grouped"
          title="Residual Risk"
          value="0.5B"
          delta="12% vs last qtr"
          deltaDirection="down"
        />
      </div>

      <BarChart
        legend={[
          { label: 'EXPOSURE', color: '#4A5178' },
          { label: 'AVOIDED', color: '#1E2C55' },
          { label: 'MITIGATED', color: '#4F7CFF' },
          { label: 'RESIDUAL', color: '#E2483B' },
        ]}
        data={[
          { label: 'Exposure', value: [0, 2.4], color: '#4A5178' },
          { label: 'Avoided', value: [1.3, 2.4], color: '#1E2C55' },
          { label: 'Mitigated', value: [0.5, 1.3], color: '#4F7CFF' },
          { label: 'Residual', value: [0, 0.5], color: '#E2483B' },
        ]}
        height={200}
        max={2.6}
        tickFormatter={(value) => value.toFixed(1) + 'B'}
        barSize={12}
        perBarGradient
      />

      <LineChart
        title="Residual Risk &mdash; 12 Months (AED Billions)"
        data={riskTrendData}
        series={[
          {
            name: 'Residual risk',
            dataKey: 'value',
            color: '#E2483B',
            fill: 'rgba(226,72,59,0.08)',
          },
        ]}
        xDataKey="month"
        height={220}
        min={0}
        max={1}
        tickFormatter={(value) => value.toFixed(1) + 'B'}
        titleMarginBottom={26}
      />

      <div className="two-col">
        <div>
          <SpiderChart
            title="Risk Profile by Category"
            legend={[
              { label: 'RISK EXPOSURE', color: '#4A5178' },
              { label: 'RISK RESIDUAL', color: '#E2483B' },
            ]}
            data={radarData}
            series={[
              {
                name: 'Risk Exposure',
                dataKey: 'exposure',
                color: '#4A5178',
                fill: '#4A5178',
              },
              {
                name: 'RISK RESIDUAL',
                dataKey: 'residual',
                color: '#E2483B',
                fill: '#E2483B',
              },
            ]}
            angleDataKey="category"
            height={280}
            domain={[10, 100]}
            tickFormatter={(value) => value + '%'}
          />
        </div>
        <div>
          <DonutChart
            title="Residual Risk by Cost Type"
            legend={[
              { label: 'BUSINESS INTERRUPTION', color: '#4F7CFF' },
              { label: 'REGULATORY PENALTY', color: '#E8A33D' },
              { label: 'RANSOM PAYMENTS', color: '#E2483B' },
            ]}
            data={[
              {
                name: 'Business interruption',
                value: 0.22,
                color: '#4F7CFF',
              },
              { name: 'Regulatory penalty', value: 0.16, color: '#E8A33D' },
              { name: 'Ransom payments', value: 0.12, color: '#E2483B' },
            ]}
            height={280}
          />
        </div>
      </div>

      <BarChart
        title="Bank-Level Concentration &mdash; Top 8 by Residual Risk (AED Millions)"
        data={bankData.map((item) => ({ ...item, color: '#E2483B' }))}
        height={220}
        tickFormatter={(value) => value + 'M'}
        barSize={12}
        radius={10}
        gradientColorStart="hsl(49, 93%, 64%)"
        gradientColorEnd="hsl(0, 64%, 40%)"
        gradientName="bank-concentration"
        titleMarginBottom={26}
      />

      <div className="subhead">
        <span className="subhead-title">FAIR Loss Model</span>
      </div>

      <h2 className="sr-only">
        Cyber risk dashboard using the FAIR model: annualized loss expectancy of
        4.2 million dollars, driven by loss event frequency and loss magnitude
        factors sourced from threat intelligence categories
      </h2>

      <div className="mb-6">
        <p className="mb-1 text-[13px] text-muted-foreground">
          Annualized Loss Expectancy
        </p>
        <p className="m-0 font- text-5xl font-medium tabular-nums text-foreground">
          $4.2M
        </p>
        <div className="mt-2 flex items-center gap-2.5">
          <span className="text-xs text-muted-foreground">$1.8M</span>
          <div className="relative h-1.5 max-w-70 flex-1 rounded-full bg-surface">
            <div className="absolute inset-y-0 left-[8%] right-[35%] rounded-full bg-primary" />
            <div className="absolute left-[calc(8%+84%*0.3)] -top-0.75 h-3 w-0.5 bg-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">$9.8M</span>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          90% confidence range, marker shows most likely estimate
        </p>
      </div>

      <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        <StatCard title="Loss Event Frequency" value="3.2" suffix="/yr" />
        <StatCard title="Threat Event Frequency" value="11.3" suffix="/yr" />
        <StatCard title="Vulnerability" value="28" suffix="%" />
        <StatCard title="Probability of Action" value="45" suffix="%" />
      </div>

      <BarChart
        title="Loss Event Frequency Inputs"
        legend={[
          { label: 'THREAT EVENT FREQUENCY INPUTS', color: '#8B5CF6' },
          { label: 'VULNERABILITY INPUTS', color: '#4F7CFF' },
        ]}
        data={fairData}
        height={260}
        min={0}
        max={100}
        barSize={12}
        radius={10}
        gradientColorStart="hsl(213, 100%, 50%)"
        gradientColorEnd="hsl(305, 100%, 24%)"
        gradientName="fair-loss-event-frequency"
      />

      <BarChart
        title="Loss Magnitude Per Event"
        data={[
          { label: 'Primary loss', value: 850, color: '#4F7CFF' },
          { label: 'Secondary loss', value: 450, color: '#4F7CFF' },
        ]}
        height={110}
        min={0}
        max={1000}
        tickFormatter={(value) => '$' + value + 'K'}
        barSize={12}
        radius={10}
        gradientColorStart="#4F7CFF"
        gradientColorEnd="#E2483B"
        gradientName="loss-magnitude"
        titleMarginBottom={16}
      />

      <LineChart
        title="Annualized Loss Expectancy, 30-Day Estimate Trend"
        data={aleData}
        series={[
          {
            name: 'ALE',
            dataKey: 'value',
            color: '#4F7CFF',
            fill: 'rgba(79,124,255,0.1)',
          },
        ]}
        xDataKey="day"
        height={200}
        min={3}
        max={4.5}
        tickFormatter={(value) => '$' + value + 'M'}
        titleMarginBottom={16}
      />
    </PageLayout>
  )
}
