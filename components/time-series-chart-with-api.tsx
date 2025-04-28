"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

type TimeSeriesData = {
  date: string
  count: number
}

type TimeSeriesResponse = {
  data: TimeSeriesData[]
  using_fallback?: boolean
}

export function TimeSeriesChartWithAPI({ timeRange = "7d" }: { timeRange?: string }) {
  const [data, setData] = useState<TimeSeriesData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Generate fallback data directly in the component
        const fallbackData = generateFallbackTimeSeriesData(timeRange)
        setData(fallbackData)
        setUsingFallback(true)
        setLoading(false)
      } catch (err) {
        console.error("Error in time series chart:", err)
        setError("Failed to load time series data")
        // Use empty data as last resort
        setData([])
        setLoading(false)
      }
    }

    fetchData()
  }, [timeRange])

  // Render the chart using canvas
  useEffect(() => {
    if (data.length > 0 && !loading) {
      const canvas = document.getElementById("timeSeriesCanvas") as HTMLCanvasElement
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          // Set canvas dimensions
          canvas.width = canvas.clientWidth
          canvas.height = canvas.clientHeight

          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // Chart dimensions
          const padding = 40
          const chartWidth = canvas.width - padding * 2
          const chartHeight = canvas.height - padding * 2

          // Find max value for scaling
          const maxValue = Math.max(...data.map((d) => d.count))

          // Draw axes
          ctx.beginPath()
          ctx.strokeStyle = "#64748b"
          ctx.lineWidth = 1
          ctx.moveTo(padding, padding)
          ctx.lineTo(padding, canvas.height - padding)
          ctx.lineTo(canvas.width - padding, canvas.height - padding)
          ctx.stroke()

          // Draw line
          ctx.beginPath()
          ctx.strokeStyle = "#3b82f6"
          ctx.lineWidth = 2

          data.forEach((point, i) => {
            const x = padding + (i / (data.length - 1)) * chartWidth
            const y = canvas.height - padding - (point.count / maxValue) * chartHeight

            if (i === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          })

          ctx.stroke()

          // Fill area under the line
          ctx.lineTo(padding + chartWidth, canvas.height - padding)
          ctx.lineTo(padding, canvas.height - padding)
          ctx.closePath()
          ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
          ctx.fill()

          // Draw points
          data.forEach((point, i) => {
            const x = padding + (i / (data.length - 1)) * chartWidth
            const y = canvas.height - padding - (point.count / maxValue) * chartHeight

            ctx.beginPath()
            ctx.fillStyle = "#3b82f6"
            ctx.arc(x, y, 4, 0, Math.PI * 2)
            ctx.fill()
          })

          // Draw x-axis labels (show only some labels to avoid overcrowding)
          ctx.fillStyle = "#64748b"
          ctx.font = "12px sans-serif"
          ctx.textAlign = "center"

          const labelStep = Math.max(1, Math.floor(data.length / 5))
          data.forEach((point, i) => {
            if (i % labelStep === 0 || i === data.length - 1) {
              const x = padding + (i / (data.length - 1)) * chartWidth
              const date = new Date(point.date)
              const label = `${date.getDate()}/${date.getMonth() + 1}`
              ctx.fillText(label, x, canvas.height - padding + 20)
            }
          })

          // Draw y-axis labels
          ctx.textAlign = "right"
          const yLabelCount = 5
          for (let i = 0; i <= yLabelCount; i++) {
            const value = (maxValue * i) / yLabelCount
            const y = canvas.height - padding - (i / yLabelCount) * chartHeight
            ctx.fillText(Math.round(value).toString(), padding - 10, y + 4)
          }
        }
      }
    }
  }, [data, loading])

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center text-center">
        <p className="text-red-500">{error}</p>
        <p className="text-sm text-muted-foreground">Please try again later</p>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      {usingFallback && (
        <div className="absolute top-0 right-0 z-10 rounded-md bg-yellow-100 px-2 py-1 text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
          Using demo data
        </div>
      )}
      <canvas id="timeSeriesCanvas" className="h-full w-full" />
    </div>
  )
}

// Generate fallback time series data based on the time range
function generateFallbackTimeSeriesData(timeRange: string): TimeSeriesData[] {
  const data: TimeSeriesData[] = []
  const now = new Date()
  let days: number

  switch (timeRange) {
    case "24h":
      days = 1
      break
    case "7d":
      days = 7
      break
    case "30d":
      days = 30
      break
    default:
      days = 7
  }

  // Generate data points
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate a somewhat realistic pattern with some randomness
    let baseValue: number
    const dayOfWeek = date.getDay()

    // Weekend has higher crime rates in our mock data
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      baseValue = 80 + Math.random() * 40
    } else {
      baseValue = 40 + Math.random() * 30
    }

    // Add time-based pattern for 24h view
    if (timeRange === "24h") {
      const hour = date.getHours()
      // More incidents during evening hours
      if (hour >= 18 || hour <= 2) {
        baseValue *= 1.5
      }
    }

    data.push({
      date: date.toISOString(),
      count: Math.round(baseValue),
    })
  }

  return data
}
