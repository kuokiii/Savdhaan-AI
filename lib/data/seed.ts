import { db } from "@/lib/db"
import { crimeIncidents, highRiskAreas } from "@/lib/schema"
import { initializeDatabase } from "@/lib/db"

// Crime types
const CRIME_TYPES = [
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

// Mumbai coordinates for mock data generation
const MUMBAI_CENTER = { latitude: 19.076, longitude: 72.8777 }
const MUMBAI_RADIUS = 0.1 // Roughly 10km

// Generate random location within radius
function generateRandomLocation(center: { latitude: number; longitude: number }, radius: number) {
  // Random angle
  const angle = Math.random() * 2 * Math.PI

  // Random distance (use square root to ensure uniform distribution)
  const distance = Math.random() * radius

  // Calculate new coordinates
  const latitude = center.latitude + distance * Math.cos(angle)
  const longitude = center.longitude + distance * Math.sin(angle)

  return { latitude, longitude }
}

// Generate mock crime incidents
async function generateMockIncidents(count = 500) {
  const incidents = []

  for (let i = 0; i < count; i++) {
    // Random location
    const location = generateRandomLocation(MUMBAI_CENTER, MUMBAI_RADIUS)

    // Random timestamp within the last 30 days
    const daysAgo = Math.random() * 30
    const timestamp = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)

    // Random crime type and severity
    const crimeType = CRIME_TYPES[Math.floor(Math.random() * CRIME_TYPES.length)]
    const severity = 1 + Math.random() * 4 // 1-5 scale

    incidents.push({
      crimeType,
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp,
      severity,
      description: `Mock ${crimeType.toLowerCase()} incident`,
    })
  }

  // Insert into database
  await db.insert(crimeIncidents).values(incidents)
  console.log(`Generated ${count} mock crime incidents`)
}

// Generate high risk areas
async function generateHighRiskAreas() {
  // Mumbai neighborhoods
  const neighborhoods = [
    { name: "Andheri East", latitude: 19.1136, longitude: 72.8697 },
    { name: "Dadar West", latitude: 19.0178, longitude: 72.8478 },
    { name: "Bandra Station", latitude: 19.0596, longitude: 72.8295 },
    { name: "Kurla Market", latitude: 19.0726, longitude: 72.8845 },
    { name: "Juhu Beach", latitude: 19.0883, longitude: 72.8262 },
  ]

  const areas = []

  for (const area of neighborhoods) {
    // Generate random crime types for each area
    const predictedCrimes = []
    const numCrimes = Math.floor(Math.random() * 3) + 1

    for (let i = 0; i < numCrimes; i++) {
      predictedCrimes.push(CRIME_TYPES[Math.floor(Math.random() * CRIME_TYPES.length)])
    }

    areas.push({
      name: area.name,
      latitude: area.latitude,
      longitude: area.longitude,
      riskLevel: Math.random() > 0.3 ? "high" : "medium", // Bias towards high
      predictedCrimes,
      recentIncidents: Math.floor(Math.random() * 25) + 5,
    })
  }

  // Insert into database
  await db.insert(highRiskAreas).values(areas)
  console.log(`Generated ${areas.length} high risk areas`)
}

// Seed the database
export async function seedDatabase() {
  try {
    console.log("Initializing database...")
    await initializeDatabase()

    console.log("Seeding database with mock data...")
    await generateMockIncidents()
    await generateHighRiskAreas()

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  }
}
