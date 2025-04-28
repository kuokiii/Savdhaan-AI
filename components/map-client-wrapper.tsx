"use client"

import { useState } from "react"
import { CrimeMapWithAPI } from "@/components/crime-map-with-api"
import { DateRangePicker } from "@/components/date-range-picker"
import { PredictionControls } from "@/components/prediction-controls"

export function MapClientWrapper() {
  const [showPredictions, setShowPredictions] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTogglePredictions = (show: boolean) => {
    setShowPredictions(show)
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2 p-4">
        <DateRangePicker onDateChange={handleDateChange} />
        <PredictionControls showPredictions={showPredictions} onTogglePredictions={handleTogglePredictions} />
      </div>
      <CrimeMapWithAPI showPredictions={showPredictions} selectedDate={selectedDate} />
    </div>
  )
}
