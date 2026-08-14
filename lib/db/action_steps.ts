import { createClient } from "@/lib/supabase/client"
import type { ActionStep } from "@/types"

export async function getLatestActionSteps(): Promise<ActionStep[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from("action_steps")
    .select("id, text, done, session_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })

  if (!data || data.length === 0) return []

  // Show steps from the most recently active session
  const latestSessionId = [...data].reverse()[0].session_id
  return data
    .filter((s) => s.session_id === latestSessionId)
    .map((s) => ({ id: s.id, text: s.text, done: s.done }))
}

export async function toggleActionStep(id: string, done: boolean): Promise<void> {
  const supabase = createClient()
  await supabase.from("action_steps").update({ done }).eq("id", id)
}

export async function addActionStep(text: string): Promise<ActionStep | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Attach to the user's most recent session
  const { data: session } = await supabase
    .from("sessions")
    .select("id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (!session) return null

  const { data } = await supabase
    .from("action_steps")
    .insert({ user_id: user.id, session_id: session.id, text, done: false })
    .select("id, text, done")
    .single()

  return data ? { id: data.id, text: data.text, done: data.done } : null
}
