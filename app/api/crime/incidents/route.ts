import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { crimeIncidents } from "@/lib/schema"
import { eq, gte, lte, sql } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")
    const crimeType = searchParams.get("crime_type")
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

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

    // Apply pagination
    query = query.limit(limit).offset(offset)

    // Order by timestamp (newest first)
    query = query.orderBy(sql`${crimeIncidents.timestamp} DESC`)

    const incidents = await query

    return NextResponse.json(incidents)
  } catch (error) {
    console.error("Error fetching crime incidents:", error)
    return NextResponse.json({ error: "Failed to fetch crime incidents" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.crime_type || !body.latitude || !body.longitude || !body.timestamp || body.severity === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert new incident
    const newIncident = await db
      .insert(crimeIncidents)
      .values({
        crimeType: body.crime_type,
        latitude: body.latitude,
        longitude: body.longitude,
        timestamp: new Date(body.timestamp),
        severity: body.severity,
        description: body.description || null,
      })
      .returning()

    return NextResponse.json(newIncident[0])
  } catch (error) {
    console.error("Error creating crime incident:", error)
    return NextResponse.json({ error: "Failed to create crime incident" }, { status: 500 })
  }
}
