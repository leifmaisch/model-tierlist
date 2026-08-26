"use client"

import { Cursor, ModelIcon, OpenCode } from "@lobehub/icons"

import type { AiModel } from "@/data/ai-models"

type ModelBrandIconProps = {
  model: AiModel
  size?: number
}

export function ModelBrandIcon({ model, size = 24 }: ModelBrandIconProps) {
  if (model.icon === "cursor") {
    return <Cursor.Avatar size={size} />
  }

  if (model.icon === "opencode") {
    return <OpenCode.Avatar size={size} />
  }

  return <ModelIcon model={model.modelKey} size={size} type="color" />
}
