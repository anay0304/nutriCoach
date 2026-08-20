"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "./Sidebar"

// Mobile-only replacement for the desktop Sidebar's primary nav
export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-surface border-t border-hairline flex items-stretch z-40">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/")
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 text-[10.5px]",
              active ? "text-ink" : "text-ink-3"
            )}
          >
            <Icon size={18} className={active ? "text-amber" : "text-ink-3"} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
