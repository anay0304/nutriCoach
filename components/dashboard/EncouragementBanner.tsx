import { Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

interface EncouragementBannerProps {
  title: string
  body: string
  className?: string
}

export function EncouragementBanner({ title, body, className }: EncouragementBannerProps) {
  return (
    <div
      className={cn("flex gap-4 items-center border border-hairline rounded-lg p-[18px_22px]", className)}

      style={{
        background: "linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%)",
      }}
    >
      {/* Amber leaf mark */}
      <div className="w-[38px] h-[38px] rounded-full grid place-items-center bg-amber-soft text-amber-ink shrink-0">
        <Leaf size={18} />
      </div>
      <div>
        <div className="text-[13.5px] font-medium">{title}</div>
        <div className="text-[12.5px] text-ink-3 mt-0.5">{body}</div>
      </div>
    </div>
  )
}
