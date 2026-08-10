import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import { getLocale } from '#/paraglide/runtime'
import { readAuthCookieClient } from '#/lib/auth'
import { getSession } from '#/server/session'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const SIGN_IN_PATH = '/sign-in'

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ location }) => {
    // Other redirect strategies are possible; see
    // https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('lang', getLocale())
    }

    // Presentation auth gate: read the flag from the cookie (client) or the
    // request (server), then keep unauthenticated visitors on the login page
    // and bounce authenticated ones away from it.
    const isAuthenticated =
      typeof document !== 'undefined'
        ? readAuthCookieClient()
        : (await getSession()).isAuthenticated

    const onSignInPage = location.pathname === SIGN_IN_PATH

    if (!isAuthenticated && !onSignInPage) {
      throw redirect({ to: SIGN_IN_PATH })
    }
    if (isAuthenticated && onSignInPage) {
      throw redirect({ to: '/' })
    }
  },

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'ThreatVerse // Cyber Risk Intelligence Platform',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
