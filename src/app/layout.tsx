import type { Metadata, Viewport } from "next"

import { leguanFontVariables } from "@/lib/fonts"
import { TooltipProvider } from "@/components/ui/tooltip"

import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Model Tierlist",
  description: "Create and download tier lists for AI models",
  openGraph: {
    title: "AI Model Tierlist",
    description: "Create and download tier lists for AI models",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1280,
        height: 970,
        alt: "AI Model Tierlist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Model Tierlist",
    description: "Create and download tier lists for AI models",
    images: ["/og.png"],
  },
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
