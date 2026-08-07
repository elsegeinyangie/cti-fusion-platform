import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

export function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <img src="/images/logo.png" alt="ThreatVerse" className="h-8 w-auto" />
    </div>
  )
}

// export function LiveIndicator() {
//   return (
//     <div className="flex items-center gap-2 font- text-xs tracking-[0.08em] text-primary">
//       <span className="live-pulse">
//         <span className="live-ring" />
//         <span className="live-ring r2" />
//         <span className="live-dot" />
//       </span>
//       LIVE
//     </div>
//   )
// }

type HeaderProps = {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20.5 items-center border-b border-line bg-background/75 px-4 backdrop-blur-md lg:px-6 xl:px-8">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        className="mr-3 text-muted-foreground hover:text-foreground"
      >
        {sidebarOpen ? (
          <PanelLeftClose className="h-4.5 w-4.5" />
        ) : (
          <PanelLeftOpen className="h-4.5 w-4.5" />
        )}
      </button>
      <div className="lg:hidden">
        <BrandLogo />
      </div>
      <div className="flex flex-col py-4 px-4">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Cyber Risk Intelligence Platform
        </h1>
        <div className="subtitle">
          OUTSIDE-IN VISIBILITY &middot; 9 SOURCES &middot; BANKING SECTOR
        </div>
      </div>
      <div className="ms-auto flex items-center gap-2">
        {/* <LiveIndicator /> */}
      </div>
    </header>
  )
}
