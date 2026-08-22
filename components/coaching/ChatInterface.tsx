"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Mic, FileText, MoreHorizontal, List, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CoachMark } from "@/components/layout/CoachMark"
import { ChatBubble, TypingIndicator, SessionMarker, FailedReply } from "./ChatBubble"
import { cn } from "@/lib/utils"
import { saveMessage } from "@/lib/db/messages"
import type { Message, Session } from "@/types"

type ChatStyle = "bubble" | "minimal" | "paper"

interface ChatInterfaceProps {
  session: Session
  initialMessages: Message[]
  chatStyle?: ChatStyle
  onOpenSessions?: () => void
  onOpenContext?: () => void
}

const QUICK_STARTERS = [
  "I felt depleted on Tuesday",
  "I want to talk about evenings",
  "I had a small win",
  "I'm not sure what to talk about",
]

async function fetchCoachReply(messages: Message[]): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  })
  if (!res.ok) throw new Error("Coach reply failed")
  const { text } = await res.json()
  if (!text) throw new Error("Coach reply empty")
  return text
}

export function ChatInterface({ session, initialMessages, chatStyle = "bubble", onOpenSessions, onOpenContext }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [draft, setDraft] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const streamRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight
    }
  }, [messages.length, isTyping, error])

  const requestCoachReply = async (currentMessages: Message[]) => {
    setError(null)
    setIsTyping(true)
    try {
      const reply = await fetchCoachReply(currentMessages)
      const allMessages: Message[] = [...currentMessages, { role: "coach", text: reply }]
      setMessages(allMessages)
      await saveMessage(session.id, "coach", reply)

      // Fire-and-forget: update session title + preview once there's enough conversation
      if (allMessages.length >= 4) {
        fetch("/api/sessions/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: session.id, messages: allMessages }),
        }).catch(() => {})
      }
    } catch {
      setError("Your coach didn't get that. Check your connection and try again.")
    } finally {
      setIsTyping(false)
    }
  }

  const send = async () => {
    const text = draft.trim()
    if (!text || isTyping) return
    setDraft("")

    const updatedMessages: Message[] = [...messages, { role: "user", text }]
    setMessages(updatedMessages)
    await saveMessage(session.id, "user", text)

    await requestCoachReply(updatedMessages)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className={cn("flex flex-col h-full border-r-0 md:border-r border-hairline", `chat-style-${chatStyle}`)}>
      {/* Session header */}
      <div className="flex items-center gap-3.5 px-4 md:px-7 py-[18px] border-b border-hairline bg-bg">
        <CoachMark />
        <div className="flex-1">
          <div
            className="text-[17px] leading-[1.2]"
            style={{ fontFamily: "var(--serif)" }}
          >
            {session.title}
          </div>
          <div className="text-[12px] text-ink-3 mt-0.5">
            {session.date} · {session.duration} min ·{" "}
            <span className="text-sage-ink">● live</span>
          </div>
        </div>
        {onOpenSessions && (
          <Button variant="subtle" size="sm" onClick={onOpenSessions} title="Sessions">
            <List size={14} />
          </Button>
        )}
        {onOpenContext && (
          <Button variant="subtle" size="sm" onClick={onOpenContext} title="Details">
            <Info size={14} />
          </Button>
        )}
        <Button variant="subtle" size="sm" title="Session notes — coming soon" disabled>
          <FileText size={13} /> <span className="hidden sm:inline">Session notes</span>
        </Button>
        <Button variant="subtle" size="sm" title="More — coming soon" disabled>
          <MoreHorizontal size={14} />
        </Button>
      </div>

      {/* Message stream */}
      <div
        ref={streamRef}
        className="flex-1 overflow-y-auto min-h-0 px-4 md:px-8 py-5 md:py-7 flex flex-col gap-[18px]"
      >
        <SessionMarker text="Started this conversation 4 minutes ago" />

        {messages.map((msg, i) => (
          <ChatBubble
            key={i}
            role={msg.role}
            text={msg.text}
            style={chatStyle}
          />
        ))}

        {isTyping && <TypingIndicator />}
        {error && <FailedReply message={error} onRetry={() => requestCoachReply(messages)} />}
      </div>

      {/* Input bar */}
      <div className="border-t border-hairline px-4 md:px-6 pt-4 pb-5 bg-bg flex flex-col gap-2.5">
        {/* Quick-start chips */}
        <div className="flex flex-wrap gap-1.5">
          {QUICK_STARTERS.map((s, i) => (
            <button
              key={i}
              onClick={() => setDraft(s)}
              className="px-3 py-1.5 rounded-pill bg-surface border border-hairline text-[12.5px] text-ink-2 hover:bg-surface-2 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Text input row */}
        <div className="flex items-center gap-2.5 bg-surface border border-hairline-strong rounded-2xl px-[18px] py-2.5 pr-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKey}
            placeholder="What's on your mind? Take your time."
            className="flex-1 bg-transparent border-0 outline-none text-[14.5px] text-ink placeholder:text-ink-4 h-8"
          />
          <Button variant="subtle" size="sm" title="Attach file — coming soon" disabled>
            <Paperclip size={14} />
          </Button>
          <Button variant="subtle" size="sm" title="Voice note — coming soon" disabled>
            <Mic size={14} />
          </Button>
          <Button variant="primary" size="sm" onClick={send}>
            <Send size={13} />
          </Button>
        </div>

        {/* Hint row */}
        <div className="flex justify-between text-[11.5px] text-ink-4">
          <span>
            Press{" "}
            <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-surface-2 text-ink-3 border border-hairline">
              Enter
            </kbd>{" "}
            to send ·{" "}
            <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-surface-2 text-ink-3 border border-hairline">
              Shift+Enter
            </kbd>{" "}
            for a new line
          </span>
          <span>Private · only you and your coach</span>
        </div>
      </div>
    </div>
  )
}
