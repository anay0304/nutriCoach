"use client"

import { useState } from "react"
import { Check, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ActionStep, LastSession } from "@/types"

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
  session: LastSession
}

export function NextStepsCard({ session }: NextStepsCardProps) {
  const [steps, setSteps] = useState<ActionStep[]>(session.actionSteps)

  const toggle = (id: string) =>
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)))

  const completedCount = steps.filter((s) => s.done).length

  return (
    <Card className="p-[22px_24px]">
      <div className="flex justify-between items-start mb-[18px]">
        <div className="min-w-0">
          <div
            className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-1.5"
            style={{ fontFamily: "var(--mono)" }}
          >
            From session {session.sessionNumber}
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
          <Button variant="subtle" size="sm">
            <Plus size={12} /> Add step
          </Button>
        </div>
      </div>

      <div className="flex flex-col">
        {steps.map((step) => (
          <StepRow key={step.id} step={step} onToggle={() => toggle(step.id)} />
        ))}
      </div>
    </Card>
  )
}
