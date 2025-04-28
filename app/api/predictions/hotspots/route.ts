import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { predictions } from "@/lib/schema"
import { gte, eq } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const hoursAhead = Number.parseInt(searchParams.get("hours_ahead") || "24")
    const crimeType = searchParams.get("crime_type")

    // Calculate the time threshold
    const now = new Date()
    const futureTime = new Date(now.getTime() + hoursAhead * 60 * 60 * 1000)

    // Query predictions
    let query = db.select().from(predictions).where(gte(predictions.forTimestamp, now))

    if (crimeType) {
      query = query.where(eq(predictions.crimeType, crimeType))
    }

    const predictionData = await query

    // Format the response
    const hotspots = predictionData.map((pred) => ({
      latitude: pred.latitude,
      longitude: pred.longitude,
      probability: pred.probability,
      radius: 0.2 + Math.random() * 0.8, // Random radius between 0.2 and 1.0 km
      predicted_type: pred.crimeType,
      predicted_time: pred.forTimestamp.toISOString(),
    }))

    // Sort by probability (highest first)
    hotspots.sort((a, b) => b.probability - a.probability)

    return NextResponse.json(hotspots)
  } catch (error) {
    console.error("Error fetching prediction hotspots:", error)
    return NextResponse.json({ error: "Failed to fetch prediction hotspots" }, { status: 500 })
  }
}
