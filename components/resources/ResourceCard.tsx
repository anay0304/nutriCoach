import { Download, FileText, BookOpen, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Resource } from "@/types"

function KindIcon({ kind }: { kind: string }) {
  if (kind === "Audio")     return <Mic size={16} />
  if (kind === "Worksheet") return <FileText size={16} />
  return <BookOpen size={16} />
}

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource: r }: ResourceCardProps) {
  return (
    <article className="bg-surface border border-hairline rounded-lg p-[22px] flex flex-col gap-3.5 cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-2">
      {/* Thumbnail */}
      <div
        className="aspect-[4/3] rounded-md relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, var(--surface-2), var(--bg-soft))",
          border: "1px solid var(--hairline)",
        }}
      >
        {/* Diagonal stripe pattern */}
        <div
          className="absolute inset-0"
          style={{
            background: "repeating-linear-gradient(115deg, transparent 0 16px, rgba(31,42,61,0.04) 16px 17px)",
          }}
        />
        {/* Icon center */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-14 h-14 rounded-[14px] bg-surface border border-hairline grid place-items-center text-amber shadow-1">
            <KindIcon kind={r.kind} />
          </div>
        </div>
        {/* Kind badge */}
        <div className="absolute top-3.5 left-3.5">
          <Badge>{r.kind}</Badge>
        </div>
        {/* Time */}
        <div
          className="absolute bottom-3.5 right-3.5 text-[11px] text-ink-3"
          style={{ fontFamily: "var(--mono)" }}
        >
          {r.time}
        </div>
      </div>

      {/* Content */}
      <div>
        <div
          className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2"
          style={{ fontFamily: "var(--mono)" }}
        >
          {r.tag}
        </div>
        <div
          className="text-[18px] leading-[1.3] tracking-[-0.005em] mb-1.5"
          style={{ fontFamily: "var(--serif)" }}
        >
          {r.title}
        </div>
        <p className="text-[13px] text-ink-3 leading-[1.5]">{r.desc}</p>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-2.5 border-t border-hairline flex items-center justify-between">
        <span
          className="text-[12px] text-ink-4"
          style={{ fontFamily: "var(--mono)" }}
        >
          {r.pages ? `${r.pages} pp` : "Audio"}
        </span>
        <Button variant="subtle" size="sm">
          <Download size={12} /> Get
        </Button>
      </div>
    </article>
  )
}
