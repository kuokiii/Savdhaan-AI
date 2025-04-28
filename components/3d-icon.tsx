import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface Icon3DProps {
  icon: LucideIcon
  color?: string
  size?: number
  className?: string
}

export function Icon3D({ icon: Icon, color = "primary", size = 24, className }: Icon3DProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Shadow layer */}
      <Icon
        size={size}
        className={cn(
          "absolute opacity-30 translate-x-[2px] translate-y-[2px] blur-[1px]",
          color === "primary" && "text-primary",
          color === "blue" && "text-blue-500",
          color === "amber" && "text-amber-500",
          color === "red" && "text-red-500",
          color === "green" && "text-green-500",
        )}
      />

      {/* Main icon */}
      <Icon
        size={size}
        className={cn(
          "relative",
          color === "primary" && "text-primary",
          color === "blue" && "text-blue-500",
          color === "amber" && "text-amber-500",
          color === "red" && "text-red-500",
          color === "green" && "text-green-500",
        )}
      />
    </div>
  )
}
