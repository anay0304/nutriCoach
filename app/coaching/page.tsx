"use client"

// Coaching page — three-column layout: session list | chat | context panel
import { useState } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { Topbar } from "@/components/layout/Topbar"
import { SessionList } from "@/components/coaching/SessionList"
import { ChatInterface } from "@/components/coaching/ChatInterface"
import { ContextPanel } from "@/components/coaching/ContextPanel"
import { sessions, initialConversation } from "@/lib/data"

export default function CoachingPage() {
  const [activeId, setActiveId] = useState(sessions[0].id)

  const activeSession = sessions.find((s) => s.id === activeId) ?? sessions[0]

  const crumb = (
    <span>
      Coaching <span className="text-ink-4">· Conversations</span>
    </span>
  )

  return (
    <AppShell>
      <Topbar crumb={crumb} />

      {/* Three-column layout that fills the remaining height */}
      <main
        className="flex-1 min-h-0 grid"
        style={{
          gridTemplateColumns: "320px 1fr 340px",
          height: "calc(100vh - 64px)",
        }}
      >
        {/* Session list */}
        <SessionList
          sessions={sessions}
          activeId={activeId}
          onSelect={setActiveId}
          onNewSession={() => (window.location.href = "/coaching/intake")}
        />

        {/* Chat */}
        <ChatInterface
          session={activeSession}
          initialMessages={initialConversation}
          chatStyle="bubble"
        />

        {/* Context panel */}
        <ContextPanel />
      </main>
    </AppShell>
  )
}
