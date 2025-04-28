import { type NextRequest, NextResponse } from "next/server"
import { seedDatabase } from "@/lib/data/seed"

export async function POST(request: NextRequest) {
  try {
    await seedDatabase()
    return NextResponse.json({ message: "Database seeded successfully" })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
