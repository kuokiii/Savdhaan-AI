import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { predictions } from "@/lib/schema"

// Mock ML model function (in a real app, this would call a Python ML service)
async function runPredictionModel(
  latitude: number,
  longitude: number,
  startTime: Date,
  endTime: Date,
  crimeTypes?: string[],
) {
  // Generate 5-10 prediction points around the specified location
  const numPredictions = Math.floor(Math.random() * 6) + 5
  const results = []

  for (let i = 0; i < numPredictions; i++) {
    // Random location within 2km of the specified location
    const angle = Math.random() * 2 * Math.PI
    const distance = Math.random() * 0.02 // ~2km
    const predLat = latitude + distance * Math.cos(angle)
    const predLon = longitude + distance * Math.sin(angle)

    // Random probability and confidence
    const probability = 0.5 + Math.random() * 0.45
    const confidence = 0.6 + Math.random() * 0.3

    // Random crime type if not specified
    const allCrimeTypes = [
      "Theft",
      "Assault",
      "Burglary",
      "Robbery",
      "Vandalism",
      "Fraud",
      "Drug Offense",
      "Vehicle Theft",
      "Harassment",
    ]

    const crimeType =
      crimeTypes && crimeTypes.length > 0
        ? crimeTypes[Math.floor(Math.random() * crimeTypes.length)]
        : allCrimeTypes[Math.floor(Math.random() * allCrimeTypes.length)]

    // Random time within the specified range
    const timeRange = endTime.getTime() - startTime.getTime()
    const randomTime = new Date(startTime.getTime() + Math.random() * timeRange)

    results.push({
      latitude: predLat,
      longitude: predLon,
      probability,
      confidence,
      crimeType,
      forTimestamp: randomTime,
    })
  }

  return results
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.location || !body.time_range) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { latitude, longitude } = body.location
    const startTime = new Date(body.time_range.start_time)
    const endTime = new Date(body.time_range.end_time)
    const crimeTypes = body.crime_types

    // Run prediction model
    const predictionResults = await runPredictionModel(latitude, longitude, startTime, endTime, crimeTypes)

    // Save predictions to database
    const savedPredictions = []
    for (const result of predictionResults) {
      const [saved] = await db
        .insert(predictions)
        .values({
          latitude: result.latitude,
          longitude: result.longitude,
          probability: result.probability,
          crimeType: result.crimeType,
          predictedAt: new Date(),
          forTimestamp: result.forTimestamp,
        })
        .returning()

      savedPredictions.push(saved)
    }

    return NextResponse.json({
      predictions: savedPredictions,
      generated_at: new Date().toISOString(),
      model_version: "0.1.0",
    })
  } catch (error) {
    console.error("Error generating predictions:", error)
    return NextResponse.json({ error: "Failed to generate predictions" }, { status: 500 })
  }
}
