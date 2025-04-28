import { type NextRequest, NextResponse } from "next/server"

// Fallback data for when the database query fails
const FALLBACK_INCIDENTS = [
  {
    id: 1,
    crimeType: "Theft",
    latitude: 19.076,
    longitude: 72.8777,
    severity: 4,
    timestamp: new Date(),
  },
  {
    id: 2,
    crimeType: "Assault",
    latitude: 19.086,
    longitude: 72.8877,
    severity: 3,
    timestamp: new Date(),
  },
  {
    id: 3,
    crimeType: "Robbery",
    latitude: 19.066,
    longitude: 72.8677,
    severity: 4,
    timestamp: new Date(),
  },
  {
    id: 4,
    crimeType: "Vandalism",
    latitude: 19.056,
    longitude: 72.8577,
    severity: 2,
    timestamp: new Date(),
  },
  {
    id: 5,
    crimeType: "Burglary",
    latitude: 19.096,
    longitude: 72.8977,
    severity: 5,
    timestamp: new Date(),
  },
]

const FALLBACK_PREDICTIONS = [
  {
    id: 1,
    crimeType: "Prediction",
    latitude: 19.096,
    longitude: 72.8977,
    probability: 0.9,
    forTimestamp: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    crimeType: "Prediction",
    latitude: 19.076,
    longitude: 72.8877,
    probability: 0.7,
    forTimestamp: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    crimeType: "Prediction",
    latitude: 19.066,
    longitude: 72.8577,
    probability: 0.8,
    forTimestamp: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
]

// Generate fallback heatmap points
function generateFallbackHeatmapPoints(includePredictions = false) {
  // Format incidents for heatmap
  const heatmapPoints = FALLBACK_INCIDENTS.map((incident) => ({
    location: {
      latitude: incident.latitude,
      longitude: incident.longitude,
    },
    weight: incident.severity / 5, // Normalize to 0-1 range
    crime_type: incident.crimeType,
  }))

  // Add prediction points if requested
  if (includePredictions) {
    // Format predictions for heatmap
    const predictionPoints = FALLBACK_PREDICTIONS.map((pred) => ({
      location: {
        latitude: pred.latitude,
        longitude: pred.longitude,
      },
      weight: pred.probability,
      crime_type: "Prediction",
    }))

    // Combine incidents and predictions
    heatmapPoints.push(...predictionPoints)
  }

  return heatmapPoints
}

export async function GET(request: NextRequest) {
  // Immediately prepare fallback data
  const searchParams = request.nextUrl.searchParams
  const includePredictions = searchParams.get("include_predictions") === "true"
  const fallbackPoints = generateFallbackHeatmapPoints(includePredictions)

  // Create a safe response function to ensure we always return a valid response
  const safeResponse = (data: any, usingFallback = false, errorMessage?: string) => {
    const responseData = {
      points: data,
      using_fallback: usingFallback,
      ...(errorMessage ? { error_message: errorMessage } : {}),
    }

    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  }

  // Always return fallback data for now to avoid any potential database issues
  return safeResponse(fallbackPoints, true, "Using demo data (database bypassed)")

  /* Commenting out the database logic for now to ensure stability
  try {
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")
    const crimeType = searchParams.get("crime_type")

    let incidents = []
    let predictionData = []
    let usingFallbackData = false

    try {
      // Safely attempt to query crime incidents
      try {
        let query = db
          .select({
            id: crimeIncidents.id,
            crimeType: crimeIncidents.crimeType,
            latitude: crimeIncidents.latitude,
            longitude: crimeIncidents.longitude,
            severity: crimeIncidents.severity,
            timestamp: crimeIncidents.timestamp,
          })
          .from(crimeIncidents)

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

        incidents = await query
      } catch (dbError) {
        console.error("Database error fetching incidents:", dbError)
        incidents = FALLBACK_INCIDENTS
        usingFallbackData = true
      }

      // Add prediction data if requested
      if (includePredictions) {
        try {
          let predictionQuery = db
            .select({
              id: predictions.id,
              crimeType: predictions.crimeType,
              latitude: predictions.latitude,
              longitude: predictions.longitude,
              probability: predictions.probability,
              forTimestamp: predictions.forTimestamp,
            })
            .from(predictions)

          // Apply time filter to predictions
          const now = new Date()
          predictionQuery = predictionQuery.where(gte(predictions.forTimestamp, now))

          // Apply crime type filter if specified
          if (crimeType) {
            predictionQuery = predictionQuery.where(eq(predictions.crimeType, crimeType))
          }

          predictionData = await predictionQuery
        } catch (predError) {
          console.error("Database error fetching predictions:", predError)
          predictionData = FALLBACK_PREDICTIONS
          usingFallbackData = true
        }
      }

      // Format incidents for heatmap
      const heatmapPoints = incidents.map((incident) => ({
        location: {
          latitude: incident.latitude,
          longitude: incident.longitude,
        },
        weight: incident.severity / 5, // Normalize to 0-1 range
        crime_type: incident.crimeType,
      }))

      // Add prediction points if requested
      if (includePredictions) {
        // Format predictions for heatmap
        const predictionPoints = predictionData.map((pred) => ({
          location: {
            latitude: pred.latitude,
            longitude: pred.longitude,
          },
          weight: pred.probability,
          crime_type: "Prediction",
        }))

        // Combine incidents and predictions
        heatmapPoints.push(...predictionPoints)
      }

      // Return the response with appropriate data
      return safeResponse(
        heatmapPoints.length > 0 ? heatmapPoints : fallbackPoints,
        usingFallbackData || heatmapPoints.length === 0
      )
    } catch (innerError) {
      console.error("Error processing heatmap data:", innerError)
      return safeResponse(fallbackPoints, true, "Error processing data, using fallback")
    }
  } catch (outerError) {
    console.error("Critical error in heatmap route:", outerError)
    // Always return a valid response even in case of critical errors
    return safeResponse(fallbackPoints, true, "Critical error, using fallback data")
  }
  */
}
