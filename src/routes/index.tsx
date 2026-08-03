import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import StatCard from '../components/StatCard'
import GaugeChart from '../components/GaugeChart'
import LineChart from '../components/LineChart'
import SpiderChart from '../components/SpiderChart'
import DetailCard from '../components/DetailCard'
import Footer from '../components/Footer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="page-wrap space-y-6 py-8">
      <Header title="Risk Exposure & Score" subtitle="Executive view of current cyber risk posture and trend direction." />
      <NavBar />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Overall score" value="74/100" change="+4" />
        <StatCard title="Critical assets" value="18" change="2 at risk" />
        <StatCard title="Open incidents" value="7" change="1 new" />
        <StatCard title="Residual risk" value="Medium" variant="grouped" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <GaugeChart value={74} label="Risk score" />
        <DetailCard title="Current focus">
          <p>• Review phishing resistance controls</p>
          <p>• Prioritize high-value asset protection</p>
          <p>• Validate backup and recovery plans</p>
        </DetailCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <LineChart data={[{ label: 'Jan', value: 64 }, { label: 'Feb', value: 68 }, { label: 'Mar', value: 71 }, { label: 'Apr', value: 74 }]} />
        <SpiderChart data={[{ label: 'Cloud', value: 82 }, { label: 'Identity', value: 70 }, { label: 'Apps', value: 76 }, { label: 'Endpoint', value: 68 }, { label: 'Data', value: 74 }]} />
      </div>

      <Footer />
    </div>
  )
}
