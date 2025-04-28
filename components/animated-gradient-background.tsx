import type React from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedGradientBackground({ children, className }: AnimatedGradientBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 -z-10 gradient-animate"
        style={{
          backgroundImage:
            "linear-gradient(120deg, hsl(var(--primary)/0.1), hsl(var(--primary)/0.05) 30%, transparent 60%, hsl(var(--primary)/0.1))",
        }}
      ></div>

      {/* Content */}
      {children}
    </div>
  )
}
