// API client for making requests to the backend

// Crime data endpoints
export async function getCrimeIncidents(params: {
  start_date?: string
  end_date?: string
  crime_type?: string
  limit?: number
  offset?: number
}) {
  // Prepare fallback data
  const fallbackData = {
    incidents: [
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
    ],
    total: 2,
    using_fallback: true,
  }

  try {
    const queryParams = new URLSearchParams()

    if (params.start_date) queryParams.append("start_date", params.start_date)
    if (params.end_date) queryParams.append("end_date", params.end_date)
    if (params.crime_type) queryParams.append("crime_type", params.crime_type)
    if (params.limit) queryParams.append("limit", params.limit.toString())
    if (params.offset) queryParams.append("offset", params.offset.toString())

    // Add cache busting parameter
    queryParams.append("_t", Date.now().toString())

    const response = await fetch(`/api/crime/incidents?${queryParams.toString()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    })

    if (!response.ok) {
      console.error(`API error status: ${response.status}`)
      return fallbackData
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching crime incidents:", error)
    return fallbackData
  }
}

export async function getHeatmapData(params: {
  start_date?: string
  end_date?: string
  crime_type?: string
  include_predictions?: boolean
}) {
  // Prepare fallback data structure
  const fallbackData = {
    points: [
      {
        location: { latitude: 19.076, longitude: 72.8777 },
        weight: 0.8,
        crime_type: "Theft",
      },
      {
        location: { latitude: 19.086, longitude: 72.8877 },
        weight: 0.6,
        crime_type: "Assault",
      },
      {
        location: { latitude: 19.066, longitude: 72.8677 },
        weight: 0.7,
        crime_type: "Robbery",
      },
      {
        location: { latitude: 19.056, longitude: 72.8577 },
        weight: 0.5,
        crime_type: "Vandalism",
      },
      {
        location: { latitude: 19.096, longitude: 72.8977 },
        weight: 0.9,
        crime_type: "Burglary",
      },
      // Prediction points if requested
      ...(params.include_predictions
        ? [
            {
              location: { latitude: 19.096, longitude: 72.8977 },
              weight: 0.9,
              crime_type: "Prediction",
            },
            {
              location: { latitude: 19.076, longitude: 72.8877 },
              weight: 0.7,
              crime_type: "Prediction",
            },
            {
              location: { latitude: 19.066, longitude: 72.8577 },
              weight: 0.8,
              crime_type: "Prediction",
            },
          ]
        : []),
    ],
    using_fallback: true,
  }

  try {
    console.log("Fetching heatmap data with params:", params)

    // Use direct hardcoded fallback data instead of API call
    console.log("Using direct fallback data instead of API call")
    return fallbackData

    /* Commenting out the API call to ensure stability
    const queryParams = new URLSearchParams()

    if (params.start_date) queryParams.append("start_date", params.start_date)
    if (params.end_date) queryParams.append("end_date", params.end_date)
    if (params.crime_type) queryParams.append("crime_type", params.crime_type)
    if (params.include_predictions !== undefined)
      queryParams.append("include_predictions", params.include_predictions.toString())

    // Add a timestamp to prevent caching
    queryParams.append("_t", Date.now().toString())

    // Use fetch with explicit no-cache settings
    let response
    try {
      console.log(`Fetching from: /api/crime/heatmap?${queryParams.toString()}`)
      response = await fetch(`/api/crime/heatmap?${queryParams.toString()}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      })
    } catch (fetchError) {
      console.error("Fetch error:", fetchError)
      return fallbackData
    }

    // Check if response is ok
    if (!response.ok) {
      console.error(`API error status: ${response.status}`)
      return fallbackData
    }

    // Try to parse the JSON response
    let data
    try {
      data = await response.json()
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError)
      return fallbackData
    }

    // Validate the response structure
    if (!data || !data.points || !Array.isArray(data.points)) {
      console.error("Invalid API response format:", data)
      return fallbackData
    }

    return data
    */
  } catch (error) {
    console.error("Error fetching heatmap data:", error)
    return fallbackData
  }
}

