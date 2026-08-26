type AnthropicRole = "user" | "assistant"

// Anthropic requires: non-empty content, first message is "user", strictly alternating roles.
// DB messages may violate these rules (e.g. old coach messages at the start), so we sanitize.
export function sanitizeForAnthropic(messages: { role: string; text: string }[]) {
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
