import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'

import { AUTH_COOKIE } from '#/lib/auth'

// Reads the presentation auth flag from the incoming request cookies so the
// dashboard can be gated on a full page load / SSR, before any client JS runs.
export const getSession = createServerFn({ method: 'GET' }).handler(() => {
  return { isAuthenticated: getCookie(AUTH_COOKIE) === '1' }
})
