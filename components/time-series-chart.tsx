"use client"

import { useState, useEffect } from "react"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

// Generate mock time series data
const generateTimeSeriesData = (timeRange: string) => {
  const dataPoints: { time: string; count: number }[] = []
  const date = new Date()
  let interval: number
  let format: Intl.DateTimeFormatOptions
  let count: number

  switch (timeRange) {
    case "24h":
      interval = 60 * 60 * 1000 // hourly
      count = 24
      format = { hour: "numeric" }
      break
    case "7d":
      interval = 24 * 60 * 60 * 1000 // daily
      count = 7
      format = { weekday: "short" }
      break
    case "30d":
      interval = 24 * 60 * 60 * 1000 // daily
      count = 30
      format = { month: "short", day: "numeric" }
      break
    default:
      interval = 60 * 60 * 1000
      count = 24
      format = { hour: "numeric" }
  }

  // Start from the past
  date.setTime(date.getTime() - interval * (count - 1))

  for (let i = 0; i < count; i++) {
    const timeStr = new Intl.DateTimeFormat("en-US", format).format(date)

    // Generate a realistic crime count with some randomness
    // Base value depends on time of day (higher at night)
    let baseValue = 0
    if (timeRange === "24h") {
      const hour = date.getHours()
      if (hour >= 22 || hour < 3) {
        baseValue = 15 + Math.floor(Math.random() * 10) // Night (higher)
      } else if (hour >= 16 && hour < 22) {
        baseValue = 10 + Math.floor(Math.random() * 8) // Evening
      } else {
        baseValue = 5 + Math.floor(Math.random() * 5) // Day (lower)
      }
    } else {
      // For 7d and 30d, use a base value with weekly patterns
      const dayOfWeek = date.getDay()
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        // Weekend
        baseValue = 80 + Math.floor(Math.random() * 20)
      } else {
        baseValue = 50 + Math.floor(Math.random() * 15)
      }
    }

    dataPoints.push({
      time: timeStr,
      count: baseValue,
    })

    date.setTime(date.getTime() + interval)
  }

  return dataPoints
}

interface TimeSeriesChartProps {
  timeRange: string
}

export function TimeSeriesChart({ timeRange }: TimeSeriesChartProps) {
  const [data, setData] = useState<{ time: string; count: number }[]>([])

  useEffect(() => {
    setData(generateTimeSeriesData(timeRange))
  }, [timeRange])

  return (
    <ChartContainer className="h-[200px]">
      <Chart>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Line dataKey="count" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: "#0ea5e9" }} />
          <ChartTooltip>
            <ChartTooltipContent
              className="border-primary"
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-2">
                      <p className="text-sm font-medium">{payload[0].payload.time}</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-primary">{payload[0].value}</span> incidents
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
          </ChartTooltip>
        </LineChart>
      </Chart>
    </ChartContainer>
  )
}
