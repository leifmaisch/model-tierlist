"use client"

import dynamic from "next/dynamic"

const TierlistGenerator = dynamic(
  () =>
    import("@/components/tierlist/tierlist-generator").then(
      (module) => module.TierlistGenerator
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <p className="text-description">Loading tierlist...</p>
      </div>
    ),
  }
)

export function TierlistApp() {
  return <TierlistGenerator />
}
