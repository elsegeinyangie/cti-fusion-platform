export default function Footer() {
  return (
    <footer className="flex items-center justify-between gap-3 border-t border-line py-6 font- text-xs text-muted-foreground">
      <div className="flex items-center gap-2.5">
        <img src="/images/logo.png" alt="ThreatVerse" className="h-8 w-auto" />
        <span>ThreatVerse v1.0</span>
      </div>
      <span>Predict attacks before they strike</span>
    </footer>
  )
}
