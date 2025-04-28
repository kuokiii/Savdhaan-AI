"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

// Mock data for the heatmap - Using Indian cities
const MOCK_CRIME_DATA = {
  type: "FeatureCollection",
  features: Array.from({ length: 100 }, (_, i) => ({
    type: "Feature",
    properties: {
      id: i,
      magnitude: Math.random() * 4,
      time: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      type: ["Theft", "Assault", "Burglary", "Robbery", "Vandalism"][Math.floor(Math.random() * 5)],
    },
    geometry: {
      type: "Point",
      coordinates: [
        77.209 + (Math.random() - 0.5) * 0.1, // Delhi coordinates with some randomness
        28.6139 + (Math.random() - 0.5) * 0.1,
      ],
    },
  })),
}

// Mock data for predictions
const MOCK_PREDICTION_DATA = {
  type: "FeatureCollection",
  features: Array.from({ length: 20 }, (_, i) => ({
    type: "Feature",
    properties: {
      id: i,
      probability: 0.5 + Math.random() * 0.5, // Higher probability for predictions
    },
    geometry: {
      type: "Point",
      coordinates: [77.209 + (Math.random() - 0.5) * 0.1, 28.6139 + (Math.random() - 0.5) * 0.1],
    },
  })),
}

interface CrimeMapProps {
  showPredictions: boolean
  selectedDate?: Date
}

export function CrimeMap({ showPredictions, selectedDate }: CrimeMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedCrime, setSelectedCrime] = useState<any>(null)
  const [filteredCrimeData, setFilteredCrimeData] = useState(MOCK_CRIME_DATA.features)

  // Map boundaries (Delhi coordinates)
  const mapBounds = {
    minLng: 77.159, // Delhi west
    maxLng: 77.259, // Delhi east
    minLat: 28.5639, // Delhi south
    maxLat: 28.6639, // Delhi north
  }

  // Filter data based on selected date
  useEffect(() => {
    if (!selectedDate) {
      setFilteredCrimeData(MOCK_CRIME_DATA.features)
      return
    }

    const selectedDateStr = selectedDate.toISOString().split("T")[0]
    const filtered = MOCK_CRIME_DATA.features.filter((feature) => {
      const crimeDate = new Date(feature.properties.time).toISOString().split("T")[0]
      return crimeDate === selectedDateStr
    })

    setFilteredCrimeData(filtered)
  }, [selectedDate])

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
    filteredCrimeData.forEach((feature) => {
      const [lng, lat] = feature.geometry.coordinates
      const { x, y } = coordToCanvas(lng, lat)
      const magnitude = feature.properties.magnitude

      // Draw heatmap circle
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, magnitude * 30)
      gradient.addColorStop(0, "rgba(255, 77, 79, 0.8)")
      gradient.addColorStop(1, "rgba(255, 77, 79, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, magnitude * 30, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw crime points
    filteredCrimeData.forEach((feature) => {
      const [lng, lat] = feature.geometry.coordinates
      const { x, y } = coordToCanvas(lng, lat)

      ctx.fillStyle = "#ff4d4f"
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1

      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    })

    // Draw prediction areas if enabled
    if (showPredictions) {
      MOCK_PREDICTION_DATA.features.forEach((feature) => {
        const [lng, lat] = feature.geometry.coordinates
        const { x, y } = coordToCanvas(lng, lat)
        const probability = feature.properties.probability

        // Draw prediction circle
        ctx.strokeStyle = "rgba(0, 255, 0, 0.8)"
        ctx.fillStyle = "rgba(0, 255, 0, 0.1)"
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.arc(x, y, probability * 40, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      })
    }

    // Handle click events
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // Check if click is on a crime point
      for (const feature of filteredCrimeData) {
        const [lng, lat] = feature.geometry.coordinates
        const { x, y } = coordToCanvas(lng, lat)

        // Calculate distance between click and point
        const distance = Math.sqrt(Math.pow(clickX - x, 2) + Math.pow(clickY - y, 2))

        // If click is within point radius, select the crime
        if (distance <= 8) {
          setSelectedCrime(feature.properties)
          return
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
  }, [filteredCrimeData, showPredictions, mapBounds])

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full rounded-b-lg" />

      {selectedCrime && (
        <Card className="absolute bottom-4 left-4 p-4 w-64 bg-card/90 backdrop-blur-sm">
          <h4 className="font-semibold">{selectedCrime.type}</h4>
          <p className="text-sm text-muted-foreground">{new Date(selectedCrime.time).toLocaleString()}</p>
          <p className="text-sm mt-2">
            Severity: <span className="font-medium">{selectedCrime.magnitude.toFixed(2)}</span>
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
