import { createFileRoute } from '@tanstack/react-router'
import PageLayout from '../components/PageLayout'
import StatCard from '../components/StatCard'
import BarChart from '../components/BarChart'
import DonutChart from '../components/DonutChart'
import DetailCard from '../components/DetailCard'

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
    <PageLayout>
      <div className="view-meta">
        <span className="view-title">
          Correlation engine admin &mdash; throughput, sources &amp; live feed
        </span>
      </div>

      <div className="cards-grid">
        <StatCard
          variant="grouped"
          title="Events Processed (24H)"
          value="1.87M"
          delta="6% vs Yesterday"
          deltaDirection="up"
        />
        <StatCard
          variant="grouped"
          title="Sources Coorrelated"
          value="9/9"
          delta="All Source Types Active"
          deltaDirection="flat"
        />
        <StatCard
          variant="grouped"
          title="Active Fusion Cases"
          value="18"
          delta="3 vs Yesterday"
          deltaDirection="up"
        />
        <StatCard
          variant="grouped"
          title="Avg Time-To-Fusion"
          value="6.8m"
          delta="1.2m vs Last Week"
          deltaDirection="down"
        />
      </div>

      <div className="two-col">
        <div>
          <BarChart
            title="Events Processed by Intelligence Source &mdash; 24h"
            data={sourceData.map((item) => ({ ...item, color: '#4F7CFF' }))}
            height={295}
            tickFormatter={(value) => value + 'K'}
            barSize={12}
            radius={10}
            gradientColorStart="#22C55E"
            gradientColorEnd="#E2483B"
            gradientName="source-events"
          />
        </div>
        <div>
          <DonutChart
            title="Active Cases by Severity"
            legend={[
              { label: 'CRITICAL', color: '#E2483B' },
              { label: 'HIGH', color: '#E8A33D' },
              { label: 'MEDIUM', color: '#8890AC' },
              { label: 'LOW', color: '#333C5E' },
            ]}
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

      <div className="section-label">
        Live Correlation Feed
        <div className="subhead-note">
          sources correlated per case &middot; click a case to expand
        </div>
      </div>

      <DetailCard
        id="FC-2026-0847 · 8 min ago"
        status="ESCALATED TO CERT"
        severity="crit"
        badges={['DARK WEB', 'CRYPTO INTEL', 'DECEPTION']}
        confidence={94}
        severityLabel="CRITICAL"
        extra="AI: graph clustering (crypto) + entity resolution (correlation engine). 3 independent sources agreed → auto-escalated."
      >
        Leaked admin credentials matched a honeypot interaction; the receiving
        wallet is linked to a known ransomware cluster.
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
        A customer voice-call complaint reporting an unrecognised transaction
        was transcribed and intent-classified by NLP within seconds, then
        matched to a mobile session anomaly flagged the same hour.
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
        A phishing domain was registered six hours before a mobile
        session-hijack pattern hit the same bank.
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
        An executive impersonation profile was cross-referenced against a known
        phishing kit signature — plausible, but weak enough to need a human
        reviewer.
      </DetailCard>

      <DetailCard
        id="FC-2026-0844 · 2h 5m ago"
        status="MONITORING"
        severity="low"
        badges={['THREAT INTEL', 'BANK EVENTS']}
        confidence={58}
        severityLabel="LOW"
        extra="No further action unless a second independent source corroborates within 24h."
      >
        A single indicator match against one SIEM alert, with no repeat
        occurrence yet.
      </DetailCard>
    </PageLayout>
  )
}
