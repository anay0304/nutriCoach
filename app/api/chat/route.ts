import Anthropic from "@anthropic-ai/sdk"
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const anthropic = new Anthropic()

const BASE_SYSTEM_PROMPT = `You are Nouri, a warm and evidence-based nutrition coach. You help users build a healthier, more sustainable relationship with food through thoughtful conversation.

Guidelines:
- Ask one focused follow-up question per response
- Keep responses to 2–4 sentences
- Be encouraging and non-judgmental
- Never diagnose medical conditions or replace medical advice
- Draw on the user's goals to make your coaching relevant`

type AnthropicRole = "user" | "assistant"

// Anthropic requires: non-empty content, first message is "user", strictly alternating roles.
// DB messages may violate these rules (e.g. old coach messages at the start), so we sanitize.
function sanitizeForAnthropic(messages: { role: string; text: string }[]) {
  const mapped = messages
    .filter((m) => m.text?.trim())
    .map((m) => ({
      role: (m.role === "coach" ? "assistant" : "user") as AnthropicRole,
      content: m.text,
    }))

  // Drop leading assistant messages — Anthropic requires the first turn to be "user"
  const firstUser = mapped.findIndex((m) => m.role === "user")
  if (firstUser === -1) return []
  const trimmed = mapped.slice(firstUser)

  // Merge consecutive same-role messages into one (Anthropic requires strict alternation)
  const result: { role: AnthropicRole; content: string }[] = []
  for (const msg of trimmed) {
    const last = result[result.length - 1]
    if (last && last.role === msg.role) {
      last.content += "\n" + msg.content
    } else {
      result.push({ ...msg })
    }
  }

  return result
}

export async function POST(request: Request) {
  // Verify the user is logged in before touching the AI
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { messages } = await request.json()

  // Fetch this user's goals to personalise the system prompt
  const { data: goals } = await supabase
    .from("goals")
    .select("title, detail, cadence")
    .eq("user_id", user.id)

  const goalsSection =
    goals && goals.length > 0
      ? `\n\nThe user's current nutrition goals:\n${goals.map((g) => `- ${g.title}: ${g.detail} (${g.cadence})`).join("\n")}`
      : ""

  const systemPrompt = BASE_SYSTEM_PROMPT + goalsSection

  const sanitized = sanitizeForAnthropic(messages)

  if (sanitized.length === 0) {
    return NextResponse.json({ error: "No valid messages to send" }, { status: 400 })
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: systemPrompt,
      messages: sanitized,
    })

    const text =
      response.content[0].type === "text" ? response.content[0].text : ""

    return NextResponse.json({ text })
  } catch (err) {
    console.error("Anthropic API error:", err)
    return NextResponse.json({ error: "AI service error" }, { status: 500 })
  }
}
