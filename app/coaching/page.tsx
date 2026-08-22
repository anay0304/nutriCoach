"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
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
  // The 3-column grid needs ~900px of its own (320px + 340px fixed columns,
  // plus the 248px sidebar) — narrower than that, even a tablet, it must
  // fall back to the single-view mobile layout or columns overflow.
  const [showGrid, setShowGrid] = useState(true)
  // Separately: the bottom tab bar only exists below md (768px) — matches
  // Sidebar.tsx / BottomNav.tsx's own breakpoint — so only reserve space
  // for it there, not for the whole showGrid=false range.
  const [hasBottomNav, setHasBottomNav] = useState(false)
  const [mobileView, setMobileView] = useState<"chat" | "sessions" | "context">("chat")

  useEffect(() => {
    const mqlGrid = window.matchMedia("(min-width: 1024px)")
    const mqlSidebar = window.matchMedia("(min-width: 768px)")
    const update = () => {
      setShowGrid(mqlGrid.matches)
      setHasBottomNav(!mqlSidebar.matches)
    }
    update()
    mqlGrid.addEventListener("change", update)
    mqlSidebar.addEventListener("change", update)
    return () => {
      mqlGrid.removeEventListener("change", update)
      mqlSidebar.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    async function load() {
      try {
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
      } finally {
        setLoading(false)
      }
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

  const handleNewCheckIn = async () => {
    const fresh = await createSession("Check-in", "check-in")
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

      {/* Fills the remaining height: 3-column grid on desktop, one full-screen view at a time on mobile */}
      <main
        className="flex-1 min-h-0"
        style={{ height: `calc(100vh - 64px${hasBottomNav ? " - 60px" : ""})` }}
      >
        {showGrid ? (
          <div className="h-full grid" style={{ gridTemplateColumns: "320px minmax(0,1fr) 340px" }}>
            {!loading && (
              <>
                <SessionList
                  sessions={sessions}
                  activeId={activeId ?? ""}
                  onSelect={selectSession}
                  onNewSession={handleNewSession}
                  onQuickCheckIn={handleNewCheckIn}
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
          </div>
        ) : (
          <div className="h-full">
            {mobileView === "chat" && !loading && activeSession && (
              <ChatInterface
                key={activeId}
                session={activeSession}
                initialMessages={messages}
                chatStyle="bubble"
                onOpenSessions={() => setMobileView("sessions")}
                onOpenContext={() => setMobileView("context")}
              />
            )}

            {mobileView === "sessions" && (
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 px-4 h-14 border-b border-hairline shrink-0">
                  <button
                    onClick={() => setMobileView("chat")}
                    className="w-8 h-8 grid place-items-center text-ink shrink-0"
                    aria-label="Back to chat"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <span className="text-[13.5px] font-medium">Sessions</span>
                </div>
                <div className="flex-1 min-h-0">
                  <SessionList
                    sessions={sessions}
                    activeId={activeId ?? ""}
                    onSelect={(id) => { selectSession(id); setMobileView("chat") }}
                    onNewSession={() => { handleNewSession(); setMobileView("chat") }}
                    onQuickCheckIn={() => { handleNewCheckIn(); setMobileView("chat") }}
                  />
                </div>
              </div>
            )}

            {mobileView === "context" && (
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 px-4 h-14 border-b border-hairline shrink-0">
                  <button
                    onClick={() => setMobileView("chat")}
                    className="w-8 h-8 grid place-items-center text-ink shrink-0"
                    aria-label="Back to chat"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <span className="text-[13.5px] font-medium">Details</span>
                </div>
                <div className="flex-1 min-h-0">
                  <ContextPanel />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </AppShell>
  )
}
