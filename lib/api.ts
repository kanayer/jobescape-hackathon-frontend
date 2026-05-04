import { getToken } from './auth'

async function req<T>(path: string): Promise<T> {
  const token = getToken()
  const res = await fetch(`/api/proxy${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!res.ok) throw new Error(`${res.status}`)
  return res.json()
}

export interface LeaderboardEntry {
  user_id: string
  user_email: string
  total_points: number
  rank: number
  is_current_user: boolean
}

export interface Badge {
  id: number
  key: string
  title: string
  description: string
  icon_url: string
}

export interface UserBadge {
  badge: Badge
  earned_at: string
}

export interface WeakSpot {
  id: number
  title: string
  description: string
  hint: string
  type: string
  fill_text: string
  options: { id: number; title: string; is_correct: boolean; order: number }[]
  miss_count: number
  lesson_id: number | null
  lesson_title: string | null
}

export const api = {
  leaderboard: (planId: string) =>
    req<LeaderboardEntry[]>(`/v2/leaderboard/?personal_plan_id=${planId}`),

  allBadges: () => req<Badge[]>('/v2/badges/'),

  myBadges: () => req<UserBadge[]>('/v2/badges/my/'),

  weakSpots: (planId: string) =>
    req<WeakSpot[]>(`/v2/weak-spots/?personal_plan_id=${planId}`),
}
