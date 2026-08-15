import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST() {
  const demoEmail = process.env.DEMO_EMAIL
  const demoPassword = process.env.DEMO_PASSWORD

  if (!demoEmail || !demoPassword) {
    return NextResponse.json({ error: "Demo not configured" }, { status: 503 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase.auth.signInWithPassword({
    email: demoEmail,
    password: demoPassword,
  })

  if (error || !data.session) {
    console.error("Demo login error:", error)
    return NextResponse.json({ error: "Demo login failed" }, { status: 500 })
  }

  return NextResponse.json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  })
}
