import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Session } from "@/types"

interface SessionSummaryCardProps {
  session: Session | null
  onOpen?: () => void
}

export function SessionSummaryCard({ session, onOpen }: SessionSummaryCardProps) {
  if (!session) return null

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
            {session.date} · {session.duration} minutes
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onOpen} className="shrink-0">
          Open transcript <ArrowRight size={12} />
        </Button>
      </div>

      {/* Preview */}
      <p
        className="text-[16px] leading-[1.55] text-ink-2"
        style={{ fontFamily: "var(--serif)" }}
      >
        {session.preview}
      </p>
    </Card>
  )
}
