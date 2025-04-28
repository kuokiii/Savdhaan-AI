"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface DateRangePickerProps {
  onDateChange?: (date: Date) => void
}

export function DateRangePicker({ onDateChange }: DateRangePickerProps) {
  const [date, setDate] = useState<Date>(new Date())

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      if (onDateChange) {
        onDateChange(selectedDate)
      }
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-3.5 w-3.5" />
          <span>{format(date, "PPP")}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
