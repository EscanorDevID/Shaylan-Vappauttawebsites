"use client"

import * as React from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

type Range = "day" | "week" | "month"

function makeData(points: number) {
  const out: Array<{ x: number; users: number }> = []
  let v = Math.floor(80 + Math.random() * 40)
  for (let i = 0; i < points; i++) {
    v = Math.max(40, v + Math.floor(-10 + Math.random() * 20))
    out.push({ x: i + 1, users: v })
  }
  return out
}

export default function LiveStatsCard() {
  const [range, setRange] = React.useState<Range>("day")
  const [data, setData] = React.useState(makeData(24))
  const [mounted, setMounted] = React.useState(false) // added

  React.useEffect(() => {
    setMounted(true) // render chart only after client mount
  }, [])

  React.useEffect(() => {
    const points = range === "day" ? 24 : range === "week" ? 7 : 30
    setData(makeData(points))
  }, [range])

  React.useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = [...prev]
        const last = next[next.length - 1]
        const n = Math.max(40, Math.min(180, last.users + Math.floor(-5 + Math.random() * 10)))
        next.shift()
        next.push({ x: (last?.x ?? 0) + 1, users: n })
        return next
      })
    }, 1500)
    return () => clearInterval(id)
  }, [])

  const total = data.reduce((acc, d) => acc + d.users, 0)
  const avg = Math.round(total / data.length)

  return (
    <Card className="w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-pretty">Live Community Stats</CardTitle>
          <CardDescription className="text-pretty">
            Dummy activity — interactive and updates automatically
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={range === "day" ? "default" : "outline"} size="sm" onClick={() => setRange("day")}>
            24h
          </Button>
          <Button variant={range === "week" ? "default" : "outline"} size="sm" onClick={() => setRange("week")}>
            7d
          </Button>
          <Button variant={range === "month" ? "default" : "outline"} size="sm" onClick={() => setRange("month")}>
            30d
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-white/10 bg-black/50 p-3 text-center">
            <div className="text-xs text-muted-foreground">Avg Active</div>
            <div className="text-2xl font-semibold">{avg}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/50 p-3 text-center">
            <div className="text-xs text-muted-foreground">Total Sessions</div>
            <div className="text-2xl font-semibold">{(total / 5).toFixed(0)}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/50 p-3 text-center">
            <div className="text-xs text-muted-foreground">Peak</div>
            <div className="text-2xl font-semibold">{Math.max(...data.map((d) => d.users))}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/50 p-3 text-center">
            <div className="text-xs text-muted-foreground">Low</div>
            <div className="text-2xl font-semibold">{Math.min(...data.map((d) => d.users))}</div>
          </div>
        </div>

        {mounted && (
          <ChartContainer className="h-[320px]" config={{ users: { label: "Users", color: "hsl(var(--chart-1))" } }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="x" tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
