'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getToken, saveToken } from '@/lib/auth'

export default function TokenGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const urlToken = searchParams.get('token')
    if (urlToken) {
      saveToken(urlToken)
      // Remove token from URL bar so it's not visible
      router.replace(window.location.pathname)
    }
    setReady(!!getToken())
  }, [])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const t = input.trim()
    if (!t) { setError('Paste a valid token'); return }
    saveToken(t)
    setReady(true)
  }

  if (ready) return <>{children}</>

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Jobescape+</h1>
        <p className="text-gray-500 text-sm mb-6">
          Paste your Jobescape JWT token to continue. You can find it in the browser devtools → Application → LocalStorage on the main app.
        </p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <textarea
            className="border border-gray-300 rounded-lg p-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-brand"
            rows={4}
            placeholder="eyJhbGciOi..."
            value={input}
            onChange={e => { setInput(e.target.value); setError('') }}
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            className="bg-brand text-white rounded-lg py-2.5 font-semibold text-sm hover:bg-indigo-700 transition-colors"
          >
            Continue →
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4 text-center">
          Or open this page with <code className="bg-gray-100 px-1 rounded">?token=your_jwt</code> appended to the URL.
        </p>
      </div>
    </div>
  )
}
