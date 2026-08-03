import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import StatCard from '../components/StatCard'
import DetailCard from '../components/DetailCard'
import DonutChart from '../components/DonutChart'

export const Route = createFileRoute('/compliance')({ component: CompliancePage })

function CompliancePage() {
  return (
    <div className="page-wrap space-y-6 py-8">
      <Header title="Compliance" subtitle="Track policy adherence and audit readiness." />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Audits passed" value="12/14" change="86%" />
        <StatCard title="Open findings" value="18" change="-4" />
        <StatCard title="Evidence coverage" value="91%" variant="grouped" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <DonutChart value={91} label="Evidence coverage" />
        <DetailCard title="Upcoming requirements">
          <p>• Quarterly control attestation</p>
          <p>• Vendor risk review</p>
          <p>• Incident response drill</p>
        </DetailCard>
      </div>
    </div>
  )
}
