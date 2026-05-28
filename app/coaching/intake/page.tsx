"use client"

// Initial coaching session — 5-step intake flow
// This is the first conversation a new user has with their coach
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, Check, Clock, MessageCircle, Leaf, Moon, Flame, Target, Calendar, BookOpen, Coffee } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"
import { CoachMark } from "@/components/layout/CoachMark"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { goals } from "@/lib/data"

const TOTAL_STEPS = 5

const STEP_LABELS = [
  "Where you are right now",
  "What's already worked",
  "Where it's been hard",
  "Your why, in your words",
  "Three goals to keep warm",
]

const COACH_CONTEXT = [
  "Before any plan, I want to understand the shape of your days. There's no wrong answer — I'm just trying to see what you see.",
  "Knowing what's already worked tells us more than what hasn't. We build on real things.",
  "Most plans break here. Naming the friction is the first step to designing around it.",
  "Your 'why' isn't a slogan — it's the sentence you'd whisper to yourself at 9pm. Take your time.",
  "Three goals is plenty. We can always add more, but momentum starts small.",
]

// ── Step components ──────────────────────────────────────────

function Question({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string
  title: string
  sub?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div
        className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2.5"
        style={{ fontFamily: "var(--mono)" }}
      >
        {eyebrow}
      </div>
      <h2
        className="font-serif text-[32px] tracking-[-0.02em] mb-3.5"
      >
        {title}
      </h2>
      {sub && (
        <p className="text-[15px] text-ink-3 leading-[1.55] max-w-[540px] mb-7">
          {sub}
        </p>
      )}
      {children}
    </div>
  )
}

function Step1() {
  return (
    <Question
      eyebrow="Step 1 · Where you are"
      title="What does a typical eating day look like for you right now?"
      sub="Not what you wish it looked like — what it actually is, on a regular Tuesday. Don't edit yourself."
    >
      <Textarea
        className="h-[180px] text-[14px] leading-relaxed"
        placeholder="Coffee on the way out, sometimes skip lunch, snack heavily around 4, dinner late…"
      />
      <div className="flex items-center gap-2 mt-3.5 flex-wrap">
        <span className="text-[12.5px] text-ink-3">Some prompts:</span>
        {["My mornings", "Lunch", "The 3–5pm window", "Evenings", "Weekends differ"].map((p) => (
          <button
            key={p}
            className="px-3 py-1.5 rounded-pill bg-surface border border-hairline text-[12.5px] text-ink-2 hover:bg-surface-2 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>
    </Question>
  )
}

function Step2() {
  return (
    <Question
      eyebrow="Step 2 · What's working"
      title="What's something around eating that's gone well lately?"
      sub="Even something tiny. A meal that felt easy, a habit that's stuck, a small win you noticed."
    >
      <Textarea
        className="h-[140px] text-[14px] leading-relaxed"
        placeholder="I've been drinking water before coffee most mornings…"
      />
      <Card className="mt-[22px] p-[22px_24px] bg-surface-2">
        <div className="flex gap-3 items-start">
          <div className="text-amber mt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>
            </svg>
          </div>
          <div>
            <div className="font-medium text-[14px] mb-1">Why this matters</div>
            <p className="text-[13px] text-ink-3 leading-[1.55]">
              We tend to overlook what&apos;s already working. Naming it gives us a foundation to build on — instead of starting from scratch.
            </p>
          </div>
        </div>
      </Card>
    </Question>
  )
}

const FRICTION_OPTIONS = [
  { label: "Mornings — I'm rushed", icon: Clock },
  { label: "Lunch — I skip or graze", icon: Coffee },
  { label: "Afternoon energy crash", icon: Flame },
  { label: "Evening grazing", icon: Moon },
  { label: "Travel weeks", icon: Target },
  { label: "Stress eating", icon: Flame },
  { label: "Weekends spiral", icon: Calendar },
  { label: "Cooking feels like a project", icon: BookOpen },
]

function Step3() {
  const [selected, setSelected] = useState<number[]>([])

  const toggle = (i: number) =>
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    )

  return (
    <Question
      eyebrow="Step 3 · Where it's hard"
      title="Where does the day usually get harder?"
      sub="Pick the moments that come up most. We're naming friction, not assigning blame."
    >
      <div className="grid grid-cols-2 gap-2.5">
        {FRICTION_OPTIONS.map(({ label, icon: Icon }, i) => {
          const active = selected.includes(i)
          return (
            <label
              key={i}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-md cursor-pointer transition-all",
                "bg-surface border",
                active
                  ? "border-amber-hover bg-amber-soft/30"
                  : "border-hairline hover:border-hairline-strong"
              )}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => toggle(i)}
                className="accent-amber w-4 h-4"
              />
              <Icon size={14} className="text-ink-3 shrink-0" />
              <span className="text-[14px]">{label}</span>
            </label>
          )
        })}
      </div>
    </Question>
  )
}

