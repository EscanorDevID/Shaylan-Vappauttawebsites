import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { CursorSpotlight } from "@/components/cursor-spotlight"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { TopProgressBar } from "@/components/top-progress-bar"
import { PageTransition } from "@/components/page-transition"
import AppearOnMount from "@/components/appear-on-mount"

export const metadata: Metadata = {
  title: "Vappautta Liberty's - Touhou Project",
  description: "Explore the magical world of Touhou Project",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Suspense fallback={null}>
            <CursorSpotlight />
            <TopProgressBar />
            <Navbar />
            <MobileNav />
            <main className="pt-16 pb-20 md:pb-0">
              <AppearOnMount>
                <PageTransition>{children}</PageTransition>
              </AppearOnMount>
            </main>
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
