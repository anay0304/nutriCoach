"use client"

// Resources page — filterable library of guides, worksheets, and audio
import { useState } from "react"
import { Search, Download } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { Topbar } from "@/components/layout/Topbar"
import { Button } from "@/components/ui/button"
import { ResourceCard } from "@/components/resources/ResourceCard"
import { cn } from "@/lib/utils"
import { resources } from "@/lib/data"

const TAGS = ["All", "Behavior change", "Meals", "Mornings", "Sleep", "Travel", "Mindset", "Resilience"]

export default function ResourcesPage() {
  const [activeTag, setActiveTag] = useState("All")

  const filtered =
    activeTag === "All"
      ? resources
      : resources.filter((r) => r.tag === activeTag)

  const crumb = (
    <span>
      Resources <span className="text-ink-4">· Library</span>
    </span>
  )

  return (
    <AppShell>
      <Topbar crumb={crumb} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8 pb-20">
          {/* Page header */}
          <div className="flex justify-between items-end mb-6 gap-6">
            <div>
              <div
                className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2.5"
                style={{ fontFamily: "var(--mono)" }}
              >
                Library
              </div>
              <h1 className="font-serif text-[34px]">Resources</h1>
              <p className="font-serif italic text-ink-3 text-[16px] mt-1.5">
                Short reads, worksheets, and audio to keep nearby. Designed to be useful in five minutes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost">
                <Search size={14} /> Search
              </Button>
              <Button variant="subtle">My saved (3)</Button>
            </div>
          </div>

          {/* Tag filter chips */}
          <div className="flex flex-wrap gap-2 mb-[22px]">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={cn(
                  "px-3 py-1.5 rounded-pill text-[12.5px] border transition-colors",
                  tag === activeTag
                    ? "bg-ink text-surface border-ink"
                    : "bg-surface border-hairline text-ink-2 hover:bg-surface-2"
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Featured card — only visible when "All" is selected */}
          {activeTag === "All" && (
            <div
              className="bg-ink text-[#efe7d4] rounded-lg px-9 py-8 mb-[22px] relative overflow-hidden"
            >
              {/* Decorative ring */}
              <div
                className="absolute right-[-30px] top-[-30px] w-[220px] h-[220px] rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(247,239,219,0.08)" }}
              >
                <div
                  className="absolute inset-[30px] rounded-full"
                  style={{ border: "1px solid rgba(247,239,219,0.1)" }}
                />
              </div>

              <div className="relative max-w-[540px]">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-amber-soft text-amber-ink text-xs font-medium mb-4">
                  Featured this week
                </div>

                <h2
                  className="font-serif text-[28px] text-[#f7efdb] mt-3.5 mb-2.5"
                >
                  A gentler approach to evening eating
                </h2>
                <p
                  className="font-serif text-[16px] leading-[1.55] mb-[22px]"
                  style={{ color: "rgba(247,239,219,0.78)" }}
                >
                  Why willpower fails at 9pm — and what to try instead. A short read on the behavior-change principles behind your evening defaults.
                </p>

                <div className="flex gap-2.5">
                  <Button variant="primary">
                    <Download size={14} /> Download PDF
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-[#efe7d4]"
                    style={{ borderColor: "rgba(247,239,219,0.2)" }}
                  >
                    Read in app
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Resource grid */}
          <div className="grid grid-cols-3 gap-[18px]">
            {filtered.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>

          {/* Coming soon placeholder */}
          <div
            className="mt-7 border border-dashed border-hairline rounded-lg p-[22px] text-center bg-transparent"
          >
            <div
              className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-1.5"
              style={{ fontFamily: "var(--mono)" }}
            >
              Coming soon
            </div>
            <div
              className="font-serif text-[17px] text-ink-2"
            >
              Audio meditations for the post-meal pause, a printable weekly reset, and more.
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  )
}
