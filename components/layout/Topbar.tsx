import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopbarProps {
  crumb?: React.ReactNode
  right?: React.ReactNode
}

export function Topbar({ crumb, right }: TopbarProps) {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-hairline bg-bg sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {crumb && (
          <div className="text-[13px] text-ink-3">{crumb}</div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {right}
        <Button variant="subtle" size="sm" title="Search">
          <Search size={14} />
        </Button>
        <Button variant="subtle" size="sm" title="Notifications">
          <Bell size={14} />
        </Button>
      </div>
    </header>
  )
}
