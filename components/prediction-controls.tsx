"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface PredictionControlsProps {
  showPredictions: boolean
  onTogglePredictions: (show: boolean) => void
}

export function PredictionControls({ showPredictions, onTogglePredictions }: PredictionControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="show-predictions" checked={showPredictions} onCheckedChange={onTogglePredictions} />
      <Label htmlFor="show-predictions">Show Predictions</Label>
    </div>
  )
}
