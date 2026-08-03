import { Link } from '@tanstack/react-router'

type NavItem = {
  to: string
  label: string
}

const navItems: NavItem[] = [
  { to: '/', label: 'Risk Exposure & Score' },
  { to: '/info-spec-posture', label: 'Info Spec Posture' },
  { to: '/compliance', label: 'Compliance' },
  { to: '/admin', label: 'Admin' },
]

export default function NavBar() {
  return (
    <nav className="island-shell rounded-3xl p-4">
      <div className="flex flex-wrap items-center gap-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            activeProps={{ className: 'bg-primary text-primary-foreground hover:bg-primary' }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
