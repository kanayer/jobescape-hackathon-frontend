'use client'
import { useState } from 'react'
import { api, LeaderboardEntry } from '@/lib/api'
import PlanIdInput from '@/components/PlanIdInput'

const MEDALS = ['🥇', '🥈', '🥉']

export default function LeaderboardPage() {
  const [planId, setPlanId] = useState('')
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  async function load() {
    if (!planId) return
    setLoading(true)
    setError('')
    try {
      const data = await api.leaderboard(planId)
      setEntries(data)
      setLoaded(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">🏆 Leaderboard</h1>
      <p className="text-gray-500 text-sm mb-6">Top learners ranked by points earned.</p>

      <PlanIdInput value={planId} onChange={setPlanId} onSubmit={load} loading={loading} />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loaded && entries.length === 0 && (
        <p className="text-gray-400 text-sm">No data for this plan yet.</p>
      )}

      {entries.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {entries.map((entry) => (
            <div
              key={entry.user_id}
              className={`flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-0 transition-colors ${
                entry.is_current_user ? 'bg-indigo-50' : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-xl w-8 text-center shrink-0">
                {MEDALS[entry.rank - 1] ?? <span className="text-gray-400 text-sm font-mono">#{entry.rank}</span>}
              </span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${entry.is_current_user ? 'text-brand' : 'text-gray-900'}`}>
                  {entry.user_email}
                  {entry.is_current_user && <span className="ml-2 text-xs bg-indigo-100 text-brand px-2 py-0.5 rounded-full">you</span>}
                </p>
              </div>
              <span className="text-sm font-semibold text-gray-700 shrink-0">
                {entry.total_points.toLocaleString()} pts
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
