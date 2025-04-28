import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { MapClientWrapper } from "@/components/map-client-wrapper"

export default function MapPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <AppHeader />
          <main className="flex-1">
            <Suspense fallback={<LoadingState />}>
              <div className="p-4 md:p-6">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold tracking-tight">Crime Map</h1>
                  <p className="text-muted-foreground">
                    Visualize crime incidents and predicted hotspots across the city
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card hover3d className="md:col-span-2 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/5 to-transparent">
                      <CardTitle className="text-base font-medium">Crime Heatmap</CardTitle>
                      <Tabs defaultValue="all" className="w-[200px]">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="violent">Violent</TabsTrigger>
                          <TabsTrigger value="property">Property</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="h-[600px] w-full">
                        <MapClientWrapper />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col gap-4">
                    <Card hover3d className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent">
                        <CardTitle className="text-base font-medium">Area Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium">Selected Area</h3>
                            <p className="text-sm text-muted-foreground">Click on the map to select an area</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Risk Level</span>
                              <span className="text-sm font-medium text-amber-500">Medium</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Recent Incidents</span>
                              <span className="text-sm font-medium">24</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Common Crime Type</span>
                              <span className="text-sm font-medium">Theft</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <AnimatedGradientBackground>
                      <Card hover3d className="border-0 bg-transparent">
                        <CardHeader className="bg-transparent">
                          <CardTitle className="text-base font-medium">Safety Tips</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 h-2 w-2 rounded-full bg-primary"></span>
                              <span>Avoid walking alone in poorly lit areas after dark</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 h-2 w-2 rounded-full bg-primary"></span>
                              <span>Keep valuables out of sight when in public</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 h-2 w-2 rounded-full bg-primary"></span>
                              <span>Be aware of your surroundings at ATMs and banks</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 h-2 w-2 rounded-full bg-primary"></span>
                              <span>Report suspicious activities to local authorities</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </AnimatedGradientBackground>

                    <Card hover3d className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-amber-500/5 to-transparent">
                        <CardTitle className="text-base font-medium">Emergency Contacts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="font-medium">Police Emergency</div>
                            <div className="text-sm text-muted-foreground">100</div>
                          </div>
                          <div>
                            <div className="font-medium">Women Helpline</div>
                            <div className="text-sm text-muted-foreground">1091</div>
                          </div>
                          <div>
                            <div className="font-medium">Ambulance</div>
                            <div className="text-sm text-muted-foreground">108</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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
      <span className="ml-2 text-lg">Loading map data...</span>
    </div>
  )
}
