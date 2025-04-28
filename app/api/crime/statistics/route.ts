import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const params = {
      start_date: searchParams.get("start_date") || undefined,
      end_date: searchParams.get("end_date") || undefined,
      crime_type: searchParams.get("crime_type") || undefined,
    }

    // Mock statistics data since we're not connecting to a real backend yet
    const statistics = {
      total_incidents: 245,
      by_type: {
        Theft: 78,
        Assault: 42,
        Burglary: 35,
        Robbery: 28,
        Vandalism: 22,
        Fraud: 18,
        "Drug Offense": 12,
        "Vehicle Theft": 10,
      },
      by_time_of_day: {
        morning: 45,
        afternoon: 62,
        evening: 98,
        night: 40,
      },
      by_day_of_week: {
        monday: 32,
        tuesday: 28,
        wednesday: 35,
        thursday: 30,
        friday: 42,
        saturday: 48,
        sunday: 30,
      },
      high_risk_areas: [
        {
          name: "Andheri East",
          latitude: 19.1136,
          longitude: 72.8697,
          riskLevel: "high",
          predictedCrimes: ["Theft", "Robbery"],
          recentIncidents: 12,
        },
        {
          name: "Dadar West",
          latitude: 19.0178,
          longitude: 72.8478,
          riskLevel: "high",
          predictedCrimes: ["Assault", "Vandalism"],
          recentIncidents: 8,
        },
        {
          name: "Bandra Station",
          latitude: 19.0596,
          longitude: 72.8295,
          riskLevel: "medium",
          predictedCrimes: ["Theft"],
          recentIncidents: 5,
        },
        {
          name: "Kurla Market",
          latitude: 19.0726,
          longitude: 72.8845,
          riskLevel: "high",
          predictedCrimes: ["Theft", "Robbery", "Assault"],
          recentIncidents: 15,
        },
        {
          name: "Juhu Beach",
          latitude: 19.0883,
          longitude: 72.8262,
          riskLevel: "low",
          predictedCrimes: ["Theft"],
          recentIncidents: 3,
        },
      ],
    }

    return NextResponse.json(statistics)
  } catch (error) {
    console.error("Error in crime statistics API:", error)
    return NextResponse.json({ error: "Failed to fetch crime statistics" }, { status: 500 })
  }
}
