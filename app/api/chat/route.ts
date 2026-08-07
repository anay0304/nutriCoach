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

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: systemPrompt,
    messages: messages.map((m: { role: string; text: string }) => ({
      role: m.role === "coach" ? "assistant" : "user",
      content: m.text,
    })),
  })

  const text =
    response.content[0].type === "text" ? response.content[0].text : ""

  return NextResponse.json({ text })
}