function Step4() {
  return (
    <Question
      eyebrow="Step 4 · Your why"
      title="If this works, what does it free you to do?"
      sub="Not 'lose weight' — what's behind that? What would be different about how you live, who you are with the people in your life?"
    >
      <Textarea
        className="h-[160px] text-[16px] leading-relaxed"
        style={{ fontFamily: "var(--serif)" }}
        placeholder="I want to have more energy in the evenings to actually be present with my kids — not collapsed on the couch…"
      />
    </Question>
  )
}

function Step5() {
  return (
    <Question
      eyebrow="Step 5 · Three goals"
      title="Based on what we've talked about, here are three goals to keep warm."
      sub="You can edit any of these. We'll revisit them in every session — they're meant to evolve."
    >
      <div className="flex flex-col gap-3">
        {goals.map((g, i) => (
          <Card key={g.id} className="p-[22px_24px] flex gap-4 items-start">
            <div
              className="w-8 h-8 rounded-[8px] bg-amber-soft text-amber-ink font-serif text-[16px] grid place-items-center shrink-0"
            >
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-1"
                style={{ fontFamily: "var(--mono)" }}
              >
                {g.cadence}
              </div>
              <div
                className="font-serif text-[18px] tracking-[-0.005em] mb-1.5"
              >
                {g.title}
              </div>
              <p className="text-[13.5px] text-ink-3 leading-[1.55]">{g.detail}</p>
            </div>
            <Button variant="subtle" size="sm">Edit</Button>
          </Card>
        ))}
      </div>

      <div
        className="flex gap-4 items-center border border-hairline rounded-lg p-[18px_22px] mt-6"
        style={{ background: "linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%)" }}
      >
        <div className="w-[38px] h-[38px] rounded-full grid place-items-center bg-amber-soft text-amber-ink shrink-0">
          <Leaf size={18} />
        </div>
        <div>
          <div className="text-[14px] font-medium">That&apos;s plenty for now.</div>
          <div className="text-[13px] text-ink-3 mt-0.5">
            Three small commitments, not a plan. We&apos;ll check in soon to see how they feel.
          </div>
        </div>
      </div>
    </Question>
  )
}

const STEP_COMPONENTS = [Step1, Step2, Step3, Step4, Step5]

