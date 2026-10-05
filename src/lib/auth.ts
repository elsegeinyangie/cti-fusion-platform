// Lightweight presentation-only auth flag stored in a cookie so the SSR server
// can gate the dashboard on a full page load and the client can gate on
// in-app navigation. This is not real authentication — it only decides whether
// the demo shows the login screen or the dashboard.
export const AUTH_COOKIE = 'tv_auth'

// Set to false to skip the login gate entirely and open straight on the
// dashboard. Flip back to true to restore the sign-in flow. While disabled the
// sign-in route stays reachable but nothing redirects to it, and the logout
// button is hidden since there is no session to end.
export function isAuthEnabled(): boolean {
  return false
}

const MAX_AGE_SECONDS = 60 * 60 * 24 // 1 day

export function readAuthCookieClient(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie
    .split(';')
    .map((part) => part.trim())
    .some((part) => part === `${AUTH_COOKIE}=1`)
}

export function setAuthenticated(): void {
  if (typeof document === 'undefined') return
  document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax`
}

export function clearAuthenticated(): void {
  if (typeof document === 'undefined') return
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; samesite=lax`
}
