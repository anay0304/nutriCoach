"use client"

import { useState, useRef } from "react"
import { ProgressRing } from "./ProgressRing"
import { Card } from "@/components/ui/card"
import type { Goal } from "@/types"
import { updateGoalProgress } from "@/lib/db/goals"

// Full goal card with progress ring + bar
export function GoalCard({ goal }: { goal: Goal }) {
  const pct = Math.round(goal.progress * 100)

  return (
    <Card className="p-[22px_24px] flex flex-col gap-3.5">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div
            className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2"
            style={{ fontFamily: "var(--mono)" }}
          >
            {goal.cadence}
          </div>
          <div
            className="text-[19px] leading-[1.3] text-ink tracking-[-0.01em]"
            style={{ fontFamily: "var(--serif)" }}
          >
            {goal.title}
          </div>
          <p className="text-[13px] text-ink-3 mt-2 leading-[1.5]">{goal.detail}</p>
        </div>
        <ProgressRing value={goal.progress} size={56} stroke={4} />
      </div>

      {/* Sage progress bar */}
      <div className="h-[6px] bg-hairline rounded-pill overflow-hidden">
        <div
          className="h-full bg-sage rounded-pill transition-all duration-500"
          style={{ width: `${goal.progress * 100}%` }}
        />
      </div>

      <div className="flex justify-between text-[12px] text-ink-3">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
          {pct}% on track
        </span>
        <span style={{ fontFamily: "var(--mono)" }}>last 4 weeks</span>
      </div>
    </Card>
  )
}

// Compact goal row — used in sidebar-style panels
export function GoalRow({ goal }: { goal: Goal }) {
  const [progress, setProgress] = useState(goal.progress)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState("")
  const cancelled = useRef(false)

  const startEdit = () => {
    setDraft(String(Math.round(progress * 100)))
    setEditing(true)
  }

  const commitEdit = async () => {
    if (cancelled.current) { cancelled.current = false; return }
    setEditing(false)
    const n = parseInt(draft, 10)
    if (!isNaN(n) && n >= 0 && n <= 100) {
      const next = n / 100
      setProgress(next)
      await updateGoalProgress(goal.id, next)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <ProgressRing value={progress} size={36} stroke={3.5} />
      <div className="flex-1 min-w-0">
        <div
          className="text-[13.5px] leading-[1.3] tracking-[-0.005em]"
          style={{ fontFamily: "var(--serif)" }}
        >
          {goal.title}
        </div>
        <div className="text-[11.5px] text-ink-3 mt-0.5">
          {goal.cadence} ·{" "}
          {editing ? (
            <span className="inline-flex items-baseline gap-0.5">
              <input
                autoFocus
                type="text"
                inputMode="numeric"
                value={draft}
                onChange={(e) => setDraft(e.target.value.replace(/[^0-9]/g, ""))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitEdit()
                  if (e.key === "Escape") { cancelled.current = true; setEditing(false) }
                }}
                onBlur={commitEdit}
                className="w-9 bg-transparent border-b border-ink-3 outline-none text-ink text-[11.5px]"
              />
              <span>%</span>
            </span>
          ) : (
            <button
              onClick={startEdit}
              title="Click to update"
              className="hover:text-ink hover:underline underline-offset-2 transition-colors"
            >
              {Math.round(progress * 100)}%
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
