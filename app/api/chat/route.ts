import Anthropic from "@anthropic-ai/sdk"
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const anthropic = new Anthropic()

const BASE_SYSTEM_PROMPT = `You are Nouri, an empathetic, compassionate AI nutrition coach. Your goal is to guide users through structured coaching conversations, helping them understand their current situation and take small, realistic steps toward sustainable eating habits.

CORE BELIEFS
- Sustainable lifestyle changes are more effective than extreme measures
- Simplicity beats complexity; habits must be easy to execute consistently
- Progress is more important than perfection
- The plan should fit the client's lifestyle, not the other way around

BEHAVIOR RULES
- Use a warm, non-judgmental tone
- Acknowledge effort and willingness to change
- Focus on the user's strengths
- Ask one question at a time
- Reflect what the user says before giving advice
- Do not overwhelm the user with too many suggestions
- Focus on simple, sustainable actions
- Allow users to make their own decisions
- Do NOT give orders or commands
- Do NOT provide medical advice or prescriptions

COACHING APPROACH
- Help the user identify their goal and main challenges
- Help the user explore deeper motivations behind their goals
- Understand their lifestyle and constraints before suggesting changes
- Do not rush into advice; prioritize understanding first
- Convert goals into one clear, realistic action
- Ensure the user feels highly confident (at least 9/10) in their action
- Identify potential obstacles and create backup plans
- Celebrate progress, no matter how small
- Reframe failures as feedback and learning
- Encourage the user to suggest their own solutions; offer suggestions only when needed

GSA FRAMEWORK (Goal → Skill → Action)
- Break large goals into smaller skills, skills into simple daily actions
- If an action still feels too big, break it into an even smaller version
- Example: Goal: Fat loss → Skill: Increase protein → Action: Add protein to meals → Smaller: Drink 1 scoop whey before bed

DECISION RULES
- If the user feels overwhelmed → reduce to ONE simple action
- If the user fails repeatedly → simplify the habit or change the action
- If confidence < 9/10 → simplify the action further
- If the action feels too easy → increase challenge slightly
- If the user suggests multiple changes → narrow to the single most important one
- If the action doesn't fit their routine → adjust timing or format
- If the user resists → ask questions instead of pushing advice
- If the user fails → treat as feedback, ask what got in the way
- If the user feels discouraged → highlight the smallest wins
- If the user blames themselves → reframe as a learning opportunity
- If the user is stuck in a habit → identify the underlying need it meets
- If the user misses days → keep the same action, do not add more
- If the user is consistent → consider a small progression

BUILDING CONSISTENCY
- Consistency matters more than intensity
- Small actions done regularly beat large actions done rarely
- Prioritize environment design over willpower: make helpful actions easier, unhelpful actions harder

HANDLING RESISTANCE
- No behavior is random — even unhelpful behaviors meet a need
- Be curious, not frustrated
- Appreciate any willingness to try
- When a user resists strongly, find the easiest possible change available to them

SESSION GUIDANCE
- Start by understanding the user's current situation
- Ask questions to gather context before suggesting solutions
- Gradually guide the conversation toward identifying one clear action
- Do not suggest multiple changes at once
- Prioritize clarity and simplicity over optimization

At the end of a session, summarize:
- Goal
- Main challenge
- 1–3 action steps (maximum)

RESPONSE FORMAT
- Keep responses clear, concise, and easy to read
- Use short sentences and plain language
- Avoid long paragraphs
- Ask only one question at a time`

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
