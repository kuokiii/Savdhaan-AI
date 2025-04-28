"use client"

import { useState } from "react"
import { CrimeMapWithAPI } from "@/components/crime-map-with-api"
import { TimeSeriesChartWithAPI } from "@/components/time-series-chart-with-api"
import { PredictionControls } from "@/components/prediction-controls"
import { StatsCards } from "@/components/stats-cards"
import { DateRangePicker } from "@/components/date-range-picker"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertTriangle, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { getCrimeStatistics, generatePredictions } from "@/lib/api"
import { useEffect } from "react"

export default function DashboardWithAPI() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showPredictions, setShowPredictions] = useState(false)
  const [timeRange, setTimeRange] = useState("24h")
  const [highRiskAreas, setHighRiskAreas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch high risk areas on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const stats = await getCrimeStatistics({})

        // Check if high_risk_areas exists and is an array
        if (stats && stats.high_risk_areas && Array.isArray(stats.high_risk_areas)) {
          setHighRiskAreas(stats.high_risk_areas.slice(0, 3))
        } else {
          // Use fallback data if API doesn't return expected structure
          setHighRiskAreas([
            {
              name: "Andheri East",
              riskLevel: "high",
              predictedCrimes: ["Theft", "Robbery"],
              recentIncidents: 12,
            },
            {
              name: "Dadar West",
              riskLevel: "high",
              predictedCrimes: ["Assault", "Vandalism"],
              recentIncidents: 8,
            },
            {
              name: "Bandra Station",
              riskLevel: "medium",
              predictedCrimes: ["Theft"],
              recentIncidents: 5,
            },
          ])
          console.warn("API didn't return expected high_risk_areas structure, using fallback data")
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching high risk areas:", error)
        // Use fallback data on error
        setHighRiskAreas([
          {
            name: "Andheri East",
            riskLevel: "high",
            predictedCrimes: ["Theft", "Robbery"],
            recentIncidents: 12,
          },
          {
            name: "Dadar West",
            riskLevel: "high",
            predictedCrimes: ["Assault", "Vandalism"],
            recentIncidents: 8,
          },
          {
            name: "Bandra Station",
            riskLevel: "medium",
            predictedCrimes: ["Theft"],
            recentIncidents: 5,
          },
        ])
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle prediction generation
  const handleRunPrediction = async () => {
    try {
      // Generate predictions for Mumbai area
      await generatePredictions({
        location: { latitude: 19.076, longitude: 72.8777 },
        time_range: {
          start_time: new Date().toISOString(),
          end_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
      })

      // Show predictions on map
      setShowPredictions(true)

      // Refresh high risk areas
      const stats = await getCrimeStatistics({})
      setHighRiskAreas(stats.high_risk_areas.slice(0, 3))
    } catch (error) {
      console.error("Error generating predictions:", error)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card hover3d className="overflow-hidden">
            <CardHeader className="flex flex-col space-y-1.5 p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 bg-gradient-to-r from-primary/5 to-transparent">
              <CardTitle className="text-lg font-semibold leading-none tracking-tight">Crime Heatmap</CardTitle>
              <div className="flex items-center gap-2">
                <DateRangePicker onDateChange={(date) => setSelectedDate(date)} />
                <PredictionControls
                  showPredictions={showPredictions}
                  onTogglePredictions={() => setShowPredictions(!showPredictions)}
                  onRunPrediction={handleRunPrediction}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] w-full">
                <CrimeMapWithAPI showPredictions={showPredictions} selectedDate={selectedDate} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card hover3d className="overflow-hidden">
            <CardHeader className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/5 to-transparent">
              <CardTitle className="text-lg font-semibold leading-none tracking-tight">Crime Trends</CardTitle>
              <Tabs defaultValue="24h" className="w-[200px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="24h" onClick={() => setTimeRange("24h")}>
                    24h
                  </TabsTrigger>
                  <TabsTrigger value="7d" onClick={() => setTimeRange("7d")}>
                    7d
                  </TabsTrigger>
                  <TabsTrigger value="30d" onClick={() => setTimeRange("30d")}>
                    30d
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-4">
              <TimeSeriesChartWithAPI timeRange={timeRange} />
            </CardContent>
          </Card>

          <Card hover3d className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500/5 to-transparent">
              <CardTitle className="text-lg font-semibold leading-none tracking-tight">Prediction Accuracy</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Accuracy</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "87%" }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Precision</span>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "82%" }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Recall</span>
                  <span className="text-sm font-medium">79%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "79%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card hover3d className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-500/5 to-transparent">
              <CardTitle className="text-lg font-semibold leading-none tracking-tight">High Risk Areas</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-2 animate-pulse">
                      <div className="h-6 w-12 rounded bg-muted"></div>
                      <div className="flex-1">
                        <div className="h-4 w-24 rounded bg-muted"></div>
                        <div className="mt-1 h-3 w-32 rounded bg-muted"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {highRiskAreas.map((area, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-0.5">
                        {(area.riskLevel || area.risk_level || "high").charAt(0).toUpperCase() +
                          (area.riskLevel || area.risk_level || "high").slice(1)}
                      </Badge>
                      <div>
                        <div className="font-medium flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-red-500" />
                          {area.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Predicted:{" "}
                          {Array.isArray(area.predictedCrimes || area.predicted_crimes)
                            ? (area.predictedCrimes || area.predicted_crimes).join(", ")
                            : "Various crimes"}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link href="/predictions">
                    <Button variant="ghost" size="sm" className="w-full mt-2 text-primary">
                      View all high risk areas
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card hover3d className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
              Recent Incidents
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {[
                { type: "Theft", location: "Andheri East", time: "2 hours ago" },
                { type: "Assault", location: "Dadar West", time: "5 hours ago" },
                { type: "Robbery", location: "Bandra West", time: "Yesterday" },
                { type: "Vandalism", location: "Juhu", time: "Yesterday" },
              ].map((incident, i) => (
                <div key={i} className="flex items-start gap-2 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-primary"></div>
                  <div>
                    <div className="font-medium">{incident.type}</div>
                    <div className="text-xs text-muted-foreground">{incident.location}</div>
                    <div className="text-xs text-muted-foreground">{incident.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/reports">
              <Button variant="ghost" size="sm" className="w-full mt-4 text-primary">
                View all incidents
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card hover3d className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent">
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-blue-500" />
              Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500"></div>
                <p className="text-sm">Stay alert and aware of your surroundings, especially in unfamiliar areas.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500"></div>
                <p className="text-sm">Avoid displaying valuable items in public places.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500"></div>
                <p className="text-sm">Use verified transportation services, especially at night.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500"></div>
                <p className="text-sm">Keep emergency contacts readily available on your phone.</p>
              </div>
            </div>
            <Link href="/safety-tips">
              <Button variant="ghost" size="sm" className="w-full mt-4 text-blue-500">
                View all safety tips
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card hover3d className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-500/5 to-transparent">
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-amber-500" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg border bg-card/50">
                <div className="font-medium">Police</div>
                <div className="text-xl font-bold text-primary">100</div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg border bg-card/50">
                <div className="font-medium">Ambulance</div>
                <div className="text-xl font-bold text-primary">108</div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg border bg-card/50">
                <div className="font-medium">Women Helpline</div>
                <div className="text-xl font-bold text-primary">1091</div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg border bg-card/50">
                <div className="font-medium">Child Helpline</div>
                <div className="text-xl font-bold text-primary">1098</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
