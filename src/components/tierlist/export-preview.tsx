import { useEffect, useRef, useState, type RefObject, type ReactNode } from "react"

import { ModelBrandIcon } from "./model-brand-icon"

import { getModelDisplayName, type AiModel, type TierDefinition } from "@/data/ai-models"

const EXPORT_WIDTH = 640

type ExportPreviewScalerProps = {
  exportRef: RefObject<HTMLDivElement | null>
  children: ReactNode
}

export function ExportPreviewScaler({
  exportRef,
  children,
}: ExportPreviewScalerProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState({ scale: 1, height: 0 })

  useEffect(() => {
    const frame = frameRef.current
    const content = exportRef.current
    if (!frame || !content) return

    const update = () => {
      const scale = Math.min(1, frame.clientWidth / EXPORT_WIDTH)
      const height = content.getBoundingClientRect().height * scale
      setLayout({ scale, height })
    }

    update()

    const observer = new ResizeObserver(update)
    observer.observe(frame)
    observer.observe(content)

    return () => observer.disconnect()
  }, [exportRef])

  return (
    <div
      ref={frameRef}
      className="w-full overflow-hidden"
      style={{ height: layout.height || undefined }}
    >
      <div
        className="origin-top-left"
        style={{
          width: EXPORT_WIDTH,
          transform: `scale(${layout.scale})`,
        }}
      >
        <div ref={exportRef} className="w-[640px] space-y-0">
          {children}
        </div>
      </div>
    </div>
  )
}

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
