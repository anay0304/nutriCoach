"use client"

// Dashboard — switches between first-time and returning user states
import { useState, useEffect } from "react"
import { ArrowRight, Clock, MessageCircle, Leaf } from "lucide-react"
import Link from "next/link"
import { AppShell } from "@/components/layout/AppShell"
import { Topbar } from "@/components/layout/Topbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GoalRow } from "@/components/dashboard/GoalCard"
import { NextStepsCard } from "@/components/dashboard/NextStepsCard"
import { SessionSummaryCard } from "@/components/dashboard/SessionSummaryCard"
import { EncouragementBanner } from "@/components/dashboard/EncouragementBanner"
import type { Goal, Session } from "@/types"
import { getGoals } from "@/lib/db/goals"
import { getProfile } from "@/lib/db/profiles"
import { getSessionStats, getLastSession } from "@/lib/db/sessions"
import { getLatestActionSteps } from "@/lib/db/action_steps"

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"]

// ── First-time dashboard ──────────────────────────────────────
function DashboardFirstTime({ onStartIntake }: { onStartIntake: () => void }) {
  return (
    <div className="p-8 pb-20 max-w-[900px]">
      <div className="mb-7">
        <div
          className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2.5"
          style={{ fontFamily: "var(--mono)" }}
        >
          Welcome to NutriCoach
        </div>
        <h1 className="font-serif text-[40px]">Let&apos;s start with a conversation.</h1>
        <p
          className="font-serif text-[17px] italic text-ink-3 mt-2.5 leading-relaxed"
        >
          No quizzes, no logging. Just 30 minutes with your coach to understand where you are.
        </p>
      </div>

      {/* Main CTA card */}
      <div className="relative overflow-hidden bg-surface border border-hairline rounded-lg p-[28px_30px] mb-[18px]">
        {/* Decorative circles */}
        <div
          className="absolute right-[-60px] top-[-60px] w-[280px] h-[280px] rounded-full pointer-events-none opacity-50"
          style={{ border: "1px solid var(--hairline)" }}
        >
          <div
            className="absolute inset-10 rounded-full"
            style={{ border: "1px solid var(--hairline)" }}
          >
            <div
              className="absolute inset-[60px] rounded-full bg-amber-soft"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-[560px]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-amber-soft text-amber-ink text-xs font-medium mb-[18px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            Your first step
          </div>

          <h2 className="font-serif text-[32px] mb-3.5 mt-3.5">
            Your initial coaching session
          </h2>
          <p
            className="font-serif text-[17px] text-ink-2 leading-relaxed mb-7"
          >
            Together we&apos;ll talk about what&apos;s been hard, what you&apos;ve already tried, and what &ldquo;eating well&rdquo; actually looks like for your life — not someone else&apos;s.
          </p>

          <div className="flex gap-8 mb-[30px] text-[13px] text-ink-3">
            <span className="flex items-center gap-2"><Clock size={14} /> ~30 minutes</span>
            <span className="flex items-center gap-2"><MessageCircle size={14} /> Text-based chat</span>
            <span className="flex items-center gap-2"><Leaf size={14} /> Private to you</span>
          </div>

          <Button variant="primary" size="lg" onClick={onStartIntake}>
            Begin initial session <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      {/* Three step intro cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { step: "1", title: "A real conversation", body: "Your coach will ask questions, listen, and reflect — not lecture. You set the pace." },
          { step: "2", title: "Three goals you choose", body: "By the end, you'll have a small handful of things to keep warm. Specific to your life." },
          { step: "3", title: "Check in when it helps", body: "Quick check-ins, longer sessions when you want to dig in. Whatever feels supportive." },
        ].map(({ step, title, body }) => (
          <Card key={step} className="p-[22px_24px]">
            <div
              className="w-7 h-7 rounded-full bg-surface-2 border border-hairline text-ink-3 text-[11.5px] grid place-items-center mb-3.5"
              style={{ fontFamily: "var(--mono)" }}
            >
              {step}
            </div>
            <h4 className="font-sans font-semibold text-[16px] mb-2">{title}</h4>
            <p className="text-[13px] text-ink-3 leading-[1.55]">{body}</p>
          </Card>
        ))}
      </div>

      <EncouragementBanner
        title="This isn't a fitness tracker."
        body="No streaks to defend, no macros to log. Just a conversation that helps you notice what you already know."
        className="mt-7"
      />
    </div>
  )
}

// ── Encouragement logic ───────────────────────────────────────
function getEncouragement(daysThisWeek: number, sessionCount: number): { title: string; body: string } {
  if (daysThisWeek === 7) return {
    title: "You checked in every day this week.",
    body: "A full week. That kind of consistency is rare — take a moment to notice it.",
  }
  if (daysThisWeek >= 5) return {
    title: `${daysThisWeek} check-ins this week.`,
    body: "Showing up most days is more than most people manage. Notice that.",
  }
  if (daysThisWeek >= 3) return {
    title: `${daysThisWeek} days checked in this week.`,
    body: "Consistency is building. Each one matters more than it seems.",
  }
  if (daysThisWeek === 2) return {
    title: "You've shown up twice this week.",
    body: "Two is more than one. That pattern is what becomes a habit.",
  }
  if (daysThisWeek === 1) return {
    title: "One check-in this week.",
    body: "One is enough. One is how it starts.",
  }
  // 0 days this week — fall back to total session count
  if (sessionCount >= 10) return {
    title: `${sessionCount} sessions completed.`,
    body: "The work is accumulating, even in quieter weeks.",
  }
  if (sessionCount >= 3) return {
    title: "A foundation is forming.",
    body: "A few sessions in, the shape of your work is starting to show.",
  }
  return {
    title: "Ready when you are.",
    body: "A quiet check-in is enough to start. No need to catch up.",
  }
}

// ── Returning user dashboard (hero layout) ────────────────────
function DashboardReturning({ goals, name, sessionCount, weekActivity, actionSteps, lastRealSession, onStartSession, onOpenCoaching }: {
  goals: Goal[]
  name: string | null
  sessionCount: number
  weekActivity: boolean[]
  actionSteps: import("@/types").ActionStep[]
  lastRealSession: Session | null
  onStartSession: () => void
  onOpenCoaching: () => void
}) {
  const hour = new Date().getHours()
  const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
  const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" })
  const encouragement = getEncouragement(weekActivity.filter(Boolean).length, sessionCount)

  return (
    <div className="p-8 pb-20">
      {/* Page header */}
      <div className="flex justify-between items-end mb-6 gap-6">
        <div>
          <div
            className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2.5"
            style={{ fontFamily: "var(--mono)" }}
          >
            {timeGreeting} · {dayName}
          </div>
          <h1 className="font-serif text-[34px]">Welcome back{name ? `, ${name}` : ""}.</h1>
          <p className="font-serif italic text-ink-3 text-[16px] mt-1.5">
            A quiet check-in is enough today. We don&apos;t need a perfect week.
          </p>
        </div>
        <Button variant="primary" size="lg" onClick={onStartSession}>
          Start a check-in <ArrowRight size={16} />
        </Button>
      </div>

      {/* Hero strip */}
      <div
        className="bg-ink text-[#efe7d4] rounded-xl p-8 relative overflow-hidden mb-5"
      >
        {/* Ornament */}
        <div
          className="absolute right-[-40px] top-[-40px] w-[240px] h-[240px] rounded-full"
          style={{ border: "1px solid rgba(247,239,219,0.08)" }}
        >
          <div
            className="absolute inset-[30px] rounded-full"
            style={{ border: "1px solid rgba(247,239,219,0.1)" }}
          />
          <div
            className="absolute inset-[70px] rounded-full opacity-85"
            style={{ background: "var(--amber)" }}
          />
        </div>

        <div className="relative z-10 grid grid-cols-[1.4fr_1fr_1fr] gap-9">
          {/* Left — where you are */}
          <div>
            <div
              className="text-[10.5px] tracking-[0.14em] uppercase mb-3"
              style={{ color: "rgba(247,239,219,0.6)", fontFamily: "var(--mono)" }}
            >
              Where you are
            </div>
            <p
              className="font-serif text-[26px] leading-[1.25] tracking-[-0.015em] mb-3.5 max-w-[360px]"
            >
              You&apos;ve had {sessionCount} sessions and three goals you&apos;re keeping warm.
            </p>
            <p className="text-[13.5px] leading-[1.55] max-w-[340px]"
               style={{ color: "rgba(247,239,219,0.7)" }}>
              Most of the change is happening in the small choices between sessions. Notice them.
            </p>
          </div>

          {/* Center — sessions count */}
          <div>
            <div
              className="text-[10.5px] tracking-[0.14em] uppercase mb-3"
              style={{ color: "rgba(247,239,219,0.6)", fontFamily: "var(--mono)" }}
            >
              Sessions
            </div>
            <div
              className="font-serif text-[56px] tracking-[-0.03em] leading-none"
            >
              {sessionCount}
            </div>
            <div className="text-[12.5px] mt-2" style={{ color: "rgba(247,239,219,0.7)" }}>
              completed since April 28
            </div>
          </div>

          {/* Right — week bar chart */}
          <div>
            <div
              className="text-[10.5px] tracking-[0.14em] uppercase mb-3"
              style={{ color: "rgba(247,239,219,0.6)", fontFamily: "var(--mono)" }}
            >
              This week&apos;s check-ins
            </div>
            <div className="flex items-end gap-1 h-14">
              {DAY_LABELS.map((label, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-[4px]"
                    style={{
                      height: weekActivity[i] ? "100%" : "30%",
                      background: weekActivity[i] ? "var(--sage)" : "rgba(247,239,219,0.12)",
                    }}
                  />
                  <span
                    className="text-[10.5px]"
                    style={{ color: "rgba(247,239,219,0.55)", fontFamily: "var(--mono)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main 8/4 split */}
      <div className="grid grid-cols-12 gap-[18px]">
        {/* Left — next steps + last session */}
        <div className="col-span-8 flex flex-col gap-[18px]">
          <NextStepsCard steps={actionSteps} sessionNumber={sessionCount} />
          <SessionSummaryCard session={lastRealSession} onOpen={onOpenCoaching} />
        </div>

        {/* Right — goals + encouragement */}
        <div className="col-span-4 flex flex-col gap-[18px]">
          <Card className="p-[22px_24px]">
            <div className="flex justify-between items-center mb-3.5 gap-2">
              <h3 className="font-serif text-xl whitespace-nowrap">Your goals</h3>
              <Link href="/coaching">
                <Button variant="subtle" size="sm">Review</Button>
              </Link>
            </div>
            <p className="text-[13px] text-ink-3 mb-1.5">
              Three things we&apos;re keeping warm together — set in your initial session.
            </p>
            <div className="h-px bg-hairline my-4 -mx-6" />
            <div className="flex flex-col gap-[18px]">
              {goals.map((g) => <GoalRow key={g.id} goal={g} />)}
            </div>
          </Card>

          <EncouragementBanner
            title={encouragement.title}
            body={encouragement.body}
          />
        </div>
      </div>
    </div>
  )
}

// ── Page shell ────────────────────────────────────────────────
export default function DashboardPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [userName, setUserName] = useState<string | null>(null)
  const [sessionCount, setSessionCount] = useState(0)
  const [weekActivity, setWeekActivity] = useState<boolean[]>(Array(7).fill(false))
  const [actionSteps, setActionSteps] = useState<import("@/types").ActionStep[]>([])
  const [lastRealSession, setLastRealSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [goalsData, profile, stats, steps, lastSession] = await Promise.all([
        getGoals(), getProfile(), getSessionStats(), getLatestActionSteps(), getLastSession(),
      ])
      setGoals(goalsData)
      setUserName(profile?.name ?? profile?.full_name?.split(" ")[0] ?? null)
      setSessionCount(stats.count)
      setWeekActivity(stats.weekActivity)
      setActionSteps(steps)
      setLastRealSession(lastSession)
      setLoading(false)
    }
    load()
  }, [])

  const isReturning = !loading && goals.length > 0

  return (
    <AppShell>
      <Topbar
        crumb={<span>Dashboard</span>}
        right={
          isReturning ? (
            <Link href="/coaching">
              <Button variant="primary" size="sm">
                <MessageCircle size={13} /> Open coaching
              </Button>
            </Link>
          ) : null
        }
      />

      <main className="flex-1 overflow-y-auto">
        {loading ? null : isReturning ? (
          <DashboardReturning
            goals={goals}
            name={userName}
            sessionCount={sessionCount}
            weekActivity={weekActivity}
            actionSteps={actionSteps}
            lastRealSession={lastRealSession}
            onStartSession={() => window.location.href = "/coaching"}
            onOpenCoaching={() => window.location.href = "/coaching"}
          />
        ) : (
          <DashboardFirstTime
            onStartIntake={() => window.location.href = "/coaching/intake"}
          />
        )}
      </main>
    </AppShell>
  )
}
