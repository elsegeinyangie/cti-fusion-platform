import { Link, useLocation } from '@tanstack/react-router'
import { ClipboardList, Gauge, Shield, UserCog } from 'lucide-react'

import { cn } from '#/lib/utils'

type NavItem = {
  to: string
  label: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { to: '/', label: 'Risk Exposure & Score', icon: Gauge },
  { to: '/info-spec-posture', label: 'Infosec Posture', icon: Shield },
  { to: '/compliance', label: 'Compliance', icon: ClipboardList },
  { to: '/admin', label: 'Admin', icon: UserCog },
]

const navBarClassName =
  'flex flex-col gap-1 rounded-[28px] border border-border/60 bg-muted/20 p-2 shadow-sm backdrop-blur'

const navItemClassName =
  'group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-200'

const navItemActiveClassName = 'bg-primary text-primary-foreground shadow-sm'

const navItemIconClassName =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors'

export default function NavBar() {
  const location = useLocation()

  return (
    <nav className={navBarClassName}>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.to

        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              navItemClassName,
              isActive
                ? navItemActiveClassName
                : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground',
            )}
          >
            <span
              className={cn(
                navItemIconClassName,
                isActive
                  ? 'border-white/10 bg-white/10'
                  : 'border-border/60 bg-background/80 text-foreground group-hover:border-border group-hover:bg-background',
              )}
            >
              <Icon className="h-4 w-4" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">
                {item.label}
              </span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