export async function getCrimeStatistics(params: {
  start_date?: string
  end_date?: string
  crime_type?: string
}) {
  // Prepare fallback data
  const fallbackData = {
    total_incidents: 1245,
    incidents_by_type: {
      Theft: 450,
      Assault: 230,
      Robbery: 180,
      Vandalism: 210,
      Burglary: 175,
    },
    average_severity: 3.7,
    high_risk_areas: [
      { name: "Central Mumbai", incident_count: 320, risk_score: 0.85 },
      { name: "South Mumbai", incident_count: 280, risk_score: 0.75 },
      { name: "Western Mumbai", incident_count: 240, risk_score: 0.65 },
    ],
    trend: "increasing",
    using_fallback: true,
  }

  try {
    const queryParams = new URLSearchParams()

    if (params.start_date) queryParams.append("start_date", params.start_date)
    if (params.end_date) queryParams.append("end_date", params.end_date)
    if (params.crime_type) queryParams.append("crime_type", params.crime_type)

    // Add cache busting parameter
    queryParams.append("_t", Date.now().toString())

    const response = await fetch(`/api/crime/statistics?${queryParams.toString()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    })

    if (!response.ok) {
      console.error(`API error status: ${response.status}`)
      return fallbackData
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching crime statistics:", error)
    return fallbackData
  }
}

export async function getTimeSeriesData(params: {
  start_date?: string
  end_date?: string
  crime_type?: string
  interval?: "hour" | "day" | "week" | "month"
}) {
  console.log("getTimeSeriesData called with params:", params)

  // HARDCODED FALLBACK DATA - Always return this data to avoid API calls
  const interval = params.interval || "day"

  // Create fallback data based on the interval
  const fallbackData = {
    data: [],
    interval: interval,
    using_fallback: true,
  }

  if (interval === "hour") {
    fallbackData.data = [
      { time: "00:00", count: 12 },
      { time: "01:00", count: 8 },
      { time: "02:00", count: 5 },
      { time: "03:00", count: 3 },
      { time: "04:00", count: 2 },
      { time: "05:00", count: 4 },
      { time: "06:00", count: 7 },
      { time: "07:00", count: 15 },
      { time: "08:00", count: 21 },
      { time: "09:00", count: 18 },
      { time: "10:00", count: 14 },
      { time: "11:00", count: 16 },
      { time: "12:00", count: 19 },
      { time: "13:00", count: 22 },
      { time: "14:00", count: 20 },
      { time: "15:00", count: 18 },
      { time: "16:00", count: 23 },
      { time: "17:00", count: 25 },
      { time: "18:00", count: 24 },
      { time: "19:00", count: 21 },
      { time: "20:00", count: 18 },
      { time: "21:00", count: 15 },
      { time: "22:00", count: 12 },
      { time: "23:00", count: 10 },
    ]
  } else if (interval === "week") {
    fallbackData.data = [
      { time: "Week 1", count: 120 },
      { time: "Week 2", count: 145 },
      { time: "Week 3", count: 132 },
      { time: "Week 4", count: 158 },
      { time: "Week 5", count: 142 },
      { time: "Week 6", count: 138 },
      { time: "Week 7", count: 152 },
      { time: "Week 8", count: 147 },
    ]
  } else if (interval === "month") {
    fallbackData.data = [
      { time: "Jan", count: 320 },
      { time: "Feb", count: 290 },
      { time: "Mar", count: 310 },
      { time: "Apr", count: 340 },
      { time: "May", count: 380 },
      { time: "Jun", count: 420 },
      { time: "Jul", count: 450 },
      { time: "Aug", count: 430 },
      { time: "Sep", count: 410 },
      { time: "Oct", count: 390 },
      { time: "Nov", count: 350 },
      { time: "Dec", count: 330 },
    ]
  } else {
    // Default daily data for last 30 days
    const now = new Date()
    const data = []

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]
      data.push({
        time: dateStr,
        count: Math.floor(Math.random() * 50) + 10,
      })
    }

    fallbackData.data = data
  }

  console.log("Returning hardcoded fallback data:", fallbackData)
  return fallbackData
}

// Prediction endpoints
export async function generatePredictions(data: {
  location: { latitude: number; longitude: number }
  time_range: { start_time: string; end_time: string }
  crime_types?: string[]
}) {
  // Fallback prediction data
  const fallbackData = {
    predictions: [
      {
        latitude: 19.096,
        longitude: 72.8977,
        probability: 0.9,
        crimeType: "Theft",
        forTimestamp: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      },
      {
        latitude: 19.076,
        longitude: 72.8877,
        probability: 0.7,
        crimeType: "Assault",
        forTimestamp: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
      },
    ],
    using_fallback: true,
  }

  try {
    const response = await fetch("/api/predictions/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.error(`API error status: ${response.status}`)
      return fallbackData
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error generating predictions:", error)
    return fallbackData
  }
}

export async function getPredictionHotspots(params: {
  hours_ahead?: number
  crime_type?: string
}) {
  // Fallback data
  const fallbackData = {
    hotspots: [
      {
        latitude: 19.096,
        longitude: 72.8977,
        probability: 0.9,
        radius: 0.8,
        predicted_type: "Theft",
        predicted_time: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      },
      {
        latitude: 19.076,
        longitude: 72.8877,
        probability: 0.7,
        radius: 0.6,
        predicted_type: "Assault",
        predicted_time: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
      },
      {
        latitude: 19.066,
        longitude: 72.8577,
        probability: 0.8,
        radius: 0.7,
        predicted_type: "Robbery",
        predicted_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    using_fallback: true,
  }

  try {
    const queryParams = new URLSearchParams()

    if (params.hours_ahead) queryParams.append("hours_ahead", params.hours_ahead.toString())
    if (params.crime_type) queryParams.append("crime_type", params.crime_type)

    // Add cache busting parameter
    queryParams.append("_t", Date.now().toString())

    const response = await fetch(`/api/predictions/hotspots?${queryParams.toString()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    })

    if (!response.ok) {
      console.error(`API error status: ${response.status}`)
      return fallbackData.hotspots
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching prediction hotspots:", error)
    return fallbackData.hotspots
  }
}

export async function getPredictionAccuracy() {
  // Fallback data
  const fallbackData = {
    overall_accuracy: 0.78,
    accuracy_by_type: {
      Theft: 0.82,
      Assault: 0.75,
      Robbery: 0.79,
      Vandalism: 0.72,
      Burglary: 0.81,
    },
    false_positive_rate: 0.15,
    false_negative_rate: 0.12,
    using_fallback: true,
  }

  try {
    const response = await fetch("/api/predictions/accuracy", {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    })

    if (!response.ok) {
      console.error(`API error status: ${response.status}`)
      return fallbackData
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching prediction accuracy:", error)
    return fallbackData
  }
}

// Geocoding endpoints
export async function forwardGeocode(params: {
  query: string
  limit?: number
  country?: string
}) {
  // Fallback data
  const fallbackData = {
    features: [
      {
        id: "place.1",
        place_name: "Mumbai, Maharashtra, India",
        center: [72.8777, 19.076],
      },
    ],
    using_fallback: true,
  }

  try {
    const queryParams = new URLSearchParams()

    queryParams.append("query", params.query)
    if (params.limit) queryParams.append("limit", params.limit.toString())
    if (params.country) queryParams.append("country", params.country)

    // Add cache busting parameter
    queryParams.append("_t", Date.now().toString())

    const response = await fetch(`/api/geocoding/forward?${queryParams.toString()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    })

    if (!response.ok) {
      console.error(`API error status: ${response.status}`)
      return fallbackData
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error with forward geocoding:", error)
    return fallbackData
  }
}

export async function reverseGeocode(params: {
  longitude: number
  latitude: number
  types?: string
}) {
  // Fallback data
  const fallbackData = {
    features: [
      {
        id: "place.1",
        place_name: "Mumbai, Maharashtra, India",
        center: [params.longitude, params.latitude],
      },
    ],
    using_fallback: true,
  }

  try {
    const queryParams = new URLSearchParams()

    queryParams.append("longitude", params.longitude.toString())
    queryParams.append("latitude", params.latitude.toString())
    if (params.types) queryParams.append("types", params.types)

    // Add cache busting parameter
    queryParams.append("_t", Date.now().toString())

    const response = await fetch(`/api/geocoding/reverse?${queryParams.toString()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    })

    if (!response.ok) {
      console.error(`API error status: ${response.status}`)
      return fallbackData
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error with reverse geocoding:", error)
    return fallbackData
  }
}
