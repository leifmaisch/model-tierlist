import type { Metadata, Viewport } from "next"

import { leguanFontVariables } from "@/lib/fonts"
import { TooltipProvider } from "@/components/ui/tooltip"

import "./globals.css"

export const metadata: Metadata = {
  title: "AI Model Tierlist",
  description: "Create and download tier lists for AI models",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${leguanFontVariables} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-background">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
