import type { Metadata } from 'next'
import './globals.css'
import { Suspense } from 'react'
import Nav from '@/components/Nav'
import TokenGate from '@/components/TokenGate'

export const metadata: Metadata = {
  title: 'Jobescape+',
  description: 'Leaderboards, Badges & Weak Spots',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen text-gray-900 antialiased">
        <Suspense>
          <TokenGate>
            <Nav />
            <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
          </TokenGate>
        </Suspense>
      </body>
    </html>
  )
}
