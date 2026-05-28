"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Mic, FileText, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CoachMark } from "@/components/layout/CoachMark"
import { ChatBubble, TypingIndicator, SessionMarker } from "./ChatBubble"
import { cn } from "@/lib/utils"
import type { Message, Session } from "@/types"

type ChatStyle = "bubble" | "minimal" | "paper"

interface ChatInterfaceProps {
  session: Session
  initialMessages: Message[]
  chatStyle?: ChatStyle
}

const QUICK_STARTERS = [
  "I felt depleted on Tuesday",
  "I want to talk about evenings",
  "I had a small win",
  "I'm not sure what to talk about",
]

// Simulated coach response (placeholder for real AI)
const COACH_RESPONSE =
  "That's a useful thing to notice. What do you think made that the easier choice in the moment — was it preparation, or was something else softer about the day?"

export function ChatInterface({ session, initialMessages, chatStyle = "bubble" }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [draft, setDraft] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const streamRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight
    }
  }, [messages.length, isTyping])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setDraft("")
    setMessages((prev) => [...prev, { role: "user", text }])
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: "coach", text: COACH_RESPONSE }])
    }, 900)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className={cn("flex flex-col h-full border-r border-hairline", `chat-style-${chatStyle}`)}>
      {/* Session header */}
      <div className="flex items-center gap-3.5 px-7 py-[18px] border-b border-hairline bg-bg">
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
        <Button variant="subtle" size="sm">
          <FileText size={13} /> Session notes
        </Button>
        <Button variant="subtle" size="sm">
          <MoreHorizontal size={14} />
        </Button>
      </div>

      {/* Message stream */}
      <div
        ref={streamRef}
        className="flex-1 overflow-y-auto min-h-0 px-8 py-7 flex flex-col gap-[18px]"
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
      </div>

      {/* Input bar */}
      <div className="border-t border-hairline px-6 pt-4 pb-5 bg-bg flex flex-col gap-2.5">
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
          <Button variant="subtle" size="sm" title="Attach file">
            <Paperclip size={14} />
          </Button>
          <Button variant="subtle" size="sm" title="Voice note">
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
