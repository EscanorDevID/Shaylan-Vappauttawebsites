"use client"

import * as React from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type Range = "7D" | "30D" | "90D"

function makeData(days: number) {
  // random but smooth-ish series
  const base = 100 + Math.random() * 50
  let v = base
  const data: { day: number; value: number }[] = []
  for (let i = days; i >= 0; i--) {
    // gently drift with noise
    const drift = (Math.random() - 0.5) * 4
    const momentum = (base - v) * 0.03
    v = Math.max(0, v + drift + momentum)
    data.push({ day: days - i, value: Math.round(v) })
  }
  return data
}

export default function MetricChart() {
  const [range, setRange] = React.useState<Range>("30D")

  const data = React.useMemo(() => {
    switch (range) {
      case "7D":
        return makeData(7)
      case "90D":
        return makeData(90)
      default:
        return makeData(30)
    }
  }, [range])

  return (
    <Card className="bg-card/60 backdrop-blur supports-[backdrop-filter]:backdrop-blur border border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground text-lg">Engagement</CardTitle>
            <CardDescription className="text-muted-foreground">Live usage trend (dummy data)</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {(["7D", "30D", "90D"] as Range[]).map((k) => (
              <Button
                key={k}
                size="sm"
                variant={range === k ? "default" : "secondary"}
                onClick={() => setRange(k)}
                className={range === k ? "" : "bg-muted text-foreground hover:bg-muted/80"}
                aria-pressed={range === k}
              >
                {k}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer
          className="h-[320px] w-full"
          config={{
            value: { label: "Value", color: "hsl(var(--chart-1))" },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis width={40} tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
