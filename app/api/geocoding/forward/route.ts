import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("query")
    const limit = Number.parseInt(searchParams.get("limit") || "5")
    const country = searchParams.get("country")

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    // Build the Mapbox API URL
    const mapboxToken =
      process.env.MAPBOX_TOKEN ||
      "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&limit=${limit}`

    if (country) {
      url += `&country=${country}`
    }

    // Call the Mapbox API
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in forward geocoding:", error)
    return NextResponse.json({ error: "Failed to perform forward geocoding" }, { status: 500 })
  }
}
