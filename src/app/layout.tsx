import type { Metadata } from "next"

import { leguanFontVariables } from "@/lib/fonts"
import { TooltipProvider } from "@/components/ui/tooltip"

import "./globals.css"

export const metadata: Metadata = {
  title: "AI Model Tierlist",
  description: "Create and download tier lists for AI models",
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
      <body className="min-h-full flex flex-col bg-background">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
