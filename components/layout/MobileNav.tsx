"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Hamburger menu for the landing page nav — shown only below the `md` breakpoint
export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 grid place-items-center text-ink"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] w-[220px] bg-surface border border-hairline rounded-lg shadow-2 p-2.5 flex flex-col gap-1 z-50">
          <a
            onClick={() => setOpen(false)}
            className="text-[13.5px] text-ink-2 px-3 py-2.5 cursor-pointer"
          >
            How it works
          </a>
          <a
            onClick={() => setOpen(false)}
            className="text-[13.5px] text-ink-2 px-3 py-2.5 cursor-pointer"
          >
            For coaches
          </a>
          <a
            onClick={() => setOpen(false)}
            className="text-[13.5px] text-ink-2 px-3 py-2.5 cursor-pointer"
          >
            Pricing
          </a>
          <div className="h-px bg-hairline my-1" />
          <Link href="/auth?mode=signin" onClick={() => setOpen(false)}>
            <Button variant="ghost" size="sm" className="w-full">Sign in</Button>
          </Link>
          <Link href="/auth" onClick={() => setOpen(false)}>
            <Button variant="primary" size="sm" className="w-full">Start coaching</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
