// Landing page — server component
// CTA routes to /auth to begin sign-up
import Link from "next/link"
import { ArrowRight, Leaf, Check, Clock, MessageCircle, Target, RefreshCw } from "lucide-react"
import { BrandMark } from "@/components/layout/BrandMark"
import { CoachMark } from "@/components/layout/CoachMark"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="flex justify-between items-center px-12 py-[22px] max-w-[1280px] mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <span className="text-amber w-[26px] h-[26px] grid place-items-center">
            <BrandMark size={26} />
          </span>
          <span className="font-serif text-[19px] tracking-[-0.015em] text-ink">NutriCoach</span>
        </div>

        <div className="flex items-center gap-2.5">
          <a className="text-[13.5px] text-ink-2 hover:text-ink px-3 py-1 cursor-pointer transition-colors">How it works</a>
          <a className="text-[13.5px] text-ink-2 hover:text-ink px-3 py-1 cursor-pointer transition-colors">For coaches</a>
          <a className="text-[13.5px] text-ink-2 hover:text-ink px-3 py-1 cursor-pointer transition-colors">Pricing</a>
          <Link href="/auth?mode=signin">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/auth">
            <Button variant="primary" size="sm">Start coaching</Button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="flex-1 grid grid-cols-[1.15fr_1fr] gap-20 max-w-[1280px] mx-auto w-full px-12 pt-15 pb-20 items-center"
               style={{ paddingTop: 60, paddingBottom: 80 }}>
        {/* Left — copy */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-surface-2 border border-hairline text-xs font-medium text-ink-2 mb-[22px]">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            Personalized nutrition coaching
          </div>

          <h1
            className="font-serif font-[420] text-[58px] leading-[1.08] tracking-[-0.03em] max-w-[580px] mb-0"
          >
            A quieter way<br />
            to change{" "}
            <em className="not-italic text-amber">how you eat.</em>
          </h1>

          <p className="text-[18px] text-ink-3 leading-[1.55] max-w-[460px] mt-[22px] mb-8">
            NutriCoach is a conversation, not a tracker. Your AI coach listens, asks better questions, and helps you build sustainable habits — one small choice at a time.
          </p>

          <div className="flex gap-3 items-center">
            <Link href="/auth">
              <Button variant="primary" size="lg">
                Begin your first session <ArrowRight size={16} />
              </Button>
            </Link>
            <Button variant="ghost" size="lg">Watch a 90-second tour</Button>
          </div>

          <div className="flex gap-6 mt-9 text-[13px] text-ink-3">
            <span className="flex items-center gap-2"><Leaf size={14} /> No tracking. No macros.</span>
            <span className="flex items-center gap-2"><Check size={14} /> Private &amp; secure</span>
            <span className="flex items-center gap-2"><Clock size={14} /> 5 min · cancel anytime</span>
          </div>
        </div>

        {/* Right — abstract coach moment (dark card, no photo) */}
        <div
          className="bg-ink rounded-xl p-9 text-[#efe7d4] relative overflow-hidden flex flex-col justify-between"
          style={{ aspectRatio: "4/5" }}
        >
          {/* Decorative circles */}
          <div
            className="absolute right-[-30px] top-[-30px] w-[220px] h-[220px] rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(247,239,219,0.08)" }}
          >
            <div
              className="absolute inset-[30px] rounded-full"
              style={{ border: "1px solid rgba(247,239,219,0.1)" }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3.5 mb-[22px]">
              <CoachMark size="lg" />
              <div>
                <div
                  className="text-[10.5px] tracking-[0.16em] uppercase"
                  style={{ color: "rgba(247,239,219,0.55)", fontFamily: "var(--mono)" }}
                >
                  Your coach · just now
                </div>
                <div className="text-[13.5px] text-[#efe7d4] mt-1">Ready when you are</div>
              </div>
            </div>

            <p
              className="text-[22px] leading-[1.4] text-[#f7efdb] tracking-[-0.01em]"
              style={{ fontFamily: "var(--serif)" }}
            >
              &ldquo;Tell me about the last meal that felt easy — not because it was healthy, but because you actually enjoyed it.&rdquo;
            </p>
          </div>

          <div className="relative z-10">
            <div
              className="h-px my-6"
              style={{ background: "rgba(247,239,219,0.12)" }}
            />
            <div
              className="flex justify-between text-[12px]"
              style={{ color: "rgba(247,239,219,0.6)" }}
            >
              <span>Session 1 of many · Initial conversation</span>
              <span>30 min</span>
            </div>
            <div
              className="mt-[18px] px-4 py-3.5 rounded-md"
              style={{
                background: "rgba(247,239,219,0.06)",
                border: "1px solid rgba(247,239,219,0.08)",
              }}
            >
              <div
                className="text-[10.5px] tracking-[0.14em] uppercase mb-1.5"
                style={{ color: "rgba(247,239,219,0.5)", fontFamily: "var(--mono)" }}
              >
                What we&apos;ll cover
              </div>
              <div className="text-[13px] text-[#efe7d4] leading-[1.55]">
                Your history with food · what you&apos;ve already tried · what &ldquo;eating well&rdquo; means for your life · three goals to keep warm.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature row ─────────────────────────────────────── */}
      <section
        className="grid grid-cols-4 gap-6 max-w-[1280px] mx-auto w-full px-12 pt-6 pb-16 border-t border-hairline"
      >
        {[
          { icon: <MessageCircle size={18} />, title: "A real conversation", body: "Not a quiz. Your coach asks, listens, reflects — and helps you see what you already know." },
          { icon: <Target size={18} />, title: "Three small goals", body: "Specific to your life — the work happens between sessions, in tiny choices." },
          { icon: <RefreshCw size={18} />, title: "Backup plans", body: "For the day you're depleted. Pre-decided, gentle, low-effort defaults." },
          { icon: <Leaf size={18} />, title: "Behavior-change first", body: "Grounded in psychology. Built for sustainable change, not before-and-after photos." },
        ].map(({ icon, title, body }) => (
          <div key={title}>
            <div className="w-9 h-9 rounded-[10px] bg-surface border border-hairline grid place-items-center text-amber mb-4">
              {icon}
            </div>
            <h4 className="font-serif text-[18px] font-[460] mb-1.5">{title}</h4>
            <p className="text-[13.5px] text-ink-3">{body}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
