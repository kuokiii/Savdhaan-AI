"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { getHeatmapData } from "@/lib/api"

interface CrimeMapProps {
  showPredictions: boolean
  selectedDate?: Date
}

interface Point {
  location: {
    latitude: number
    longitude: number
  }
  weight: number
  crime_type: string
}

// Fallback data to use when API fails
const FALLBACK_CRIME_DATA: Point[] = [
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
]

const FALLBACK_PREDICTION_DATA: Point[] = [
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

export function CrimeMapWithAPI({ showPredictions, selectedDate }: CrimeMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedCrime, setSelectedCrime] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [crimePoints, setCrimePoints] = useState<Point[]>([])
  const [predictionPoints, setPredictionPoints] = useState<Point[]>([])
  const [usingFallbackData, setUsingFallbackData] = useState<boolean>(false)
  const [retryCount, setRetryCount] = useState<number>(0)

  // Map boundaries (Mumbai coordinates)
  const mapBounds = {
    minLng: 72.7777, // Mumbai west
    maxLng: 72.9777, // Mumbai east
    minLat: 18.976, // Mumbai south
    maxLat: 19.176, // Mumbai north
  }

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch heatmap data
        const params: any = {}
        if (selectedDate) {
          const dateStr = selectedDate.toISOString().split("T")[0]
          params.start_date = `${dateStr}T00:00:00.000Z`
          params.end_date = `${dateStr}T23:59:59.999Z`
        }
        params.include_predictions = showPredictions

        // Add a unique timestamp to prevent caching
        params._t = Date.now()

        try {
          // The getHeatmapData function now always returns data (either real or fallback)
          const heatmapData = await getHeatmapData(params)

          // Check if we're using fallback data
          if (heatmapData.using_fallback) {
            setUsingFallbackData(true)
            setError("Using demo data: Database connection failed")
          } else {
            setUsingFallbackData(false)
          }

          // Ensure points array exists and has items
          if (!heatmapData.points || !Array.isArray(heatmapData.points)) {
            throw new Error("Invalid data format: missing points array")
          }

          // Split data into crime and prediction points
          const crimes = heatmapData.points.filter((p) => p.crime_type !== "Prediction")
          const predictions = heatmapData.points.filter((p) => p.crime_type === "Prediction")

          setCrimePoints(crimes)
          setPredictionPoints(predictions)
        } catch (apiError) {
          console.error("API error:", apiError)

          // Use fallback data
          setCrimePoints(FALLBACK_CRIME_DATA)
          setPredictionPoints(showPredictions ? FALLBACK_PREDICTION_DATA : [])
          setUsingFallbackData(true)
          setError("Using demo data: API connection failed")
        }

        setLoading(false)
      } catch (err) {
        console.error("Error loading map data:", err)

        // If we've retried less than 3 times, try again
        if (retryCount < 3) {
          setRetryCount((prev) => prev + 1)
          setError(`Retrying... (${retryCount + 1}/3)`)
          // Wait a second before retrying
          setTimeout(loadData, 1000)
          return
        }

        setError("Failed to load map data. Using demo data instead.")
        setLoading(false)
        setUsingFallbackData(true)

        // Set fallback data
        setCrimePoints(FALLBACK_CRIME_DATA)
        setPredictionPoints(showPredictions ? FALLBACK_PREDICTION_DATA : [])
      }
    }

    loadData()
  }, [selectedDate, showPredictions, retryCount])

  // Draw the map
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#333333"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i < 10; i++) {
      const y = (canvas.height / 10) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i < 10; i++) {
      const x = (canvas.width / 10) * i
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Helper function to convert coordinates to canvas position
    const coordToCanvas = (lng: number, lat: number) => {
      const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * canvas.width
      const y = canvas.height - ((lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * canvas.height
      return { x, y }
    }

    // Draw crime heatmap
    crimePoints.forEach((point) => {
      try {
        const { longitude, latitude } = point.location
        const { x, y } = coordToCanvas(longitude, latitude)
        const weight = point.weight

        // Draw heatmap circle
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, weight * 50)
        gradient.addColorStop(0, "rgba(255, 77, 79, 0.8)")
        gradient.addColorStop(1, "rgba(255, 77, 79, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, weight * 50, 0, Math.PI * 2)
        ctx.fill()
      } catch (err) {
        console.error("Error drawing crime point:", err)
      }
    })

    // Draw crime points
    crimePoints.forEach((point) => {
      try {
        const { longitude, latitude } = point.location
        const { x, y } = coordToCanvas(longitude, latitude)

        ctx.fillStyle = "#ff4d4f"
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      } catch (err) {
        console.error("Error drawing crime point:", err)
      }
    })

    // Draw prediction areas if enabled
    if (showPredictions) {
      predictionPoints.forEach((point) => {
        try {
          const { longitude, latitude } = point.location
          const { x, y } = coordToCanvas(longitude, latitude)
          const weight = point.weight

          // Draw prediction circle
          ctx.strokeStyle = "rgba(0, 255, 0, 0.8)"
          ctx.fillStyle = "rgba(0, 255, 0, 0.1)"
          ctx.lineWidth = 2

          ctx.beginPath()
          ctx.arc(x, y, weight * 60, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        } catch (err) {
          console.error("Error drawing prediction point:", err)
        }
      })
    }

    // Handle click events
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // Check if click is on a crime point
      for (const point of crimePoints) {
        try {
          const { longitude, latitude } = point.location
          const { x, y } = coordToCanvas(longitude, latitude)

          // Calculate distance between click and point
          const distance = Math.sqrt(Math.pow(clickX - x, 2) + Math.pow(clickY - y, 2))

          // If click is within point radius, select the crime
          if (distance <= 8) {
            setSelectedCrime({
              crime_type: point.crime_type,
              weight: point.weight,
            })
            return
          }
        } catch (err) {
          console.error("Error handling click:", err)
        }
      }

      // If click is not on a crime point, deselect
      setSelectedCrime(null)
    }

    canvas.addEventListener("click", handleCanvasClick)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("click", handleCanvasClick)
    }
  }, [crimePoints, predictionPoints, showPredictions, mapBounds])

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full rounded-b-lg" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-sm">Loading map data...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-4 left-4 right-4 p-2 bg-card/90 backdrop-blur-sm text-amber-500 text-sm rounded-md">
          {error}
        </div>
      )}

      {usingFallbackData && !error && (
        <div className="absolute top-4 left-4 right-4 p-2 bg-card/90 backdrop-blur-sm text-amber-500 text-sm rounded-md">
          Using demo data
        </div>
      )}

      {selectedCrime && (
        <Card className="absolute bottom-4 left-4 p-4 w-64 bg-card/90 backdrop-blur-sm">
          <h4 className="font-semibold">{selectedCrime.crime_type}</h4>
          <p className="text-sm mt-2">
            Severity: <span className="font-medium">{(selectedCrime.weight * 5).toFixed(2)}</span>
          </p>
          <button className="text-xs text-primary mt-2" onClick={() => setSelectedCrime(null)}>
            Close
          </button>
        </Card>
      )}

      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm p-2 rounded-md">
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
            Crime Incidents
          </span>
          {showPredictions && (
            <span className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full border-2 border-green-500 bg-green-500/10 mr-1"></span>
              Predicted Hotspots
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
