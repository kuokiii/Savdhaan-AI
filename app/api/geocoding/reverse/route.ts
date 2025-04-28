import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const longitude = Number.parseFloat(searchParams.get("longitude") || "")
    const latitude = Number.parseFloat(searchParams.get("latitude") || "")
    const types = searchParams.get("types")

    if (isNaN(longitude) || isNaN(latitude)) {
      return NextResponse.json({ error: "Valid longitude and latitude parameters are required" }, { status: 400 })
    }

    // Build the Mapbox API URL
    const mapboxToken =
      process.env.MAPBOX_TOKEN ||
      "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`

    if (types) {
      url += `&types=${types}`
    }

    // Call the Mapbox API
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in reverse geocoding:", error)
    return NextResponse.json({ error: "Failed to perform reverse geocoding" }, { status: 500 })
  }
}
