import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import StatCard from '../components/StatCard'
import DetailCard from '../components/DetailCard'

export const Route = createFileRoute('/admin')({ component: AdminPage })

function AdminPage() {
  return (
    <div className="page-wrap space-y-6 py-8">
      <Header title="Admin" subtitle="Manage users, workflows, and platform operations." />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Active admins" value="6" />
        <StatCard title="Pending approvals" value="11" change="3 new" />
        <StatCard title="Service health" value="Stable" variant="grouped" />
      </div>

      <DetailCard title="Operational focus">
        <p>• Review high-risk changes</p>
        <p>• Monitor integrations and alerts</p>
        <p>• Approve access requests</p>
      </DetailCard>
    </div>
  )
}
