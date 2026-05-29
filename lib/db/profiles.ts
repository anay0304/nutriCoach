import { createClient } from "@/lib/supabase/client"

export interface Profile {
  id: string
  name: string | null
  full_name: string | null
  created_at: string
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from("profiles")
    .select("id, name, full_name, created_at")
    .eq("id", user.id)
    .single()

  return data ?? null
}
