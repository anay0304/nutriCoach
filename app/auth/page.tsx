"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Mail } from "lucide-react"
import { BrandMark } from "@/components/layout/BrandMark"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

type Status = "idle" | "loading" | "sent" | "error"

function AuthForm() {
  const params = useSearchParams()
  const isSignIn = params.get("mode") === "signin"

  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const sendOtp = async (emailValue: string) => {
    setStatus("loading")
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email: emailValue,
      options: {
        ...(!isSignIn && name ? { data: { name, full_name: name } } : {}),
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        shouldCreateUser: !isSignIn,
      },
    })

    if (error) {
      setStatus("error")
      setErrorMsg(
        error.message.toLowerCase().includes("not found") ||
        error.message.toLowerCase().includes("signup")
          ? "No account found with that email. Try signing up instead."
          : error.message
      )
    } else {
      setStatus("sent")
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Sign-up step 1: collect name, advance to email step
    if (!isSignIn && step === 1) {
      setStep(2)
      return
    }
    await sendOtp(email)
  }

  // ── Confirmation screen ──────────────────────────────────────
  if (status === "sent") {
    return (
      <div className="bg-surface border border-hairline rounded-xl shadow-3 p-10 w-full max-w-[440px] text-center">
        <div className="w-12 h-12 rounded-full bg-amber-soft text-amber-ink grid place-items-center mx-auto mb-5">
          <Mail size={22} />
        </div>
        <h2 className="font-serif text-[26px] mb-2">Check your inbox</h2>
        <p className="text-[14px] text-ink-3 leading-relaxed">
          We sent a magic link to{" "}
          <strong className="text-ink font-medium">{email}</strong>.
          Click it to sign in — no password needed.
        </p>
        <button
          onClick={() => { setStatus("idle"); setStep(isSignIn ? 1 : 2) }}
          className="mt-6 text-[13px] text-ink-3 underline hover:text-ink transition-colors"
        >
          Wrong email? Go back
        </button>
      </div>
    )
  }

  // ── Auth form ────────────────────────────────────────────────
  const showNameStep = !isSignIn && step === 1

  return (
    <div className="bg-surface border border-hairline rounded-xl shadow-3 p-10 w-full max-w-[440px]">
      {/* Brand mark */}
      <div className="flex items-center gap-2.5 mb-6">
        <span className="text-amber"><BrandMark /></span>
      </div>

      {/* Eyebrow */}
      <div
        className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2"
        style={{ fontFamily: "var(--mono)" }}
      >
        {isSignIn ? "Welcome back" : `Begin coaching · step ${step} of 2`}
      </div>

      {/* Title */}
      <h2 className="font-serif text-[28px] mb-2">
        {isSignIn
          ? "Sign in to NutriCoach"
          : step === 1
          ? "What should we call you?"
          : "And where can we reach you?"}
      </h2>

      <p className="text-[14px] text-ink-3 leading-relaxed mb-7">
        {isSignIn
          ? "We'll send a magic link — no password needed."
          : step === 1
          ? "We use your first name in conversation. You can change it later."
          : "We'll send a magic link — no passwords to remember."}
      </p>

      <form onSubmit={submit} className="flex flex-col gap-[22px]">
        {showNameStep ? (
          <div>
            <label className="block text-[12px] font-medium text-ink-3 mb-1.5">
              First name
            </label>
            <Input
              placeholder="Mira"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>
        ) : (
          <div>
            <label className="block text-[12px] font-medium text-ink-3 mb-1.5">
              Email address
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
        )}

        {status === "error" && (
          <p className="text-[13px] text-red-600 -mt-2">{errorMsg}</p>
        )}

        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading"
            ? "Sending…"
            : showNameStep
            ? "Continue"
            : isSignIn
            ? "Send magic link"
            : "Begin coaching"}
          {status !== "loading" && <ArrowRight size={15} />}
        </Button>
      </form>

      {(step === 1 || isSignIn) && (
        <div className="mt-6 pt-[22px] border-t border-hairline text-[13px] text-ink-3 text-center">
          {isSignIn ? "New here?" : "Already coaching with us?"}{" "}
          <a
            href={isSignIn ? "/auth" : "/auth?mode=signin"}
            className="text-ink underline cursor-pointer"
          >
            {isSignIn ? "Begin coaching" : "Sign in"}
          </a>
        </div>
      )}
    </div>
  )
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <Suspense fallback={
        <div className="w-[440px] h-[400px] bg-surface border border-hairline rounded-xl animate-pulse" />
      }>
        <AuthForm />
      </Suspense>
    </div>
  )
}
