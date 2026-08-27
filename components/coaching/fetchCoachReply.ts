import type { Message } from "@/types"

export async function fetchCoachReply(messages: Message[]): Promise<string> {
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
