import { createClient } from "@/lib/supabase/client"
import type { Session } from "@/types"

function formatDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000)
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

function toSession(row: {
  id: string
  title: string
  type: string
  duration: number
  preview: string
  created_at: string
}): Session {
  return {
    id: row.id,
    title: row.title,
    date: formatDate(row.created_at),
    type: row.type as Session["type"],
    duration: row.duration,
    preview: row.preview,
  }
}

export async function getSessions(): Promise<Session[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from("sessions")
    .select("id, title, type, duration, preview, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (data ?? []).map(toSession)
}

export async function createSession(
  title: string,
  type: Session["type"] = "session"
): Promise<Session | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from("sessions")
    .insert({ user_id: user.id, title, type, preview: "New conversation" })
    .select("id, title, type, duration, preview, created_at")
    .single()

  return data ? toSession(data) : null
}
