import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"
import { sql } from "drizzle-orm"

// Create a Neon client
const sqlClient = neon(process.env.DATABASE_URL!)

// Create a Drizzle client using the Neon client
export const db = drizzle(sqlClient, { schema })

// Helper function to execute raw SQL queries
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const result = await db.execute(sql.raw(query, params))
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Initialize the database with required tables
export async function initializeDatabase() {
  try {
    // Create crime_incidents table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS crime_incidents (
        id SERIAL PRIMARY KEY,
        crime_type VARCHAR(100) NOT NULL,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        timestamp TIMESTAMP NOT NULL,
        severity DOUBLE PRECISION NOT NULL,
        description TEXT
      )
    `)

    // Create predictions table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS predictions (
        id SERIAL PRIMARY KEY,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        probability DOUBLE PRECISION NOT NULL,
        crime_type VARCHAR(100),
        predicted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        for_timestamp TIMESTAMP NOT NULL
      )
    `)

    // Create high_risk_areas table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS high_risk_areas (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        risk_level VARCHAR(20) NOT NULL,
        predicted_crimes JSONB,
        recent_incidents INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization error:", error)
    throw error
  }
}
