import { pgTable, serial, varchar, timestamp, doublePrecision, text, integer, jsonb } from "drizzle-orm/pg-core"

// Crime incidents table
export const crimeIncidents = pgTable("crime_incidents", {
  id: serial("id").primaryKey(),
  crimeType: varchar("crime_type", { length: 100 }).notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  severity: doublePrecision("severity").notNull(),
  description: text("description"),
})

// Predictions table
export const predictions = pgTable("predictions", {
  id: serial("id").primaryKey(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  probability: doublePrecision("probability").notNull(),
  crimeType: varchar("crime_type", { length: 100 }),
  predictedAt: timestamp("predicted_at").defaultNow().notNull(),
  forTimestamp: timestamp("for_timestamp").notNull(),
})

// High risk areas table
export const highRiskAreas = pgTable("high_risk_areas", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  riskLevel: varchar("risk_level", { length: 20 }).notNull(),
  predictedCrimes: jsonb("predicted_crimes"),
  recentIncidents: integer("recent_incidents").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
