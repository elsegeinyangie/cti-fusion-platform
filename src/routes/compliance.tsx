import { createFileRoute } from '@tanstack/react-router'
import PageLayout from '../components/PageLayout'
import StatCard from '../components/StatCard'
import GaugeChart from '../components/GaugeChart'
import SpiderChart from '../components/SpiderChart'
import DonutChart from '../components/DonutChart'
import LineChart from '../components/LineChart'

export const Route = createFileRoute('/compliance')({
  component: CompliancePage,
})

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

const complianceScores = [78, 79, 80, 81, 82, 83, 84, 85, 85, 86, 86, 87]

const complianceData = MONTHS.map((month, index) => ({
  month,
  value: complianceScores[index],
}))

const frameworkData = [
  { framework: 'CBUAE Cyber Risk Reg.', thisQuarter: 91, lastQuarter: 88 },
  { framework: 'PCI DSS', thisQuarter: 90, lastQuarter: 87 },
  { framework: 'UAE IA Standard', thisQuarter: 88, lastQuarter: 85 },
  { framework: 'ISO/IEC 27001', thisQuarter: 85, lastQuarter: 82 },
  { framework: 'NIST CSF', thisQuarter: 83, lastQuarter: 80 },
]

function CompliancePage() {
  return (
    <PageLayout>
      <div className="view-meta">
        <span className="view-title">Framework remediation tracking</span>
      </div>

      <div className="cards-grid">
        <StatCard
          variant="grouped"
          title="Compliance Score"
          value="87%"
          delta="3 pts vs last qtr"
          deltaDirection="up"
        />
        <StatCard
          variant="grouped"
          title="Open Findings"
          value="23"
          delta="5 vs last qtr"
          deltaDirection="down"
        />
        <StatCard
          variant="grouped"
          title="Critical Findings"
          value="4"
          delta="1 vs last qtr"
          deltaDirection="up"
        />
        <StatCard
          variant="grouped"
          title="Avg Remediation Time"
          value="18d"
          delta="4d vs last qtr"
          deltaDirection="down"
        />
      </div>

      <div className=" flex flex-wrap gap-6">
        <div className="flex w-75 shrink-0 flex-col">
          <div style={{ height: 345 }}>
            <GaugeChart
              title="Overall Compliance Level"
              value={87}
              suffix="%"
              label="On track"
              labelColor="#22C55E"
              bands={['#E2483B', '#E8A33D', '#22C55E']}
              gradientColorStart="#E2483B"
              gradientColorMid="#E8A33D"
              gradientColorEnd="#22C55E"
              gradientName="compliance-gauge"
            />
          </div>
        </div>

        <div className="min-w-70 flex-1">
          <LineChart
            title="Overall Compliance Score — 12 Months"
            data={complianceData}
            series={[
              {
                name: 'Compliance score',
                dataKey: 'value',
                color: '#4F7CFF',
                fill: 'rgba(79,124,255,0.1)',
              },
            ]}
            xDataKey="month"
            height={280}
            min={70}
            max={92}
            tickFormatter={(value) => value + '%'}
          />
        </div>
      </div>

      <div className="two-col">
        <div>
          <SpiderChart
            title="Compliance Score by Framework"
            legend={[
              { label: 'THIS QUARTER', color: '#E2483B' },
              { label: 'LAST QUARTER', color: '#5B6284' },
            ]}
            data={frameworkData}
            series={[
              {
                name: 'This quarter',
                dataKey: 'thisQuarter',
                color: '#E2483B',
                fill: '#E2483B',
              },
              {
                name: 'Last quarter',
                dataKey: 'lastQuarter',
                color: '#5B6284',
                fill: '#5B6284',
                // dashed: true,
              },
            ]}
            angleDataKey="framework"
            height={280}
            domain={[60, 100]}
            tickFormatter={(value) => value + '%'}
          />
        </div>
        <div>
          <DonutChart
            title="Open Findings by Severity"
            legend={[
              { label: 'CRITICAL', color: '#E2483B' },
              { label: 'HIGH', color: '#E8A33D' },
              { label: 'MEDIUM', color: '#8890AC' },
              { label: 'LOW', color: '#333C5E' },
            ]}
            data={[
              { name: 'Critical', value: 4, color: '#E2483B' },
              { name: 'High', value: 8, color: '#E8A33D' },
              { name: 'Medium', value: 7, color: '#8890AC' },
              { name: 'Low', value: 4, color: '#333C5E' },
            ]}
            height={280}
          />
        </div>
      </div>
    </PageLayout>
  )
}
