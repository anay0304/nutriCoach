import { Clock, RefreshCw, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LastSession } from "@/types"

interface SessionSummaryCardProps {
  session: LastSession
  onOpen?: () => void
}

export function SessionSummaryCard({ session, onOpen }: SessionSummaryCardProps) {
  return (
    <Card className="p-[22px_24px]">
      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="min-w-0 flex-1">
          <div
            className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-1.5"
            style={{ fontFamily: "var(--mono)" }}
          >
            Most recent session
          </div>
          <h3 className="font-serif text-xl">{session.title}</h3>
          <div className="text-[12.5px] text-ink-3 mt-1">
            {session.when} · {session.durationMin} minutes
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onOpen} className="shrink-0">
          Open transcript <ArrowRight size={12} />
        </Button>
      </div>

      {/* Summary */}
      <p
        className="text-[16px] leading-[1.55] text-ink-2 mb-[22px]"
        style={{ fontFamily: "var(--serif)" }}
      >
        {session.summary}
      </p>

      {/* Struggles + Backup plans */}
      <div className="grid grid-cols-2 gap-4">
        {/* Struggles */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Clock size={14} className="text-ink-3" />
            <span
              className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3"
              style={{ fontFamily: "var(--mono)" }}
            >
              Struggles
            </span>
          </div>
          <ul className="space-y-2 list-none m-0 p-0">
            {session.struggles.map((s, i) => (
              <li key={i} className="text-[13px] text-ink-2 leading-[1.5] pl-3.5 relative">
                <span className="absolute left-0 top-2 w-1.5 h-px bg-ink-4" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Backup plans */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <RefreshCw size={14} className="text-ink-3" />
            <span
              className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3"
              style={{ fontFamily: "var(--mono)" }}
            >
              Backup plans
            </span>
          </div>
          <ul className="space-y-2 list-none m-0 p-0">
            {session.backupPlans.map((p, i) => (
              <li key={i} className="text-[13px] text-ink-2 leading-[1.5] pl-3.5 relative">
                <span className="absolute left-0 top-2 w-1.5 h-px bg-sage" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
