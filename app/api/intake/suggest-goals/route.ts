import Anthropic from "@anthropic-ai/sdk"
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const anthropic = new Anthropic()

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { current, worked, friction, why } = await request.json()

  const contextLines = [
    current && `Current eating habits: ${current}`,
    worked && `What has worked before: ${worked}`,
    Array.isArray(friction) && friction.length > 0 && `Friction points: ${friction.join(", ")}`,
    why && `Their deeper motivation: ${why}`,
  ].filter(Boolean).join("\n")

  const prompt = `Based on this person's intake answers, suggest exactly 3 specific, achievable nutrition goals.

${contextLines || "No context provided — suggest well-rounded starter goals."}

Return ONLY a JSON array with exactly 3 goals. Each must have:
- "title": short goal name, max 8 words
- "detail": one specific, actionable sentence describing exactly what to do
- "cadence": how often (e.g. "Daily", "Mon–Fri", "4 nights / week")

Respond with only the JSON array, no other text.`

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    })

    const text = response.content[0].type === "text" ? response.content[0].text : ""
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) throw new Error("No JSON in response")
    const goals = JSON.parse(jsonMatch[0])

    return NextResponse.json({ goals })
  } catch (err) {
    console.error("Goal suggestion error:", err)
    return NextResponse.json({ error: "Failed to suggest goals" }, { status: 500 })
  }
}
