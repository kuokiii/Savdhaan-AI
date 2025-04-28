import type React from "react"
import { Map, BarChart3, Clock, Shield, AlertTriangle, Users, Zap } from "lucide-react"

export function FeatureSection() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container">
        <div className="mx-auto mb-16 max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features</h2>
          <p className="text-muted-foreground md:text-lg">
            CrimeDrip AI combines cutting-edge machine learning with intuitive visualizations to help law enforcement
            stay one step ahead.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Map className="h-10 w-10 text-primary" />}
            title="Interactive Crime Maps"
            description="Visualize crime patterns with interactive heatmaps that reveal hotspots and trends across your jurisdiction."
          />
          <FeatureCard
            icon={<BarChart3 className="h-10 w-10 text-primary" />}
            title="Advanced Analytics"
            description="Gain insights through comprehensive data analysis, including time-series trends and demographic correlations."
          />
          <FeatureCard
            icon={<Clock className="h-10 w-10 text-primary" />}
            title="Predictive Modeling"
            description="Our ConvLSTM model predicts future crime hotspots with up to 87% accuracy based on historical patterns."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-primary" />}
            title="Resource Optimization"
            description="Optimize patrol routes and resource allocation based on predicted crime patterns and risk assessment."
          />
          <FeatureCard
            icon={<AlertTriangle className="h-10 w-10 text-primary" />}
            title="Early Warning System"
            description="Receive alerts when unusual patterns emerge or when high-risk situations are predicted."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="Collaborative Platform"
            description="Enable seamless collaboration between departments and agencies with shared insights and reports."
          />
        </div>

        <div className="mt-16 rounded-lg border bg-card p-8 shadow-lg">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold">Powered by Advanced AI</h3>
              <p className="text-muted-foreground">
                Our platform leverages state-of-the-art machine learning algorithms including ConvLSTM for
                spatio-temporal prediction and SARIMA for time-series forecasting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
