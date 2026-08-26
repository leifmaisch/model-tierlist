"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ModelBrandIcon } from "./model-brand-icon"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getModelDisplayName, type AiModel } from "@/data/ai-models"

type ModelChipProps = {
  model: AiModel
  compact?: boolean
}

export function ModelChip({ model, compact = false }: ModelChipProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: model.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex cursor-grab touch-none items-center gap-2 rounded-squircle-md border border-border bg-card px-2 py-1.5 shadow-sm active:cursor-grabbing",
        isDragging && "z-50 opacity-60 ring-2 ring-ring/40",
        compact ? "min-w-[120px]" : "min-w-[140px]"
      )}
    >
      <ModelBrandIcon model={model} size={compact ? 20 : 24} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">{getModelDisplayName(model)}</p>
        {!compact && (
          <p className="truncate text-[10px] text-muted-foreground">
            {model.provider}
          </p>
        )}
      </div>
    </div>
  )
}

export function ModelChipOverlay({ model }: { model: AiModel }) {
  return (
    <div className="flex min-w-[140px] items-center gap-2 rounded-squircle-md border border-ring bg-card px-2 py-1.5 shadow-lg ring-2 ring-ring/30">
      <ModelBrandIcon model={model} size={24} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">{getModelDisplayName(model)}</p>
        <Badge variant="secondary" className="mt-0.5 h-4 px-1 text-[9px]">
          {model.provider}
        </Badge>
      </div>
    </div>
  )
}
