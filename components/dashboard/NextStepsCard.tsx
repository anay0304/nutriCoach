"use client"

import { useState } from "react"
import { Check, Plus, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ActionStep } from "@/types"
import { toggleActionStep, addActionStep } from "@/lib/db/action_steps"

// Checkable action step row
function StepRow({ step, onToggle }: { step: ActionStep; onToggle: () => void }) {
  return (
    <div className="flex gap-3.5 items-start py-3.5 border-b border-hairline last:border-0">
      <button
        onClick={onToggle}
        className={cn(
          "w-[22px] h-[22px] rounded-full border-[1.5px] shrink-0 mt-px",
          "grid place-items-center transition-all duration-150",
          step.done
            ? "bg-sage border-sage"
            : "border-hairline-strong hover:border-ink-3"
        )}
      >
        {step.done && <Check size={12} strokeWidth={2.5} className="text-white" />}
      </button>
      <div className="flex-1">
        <div
          className={cn(
            "text-[14px] font-medium text-ink",
            step.done && "text-ink-4 line-through"
          )}
        >
          {step.text}
        </div>
      </div>
    </div>
  )
}

interface NextStepsCardProps {
  steps: ActionStep[]
  sessionNumber: number
}

export function NextStepsCard({ steps: initialSteps, sessionNumber }: NextStepsCardProps) {
  const [steps, setSteps] = useState<ActionStep[]>(initialSteps)
  const [adding, setAdding] = useState(false)
  const [newText, setNewText] = useState("")
  const [saving, setSaving] = useState(false)

  const toggle = async (id: string) => {
    const current = steps.find((s) => s.id === id)
    if (!current) return
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)))
    await toggleActionStep(id, !current.done)
  }

  const submitAdd = async () => {
    if (!newText.trim() || saving) return
    setSaving(true)
    try {
      const created = await addActionStep(newText.trim())
      if (created) setSteps((prev) => [...prev, created])
      setNewText("")
      setAdding(false)
    } finally {
      setSaving(false)
    }
  }

  const cancelAdd = () => { setAdding(false); setNewText("") }

  const completedCount = steps.filter((s) => s.done).length

  return (
    <Card className="p-[22px_24px]">
      <div className="flex justify-between items-start mb-[18px]">
        <div className="min-w-0">
          <div
            className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-1.5"
            style={{ fontFamily: "var(--mono)" }}
          >
            From session {sessionNumber}
          </div>
          <h3 className="font-serif text-xl whitespace-nowrap">Your next steps</h3>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span
            className="text-[11.5px] text-ink-3"
            style={{ fontFamily: "var(--mono)" }}
          >
            {completedCount} of {steps.length} done
          </span>
          <Button variant="subtle" size="sm" onClick={() => setAdding(true)} disabled={adding}>
            <Plus size={12} /> Add step
          </Button>
        </div>
      </div>

      <div className="flex flex-col">
        {steps.length === 0 && !adding && (
          <p className="text-[13.5px] text-ink-3 py-2">
            Your action steps will appear here after your first coaching session.
          </p>
        )}
        {steps.map((step) => (
          <StepRow key={step.id} step={step} onToggle={() => toggle(step.id)} />
        ))}
        {adding && (
          <div className="flex gap-3 items-center pt-3.5 border-t border-hairline">
            <div className="w-[22px] h-[22px] rounded-full border-[1.5px] border-dashed border-hairline-strong shrink-0 grid place-items-center">
              <Plus size={10} className="text-ink-4" />
            </div>
            <input
              autoFocus
              placeholder="Describe your next step…"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitAdd()
                if (e.key === "Escape") cancelAdd()
              }}
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink-4 border-b border-hairline pb-0.5"
            />
            <div className="flex gap-1.5 items-center">
              <Button variant="subtle" size="sm" onClick={submitAdd} disabled={saving || !newText.trim()}>
                {saving ? "…" : "Add"}
              </Button>
              <button onClick={cancelAdd} className="text-ink-3 hover:text-ink transition-colors p-1">
                <X size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
