export function StatsSection() {
  return (
    <section className="border-y bg-muted/30 py-12 md:py-20">
      <div className="container">
        <div className="grid gap-8 text-center md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            value="87%"
            label="Prediction Accuracy"
            description="Average accuracy of our crime hotspot predictions"
          />
          <StatCard
            value="32%"
            label="Crime Reduction"
            description="Average reduction in targeted areas after implementation"
          />
          <StatCard
            value="200+"
            label="Law Enforcement Partners"
            description="Agencies using our platform nationwide"
          />
          <StatCard
            value="4.2M"
            label="Data Points Analyzed"
            description="Historical crime incidents in our training dataset"
          />
        </div>
      </div>
    </section>
  )
}

function StatCard({
  value,
  label,
  description,
}: {
  value: string
  label: string
  description: string
}) {
  return (
    <div className="flex flex-col">
      <div className="text-4xl font-bold text-primary md:text-5xl">{value}</div>
      <div className="mt-2 text-xl font-medium">{label}</div>
      <div className="mt-1 text-sm text-muted-foreground">{description}</div>
    </div>
  )
}
