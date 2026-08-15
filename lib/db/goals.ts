import { createClient } from "@/lib/supabase/client"
import type { Goal } from "@/types"

export async function getGoals(): Promise<Goal[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from("goals")
    .select("id, title, detail, cadence, progress")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })

  return data ?? []
}

export async function updateGoalProgress(id: string, progress: number): Promise<void> {
  const supabase = createClient()
  await supabase.from("goals").update({ progress }).eq("id", id)
}

export async function saveGoals(goals: Omit<Goal, "id">[]): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Don't save if goals already exist — prevents duplicates if intake is run twice
  const { count } = await supabase
    .from("goals")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)

  if (count && count > 0) return

  await supabase.from("goals").insert(
    goals.map((g) => ({
      user_id: user.id,
      title: g.title,
      detail: g.detail,
      cadence: g.cadence,
      progress: g.progress,
    }))
  )
}
