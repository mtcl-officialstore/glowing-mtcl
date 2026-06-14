export type ModelInfo = {
  id: string
  name: string
  provider: string
  description: string
}

export const MODELS: ModelInfo[] = [
  {
    id: "openai/gpt-5.2",
    name: "GPT-5.2",
    provider: "OpenAI",
    description: "Most capable, great for complex reasoning",
  },
  {
    id: "openai/gpt-5-mini",
    name: "GPT-5 Mini",
    provider: "OpenAI",
    description: "Fast and cost-efficient",
  },
  {
    id: "anthropic/claude-sonnet-4.6",
    name: "Claude Sonnet 4.6",
    provider: "Anthropic",
    description: "Balanced intelligence and speed",
  },
  {
    id: "anthropic/claude-opus-4.8",
    name: "Claude Opus 4.8",
    provider: "Anthropic",
    description: "Deep reasoning and writing",
  },
  {
    id: "google/gemini-3-pro-preview",
    name: "Gemini 3 Pro",
    provider: "Google",
    description: "Multimodal flagship model",
  },
  {
    id: "google/gemini-3-flash",
    name: "Gemini 3 Flash",
    provider: "Google",
    description: "Lightning fast responses",
  },
]

export const DEFAULT_MODEL = MODELS[0].id

export function getModel(id: string): ModelInfo {
  return MODELS.find((m) => m.id === id) ?? MODELS[0]
}
