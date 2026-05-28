import { cn } from "@/lib/utils"
import { CoachMark } from "@/components/layout/CoachMark"

type ChatStyle = "bubble" | "minimal" | "paper"

interface ChatBubbleProps {
  role: "coach" | "user"
  text: string
  style?: ChatStyle
}

export function ChatBubble({ role, text, style = "bubble" }: ChatBubbleProps) {
  const isCoach = role === "coach"

  const bubbleClass = cn(
    "px-[18px] py-3.5 text-[14.5px] leading-[1.55] rounded-[18px]",
    // Bubble style (default)
    style === "bubble" && isCoach && "bg-surface border border-hairline text-ink rounded-bl-[6px]",
    style === "bubble" && !isCoach && "bg-ink text-[#efe7d4] rounded-br-[6px]",
    // Minimal style
    style === "minimal" && isCoach && "bg-transparent border-transparent px-0 pr-8 text-ink",
    style === "minimal" && !isCoach && "bg-surface-2 text-ink",
    // Paper style
    style === "paper" && isCoach && "bg-[#fffbf2] border border-hairline rounded-[4px] font-serif text-base",
    style === "paper" && !isCoach && "bg-amber-soft text-amber-ink rounded-[4px]",
  )

  return (
    <div className={cn("flex gap-3 max-w-[720px]", isCoach ? "self-start" : "self-end flex-row-reverse")}>
      {isCoach && <CoachMark size="xs" />}
      <div className={bubbleClass}>{text}</div>
    </div>
  )
}

// Animated "typing" indicator
export function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-[720px] self-start">
      <CoachMark size="xs" />
      <div className="bg-surface border border-hairline rounded-[18px] rounded-bl-[6px] px-[18px] py-4 flex items-center gap-1">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="w-1.5 h-1.5 rounded-full bg-ink-4 inline-block"
            style={{ animation: `typing 1s ${delay}ms infinite ease-in-out` }}
          />
        ))}
      </div>
    </div>
  )
}

// Date divider marker
export function SessionMarker({ text }: { text: string }) {
  return (
    <div className="self-center flex items-center gap-3 text-ink-4 text-[11.5px] py-2"
         style={{ fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
      <span className="w-10 h-px bg-hairline" />
      <span>{text}</span>
      <span className="w-10 h-px bg-hairline" />
    </div>
  )
}
