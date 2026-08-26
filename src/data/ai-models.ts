export type AiModel = {
  id: string
  provider: string
  modelKey: string
  tag?: string
  icon?: "cursor" | "opencode"
}

export function getModelDisplayName(model: AiModel): string {
  return model.tag ? `${model.modelKey} ${model.tag}` : model.modelKey
}

export const AI_MODELS: AiModel[] = [
  { id: "gpt-5", provider: "OpenAI", modelKey: "gpt-5" },
  { id: "gpt-4o", provider: "OpenAI", modelKey: "gpt-4o" },
  { id: "gpt-4-turbo", provider: "OpenAI", modelKey: "gpt-4-turbo" },
  { id: "o3", provider: "OpenAI", modelKey: "o3" },
  { id: "o1", provider: "OpenAI", modelKey: "o1" },
  { id: "claude-opus-4", provider: "Anthropic", modelKey: "claude-opus-4-20250514" },
  { id: "claude-sonnet-4", provider: "Anthropic", modelKey: "claude-sonnet-4-20250514" },
  { id: "claude-3-5-sonnet", provider: "Anthropic", modelKey: "claude-3-5-sonnet-20241022" },
  { id: "claude-3-opus", provider: "Anthropic", modelKey: "claude-3-opus-20240229" },
  { id: "gemini-2-5-pro", provider: "Google", modelKey: "gemini-2.5-pro" },
  { id: "gemini-2-0-flash", provider: "Google", modelKey: "gemini-2.0-flash" },
  { id: "gemini-1-5-pro", provider: "Google", modelKey: "gemini-1.5-pro" },
  { id: "grok-3", provider: "xAI", modelKey: "grok-3" },
  { id: "grok-2", provider: "xAI", modelKey: "grok-2" },
  { id: "deepseek-v3", provider: "DeepSeek", modelKey: "deepseek-v3" },
  { id: "deepseek-r1", provider: "DeepSeek", modelKey: "deepseek-r1" },
  { id: "deepseek-v4", provider: "DeepSeek", modelKey: "deepseek-v4" },
  { id: "deepseek-v4-lite", provider: "DeepSeek", modelKey: "deepseek-v4-lite" },
  { id: "llama-3-3-70b", provider: "Meta", modelKey: "llama-3.3-70b-instruct" },
  { id: "llama-3-1-405b", provider: "Meta", modelKey: "llama-3.1-405b-instruct" },
  { id: "llama-3-1-70b", provider: "Meta", modelKey: "llama-3.1-70b-instruct" },
  { id: "mistral-large", provider: "Mistral", modelKey: "mistral-large-latest" },
  { id: "mistral-medium", provider: "Mistral", modelKey: "mistral-medium-latest" },
  { id: "codestral", provider: "Mistral", modelKey: "codestral-latest" },
  { id: "pixtral-large", provider: "Mistral", modelKey: "pixtral-large-latest" },
  { id: "qwen-2-5-72b", provider: "Alibaba", modelKey: "qwen-2.5-72b-instruct" },
  { id: "qwen-max", provider: "Alibaba", modelKey: "qwen-max" },
  { id: "qwq-32b", provider: "Alibaba", modelKey: "qwq-32b" },
  { id: "command-r-plus", provider: "Cohere", modelKey: "command-r-plus-08-2024" },
  { id: "command-r", provider: "Cohere", modelKey: "command-r-08-2024" },
  { id: "phi-4", provider: "Microsoft", modelKey: "phi-4" },
  { id: "phi-3-5", provider: "Microsoft", modelKey: "phi-3.5-mini-instruct" },
  { id: "sonar-pro", provider: "Perplexity", modelKey: "sonar-pro" },
  { id: "sonar", provider: "Perplexity", modelKey: "sonar" },
  { id: "kimi-k2", provider: "Moonshot", modelKey: "kimi-k2" },
  { id: "kimi", provider: "Moonshot", modelKey: "moonshot-v1-128k" },
  { id: "yi-large", provider: "01.AI", modelKey: "yi-large" },
  { id: "internlm-2-5", provider: "Shanghai AI Lab", modelKey: "internlm2.5-latest" },
  { id: "glm-5", provider: "Z.ai", modelKey: "glm-5" },
  { id: "glm-5-3", provider: "Z.ai", modelKey: "glm-5.3" },
  {
    id: "glm-5-3-flash-ox",
    provider: "OpenCode",
    modelKey: "glm-5.3-flash",
    tag: "(ox code)",
    icon: "opencode",
  },
  { id: "glm-5-plus", provider: "Z.ai", modelKey: "glm-5-plus" },
  { id: "glm-5-flash", provider: "Z.ai", modelKey: "glm-5-flash" },
  { id: "glm-4-7", provider: "Z.ai", modelKey: "glm-4.7" },
  { id: "glm-4-plus", provider: "Z.ai", modelKey: "glm-4-plus" },
  { id: "chatglm-4", provider: "Z.ai", modelKey: "glm-4" },
  { id: "doubao-pro", provider: "ByteDance", modelKey: "doubao-pro-256k" },
  { id: "hunyuan-pro", provider: "Tencent", modelKey: "hunyuan-pro" },
  { id: "ernie-4", provider: "Baidu", modelKey: "ernie-4.0-8k" },
  { id: "jamba-1-5", provider: "AI21", modelKey: "jamba-1.5-large" },
  { id: "solar-pro", provider: "Upstage", modelKey: "solar-pro" },
  { id: "nova-pro", provider: "Amazon", modelKey: "amazon.nova-pro-v1:0" },
  { id: "granite-3", provider: "IBM", modelKey: "granite-3.0-8b-instruct" },
  { id: "dbrx", provider: "Databricks", modelKey: "databricks-dbrx-instruct" },
  { id: "mixtral-8x22b", provider: "Mistral", modelKey: "mixtral-8x22b-instruct" },
  { id: "wizardlm-2", provider: "Microsoft", modelKey: "wizardlm-2-8x22b" },
  { id: "v0-1-5", provider: "Vercel", modelKey: "v0-1.5-md" },
  { id: "composer-1", provider: "Cursor", modelKey: "composer-1", icon: "cursor" },
  { id: "composer-2-5", provider: "Cursor", modelKey: "composer-2.5", icon: "cursor" },
  {
    id: "composer-2-5-fast",
    provider: "Cursor",
    modelKey: "composer-2.5-fast",
    icon: "cursor",
  },
  { id: "sora", provider: "OpenAI", modelKey: "sora" },
  { id: "flux-pro", provider: "Black Forest Labs", modelKey: "flux-pro" },
  { id: "stable-diffusion-3", provider: "Stability AI", modelKey: "stable-diffusion-3-medium" },
]

export const TIER_IDS = ["S", "A", "B", "C", "D", "F"] as const

export type TierId = (typeof TIER_IDS)[number]

export type TierDefinition = {
  id: TierId
  label: string
  color: string
  textColor: string
}

export const TIERS: TierDefinition[] = [
  { id: "S", label: "S", color: "#ff7f7f", textColor: "#1a1a1a" },
  { id: "A", label: "A", color: "#ffbf7f", textColor: "#1a1a1a" },
  { id: "B", label: "B", color: "#ffdf7f", textColor: "#1a1a1a" },
  { id: "C", label: "C", color: "#ffff7f", textColor: "#1a1a1a" },
  { id: "D", label: "D", color: "#bfff7f", textColor: "#1a1a1a" },
  { id: "F", label: "F", color: "#ff7f7f", textColor: "#1a1a1a" },
]

export const POOL_ID = "pool" as const

export type ContainerId = TierId | typeof POOL_ID

export function createInitialBoard(): Record<ContainerId, string[]> {
  return {
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    F: [],
    pool: AI_MODELS.map((model) => model.id),
  }
}

export function getModelById(id: string): AiModel | undefined {
  return AI_MODELS.find((model) => model.id === id)
}
