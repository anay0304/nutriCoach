"use client"

import { useState } from "react"
import { Filter, Plus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Session } from "@/types"

const SESSION_TYPE_CONFIG: Record<string, { label: string; variant: "amber" | "ink" | "sage" }> = {
  intake:   { label: "Intake",   variant: "amber" },
  session:  { label: "Session",  variant: "ink" },
  "check-in": { label: "Check-in", variant: "sage" },
}

function SessionTypeTag({ type }: { type: string }) {
  const config = SESSION_TYPE_CONFIG[type] ?? { label: type, variant: "sage" as const }
  return (
    <Badge variant={config.variant} className="text-[10.5px] py-0.5 px-2">
      {config.label}
    </Badge>
  )
}

type FilterType = "all" | "session" | "check-in"

interface SessionListProps {
  sessions: Session[]
  activeId: string
  onSelect: (id: string) => void
  onNewSession: () => void
}

export function SessionList({ sessions, activeId, onSelect, onNewSession }: SessionListProps) {
  const [filter, setFilter] = useState<FilterType>("all")

  const filtered = filter === "all"
    ? sessions
    : sessions.filter((s) => s.type === filter)

  return (
    <div className="flex flex-col h-full border-r border-hairline bg-bg">
      {/* Header */}
      <div className="px-[22px] pt-[22px] pb-3.5">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="font-serif text-[22px]">Sessions</h3>
          <Button variant="subtle" size="sm" title="Filter">
            <Filter size={13} />
          </Button>
        </div>

        {/* Filter segmented control */}
        <div className="flex bg-surface-2 border border-hairline rounded-pill p-[3px] gap-0.5">
          {(["all", "session", "check-in"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-1 h-7 px-3.5 text-[12.5px] font-medium rounded-pill transition-all",
                filter === f
                  ? "bg-surface text-ink shadow-1"
                  : "text-ink-3"
              )}
            >
              {f === "all" ? "All" : f === "session" ? "Sessions" : "Check-ins"}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-3.5 pb-2 flex flex-col gap-2.5">
        <Button variant="primary" className="w-full" onClick={onNewSession}>
          <Plus size={14} /> New session
        </Button>
        <Button variant="ghost" className="w-full">
          <Clock size={14} /> Quick check-in
        </Button>
      </div>

      {/* Session list */}
      <div className="flex-1 overflow-y-auto min-h-0 px-3.5 pb-2">
        {filtered.map((s) => {
          const isActive = s.id === activeId
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={cn(
                "w-full text-left px-3.5 py-3 rounded-md mb-1 flex flex-col gap-1.5 transition-colors border",
                isActive
                  ? "bg-surface border-hairline"
                  : "bg-transparent border-transparent hover:bg-surface-2"
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[11px] text-ink-3 tracking-[0.04em]"
                  style={{ fontFamily: "var(--mono)" }}
                >
                  {s.date}
                </span>
                <SessionTypeTag type={s.type} />
              </div>
              <div
                className="text-[15.5px] leading-[1.3] tracking-[-0.005em] text-ink"
                style={{ fontFamily: "var(--serif)" }}
              >
                {s.title}
              </div>
              <div className="text-[12.5px] text-ink-3 leading-[1.45] mt-0.5">
                {s.preview}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
