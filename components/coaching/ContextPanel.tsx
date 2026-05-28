import { goals, lastSession } from "@/lib/data"

// Right panel in the coaching view — shows goals, open steps, backup plans
export function ContextPanel() {
  const openSteps = lastSession.actionSteps.filter((s) => !s.done)

  return (
    <div className="h-full overflow-y-auto px-6 py-[22px] bg-bg flex flex-col gap-[18px]">
      {/* Header */}
      <div>
        <div
          className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2.5"
          style={{ fontFamily: "var(--mono)" }}
        >
          Context for this session
        </div>
        <h3 className="font-serif text-[19px]">What we&apos;re keeping warm</h3>
      </div>

      {/* Goals */}
      <div className="flex flex-col gap-2.5">
        {goals.map((g) => (
          <div
            key={g.id}
            className="bg-surface border border-hairline rounded-lg px-4 py-3.5"
          >
            <div
              className="text-[13.5px] leading-[1.35] tracking-[-0.005em] mb-1.5"
              style={{ fontFamily: "var(--serif)" }}
            >
              {g.title}
            </div>
            <div className="flex justify-between text-[11.5px] text-ink-3">
              <span>{g.cadence}</span>
              <span style={{ fontFamily: "var(--mono)" }}>{Math.round(g.progress * 100)}%</span>
            </div>
            <div className="h-[6px] bg-hairline rounded-pill overflow-hidden mt-2">
              <div
                className="h-full bg-sage rounded-pill"
                style={{ width: `${g.progress * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Open action steps */}
      <div>
        <div
          className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2.5"
          style={{ fontFamily: "var(--mono)" }}
        >
          Open action steps
        </div>
        <div className="bg-surface border border-hairline rounded-lg px-4 py-1">
          {openSteps.map((s) => (
            <div
              key={s.id}
              className="flex gap-2.5 py-2.5 border-b border-hairline last:border-0 text-[13px] text-ink-2 leading-[1.5]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber mt-2 shrink-0" />
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Backup plans */}
      <div>
        <div
          className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2.5"
          style={{ fontFamily: "var(--mono)" }}
        >
          Backup plans
        </div>
        <div className="bg-surface-2 border border-hairline rounded-lg px-4 py-3.5 flex flex-col gap-2.5">
          {lastSession.backupPlans.map((p, i) => (
            <div
              key={i}
              className="text-[13px] text-ink-2 leading-[1.5]"
              style={{ fontFamily: "var(--serif)" }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Footer stat */}
      <div className="mt-auto pt-3 border-t border-hairline">
        <div className="flex justify-between text-[12px] text-ink-3">
          <span>Sessions completed</span>
          <span
            className="text-[18px] text-ink"
            style={{ fontFamily: "var(--serif)" }}
          >
            {lastSession.sessionNumber}
          </span>
        </div>
      </div>
    </div>
  )
}
