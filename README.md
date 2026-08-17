# NutriCoach

**AI-powered nutrition coaching for sustainable habit change.**

[**Live demo →**](https://trynutricoach.coach) — click "Try the demo" on the login page, no account needed.

---

NutriCoach is a full-stack web application that delivers personalized nutrition coaching through conversational AI. Instead of calorie tracking or rigid meal plans, it focuses on guided conversations, realistic goal-setting, and gentle progress tracking — grounded in behavior-change psychology.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS with custom design token system |
| Auth & Database | Supabase — magic link auth, PostgreSQL, Row Level Security |
| AI | Anthropic Claude API (`claude-haiku-4-5-20251001`) |
| Email | Resend — transactional email from a custom branded domain |
| Deployment | Vercel |

## Features

**Authentication**
- Passwordless magic link sign-in via Supabase Auth
- Cookie-based session persistence using `@supabase/ssr` for App Router compatibility
- One-click demo login — returns real session tokens without requiring an email

**AI Intake Flow**
- Multi-step onboarding collecting current habits, past attempts, and friction points
- AI-generated goal suggestions via Claude, based on the user's own answers
- Editable goal cards before committing — users refine suggestions before they're saved

**Coaching Sessions**
- Real-time chat with an AI coach persona powered by Anthropic Claude
- Full conversation history persisted in Supabase
- Automatic session summarization: after each reply, a background call generates a session title and preview without blocking the UI (fire-and-forget fetch pattern)
- Quick-start prompts to reduce blank-page friction

**Dashboard**
- Live session count, week activity chart, and goal tracking for returning users
- Inline goal progress editing — click any percentage to update it in place
- Action steps with inline add (Enter to save, Escape to cancel, optimistic UI update)
- Dynamic encouragement banner that adapts messaging to the user's actual activity
- Session summary card with the most recent coaching session title and preview

**Email**
- Branded magic link emails from `nouri@trynutricoach.coach`
- Custom SMTP via Resend with SPF and DKIM records on a verified domain

## Project Structure

```
app/
  auth/                    # Sign-in / sign-up with demo login
  dashboard/               # Returning and first-time user views
  coaching/                # Chat interface and session list
  api/
    chat/                  # AI coaching endpoint (Claude)
    intake/suggest-goals/  # AI goal suggestion endpoint
    sessions/summarize/    # Background session summarization
    demo-login/            # Demo account token exchange

components/
  dashboard/               # GoalCard, NextStepsCard, SessionSummaryCard, EncouragementBanner
  coaching/                # ChatInterface, ChatBubble, TypingIndicator
  layout/                  # AppShell, Sidebar, Topbar
  ui/                      # Button, Card, Input primitives

lib/
  db/                      # Database helpers: goals, sessions, messages, profiles, action_steps
  supabase/                # Browser and server Supabase client factories
```

## Database Schema

Five tables in Supabase PostgreSQL, all with Row Level Security enabled — users can only read and write their own rows.

| Table | Purpose |
|---|---|
| `profiles` | User display name, synced from Supabase Auth on sign-up |
| `goals` | Nutrition goals with title, detail, cadence, and progress % |
| `sessions` | Coaching sessions with auto-generated title and preview |
| `messages` | Per-session message history with role (user / coach) |
| `action_steps` | Actionable to-dos linked to sessions, with completion state |

## Getting Started

**Prerequisites:** Node.js 18+, a Supabase project, an Anthropic API key, a Resend account.

```bash
git clone https://github.com/yourusername/nutricoach.git
cd nutricoach
npm install
```

Create `.env.local` with the following:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
DEMO_EMAIL=
DEMO_PASSWORD=
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design System

NutriCoach uses a custom Tailwind token system built around behavior-change principles rather than generic SaaS conventions:

- **Warm beige background** — calm and non-clinical, avoids the sterile feel of most health apps
- **Sage green** — reserved exclusively for progress indicators, never used for calls to action
- **Amber** — action cues and encouraging highlights
- **Ink text scale** — four opacity steps (`ink`, `ink-2`, `ink-3`, `ink-4`) for hierarchy without extra colors

The coaching interface deliberately avoids streaks, scores, and gamification — the design supports reflection rather than compulsion.

## Architecture Notes

- All database access goes through typed helper functions in `lib/db/` — no raw Supabase queries in components
- Server-side auth uses `createServerClient` from `@supabase/ssr`; client-side uses `createBrowserClient` — they share the same cookie store for seamless session sync
- Session summarization is fire-and-forget: it runs after each coach reply but never blocks the chat response or shows errors to the user
- The demo login endpoint uses `signInWithPassword` and returns `access_token` + `refresh_token` for the client to hydrate via `supabase.auth.setSession()`
