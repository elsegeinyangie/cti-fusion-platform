import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import StatCard from '../components/StatCard'
import DetailCard from '../components/DetailCard'
import BarChart from '../components/BarChart'

export const Route = createFileRoute('/info-spec-posture')({ component: InfoSpecPosturePage })

function InfoSpecPosturePage() {
  return (
    <div className="page-wrap space-y-6 py-8">
      <Header title="Info Spec Posture" subtitle="A concise view of critical controls and maturity areas." />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Control coverage" value="84%" change="+6%" />
        <StatCard title="Critical gaps" value="9" change="-2" />
        <StatCard title="Maturity" value="Level 3" variant="grouped" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <DetailCard title="Priority areas">
          <p>• Identity and access governance</p>
          <p>• Endpoint hardening</p>
          <p>• Cloud configuration drift</p>
        </DetailCard>
        <BarChart data={[{ label: 'Q1', value: 62 }, { label: 'Q2', value: 74 }, { label: 'Q3', value: 81 }, { label: 'Q4', value: 84 }]} />
      </div>
    </div>
  )
}
