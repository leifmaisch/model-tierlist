"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"

import { cn } from "@/lib/utils"
import type { AiModel, TierDefinition, TierId } from "@/data/ai-models"
import { ModelChip } from "./model-chip"

export function getTierDroppableId(tierId: TierId) {
  return `tier-${tierId}`
}

type TierRowProps = {
  tier: TierDefinition
  modelIds: string[]
  modelsById: Map<string, AiModel>
}

export function TierRow({
  tier,
  modelIds,
  modelsById,
}: TierRowProps) {
  const { setNodeRef, isOver } = useDroppable({ id: getTierDroppableId(tier.id) })

  return (
    <div className="grid min-h-14 grid-cols-[44px_1fr] overflow-hidden rounded-squircle-md border border-border sm:min-h-16 sm:grid-cols-[56px_1fr] md:min-h-[72px] md:grid-cols-[72px_1fr]">
      <div
        className="flex items-center justify-center text-lg font-bold sm:text-xl md:text-2xl"
        style={{
          backgroundColor: tier.color,
          color: tier.textColor,
        }}
      >
        {tier.label}
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-14 flex-wrap content-start gap-1.5 bg-background p-1.5 sm:min-h-16 sm:gap-2 sm:p-2 md:min-h-[72px]",
          isOver && "bg-muted/40"
        )}
      >
        <SortableContext items={modelIds} strategy={rectSortingStrategy}>
          {modelIds.map((modelId) => {
            const model = modelsById.get(modelId)
            if (!model) return null
            return <ModelChip key={modelId} model={model} />
          })}
        </SortableContext>
      </div>
    </div>
  )
}
