import { useState } from 'react'
import type { ReactNode } from 'react'

import Footer from './Footer'
import Header, { BrandLogo } from './Header'
import NavBar from './NavBar'
import { cn } from '#/lib/utils'

type PageLayoutProps = {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <div
        className={cn(
          'lg:min-h-screen',
          sidebarOpen && 'lg:grid lg:grid-cols-[280px_minmax(0,1fr)]',
        )}
      >
        {sidebarOpen ? (
          <aside className="hidden border-r border-line bg-background lg:block">
            <div className="sticky top-0 flex h-screen flex-col">
              <div className="flex h-[82px] items-center border-b border-line px-5">
                <BrandLogo />
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
                <NavBar />
              </div>
            </div>
          </aside>
        ) : null}

        <div className="min-w-0">
          <Header
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((value) => !value)}
          />
          <main className="p-4 lg:p-6 xl:p-8">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  )
}
