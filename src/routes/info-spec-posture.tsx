import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import StatCard from '../components/StatCard'
import BarChart from '../components/BarChart'
import SpiderChart from '../components/SpiderChart'
import LineChart from '../components/LineChart'
import Footer from '../components/Footer'

export const Route = createFileRoute('/info-spec-posture')({ component: InfoSpecPosturePage })

const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const mttd = [9.5, 9.1, 8.8, 8.4, 8.0, 7.6, 7.3, 7.0, 6.8, 6.6, 6.4, 6.2]
const mttr = [22, 21, 20, 19, 18, 17, 16.5, 16, 15.5, 15.2, 14.8, 14.5]

const mttdData = MONTHS.map((month, index) => ({ month, mttd: mttd[index], mttr: mttr[index] }))

const postureData = [
  { category: 'Detection speed', current: 82, target: 90 },
  { category: 'Response speed', current: 76, target: 90 },
  { category: 'Patch compliance', current: 92, target: 90 },
  { category: 'Vuln management', current: 71, target: 90 },
  { category: 'Reporting coverage', current: 95, target: 90 },
]

function InfoSpecPosturePage() {
  return (
    <div className="page-wrap py-8">
      <Header />

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-60">
          <NavBar />
        </aside>

        <main className="min-w-0 flex-1">
          <div className="view-meta">
            <span className="view-title">Information security posture &mdash; the mechanics behind the trend</span>
            <span className="view-note">sector-wide aggregate</span>
          </div>

          <div className="cards-grid">
            <StatCard variant="grouped" title="MEAN TIME TO DETECT" value="6.2h" delta="1.8h vs last qtr" deltaDirection="down" deltaTone="good" />
            <StatCard variant="grouped" title="MEAN TIME TO RESPOND" value="14.5h" delta="3.1h vs last qtr" deltaDirection="down" deltaTone="good" />
            <StatCard variant="grouped" title="CRITICAL VULNS OPEN" value="12" delta="4 vs last qtr" deltaDirection="down" deltaTone="good" />
            <StatCard variant="grouped" title="PATCH SLA COMPLIANCE" value="92%" delta="5 pts vs last qtr" deltaDirection="up" deltaTone="good" />
          </div>

          <div className="two-col">
            <div>
              <div className="section-label">Open vulnerabilities by severity</div>
              <div className="chartbox">
                <BarChart
                  data={[
                    { label: 'Critical', value: 12, color: '#E2483B' },
                    { label: 'High', value: 47, color: '#E8A33D' },
                    { label: 'Medium', value: 130, color: '#8890AC' },
                    { label: 'Low', value: 310, color: '#333C5E' },
                  ]}
                  height={260}
                  barSize={20}
                />
              </div>
            </div>
            <div>
              <div className="chart-header-row">
                <div className="section-label">Security posture maturity</div>
                <div className="legend-row chart-legend-row">
                  <span>
                    <span className="legend-swatch" style={{ background: '#4F7CFF' }} />
                    CURRENT
                  </span>
                  <span>
                    <span className="legend-swatch" style={{ background: '#5B6284' }} />
                    TARGET
                  </span>
                </div>
              </div>
              <div className="chartbox">
                <SpiderChart
                  data={postureData}
                  series={[
                    { name: 'Current', dataKey: 'current', color: '#4F7CFF', fill: 'rgba(79,124,255,0.18)' },
                    { name: 'Target', dataKey: 'target', color: '#5B6284', dashed: true },
                  ]}
                  angleDataKey="category"
                  height={260}
                  domain={[10, 100]}
                  tickFormatter={(value) => value + '%'}
                />
              </div>
            </div>
          </div>

          <div className="legend-row">
            <span>
              <span className="legend-swatch" style={{ background: '#4F7CFF' }} />
              MTTD
            </span>
            <span>
              <span className="legend-swatch" style={{ background: '#E2483B' }} />
              MTTR
            </span>
          </div>
          <div className="section-label">MTTD &amp; MTTR &mdash; trailing 12 months</div>
          <div className="chartbox">
            <LineChart
              data={mttdData}
              series={[
                { name: 'MTTD', dataKey: 'mttd', color: '#4F7CFF' },
                { name: 'MTTR', dataKey: 'mttr', color: '#E2483B' },
              ]}
              xDataKey="month"
              height={220}
              min={0}
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
