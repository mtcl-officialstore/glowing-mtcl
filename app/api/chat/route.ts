import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { MODELS, DEFAULT_MODEL } from "@/lib/models"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are Nova, a helpful, knowledgeable, and friendly AI assistant.
You can answer questions on any topic, help write and explain code, brainstorm ideas, summarize text, and more.

Guidelines:
- Be clear, accurate, and concise. Expand with detail when the question warrants it.
- Use Markdown formatting: headings, bullet points, tables, and fenced code blocks with language tags.
- When writing code, prefer complete, runnable examples and explain the key parts.
- If you are unsure or a question is ambiguous, say so and ask a brief clarifying question.
- Never fabricate facts. If you do not know something, say so.`

export async function POST(req: Request) {
  const { messages, model }: { messages: UIMessage[]; model?: string } = await req.json()

  const selectedModel = MODELS.some((m) => m.id === model) ? (model as string) : DEFAULT_MODEL

  const result = streamText({
    model: selectedModel,
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
