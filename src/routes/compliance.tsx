import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import StatCard from '../components/StatCard'
import GaugeChart from '../components/GaugeChart'
import SpiderChart from '../components/SpiderChart'
import DonutChart from '../components/DonutChart'
import LineChart from '../components/LineChart'
import Footer from '../components/Footer'

export const Route = createFileRoute('/compliance')({ component: CompliancePage })

const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const complianceScores = [78, 79, 80, 81, 82, 83, 84, 85, 85, 86, 86, 87]

const complianceData = MONTHS.map((month, index) => ({ month, value: complianceScores[index] }))

const frameworkData = [
  { framework: 'CBUAE Cyber Risk Reg.', thisQuarter: 91, lastQuarter: 88 },
  { framework: 'PCI DSS', thisQuarter: 90, lastQuarter: 87 },
  { framework: 'UAE IA Standard', thisQuarter: 88, lastQuarter: 85 },
  { framework: 'ISO/IEC 27001', thisQuarter: 85, lastQuarter: 82 },
  { framework: 'NIST CSF', thisQuarter: 83, lastQuarter: 80 },
]

function CompliancePage() {
  return (
    <div className="page-wrap py-8">
      <Header />

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-60">
          <NavBar />
        </aside>

        <main className="min-w-0 flex-1">
          <div className="view-meta">
            <span className="view-title">Framework remediation tracking</span>
            <span className="view-note">scored continuously, not point-in-time</span>
          </div>

          <div className="cards-grid">
            <StatCard variant="grouped" title="COMPLIANCE SCORE" value="87%" delta="3 pts vs last qtr" deltaDirection="up" deltaTone="good" />
            <StatCard variant="grouped" title="OPEN FINDINGS" value="23" delta="5 vs last qtr" deltaDirection="down" deltaTone="good" />
            <StatCard variant="grouped" title="CRITICAL FINDINGS" value="4" delta="1 vs last qtr" deltaDirection="up" deltaTone="bad" />
            <StatCard variant="grouped" title="AVG REMEDIATION TIME" value="18d" delta="4d vs last qtr" deltaDirection="down" deltaTone="good" />
          </div>

          <div className="mb-6 flex flex-wrap gap-6">
            <div className="flex w-75 shrink-0 flex-col">
              <p className="mb-2 text-[13px] text-muted-foreground uppercase font-mono">Overall compliance level</p>
              <div style={{ height: 322 }}>
                <GaugeChart
                  value={87}
                  suffix="%"
                  label="On track"
                  labelColor="#22C55E"
                  bands={['#E2483B', '#E8A33D', '#22C55E']}
                />
              </div>
            </div>

            <div className="min-w-70 flex-1">
              <p className="mb-2 text-[13px] text-muted-foreground font-mono">OVERALL COMPLIANCE SCORE &mdash; Trailing 12 Months</p>
              <div className="chartbox">
                <LineChart
                  data={complianceData}
                  series={[{ name: 'Compliance score', dataKey: 'value', color: '#4F7CFF', fill: 'rgba(79,124,255,0.1)' }]}
                  xDataKey="month"
                  height={280}
                  min={70}
                  max={92}
                  tickFormatter={(value) => value + '%'}
                />
              </div>
            </div>
          </div>

          <div className="two-col">
            <div>
              <div className="section-label">Compliance score by framework</div>
              <div className="legend-row">
                <span>
                  <span className="legend-swatch" style={{ background: '#4F7CFF' }} />
                  THIS QUARTER
                </span>
                <span>
                  <span className="legend-swatch" style={{ background: '#5B6284' }} />
                  LAST QUARTER
                </span>
              </div>
              <div className="chartbox">
                <SpiderChart
                  data={frameworkData}
                  series={[
                    { name: 'This quarter', dataKey: 'thisQuarter', color: '#4F7CFF', fill: 'rgba(79,124,255,0.18)' },
                    { name: 'Last quarter', dataKey: 'lastQuarter', color: '#5B6284', dashed: true },
                  ]}
                  angleDataKey="framework"
                  height={280}
                  domain={[60, 100]}
                  tickFormatter={(value) => value + '%'}
                />
              </div>
            </div>
            <div>
              <div className="section-label">Open findings by severity</div>
              <div className="legend-row">
                <span>
                  <span className="legend-swatch" style={{ background: '#E2483B' }} />
                  CRITICAL
                </span>
                <span>
                  <span className="legend-swatch" style={{ background: '#E8A33D' }} />
                  HIGH
                </span>
                <span>
                  <span className="legend-swatch" style={{ background: '#8890AC' }} />
                  MEDIUM
                </span>
                <span>
                  <span className="legend-swatch" style={{ background: '#333C5E' }} />
                  LOW
                </span>
              </div>
              <div className="chartbox">
                <DonutChart
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
          </div>

        </main>
      </div>

      <Footer />
    </div>
  )
}
