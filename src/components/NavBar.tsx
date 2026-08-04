import { Link } from '@tanstack/react-router'

type NavItem = {
  to: string
  label: string
}

const navItems: NavItem[] = [
  { to: '/', label: 'Risk Exposure & Score' },
  { to: '/info-spec-posture', label: 'Infosec Posture' },
  { to: '/compliance', label: 'Compliance' },
  { to: '/admin', label: 'Admin' },
]

export default function NavBar() {
  return (
    <nav className="island-shell flex flex-col gap-1 rounded-2xl p-3">
      <p className="px-3 pb-2 pt-1 font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
        VIEWS
      </p>
      {navItems.map((item, index) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-xs tracking-[0.03em] text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          activeProps={{
            className:
              'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
          }}
        >
          <span className="opacity-60">{index + 1}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
