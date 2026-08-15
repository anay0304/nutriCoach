import Anthropic from "@anthropic-ai/sdk"
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const anthropic = new Anthropic()

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { sessionId, messages } = await request.json()

  if (!sessionId || !messages || messages.length < 4) {
    return NextResponse.json({ skipped: true })
  }

  const transcript = messages
    .map((m: { role: string; text: string }) =>
      `${m.role === "coach" ? "Nouri" : "User"}: ${m.text}`
    )
    .join("\n")

  const prompt = `Summarize this coaching conversation with:
1. title: 4–7 words, no quotes, natural phrase (e.g. "Check-in: navigating busy weeks", "When the plan meets reality", "Identifying your why")
2. preview: one sentence, ~15–25 words, what was discussed or realised

Conversation:
${transcript}

Reply with ONLY valid JSON, no other text: {"title": "...", "preview": "..."}`

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 120,
      messages: [{ role: "user", content: prompt }],
    })

    const raw = response.content[0].type === "text" ? response.content[0].text : ""
    const match = raw.match(/\{[\s\S]*\}/)
    if (!match) throw new Error("No JSON in response")
    const { title, preview } = JSON.parse(match[0])

    await supabase
      .from("sessions")
      .update({ title, preview })
      .eq("id", sessionId)
      .eq("user_id", user.id)

    return NextResponse.json({ title, preview })
  } catch (err) {
    console.error("Session summarize error:", err)
    return NextResponse.json({ error: "Failed to summarize" }, { status: 500 })
  }
}
