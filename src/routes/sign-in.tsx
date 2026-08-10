import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { LogoIcon } from '../components/icons/LogoIcon'
import { setAuthenticated } from '#/lib/auth'

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
})

// Demo credentials pre-filled for the presentation walkthrough.
const DEMO_EMAIL = 'raef.shoukry@beyond-data.net'
const DEMO_PASSWORD = '4JB%bwYduaIU'

function SignInPage() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Presentation stub: no real auth. Set the flag, then enter the dashboard.
    setAuthenticated()
    navigate({ to: '/' })
  }

  const inputClassName =
    'w-full rounded-lg border border-border bg-muted/50 px-3.5 py-2.5 text-foreground placeholder:text-neutral-600 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring'

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center p-8 lg:p-12 xl:p-16">
          <div className="w-full max-w-[400px]">
            <div className="mb-8">
              <h1 className="mb-2 text-[32px] font-semibold text-foreground">
                Welcome back
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="username"
                  placeholder="Enter your email"
                  className={inputClassName}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={inputClassName}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="text-start">
                <button
                  type="button"
                  className="p-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#FF5B5B] px-4 py-2.5 font-medium text-foreground transition-colors hover:bg-[#FF4D4D]"
              >
                Sign In
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="p-0 font-normal text-[#FF5B5B] hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </div>

        <p className="p-8 text-start text-sm text-muted-foreground">
          © ThreatVerse {year}
        </p>
      </div>

      <div className="hidden flex-col items-center justify-center bg-muted/50 px-8 lg:flex">
        <LogoIcon className="h-29 w-[490px]" />
      </div>
    </div>
  )
}
