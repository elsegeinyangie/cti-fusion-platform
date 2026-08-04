export default function Header() {
  return (
    <header>
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src="/images/logo.png" alt="ThreatVerse" className="h-10 w-auto" />
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Cyber Risk Intelligence Platform
            </h1>
            <p className="mt-1 font-mono text-xs tracking-[0.04em] text-muted-foreground">
              OUTSIDE-IN VISIBILITY &middot; 9 SOURCES &middot; BANKING SECTOR
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-primary">
          <span className="live-pulse">
            <span className="live-ring" />
            <span className="live-ring r2" />
            <span className="live-dot" />
          </span>
          LIVE
        </div>
      </div>
      <hr className="divider" />

    </header>
  )
}
