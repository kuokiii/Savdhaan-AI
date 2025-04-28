"use client"

import { Suspense } from "react"
import { Loader2, Calendar, BarChart2, PieChart, TrendingUp } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TimeSeriesChartWithAPI } from "@/components/time-series-chart-with-api"
import { DateRangePicker } from "@/components/date-range-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  // Handle date change function
  const handleDateChange = () => {
    // This function can now be safely passed to client components
    console.log("Date changed")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <AppHeader />
          <main className="flex-1">
            <Suspense fallback={<LoadingState />}>
              <div className="p-4 md:p-6">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Crime Analytics</h1>
                    <p className="text-muted-foreground">Analyze crime patterns and trends to gain insights</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <DateRangePicker onDateChange={handleDateChange} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,853</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-red-500 flex items-center">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          +12.5%
                        </span>{" "}
                        from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Violent Crimes</CardTitle>
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">487</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-500 flex items-center">
                          <TrendingUp className="mr-1 h-3 w-3 rotate-180" />
                          -3.2%
                        </span>{" "}
                        from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Property Crimes</CardTitle>
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,892</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-red-500 flex items-center">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          +8.7%
                        </span>{" "}
                        from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Other Incidents</CardTitle>
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">474</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-red-500 flex items-center">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          +5.3%
                        </span>{" "}
                        from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Crime Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="7d" className="mb-4">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="24h">24h</TabsTrigger>
                          <TabsTrigger value="7d">7d</TabsTrigger>
                          <TabsTrigger value="30d">30d</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <div className="h-[300px]">
                        <TimeSeriesChartWithAPI timeRange="7d" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Crime by Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <SimpleLineChart />
                      </div>
                      <div className="mt-4 flex justify-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-[#f97316]"></span>
                          <span className="text-sm">Theft</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-[#0ea5e9]"></span>
                          <span className="text-sm">Assault</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-[#a855f7]"></span>
                          <span className="text-sm">Burglary</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-base font-medium">Crime by Time of Day</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Morning (6AM-12PM)</span>
                          <span className="text-sm font-medium">18%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "18%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Afternoon (12PM-6PM)</span>
                          <span className="text-sm font-medium">24%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "24%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Evening (6PM-12AM)</span>
                          <span className="text-sm font-medium">42%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "42%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Night (12AM-6AM)</span>
                          <span className="text-sm font-medium">16%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "16%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-base font-medium">Crime by Location</CardTitle>
                      <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Residential Areas</span>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "35%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Commercial Areas</span>
                          <span className="text-sm font-medium">28%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "28%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Public Transport</span>
                          <span className="text-sm font-medium">22%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "22%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Parks & Recreation</span>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-base font-medium">Crime by Day of Week</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Monday</span>
                          <span className="text-sm font-medium">12%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "12%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Wednesday</span>
                          <span className="text-sm font-medium">13%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "13%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Friday</span>
                          <span className="text-sm font-medium">18%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "18%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Saturday</span>
                          <span className="text-sm font-medium">24%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "24%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function LoadingState() {
  return (
    <div className="flex h-[600px] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-lg">Loading analytics data...</span>
    </div>
  )
}

// Simple line chart component that doesn't rely on the Chart component
function SimpleLineChart() {
  // Sample data
  const data = [
    { month: "Jan", theft: 45, assault: 28, burglary: 18 },
    { month: "Feb", theft: 52, assault: 25, burglary: 15 },
    { month: "Mar", theft: 48, assault: 30, burglary: 20 },
    { month: "Apr", theft: 61, assault: 35, burglary: 17 },
    { month: "May", theft: 55, assault: 32, burglary: 22 },
    { month: "Jun", theft: 67, assault: 38, burglary: 24 },
  ]

  // Canvas-based chart implementation
  return (
    <div className="relative h-full w-full">
      <canvas
        id="crimeTypeChart"
        className="h-full w-full"
        ref={(canvas) => {
          if (canvas) {
            const ctx = canvas.getContext("2d")
            if (ctx) {
              // Clear canvas
              ctx.clearRect(0, 0, canvas.width, canvas.height)

              // Set canvas dimensions
              canvas.width = canvas.clientWidth
              canvas.height = canvas.clientHeight

              // Chart dimensions
              const padding = 40
              const chartWidth = canvas.width - padding * 2
              const chartHeight = canvas.height - padding * 2

              // Find max value for scaling
              const maxValue = Math.max(...data.flatMap((d) => [d.theft, d.assault, d.burglary]))

              // Draw axes
              ctx.beginPath()
              ctx.strokeStyle = "#64748b"
              ctx.lineWidth = 1
              ctx.moveTo(padding, padding)
              ctx.lineTo(padding, canvas.height - padding)
              ctx.lineTo(canvas.width - padding, canvas.height - padding)
              ctx.stroke()

              // Draw lines
              const drawLine = (values: number[], color: string) => {
                ctx.beginPath()
                ctx.strokeStyle = color
                ctx.lineWidth = 2

                values.forEach((value, i) => {
                  const x = padding + (i / (values.length - 1)) * chartWidth
                  const y = canvas.height - padding - (value / maxValue) * chartHeight

                  if (i === 0) {
                    ctx.moveTo(x, y)
                  } else {
                    ctx.lineTo(x, y)
                  }
                })

                ctx.stroke()

                // Draw points
                values.forEach((value, i) => {
                  const x = padding + (i / (values.length - 1)) * chartWidth
                  const y = canvas.height - padding - (value / maxValue) * chartHeight

                  ctx.beginPath()
                  ctx.fillStyle = color
                  ctx.arc(x, y, 4, 0, Math.PI * 2)
                  ctx.fill()
                })
              }

              // Draw each line
              drawLine(
                data.map((d) => d.theft),
                "#f97316",
              )
              drawLine(
                data.map((d) => d.assault),
                "#0ea5e9",
              )
              drawLine(
                data.map((d) => d.burglary),
                "#a855f7",
              )

              // Draw x-axis labels
              ctx.fillStyle = "#64748b"
              ctx.font = "12px sans-serif"
              ctx.textAlign = "center"

              data.forEach((d, i) => {
                const x = padding + (i / (data.length - 1)) * chartWidth
                ctx.fillText(d.month, x, canvas.height - padding + 20)
              })
            }
          }
        }}
      />
    </div>
  )
}
