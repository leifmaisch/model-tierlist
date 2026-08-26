import { ModelBrandIcon } from "./model-brand-icon"

import { getModelDisplayName, type AiModel, type TierDefinition } from "@/data/ai-models"

type StaticModelChipProps = {
  model: AiModel
}

export function StaticModelChip({ model }: StaticModelChipProps) {
  return (
    <div className="flex min-w-[120px] items-center gap-2 rounded-md border border-white/10 bg-[#1f1f1f] px-2 py-1.5">
      <ModelBrandIcon model={model} size={20} />
      <p className="truncate text-xs font-medium text-white">
        {getModelDisplayName(model)}
      </p>
    </div>
  )
}

type StaticTierRowProps = {
  tier: TierDefinition
  modelIds: string[]
  modelsById: Map<string, AiModel>
}

export function StaticTierRow({
  tier,
  modelIds,
  modelsById,
}: StaticTierRowProps) {
  return (
    <div className="grid min-h-[72px] grid-cols-[72px_1fr] overflow-hidden">
      <div
        className="flex items-center justify-center text-2xl font-bold"
        style={{
          backgroundColor: tier.color,
          color: tier.textColor,
        }}
      >
        {tier.label}
      </div>
      <div className="flex min-h-[72px] flex-wrap content-start gap-2 bg-[#141414] p-2">
        {modelIds.map((modelId) => {
          const model = modelsById.get(modelId)
          if (!model) return null
          return <StaticModelChip key={modelId} model={model} />
        })}
      </div>
    </div>
  )
}
