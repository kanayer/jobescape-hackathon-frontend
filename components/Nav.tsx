'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clearToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

const links = [
  { href: '/leaderboard', label: '🏆 Leaderboard' },
  { href: '/weak-spots', label: '🎯 Weak Spots' },
]

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()

  function logout() {
    clearToken()
    router.push('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-6">
      <span className="font-bold text-brand text-lg mr-4">Jobescape+</span>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-sm font-medium transition-colors ${
            pathname.startsWith(href)
              ? 'text-brand border-b-2 border-brand pb-1'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {label}
        </Link>
      ))}
      <button
        onClick={logout}
        className="ml-auto text-xs text-gray-400 hover:text-red-500 transition-colors"
      >
        Sign out
      </button>
    </nav>
  )
}
