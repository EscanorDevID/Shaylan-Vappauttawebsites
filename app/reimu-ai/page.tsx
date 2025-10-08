"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ReimuAIUnavailable() {
  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
      <Card className="max-w-xl w-full bg-background/60 backdrop-blur border-border p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
          <span className="sr-only">{"Alert"}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Uh Oh! This pages is unavailable now, maybe under construction or the servers may down!
        </h1>

        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Please check back later. We’re working to bring this feature online as soon as possible.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">About</Link>
          </Button>
        </div>
      </Card>
    </main>
  )
}