// ── Page ─────────────────────────────────────────────────────
export default function IntakePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const StepContent = STEP_COMPONENTS[step - 1]
  const progress = (step / TOTAL_STEPS) * 100

  const advance = () => {
    if (step < TOTAL_STEPS) setStep(step + 1)
    else router.push("/dashboard")
  }

  return (
    // Intake uses AppShell for sidebar but has its own inner layout
    <AppShell>
      <div className="flex-1 flex flex-col min-h-0" style={{ height: "calc(100vh)" }}>
        {/* Header strip */}
        <div className="flex items-center gap-[18px] px-10 py-5 border-b border-hairline bg-bg shrink-0">
          <Button variant="subtle" size="sm" onClick={() => router.push("/dashboard")}>
            ← Exit (saves progress)
          </Button>

          <div className="flex-1">
            <div
              className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-1.5"
              style={{ fontFamily: "var(--mono)" }}
            >
              Initial coaching session
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex-1 max-w-[320px] h-[6px] bg-hairline rounded-pill overflow-hidden">
                <div
                  className="h-full bg-sage rounded-pill transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span
                className="text-[11.5px] text-ink-3"
                style={{ fontFamily: "var(--mono)" }}
              >
                Step {step} of {TOTAL_STEPS}
              </span>
            </div>
          </div>

          <Button variant="ghost" size="sm">Save &amp; come back</Button>
        </div>

        {/* Two-column content */}
        <div className="flex-1 min-h-0 grid" style={{ gridTemplateColumns: "1fr 380px" }}>
          {/* Main panel */}
          <div className="overflow-y-auto">
            <div className="max-w-[760px] mx-auto px-15 py-14" style={{ padding: "56px 60px" }}>
              <StepContent />

              {/* Navigation */}
              <div className="flex justify-between mt-10 pt-[22px] border-t border-hairline">
                <Button
                  variant="ghost"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                  className={step === 1 ? "opacity-40" : ""}
                >
                  <ArrowLeft size={14} /> Back
                </Button>

                <div className="flex gap-2.5">
                  <Button variant="subtle">Skip for now</Button>
                  <Button variant="primary" onClick={advance}>
                    {step < TOTAL_STEPS ? "Continue" : "Set my goals"}
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Coach context sidebar */}
          <div
            className="border-l border-hairline bg-surface-2 px-8 py-8 flex flex-col gap-[22px] overflow-y-auto"
          >
            {/* Coach identity */}
            <div className="flex items-center gap-3">
              <CoachMark size="lg" />
              <div>
                <div
                  className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3"
                  style={{ fontFamily: "var(--mono)" }}
                >
                  Your coach
                </div>
                <div
                  className="font-serif text-[17px] mt-0.5"
                >
                  Walking through this together
                </div>
              </div>
            </div>

            {/* Why I'm asking */}
            <Card className="p-[18px_20px] bg-surface">
              <div
                className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2.5"
                style={{ fontFamily: "var(--mono)" }}
              >
                Why I&apos;m asking
              </div>
              <p
                className="font-serif text-[15px] text-ink-2 leading-[1.55]"
              >
                {COACH_CONTEXT[step - 1]}
              </p>
            </Card>

            {/* Step progress list */}
            <div>
              <div
                className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-3"
                style={{ fontFamily: "var(--mono)" }}
              >
                What we&apos;ll do in this session
              </div>
              <ol className="list-none m-0 p-0 flex flex-col gap-0">
                {STEP_LABELS.map((label, i) => {
                  const stepNum = i + 1
                  const isCurrent = stepNum === step
                  const isDone = stepNum < step

                  return (
                    <li
                      key={i}
                      className={cn(
                        "flex items-center gap-2.5 text-[13.5px] py-2",
                        i < STEP_LABELS.length - 1 && "border-b border-hairline",
                        isCurrent ? "text-ink font-medium" : isDone ? "text-ink-3" : "text-ink-4"
                      )}
                    >
                      <span
                        className={cn(
                          "w-5 h-5 rounded-full grid place-items-center shrink-0",
                          "font-mono text-[10px]",
                          isDone
                            ? "bg-sage"
                            : isCurrent
                            ? "bg-ink"
                            : "bg-surface border border-hairline-strong"
                        )}
                        style={{
                          color: isDone || isCurrent ? "#fff" : "var(--ink-3)",
                        }}
                      >
                        {isDone ? <Check size={10} strokeWidth={3} /> : stepNum}
                      </span>
                      {label}
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* Privacy note */}
            <div className="mt-auto text-[12px] text-ink-3 leading-[1.5] flex items-start gap-1.5">
              <Leaf size={13} className="text-sage mt-0.5 shrink-0" />
              Your answers stay private. Only you and your coach see them.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
