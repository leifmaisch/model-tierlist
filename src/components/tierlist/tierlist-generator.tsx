"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable"
import { ModelBrandIcon } from "./model-brand-icon"
import { toPng } from "html-to-image"
import { Download, RotateCcw, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AI_MODELS,
  POOL_ID,
  TIERS,
  createInitialBoard,
  getModelById,
  getModelDisplayName,
  type AiModel,
  type ContainerId,
} from "@/data/ai-models"
import { cn } from "@/lib/utils"
import { ModelChip, ModelChipOverlay } from "./model-chip"
import { StaticTierRow } from "./export-preview"
import { TierRow } from "./tier-row"

const EXPORT_TITLE = "AI Model Tierlist"
const TIER_BOARD_FALLBACK_HEIGHT = 472

function findContainer(
  board: Record<ContainerId, string[]>,
  itemId: string
): ContainerId | undefined {
  for (const [containerId, items] of Object.entries(board) as [
    ContainerId,
    string[],
  ][]) {
    if (items.includes(itemId)) return containerId
  }
  return undefined
}

function isContainerId(value: string): value is ContainerId {
  return value === POOL_ID || TIERS.some((tier) => tier.id === value)
}

export function TierlistGenerator() {
  const [board, setBoard] = useState(createInitialBoard)
  const [search, setSearch] = useState("")
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [tierBoardHeight, setTierBoardHeight] = useState(TIER_BOARD_FALLBACK_HEIGHT)
  const exportRef = useRef<HTMLDivElement>(null)
  const tierBoardRef = useRef<HTMLDivElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  )

  const modelsById = useMemo(
    () => new Map(AI_MODELS.map((model) => [model.id, model])),
    []
  )

  const filteredPoolIds = useMemo(() => {
    const query = search.trim().toLowerCase()
    return board.pool.filter((modelId) => {
      const model = modelsById.get(modelId)
      if (!model) return false
      const label = getModelDisplayName(model).toLowerCase()
      if (!query) return true
      return (
        label.includes(query) ||
        model.modelKey.toLowerCase().includes(query) ||
        model.provider.toLowerCase().includes(query) ||
        model.tag?.toLowerCase().includes(query)
      )
    })
  }, [board.pool, modelsById, search])

  const activeModel = activeId ? getModelById(activeId) : undefined
  const rankedCount = TIERS.reduce(
    (total, tier) => total + board[tier.id].length,
    0
  )

  useEffect(() => {
    const node = tierBoardRef.current
    if (!node) return

    const updateHeight = () => {
      setTierBoardHeight(node.getBoundingClientRect().height)
    }

    updateHeight()

    const observer = new ResizeObserver(updateHeight)
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeItemId = String(active.id)
    const overId = String(over.id)

    setBoard((current) => {
      const activeContainer = findContainer(current, activeItemId)
      if (!activeContainer) return current

      let overContainer = findContainer(current, overId)
      if (!overContainer && isContainerId(overId)) {
        overContainer = overId
      }
      if (!overContainer) return current

      if (activeContainer === overContainer) {
        const items = current[activeContainer]
        const oldIndex = items.indexOf(activeItemId)
        const newIndex = items.indexOf(overId)
        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
          return current
        }
        return {
          ...current,
          [activeContainer]: arrayMove(items, oldIndex, newIndex),
        }
      }

      const activeItems = [...current[activeContainer]]
      const overItems = [...current[overContainer]]
      const activeIndex = activeItems.indexOf(activeItemId)
      if (activeIndex === -1) return current

      activeItems.splice(activeIndex, 1)

      const overIndex = overItems.indexOf(overId)
      if (overIndex >= 0) {
        overItems.splice(overIndex, 0, activeItemId)
      } else {
        overItems.push(activeItemId)
      }

      return {
        ...current,
        [activeContainer]: activeItems,
        [overContainer]: overItems,
      }
    })
  }

  function handleReset() {
    setBoard(createInitialBoard())
    setSearch("")
  }

  async function handleDownload() {
    if (!exportRef.current) return
    setIsExporting(true)
    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#141414",
      })
      const link = document.createElement("a")
      link.download = "ai-model-tierlist.png"
      link.href = dataUrl
      link.click()
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-heading-xl">AI Model Tierlist</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" shape="squircle" onClick={handleReset}>
            <RotateCcw />
            Reset
          </Button>
          <Button
            shape="squircle"
            onClick={handleDownload}
            disabled={isExporting || rankedCount === 0}
          >
            <Download />
            {isExporting ? "Exporting..." : "Download PNG"}
          </Button>
        </div>
      </div>

      <DndContext
        id="tierlist-board"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <Card>
            <CardHeader className="items-center">
              <CardTitle>Models ({board.pool.length})</CardTitle>
              <CardAction className="w-full max-w-xs self-center sm:max-w-[220px]">
                <div className="grid w-full [&>*]:col-start-1 [&>*]:row-start-1">
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search..."
                    className="h-8 w-full pl-8"
                  />
                  <div className="pointer-events-none z-10 flex h-8 w-8 items-center justify-center">
                    <Search className="size-3.5 text-muted-foreground" />
                  </div>
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <PoolDropZone
                modelIds={filteredPoolIds}
                modelsById={modelsById}
                maxHeight={tierBoardHeight}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tier Board</CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={tierBoardRef} className="space-y-2">
                {TIERS.map((tier) => (
                  <TierRow
                    key={tier.id}
                    tier={tier}
                    modelIds={board[tier.id]}
                    modelsById={modelsById}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <DragOverlay>
          {activeModel ? <ModelChipOverlay model={activeModel} /> : null}
        </DragOverlay>
      </DndContext>

      <Card>
        <CardHeader>
          <CardTitle>PNG Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-squircle-lg border border-border bg-[#141414] p-4">
            <div ref={exportRef} className="min-w-[640px] space-y-0">
              <div className="border-b border-white/10 px-4 py-3">
                <p className="text-lg font-semibold text-white">
                  {EXPORT_TITLE} ({rankedCount})
                </p>
              </div>
              {TIERS.map((tier) => (
                <StaticTierRow
                  key={`export-${tier.id}`}
                  tier={tier}
                  modelIds={board[tier.id]}
                  modelsById={modelsById}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Models</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {AI_MODELS.map((model) => (
              <div
                key={model.id}
                className="flex items-center gap-2 rounded-squircle-md border border-border bg-card/50 px-2 py-2"
              >
                <ModelBrandIcon model={model} size={22} />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">
                    {getModelDisplayName(model)}
                  </p>
                  <Badge variant="secondary" className="mt-0.5 h-4 px-1 text-[9px]">
                    {model.provider}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PoolDropZone({
  modelIds,
  modelsById,
  maxHeight,
}: {
  modelIds: string[]
  modelsById: Map<string, AiModel>
  maxHeight: number
}) {
  const { setNodeRef, isOver } = useDroppable({ id: POOL_ID })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "overflow-hidden rounded-squircle-md border border-dashed border-border bg-muted/20",
        isOver && "border-ring bg-muted/40"
      )}
    >
      <ScrollArea style={{ height: maxHeight }}>
        <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2">
          <SortableContext items={modelIds} strategy={rectSortingStrategy}>
            {modelIds.length === 0 ? (
              <p className="col-span-full py-8 text-center text-caption">
                No models match your search.
              </p>
            ) : (
              modelIds.map((modelId) => {
                const model = modelsById.get(modelId)
                if (!model) return null
                return <ModelChip key={modelId} model={model} />
              })
            )}
          </SortableContext>
        </div>
      </ScrollArea>
    </div>
  )
}
