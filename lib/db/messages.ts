import { createClient } from "@/lib/supabase/client"
import type { Message } from "@/types"

export async function getMessages(sessionId: string): Promise<Message[]> {
  const supabase = createClient()

  const { data } = await supabase
    .from("messages")
    .select("role, content")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })

  return (data ?? []).map((m) => ({ role: m.role as Message["role"], text: m.content }))
}

export async function saveMessage(
  sessionId: string,
  role: "coach" | "user",
  text: string
): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from("messages").insert({
    session_id: sessionId,
    user_id: user.id,
    role,
    content: text,
  })
}
