import type React from "react"
import { Database, Cpu, BarChart, MapPin } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="mx-auto mb-16 max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">How CrimeDrip AI Works</h2>
          <p className="text-muted-foreground md:text-lg">
            Our platform uses a sophisticated pipeline to transform raw crime data into actionable predictions.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border md:left-[80px] md:translate-x-0"></div>

          <div className="space-y-12">
            <Step
              icon={<Database />}
              title="Data Collection & Processing"
              description="Historical crime data with location, time, and type is collected, cleaned, and normalized to ensure quality inputs for our models."
              stepNumber="01"
            />

            <Step
              icon={<Cpu />}
              title="AI Model Training"
              description="Our ConvLSTM neural network learns spatial and temporal patterns from historical data to identify factors that contribute to crime occurrence."
              stepNumber="02"
            />

            <Step
              icon={<BarChart />}
              title="Pattern Analysis"
              description="The system analyzes trends, correlations, and anomalies to identify recurring patterns and potential causal relationships."
              stepNumber="03"
            />

            <Step
              icon={<MapPin />}
              title="Prediction Generation"
              description="Based on learned patterns, the system generates predictions for crime hotspots in the next 24-72 hours with detailed probability scores."
              stepNumber="04"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({
  icon,
  title,
  description,
  stepNumber,
}: {
  icon: React.ReactNode
  title: string
  description: string
  stepNumber: string
}) {
  return (
    <div className="relative flex flex-col gap-4 md:flex-row">
      <div className="flex md:block">
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border bg-background shadow-sm md:mx-auto">
          {icon}
        </div>
      </div>

      <div className="flex-1 rounded-lg border bg-card p-6 shadow-sm md:ml-12">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-2xl font-bold text-muted-foreground/30">{stepNumber}</span>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
