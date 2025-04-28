import { ArrowDownIcon, ArrowUpIcon, AlertTriangle, Map, Clock, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatsCards() {
  return (
    <>
      <Card hover3d className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-transparent">
          <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
          <div className="rounded-full p-2 bg-primary/10">
            <BarChart3 className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold">2,853</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className={cn("flex items-center", "text-red-500")}>
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              +12.5%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>

      <Card hover3d className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-transparent">
          <CardTitle className="text-sm font-medium">Active Hotspots</CardTitle>
          <div className="rounded-full p-2 bg-blue-500/10">
            <Map className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold">14</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className={cn("flex items-center", "text-green-500")}>
              <ArrowDownIcon className="mr-1 h-3 w-3" />
              -3.2%
            </span>{" "}
            from last week
          </p>
        </CardContent>
      </Card>

      <Card hover3d className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-500/10 to-transparent">
          <CardTitle className="text-sm font-medium">Predicted Incidents</CardTitle>
          <div className="rounded-full p-2 bg-amber-500/10">
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold">87</div>
          <p className="text-xs text-muted-foreground mt-1">For the next 24 hours</p>
        </CardContent>
      </Card>

      <Card hover3d className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-red-500/10 to-transparent">
          <CardTitle className="text-sm font-medium">High Risk Areas</CardTitle>
          <div className="rounded-full p-2 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold">5</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className={cn("flex items-center", "text-red-500")}>
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              +2
            </span>{" "}
            from yesterday
          </p>
        </CardContent>
      </Card>
    </>
  )
}
