import { createFileRoute } from '@tanstack/react-router'
import PageLayout from '../components/PageLayout'
import StatCard from '../components/StatCard'
import BarChart from '../components/BarChart'
import SpiderChart from '../components/SpiderChart'
import LineChart from '../components/LineChart'

export const Route = createFileRoute('/info-spec-posture')({
  component: InfoSpecPosturePage,
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

const mttd = [9.5, 9.1, 8.8, 8.4, 8.0, 7.6, 7.3, 7.0, 6.8, 6.6, 6.4, 6.2]
const mttr = [22, 21, 20, 19, 18, 17, 16.5, 16, 15.5, 15.2, 14.8, 14.5]

const mttdData = MONTHS.map((month, index) => ({
  month,
  mttd: mttd[index],
  mttr: mttr[index],
}))

const postureData = [
  { category: 'Detection speed', current: 82, target: 90 },
  { category: 'Response speed', current: 76, target: 90 },
  { category: 'Patch compliance', current: 92, target: 90 },
  { category: 'Vuln management', current: 71, target: 90 },
  { category: 'Reporting coverage', current: 95, target: 90 },
]

function InfoSpecPosturePage() {
  return (
    <PageLayout>
      <div className="view-meta">
        <span className="view-title">
          Information security posture &mdash; the mechanics behind the trend
        </span>
      </div>

      <div className="cards-grid">
        <StatCard
          variant="grouped"
          title="Mean Time to Detect"
          value="6.2h"
          delta="1.8h vs last qtr"
          deltaDirection="down"
        />
        <StatCard
          variant="grouped"
          title="Mean Time to Respond"
          value="14.5h"
          delta="3.1h vs last qtr"
          deltaDirection="down"
        />
        <StatCard
          variant="grouped"
          title="Critical Vulns Open"
          value="12"
          delta="4 vs last qtr"
          deltaDirection="down"
        />
        <StatCard
          variant="grouped"
          title="Patch SLA Compliance"
          value="92%"
          delta="5 pts vs last qtr"
          deltaDirection="up"
        />
      </div>

      <div className="two-col">
        <div>
          <BarChart
            title="Open Vulnerabilities by Severity"
            data={[
              { label: 'Critical', value: 12, color: '#E2483B' },
              { label: 'High', value: 47, color: '#E8A33D' },
              { label: 'Medium', value: 130, color: '#4F7CFF' },
              { label: 'Low', value: 310, color: '#333C5E' },
            ]}
            height={275}
            barSize={12}
            perBarGradient
            titleMarginBottom={26}
          />
        </div>
        <div>
          <SpiderChart
            title="Security Posture Maturity"
            legend={[
              { label: 'CURRENT', color: '#e11d48' },
              { label: 'TARGET', color: '#5B6284' },
            ]}
            data={postureData}
            series={[
              {
                name: 'Current',
                dataKey: 'current',
                color: '#e11d48',
                fill: '#e11d48',
              },
              {
                name: 'Target',
                dataKey: 'target',
                color: '#5B6284',
                fill: '#5B6284',
                // dashed: true,
              },
            ]}
            angleDataKey="category"
            height={260}
            domain={[10, 100]}
            tickFormatter={(value) => value + '%'}
          />
        </div>
      </div>

      <LineChart
        title="MTTD &amp; MTTR &mdash; 12 months"
        legend={[
          { label: 'MTTD', color: '#4F7CFF' },
          { label: 'MTTR', color: '#E2483B' },
        ]}
        data={mttdData}
        series={[
          { name: 'MTTD', dataKey: 'mttd', color: '#4F7CFF' },
          { name: 'MTTR', dataKey: 'mttr', color: '#E2483B' },
        ]}
        xDataKey="month"
        height={220}
        min={0}
      />
    </PageLayout>
  )
}
