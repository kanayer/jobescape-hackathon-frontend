'use client'
import { useState } from 'react'
import { api, WeakSpot } from '@/lib/api'
import PlanIdInput from '@/components/PlanIdInput'

export default function WeakSpotsPage() {
  const [planId, setPlanId] = useState('')
  const [spots, setSpots] = useState<WeakSpot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  async function load() {
    if (!planId) return
    setLoading(true)
    setError('')
    try {
      const data = await api.weakSpots(planId)
      setSpots(data)
      setLoaded(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">🎯 Weak Spots</h1>
      <p className="text-gray-500 text-sm mb-6">Questions you got wrong the most — review and try again.</p>

      <PlanIdInput value={planId} onChange={setPlanId} onSubmit={load} loading={loading} />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loaded && spots.length === 0 && (
        <p className="text-gray-400 text-sm">No weak spots found — great job! 🎉</p>
      )}

      <div className="flex flex-col gap-4">
        {spots.map(spot => (
          <WeakSpotCard key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  )
}

function WeakSpotCard({ spot }: { spot: WeakSpot }) {
  const [revealed, setRevealed] = useState(false)
  const correctOptions = spot.options.filter(o => o.is_correct)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-sm font-medium text-gray-900 leading-snug flex-1">{spot.title ?? 'Untitled question'}</p>
        <span className="shrink-0 text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">
          ✗ {spot.miss_count}×
        </span>
      </div>

      {spot.description && (
        <p className="text-xs text-gray-500 mb-3">{spot.description}</p>
      )}

      {spot.lesson_title && (
        <p className="text-xs text-indigo-400 mb-3">📖 {spot.lesson_title}</p>
      )}

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="text-xs font-semibold text-brand border border-brand rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition-colors"
        >
          Show correct answer
        </button>
      ) : (
        <div className="mt-2 rounded-xl bg-green-50 border border-green-200 p-3">
          <p className="text-xs font-semibold text-green-700 mb-1">✓ Correct answer{correctOptions.length > 1 ? 's' : ''}:</p>
          {correctOptions.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {correctOptions.map(o => (
                <li key={o.id} className="text-sm text-green-800">{o.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-green-800 italic">See lesson for answer</p>
          )}
          {spot.hint && (
            <p className="text-xs text-gray-500 mt-2 border-t border-green-200 pt-2">💡 {spot.hint}</p>
          )}
        </div>
      )}
    </div>
  )
}
