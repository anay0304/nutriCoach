"use client"

import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { SignOutDialog } from "@/components/layout/SignOutDialog"
import { createClient } from "@/lib/supabase/client"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [signOutOpen, setSignOutOpen] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setSignOutOpen(false)
    window.location.href = "/"
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar onSignOut={() => setSignOutOpen(true)} />

      <div className="flex-1 min-w-0 flex flex-col">
        {children}
      </div>

      <SignOutDialog
        open={signOutOpen}
        onCancel={() => setSignOutOpen(false)}
        onConfirm={handleSignOut}
      />
    </div>
  )
}
