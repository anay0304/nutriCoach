"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageCircle, BookOpen, LogOut } from "lucide-react"
import { BrandMark } from "./BrandMark"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { getProfile } from "@/lib/db/profiles"
import { weekStreak, todayIndex } from "@/lib/data"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/coaching",  label: "Coaching",  icon: MessageCircle, count: 7 },
  { href: "/resources", label: "Resources",  icon: BookOpen },
]

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"]

interface SidebarProps {
  onSignOut?: () => void
}

interface CurrentUser {
  name: string
  fullName: string
  joinedDays: number
}

export function Sidebar({ onSignOut }: SidebarProps) {
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Primary source: profiles table. Falls back to auth metadata for
      // users who signed up before the profiles table existed.
      const profile = await getProfile()
      const meta = user.user_metadata ?? {}

      const name = profile?.name || meta.name || user.email?.split("@")[0] || "You"
      const fullName = profile?.full_name || meta.full_name || name
      const createdAt = profile?.created_at || user.created_at
      const joinedDays = Math.max(
        1,
        Math.floor((Date.now() - new Date(createdAt).getTime()) / 86_400_000)
      )
      setCurrentUser({ name, fullName, joinedDays })
    }
    load()
  }, [])

  return (
    <aside
      className="w-[248px] bg-bg border-r border-hairline px-5 flex flex-col shrink-0 h-screen sticky top-0"
      style={{ fontFamily: "var(--sans)" }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 pt-2 pb-6 px-2">
        <span className="text-amber w-7 h-7 grid place-items-center">
          <BrandMark />
        </span>
        <span
          className="text-ink text-[19px] tracking-[-0.015em]"
          style={{ fontFamily: "var(--serif)" }}
        >
          NutriCoach
        </span>
      </div>

      {/* Section label */}
      <div
        className="text-ink-4 text-[10px] tracking-[0.16em] uppercase px-2.5 pb-1.5 pt-0"
        style={{ fontFamily: "var(--mono)" }}
      >
        Coaching
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 mb-1.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon, count }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 h-9 px-2.5 rounded-[10px] text-[13.5px] font-[460]",
                "transition-colors duration-100",
                active
                  ? "bg-ink text-[#efe7d4]"
                  : "text-ink-2 hover:bg-bg-soft"
              )}
            >
              <Icon
                size={16}
                className={cn("shrink-0", active ? "text-[#efe7d4]" : "text-ink-3")}
              />
              <span>{label}</span>
              {count != null && (
                <span
                  className={cn(
                    "ml-auto rounded-pill px-[7px] py-px text-[10.5px]",
                    active
                      ? "bg-white/12 text-[#efe7d4]"
                      : "bg-surface-2 text-ink-3"
                  )}
                  style={{ fontFamily: "var(--mono)" }}
                >
                  {count}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* This week streak */}
      <div
        className="text-ink-4 text-[10px] tracking-[0.16em] uppercase px-2.5 py-3.5"
        style={{ fontFamily: "var(--mono)" }}
      >
        This week
      </div>
      <div className="bg-surface border border-hairline rounded-lg px-3.5 py-3.5 mb-2 shadow-1">
        <div className="flex items-center justify-between mb-2.5">
          <span
            className="text-ink-3 text-[10.5px] tracking-[0.14em] uppercase"
            style={{ fontFamily: "var(--mono)" }}
          >
            Check-ins
          </span>
          <span
            className="text-ink-3 text-[11px]"
            style={{ fontFamily: "var(--mono)" }}
          >
            5 of 7
          </span>
        </div>
        <div className="flex gap-1">
          {DAY_LABELS.map((d, i) => (
            <span
              key={i}
              title={d}
              className={cn(
                "w-[18px] h-[18px] rounded-[5px]",
                weekStreak[i] ? "bg-sage" : "bg-hairline",
                todayIndex === i && "ring-[1.5px] ring-ink ring-inset"
              )}
            />
          ))}
        </div>
        <p className="text-xs text-ink-3 mt-2.5 leading-[1.45]">
          You showed up 5 days this week. That&apos;s the work.
        </p>
      </div>

      <div className="flex-1" />

      {/* Sign out */}
      <button
        onClick={onSignOut}
        className="flex items-center gap-2.5 h-9 px-2.5 rounded-[10px] text-[13.5px] text-ink-3 hover:bg-bg-soft transition-colors w-full text-left"
      >
        <LogOut size={16} className="text-ink-3 shrink-0" />
        Sign out
      </button>

      {/* User chip */}
      <div className="flex items-center gap-2.5 px-2 py-2.5 border-t border-hairline mt-2">
        <div
          className="w-8 h-8 rounded-full bg-ink text-[#efe7d4] grid place-items-center text-[14px] shrink-0"
          style={{ fontFamily: "var(--serif)" }}
        >
          {currentUser?.name[0] ?? "…"}
        </div>
        <div className="min-w-0">
          <div className="text-[13px] font-medium truncate">
            {currentUser?.fullName ?? ""}
          </div>
          <div className="text-[11.5px] text-ink-3">
            {currentUser ? `Day ${currentUser.joinedDays}` : ""}
          </div>
        </div>
      </div>
    </aside>
  )
}
