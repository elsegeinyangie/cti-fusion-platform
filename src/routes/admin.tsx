import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import StatCard from '../components/StatCard'
import BarChart from '../components/BarChart'
import DonutChart from '../components/DonutChart'
import DetailCard from '../components/DetailCard'
import Footer from '../components/Footer'

export const Route = createFileRoute('/admin')({ component: AdminPage })

const sourceData = [
  { label: 'Fraud signals', value: 300 },
  { label: 'Threat intel', value: 257 },
  { label: 'Customer complaints', value: 214 },
  { label: 'Dark web', value: 214 },
  { label: 'Bank events', value: 171 },
  { label: 'Brand risk', value: 171 },
  { label: 'OSINT', value: 128 },
  { label: 'Crypto intel', value: 128 },
  { label: 'Deception', value: 86 },
]

function AdminPage() {
  return (
    <div className="page-wrap py-8">
      <Header />

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-60">
          <NavBar />
        </aside>

        <main className="min-w-0 flex-1">
          <div className="view-meta">
            <span className="view-title">Correlation engine admin &mdash; throughput, sources &amp; live feed</span>
            <span className="view-note">refresh: continuous</span>
          </div>

          <div className="cards-grid">
            <StatCard variant="grouped" title="EVENTS PROCESSED (24H)" value="1.87M" delta="6% vs yesterday" deltaDirection="up" deltaTone="good" />
            <StatCard variant="grouped" title="SOURCES CORRELATED" value="9/9" delta="all source types active" deltaDirection="flat" deltaTone="flat" />
            <StatCard variant="grouped" title="ACTIVE FUSION CASES" value="18" delta="3 vs yesterday" deltaDirection="up" deltaTone="bad" />
            <StatCard variant="grouped" title="AVG TIME-TO-FUSION" value="6.8m" delta="1.2m vs last wk" deltaDirection="down" deltaTone="good" />
          </div>

          <div className="two-col">
            <div>
              <div className="section-label">Events processed by intelligence source &mdash; last 24h</div>
              <div className="chartbox">
                <BarChart
                  data={sourceData.map((item) => ({ ...item, color: '#4F7CFF' }))}
                  height={260}
                  tickFormatter={(value) => value + 'K'}
                  barSize={14}
                />
              </div>
            </div>
            <div>
              <div className="chart-header-row">
                <div className="section-label">Active cases by severity</div>
                <div className="legend-row chart-legend-row">
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
              </div>
              <div className="chartbox">
                <DonutChart
                  data={[
                    { name: 'Critical', value: 2, color: '#E2483B' },
                    { name: 'High', value: 6, color: '#E8A33D' },
                    { name: 'Medium', value: 7, color: '#8890AC' },
                    { name: 'Low', value: 3, color: '#333C5E' },
                  ]}
                  height={260}
                />
              </div>
            </div>
          </div>

          <div className="section-label">Live correlation feed &mdash; sources correlated per case &middot; click a case to expand</div>

          <DetailCard
            id="FC-2026-0847 · 8 min ago"
            status="ESCALATED TO CERT"
            severity="crit"
            badges={['DARK WEB', 'CRYPTO INTEL', 'DECEPTION']}
            confidence={94}
            severityLabel="CRITICAL"
            extra="AI: graph clustering (crypto) + entity resolution (correlation engine). 3 independent sources agreed → auto-escalated."
          >
            Leaked admin credentials matched a honeypot interaction; the receiving wallet is linked to a known
            ransomware cluster.
          </DetailCard>

          <DetailCard
            id="FC-2026-0848 · 22 min ago"
            status="ACTIVE"
            severity="high"
            badges={['CUSTOMER COMPLAINTS', 'FRAUD SIGNALS']}
            confidence={88}
            severityLabel="HIGH"
            extra="AI: speech-to-text + intent classification (NLP) → matched against behavioral fraud model output."
          >
            A customer voice-call complaint reporting an unrecognised transaction was transcribed and
            intent-classified by NLP within seconds, then matched to a mobile session anomaly flagged the same
            hour.
          </DetailCard>

          <DetailCard
            id="FC-2026-0846 · 45 min ago"
            status="ACTIVE"
            severity="high"
            badges={['BRAND RISK', 'FRAUD SIGNALS']}
            confidence={81}
            severityLabel="HIGH"
            extra="AI: domain-similarity model (brand risk) + behavioral biometrics (fraud signals)."
          >
            A phishing domain was registered six hours before a mobile session-hijack pattern hit the same bank.
          </DetailCard>

          <DetailCard
            id="FC-2026-0845 · 1h 20m ago"
            status="UNDER REVIEW"
            severity="med"
            badges={['OSINT', 'THREAT INTEL']}
            confidence={67}
            severityLabel="MEDIUM"
            extra="Routed to human review queue (Section 6.1, technical blueprint) — below auto-escalation threshold."
          >
            An executive impersonation profile was cross-referenced against a known phishing kit signature —
            plausible, but weak enough to need a human reviewer.
          </DetailCard>

          <DetailCard
            id="FC-2026-0844 · 2h 5m ago"
            status="MONITORING"
            severity="med"
            badges={['THREAT INTEL', 'BANK EVENTS']}
            confidence={58}
            severityLabel="LOW"
            extra="No further action unless a second independent source corroborates within 24h."
          >
            A single indicator match against one SIEM alert, with no repeat occurrence yet.
          </DetailCard>
        </main>
      </div>

      <Footer />
    </div>
  )
}
