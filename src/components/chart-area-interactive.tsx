"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

// Climate data representing global temperature anomalies (simplified for demo)
const chartData = [
  { date: "2024-04-01", globalTemp: 1.1, landTemp: 1.3 },
  { date: "2024-04-02", globalTemp: 1.2, landTemp: 1.4 },
  { date: "2024-04-03", globalTemp: 1.0, landTemp: 1.2 },
  { date: "2024-04-04", globalTemp: 1.3, landTemp: 1.5 },
  { date: "2024-04-05", globalTemp: 1.4, landTemp: 1.6 },
  { date: "2024-04-06", globalTemp: 1.2, landTemp: 1.4 },
  { date: "2024-04-07", globalTemp: 1.1, landTemp: 1.3 },
  { date: "2024-04-08", globalTemp: 1.5, landTemp: 1.7 },
  { date: "2024-04-09", globalTemp: 0.9, landTemp: 1.1 },
  { date: "2024-04-10", globalTemp: 1.2, landTemp: 1.4 },
  { date: "2024-04-11", globalTemp: 1.3, landTemp: 1.5 },
  { date: "2024-04-12", globalTemp: 1.1, landTemp: 1.3 },
  { date: "2024-04-13", globalTemp: 1.4, landTemp: 1.6 },
  { date: "2024-04-14", globalTemp: 1.0, landTemp: 1.2 },
  { date: "2024-04-15", globalTemp: 0.8, landTemp: 1.0 },
  { date: "2024-04-16", globalTemp: 0.9, landTemp: 1.1 },
  { date: "2024-04-17", globalTemp: 1.6, landTemp: 1.8 },
  { date: "2024-04-18", globalTemp: 1.5, landTemp: 1.7 },
  { date: "2024-04-19", globalTemp: 1.2, landTemp: 1.4 },
  { date: "2024-04-20", globalTemp: 0.7, landTemp: 0.9 },
  { date: "2024-04-21", globalTemp: 1.0, landTemp: 1.2 },
  { date: "2024-04-22", globalTemp: 1.1, landTemp: 1.3 },
  { date: "2024-04-23", globalTemp: 0.9, landTemp: 1.1 },
  { date: "2024-04-24", globalTemp: 1.4, landTemp: 1.6 },
  { date: "2024-04-25", globalTemp: 1.2, landTemp: 1.4 },
  { date: "2024-04-26", globalTemp: 0.6, landTemp: 0.8 },
  { date: "2024-04-27", globalTemp: 1.5, landTemp: 1.7 },
  { date: "2024-04-28", globalTemp: 0.8, landTemp: 1.0 },
  { date: "2024-04-29", globalTemp: 1.3, landTemp: 1.5 },
  { date: "2024-04-30", globalTemp: 1.6, landTemp: 1.8 },
  { date: "2024-05-01", globalTemp: 1.1, landTemp: 1.3 },
  { date: "2024-05-02", globalTemp: 1.4, landTemp: 1.6 },
  { date: "2024-05-03", globalTemp: 1.2, landTemp: 1.4 },
  { date: "2024-05-04", globalTemp: 1.5, landTemp: 1.7 },
  { date: "2024-05-05", globalTemp: 1.7, landTemp: 1.9 },
  { date: "2024-05-06", globalTemp: 1.8, landTemp: 2.0 },
  { date: "2024-05-07", globalTemp: 1.5, landTemp: 1.7 },
  { date: "2024-05-08", globalTemp: 1.0, landTemp: 1.2 },
  { date: "2024-05-09", globalTemp: 1.1, landTemp: 1.3 },
  { date: "2024-05-10", globalTemp: 1.4, landTemp: 1.6 },
  { date: "2024-05-11", globalTemp: 1.3, landTemp: 1.5 },
  { date: "2024-05-12", globalTemp: 1.1, landTemp: 1.3 },
  { date: "2024-05-13", globalTemp: 1.1, landTemp: 1.3 },
  { date: "2024-05-14", globalTemp: 1.6, landTemp: 1.8 },
  { date: "2024-05-15", globalTemp: 1.7, landTemp: 1.9 },
  { date: "2024-05-16", globalTemp: 1.3, landTemp: 1.5 },
  { date: "2024-05-17", globalTemp: 1.8, landTemp: 2.0 },
  { date: "2024-05-18", globalTemp: 1.3, landTemp: 1.5 },
  { date: "2024-05-19", globalTemp: 1.2, landTemp: 1.4 },
  { date: "2024-05-20", globalTemp: 1.0, landTemp: 1.2 },
  { date: "2024-05-21", globalTemp: 0.6, landTemp: 0.8 },
  { date: "2024-05-22", globalTemp: 0.5, landTemp: 0.7 },
  { date: "2024-05-23", globalTemp: 1.2, landTemp: 1.4 },
  { date: "2024-05-24", globalTemp: 1.4, landTemp: 1.6 },
  { date: "2024-05-25", globalTemp: 1.1, landTemp: 1.3 },
  { date: "2024-05-26", globalTemp: 1.2, landTemp: 1.4 },
  { date: "2024-05-27", globalTemp: 1.6, landTemp: 1.8 },
  { date: "2024-05-28", globalTemp: 1.2, landTemp: 1.4 },
  { date: "2024-05-29", globalTemp: 0.5, landTemp: 0.7 },
  { date: "2024-05-30", globalTemp: 1.3, landTemp: 1.5 },
  { date: "2024-05-31", globalTemp: 1.0, landTemp: 1.2 },
  { date: "2024-06-01", globalTemp: 1.0, landTemp: 1.2 },
  { date: "2024-06-02", globalTemp: 1.7, landTemp: 1.9 },
  { date: "2024-06-03", globalTemp: 0.7, landTemp: 0.9 },
  { date: "2024-06-04", globalTemp: 1.6, landTemp: 1.8 },
  { date: "2024-06-05", globalTemp: 0.6, landTemp: 0.8 },
  { date: "2024-06-06", globalTemp: 1.4, landTemp: 1.6 },
  { date: "2024-06-07", globalTemp: 1.3, landTemp: 1.5 },
  { date: "2024-06-08", globalTemp: 1.5, landTemp: 1.7 },
  { date: "2024-06-09", globalTemp: 1.6, landTemp: 1.8 },
  { date: "2024-06-10", globalTemp: 1.0, landTemp: 1.2 },
  { date: "2024-06-11", globalTemp: 0.6, landTemp: 0.8 },
  { date: "2024-06-12", globalTemp: 1.8, landTemp: 2.0 },
  { date: "2024-06-13", globalTemp: 0.5, landTemp: 0.7 },
  { date: "2024-06-14", globalTemp: 1.6, landTemp: 1.8 },
  { date: "2024-06-15", globalTemp: 1.3, landTemp: 1.5 },
  { date: "2024-06-16", globalTemp: 1.4, landTemp: 1.6 },
  { date: "2024-06-17", globalTemp: 1.7, landTemp: 1.9 },
  { date: "2024-06-18", globalTemp: 0.7, landTemp: 0.9 },
  { date: "2024-06-19", globalTemp: 1.3, landTemp: 1.5 },
  { date: "2024-06-20", globalTemp: 1.5, landTemp: 1.7 },
  { date: "2024-06-21", globalTemp: 1.0, landTemp: 1.2 },
  { date: "2024-06-22", globalTemp: 1.3, landTemp: 1.5 },
  { date: "2024-06-23", globalTemp: 1.7, landTemp: 1.9 },
  { date: "2024-06-24", globalTemp: 0.8, landTemp: 1.0 },
  { date: "2024-06-25", globalTemp: 0.9, landTemp: 1.1 },
  { date: "2024-06-26", globalTemp: 1.6, landTemp: 1.8 },
  { date: "2024-06-27", globalTemp: 1.6, landTemp: 1.8 },
  { date: "2024-06-28", globalTemp: 1.0, landTemp: 1.2 },
  { date: "2024-06-29", globalTemp: 0.7, landTemp: 0.9 },
  { date: "2024-06-30", globalTemp: 1.6, landTemp: 1.8 },
]

const chartConfig = {
  temperature: {
    label: "Temperature Anomaly",
  },
  globalTemp: {
    label: "Global",
    color: "hsl(var(--chart-1))",
  },
  landTemp: {
    label: "Land",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Global Temperature Anomaly</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Temperature deviation from 1951-1980 average
          </span>
          <span className="@[540px]/card:hidden">°C above baseline</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="landTemp"
              type="natural"
              fill="var(--color-landTemp)"
              fillOpacity={0.4}
              stroke="var(--color-landTemp)"
              stackId="a"
            />
            <Area
              dataKey="globalTemp"
              type="natural"
              fill="var(--color-globalTemp)"
              fillOpacity={0.4}
              stroke="var(--color-globalTemp)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
