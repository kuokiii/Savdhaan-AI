import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { crimeIncidents } from "@/lib/schema"
import { eq, gte, lte } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")
    const crimeType = searchParams.get("crime_type")
    const interval = searchParams.get("interval") || "day"

    // Query crime incidents
    try {
      let query = db.select().from(crimeIncidents)

      // Apply filters
      if (startDate) {
        query = query.where(gte(crimeIncidents.timestamp, new Date(startDate)))
      }
      if (endDate) {
        query = query.where(lte(crimeIncidents.timestamp, new Date(endDate)))
      }
      if (crimeType) {
        query = query.where(eq(crimeIncidents.crimeType, crimeType))
      }

      const incidents = await query

      // Default date range if not specified
      const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      const end = endDate ? new Date(endDate) : new Date()

      // Initialize time series data
      const timeSeries: { time: string; count: number }[] = []

      if (interval === "hour") {
        // Hourly data for the last 24 hours
        for (let hour = 0; hour < 24; hour++) {
          const currentTime = new Date(end)
          currentTime.setHours(end.getHours() - (24 - hour))
          currentTime.setMinutes(0, 0, 0)

          const nextTime = new Date(currentTime)
          nextTime.setHours(currentTime.getHours() + 1)

          const count = incidents.filter((i) => {
            const timestamp = new Date(i.timestamp)
            return timestamp >= currentTime && timestamp < nextTime
          }).length

          timeSeries.push({
            time: currentTime.getHours().toString().padStart(2, "0") + ":00",
            count,
          })
        }
      } else if (interval === "day") {
        // Daily data
        const days = Math.ceil((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1

        for (let day = 0; day < days; day++) {
          const currentDate = new Date(start)
          currentDate.setDate(start.getDate() + day)
          currentDate.setHours(0, 0, 0, 0)

          const nextDate = new Date(currentDate)
          nextDate.setDate(currentDate.getDate() + 1)

          const count = incidents.filter((i) => {
            const timestamp = new Date(i.timestamp)
            return timestamp >= currentDate && timestamp < nextDate
          }).length

          timeSeries.push({
            time: currentDate.toISOString().split("T")[0],
            count,
          })
        }
      } else if (interval === "week") {
        // Weekly data
        const weeks = Math.ceil((end.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1

        for (let week = 0; week < weeks; week++) {
          const currentDate = new Date(start)
          currentDate.setDate(start.getDate() + week * 7)
          currentDate.setHours(0, 0, 0, 0)

          const nextDate = new Date(currentDate)
          nextDate.setDate(currentDate.getDate() + 7)

          const count = incidents.filter((i) => {
            const timestamp = new Date(i.timestamp)
            return timestamp >= currentDate && timestamp < nextDate
          }).length

          timeSeries.push({
            time: `Week ${week + 1}`,
            count,
          })
        }
      } else if (interval === "month") {
        // Monthly data
        const monthsDict: Record<string, number> = {}

        incidents.forEach((incident) => {
          const date = new Date(incident.timestamp)
          const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`
          monthsDict[monthKey] = (monthsDict[monthKey] || 0) + 1
        })

        Object.entries(monthsDict)
          .sort(([a], [b]) => a.localeCompare(b))
          .forEach(([month, count]) => {
            timeSeries.push({ time: month, count })
          })
      }

      return NextResponse.json({
        data: timeSeries,
        interval,
      })
    } catch (dbError) {
      console.error("Database error:", dbError)

      // Generate fallback data if database query fails
      const fallbackData = generateFallbackData(interval, startDate, endDate)

      return NextResponse.json({
        data: fallbackData,
        interval,
        using_fallback: true,
      })
    }
  } catch (error) {
    console.error("Error fetching time series data:", error)

    // Even if there's an error in the outer try-catch, return fallback data
    const interval = request.nextUrl.searchParams.get("interval") || "day"
    const startDate = request.nextUrl.searchParams.get("start_date")
    const endDate = request.nextUrl.searchParams.get("end_date")

    const fallbackData = generateFallbackData(interval, startDate, endDate)

    return NextResponse.json({
      data: fallbackData,
      interval,
      using_fallback: true,
      error_message: "An error occurred while processing your request",
    })
  }
}

// Helper function to generate fallback data
function generateFallbackData(interval: string, startDateStr: string | null, endDateStr: string | null) {
  const now = new Date()
  const startDate = startDateStr ? new Date(startDateStr) : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const endDate = endDateStr ? new Date(endDateStr) : now

  const timeSeries: { time: string; count: number }[] = []

  if (interval === "hour") {
    // Hourly data for the last 24 hours
    for (let hour = 0; hour < 24; hour++) {
      timeSeries.push({
        time: `${hour.toString().padStart(2, "0")}:00`,
        count: Math.floor(Math.random() * 20) + 5,
      })
    }
  } else if (interval === "week") {
    // Weekly data
    const weeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
    for (let week = 0; week < weeks; week++) {
      timeSeries.push({
        time: `Week ${week + 1}`,
        count: Math.floor(Math.random() * 100) + 50,
      })
    }
  } else if (interval === "month") {
    // Monthly data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    for (let i = 0; i < 12; i++) {
      timeSeries.push({
        time: months[i],
        count: Math.floor(Math.random() * 200) + 100,
      })
    }
  } else {
    // Default to daily data
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      timeSeries.push({
        time: date.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 50) + 10,
      })
    }
  }

  return timeSeries
}
