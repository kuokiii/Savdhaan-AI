"use client"

import { useState } from "react"
import { Clock, MapPin } from "lucide-react"
import { CrimeMap } from "@/components/crime-map"
import { DateRangePicker } from "@/components/date-range-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export function PredictionsClientWrapper() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [predictionTimeframe, setPredictionTimeframe] = useState<string>("24h")

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleRunPrediction = () => {
    console.log("Running prediction for", selectedDate)
    // Implement prediction logic here
  }

  const handleTimeframeChange = (value: string) => {
    setPredictionTimeframe(value)
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Crime Predictions</h1>
          <p className="text-muted-foreground">View AI-powered predictions of potential crime hotspots</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DateRangePicker onDateChange={handleDateChange} />
          <Button size="sm" className="h-8 gap-1 bg-primary hover:bg-primary/90" onClick={handleRunPrediction}>
            <Clock className="h-3.5 w-3.5" />
            <span>Run Prediction</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Predicted Crime Hotspots</CardTitle>
            <Tabs
              defaultValue="24h"
              value={predictionTimeframe}
              onValueChange={handleTimeframeChange}
              className="w-[200px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="24h">24h</TabsTrigger>
                <TabsTrigger value="48h">48h</TabsTrigger>
                <TabsTrigger value="72h">72h</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[600px] w-full">
              <CrimeMap showPredictions={true} selectedDate={selectedDate} />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Prediction Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Predicted Incidents</span>
                  <span className="text-sm font-medium">87</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">High Risk Areas</span>
                  <span className="text-sm font-medium">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Medium Risk Areas</span>
                  <span className="text-sm font-medium">9</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Low Risk Areas</span>
                  <span className="text-sm font-medium">14</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Prediction Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
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

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">High Risk Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-destructive" />
                  <div>
                    <div className="font-medium">Andheri East</div>
                    <div className="text-xs text-muted-foreground">Predicted: Theft, Robbery</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-destructive" />
                  <div>
                    <div className="font-medium">Dadar West</div>
                    <div className="text-xs text-muted-foreground">Predicted: Theft, Assault</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-destructive" />
                  <div>
                    <div className="font-medium">Bandra Station</div>
                    <div className="text-xs text-muted-foreground">Predicted: Pickpocketing</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-destructive" />
                  <div>
                    <div className="font-medium">Kurla Market</div>
                    <div className="text-xs text-muted-foreground">Predicted: Theft, Fraud</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-destructive" />
                  <div>
                    <div className="font-medium">Juhu Beach</div>
                    <div className="text-xs text-muted-foreground">Predicted: Theft, Harassment</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
