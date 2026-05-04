# Jobescape+ Hackathon — Leaderboard & Weak Spots

## Live Demo

**[https://jobescape-hackathon-frontend-o1kp.vercel.app](https://jobescape-hackathon-frontend-o1kp.vercel.app)**

Backend API: `https://stage.api.academy.jobescape.me`  
Frontend repo: [github.com/kanayer/jobescape-hackathon-frontend](https://github.com/kanayer/jobescape-hackathon-frontend)  
Backend branch: `hackathon/leaderboard-badges-weakspots` on the main academy repo

---

## What was built

Two new features layered on top of existing Jobescape data — no new database tables required.

### 🏆 Leaderboard
Ranks all learners in a Personal Plan by total spider points earned. Top 50 shown with medals for top 3. Your own entry is highlighted in blue.

### 🎯 Weak Spots
Surfaces the assessment questions a user has answered incorrectly most often. Sorted by miss count, with the full question and options shown so users can review and retry what they struggled with.

---

## How to use the demo

1. Open the [live app](https://jobescape-hackathon-frontend-o1kp.vercel.app)
2. **Get your JWT token**: open the Jobescape web app → browser DevTools → Application → Local Storage → copy the `access` token value
3. Paste the token into the login screen (or append `?token=<jwt>` to the URL)
4. Enter a **Personal Plan ID** (e.g. `15`) to load leaderboard or weak spots for that plan

---

## Technical overview

| Layer | Stack | Notes |
|-------|-------|-------|
| Frontend | Next.js 15 + Tailwind, deployed on Vercel | App Router, server-side API proxy |
| Backend | Django REST Framework on Cloud Run (stage) | New `LeaderboardViewSet` + `WeakSpotViewSet` in `v2/views.py` |
| Auth | Existing Jobescape JWT passed as Bearer token | No new auth infrastructure |
| Data | `SpiderProgress` (points) + `AssessmentProgress.answers` JSON | Zero new migrations |

The frontend never calls Django directly — all requests go through a Next.js `/api/proxy/` route, which forwards them server-side with the auth header. This avoids any CORS configuration changes.

### New backend endpoints

```
GET /v2/leaderboard/?personal_plan_id=<id>   — top 50 learners by points
GET /v2/weak-spots/?personal_plan_id=<id>    — top 20 most-missed questions
```
