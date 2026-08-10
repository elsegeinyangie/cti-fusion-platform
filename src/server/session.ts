import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'

import { AUTH_COOKIE } from '#/lib/auth'

// Reads the presentation auth flag from the incoming request cookies so the
// dashboard can be gated on a full page load / SSR, before any client JS runs.
export const getSession = createServerFn({ method: 'GET' }).handler(() => {
  const request = getWebRequest()
  const cookieHeader = request?.headers.get('cookie') ?? ''
  const isAuthenticated = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .some((part) => part === `${AUTH_COOKIE}=1`)

  return { isAuthenticated }
})
