"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"

import { cn } from "@/lib/utils"
import type { AiModel, TierDefinition } from "@/data/ai-models"
import { ModelChip } from "./model-chip"

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
  const { setNodeRef, isOver } = useDroppable({ id: tier.id })

  return (
    <div className="grid min-h-[72px] grid-cols-[72px_1fr] overflow-hidden rounded-squircle-md border border-border">
      <div
        className="flex items-center justify-center text-2xl font-bold"
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
          "flex min-h-[72px] flex-wrap content-start gap-2 bg-background p-2",
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
