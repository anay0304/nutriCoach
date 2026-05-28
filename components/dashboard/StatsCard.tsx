import { Card } from "@/components/ui/card"
import { user, lastSession } from "@/lib/data"

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div
        className="text-[28px] tracking-[-0.02em] leading-none"
        style={{ fontFamily: "var(--serif)" }}
      >
        {value}
      </div>
      <div className="text-[11.5px] text-ink-3 mt-1.5 tracking-[0.02em]">{label}</div>
    </div>
  )
}

export function StatsCard() {
  return (
    <Card className="p-[22px_24px]">
      <div
        className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-4"
        style={{ fontFamily: "var(--mono)" }}
      >
        Since you started
      </div>
      <div className="grid grid-cols-3 gap-3.5">
        <Stat label="Sessions" value={lastSession.sessionNumber} />
        <Stat label="Action steps kept" value="23" />
        <Stat label="Days since intake" value={user.joinedDays} />
      </div>
    </Card>
  )
}
