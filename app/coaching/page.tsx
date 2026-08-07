"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { Topbar } from "@/components/layout/Topbar"
import { SessionList } from "@/components/coaching/SessionList"
import { ChatInterface } from "@/components/coaching/ChatInterface"
import { ContextPanel } from "@/components/coaching/ContextPanel"
import { getSessions, createSession } from "@/lib/db/sessions"
import { getMessages } from "@/lib/db/messages"
import type { Session, Message } from "@/types"

export default function CoachingPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      let data = await getSessions()

      // First-time visitor: create an initial session so the chat is ready
      if (data.length === 0) {
        const fresh = await createSession("First coaching session", "session")
        if (fresh) data = [fresh]
      }

      setSessions(data)

      if (data.length > 0) {
        setActiveId(data[0].id)
        setMessages(await getMessages(data[0].id))
      }

      setLoading(false)
    }
    load()
  }, [])

  const selectSession = async (id: string) => {
    setActiveId(id)
    setMessages(await getMessages(id))
  }

  const handleNewSession = async () => {
    const fresh = await createSession(`Session ${sessions.length + 1}`, "session")
    if (!fresh) return
    setSessions((prev) => [fresh, ...prev])
    setActiveId(fresh.id)
    setMessages([])
  }

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
        {!loading && (
          <>
            <SessionList
              sessions={sessions}
              activeId={activeId ?? ""}
              onSelect={selectSession}
              onNewSession={handleNewSession}
            />

            {activeSession && (
              <ChatInterface
                key={activeId}
                session={activeSession}
                initialMessages={messages}
                chatStyle="bubble"
              />
            )}
          </>
        )}

        {/* Context panel always visible */}
        <ContextPanel />
      </main>
    </AppShell>
  )
}
