import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, MapPin, BarChart3, AlertTriangle, Clock } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative size-8 overflow-hidden rounded-full bg-primary">
              <div className="absolute inset-0 flex items-center justify-center text-primary-foreground">
                <span className="font-bold">S</span>
              </div>
            </div>
            <span className="text-xl font-bold">Satark</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#safety-tips"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Safety Tips
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="hidden md:flex">
                View Dashboard
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 -z-10 opacity-[0.02]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>

          <div className="container relative">
            <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
              <div className="flex items-center justify-center rounded-full bg-muted px-4 py-1 text-sm font-medium">
                <Shield className="mr-1 h-4 w-4 text-primary" />
                <span>Trusted by communities across India</span>
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
                Stay Safe. <br className="hidden sm:inline" />
                <span className="text-primary">Stay Alert.</span>
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Satark uses advanced machine learning to predict crime hotspots and help citizens stay informed and
                vigilant in their communities.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-1">
                    Explore Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="mt-16 flex justify-center">
              <div className="relative w-full max-w-[1000px] overflow-hidden rounded-lg border bg-background shadow-xl">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src="/images/dashboard-preview.png"
                    alt="Satark Dashboard Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <div className="mx-auto mb-16 max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Key Features</h2>
              <p className="text-muted-foreground md:text-lg">
                Satark combines cutting-edge machine learning with intuitive visualizations to help citizens and law
                enforcement stay vigilant.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<MapPin className="h-10 w-10 text-primary" />}
                title="Interactive Crime Maps"
                description="Visualize crime patterns with interactive heatmaps that reveal hotspots and trends across your city."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-primary" />}
                title="Advanced Analytics"
                description="Gain insights through comprehensive data analysis, including time-series trends and location correlations."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-primary" />}
                title="Predictive Modeling"
                description="Our AI model predicts future crime hotspots with up to 87% accuracy based on historical patterns."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Safety Recommendations"
                description="Receive personalized safety tips and recommendations based on your location and current crime trends."
              />
              <FeatureCard
                icon={<AlertTriangle className="h-10 w-10 text-primary" />}
                title="Early Warning System"
                description="Receive alerts when unusual patterns emerge or when high-risk situations are predicted in your area."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-primary" />}
                title="Real-time Updates"
                description="Stay informed with real-time crime data and updates from official sources across India."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="mx-auto mb-16 max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">How Satark Works</h2>
              <p className="text-muted-foreground md:text-lg">
                Our platform uses a sophisticated pipeline to transform raw crime data into actionable insights for
                citizens.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <StepCard
                number="01"
                title="Data Collection"
                description="Historical crime data with location, time, and type is collected from official sources across India."
              />
              <StepCard
                number="02"
                title="AI Processing"
                description="Our advanced AI models analyze patterns and identify factors that contribute to crime occurrence."
              />
              <StepCard
                number="03"
                title="Risk Assessment"
                description="Areas are categorized by risk level based on historical data and predictive modeling."
              />
              <StepCard
                number="04"
                title="Safety Recommendations"
                description="Users receive personalized safety tips and alerts based on their location and activities."
              />
            </div>
          </div>
        </section>

        <section id="safety-tips" className="py-20 bg-muted/50">
          <div className="container">
            <div className="mx-auto mb-16 max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Safety Tips</h2>
              <p className="text-muted-foreground md:text-lg">
                Simple precautions can significantly reduce your risk. Here are some essential safety tips.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <SafetyTipCard
                title="Be Aware of Surroundings"
                description="Stay alert and aware of your surroundings, especially in unfamiliar areas or at night."
              />
              <SafetyTipCard
                title="Travel in Groups"
                description="Whenever possible, travel with friends or in groups, especially at night."
              />
              <SafetyTipCard
                title="Secure Your Home"
                description="Install sturdy doors with deadbolts and reinforce windows. Consider adding security systems."
              />
              <SafetyTipCard
                title="Share Your Location"
                description="Let trusted friends or family know your whereabouts when traveling alone."
              />
              <SafetyTipCard
                title="Use Verified Transportation"
                description="Use official taxis or verified ride-sharing services, especially at night."
              />
              <SafetyTipCard
                title="Keep Emergency Contacts"
                description="Save emergency contacts like 100 (Police), 108 (Ambulance), and 1091 (Women Helpline)."
              />
            </div>

            <div className="mt-8 text-center">
              <Link href="/safety-tips">
                <Button variant="outline" size="lg">
                  View All Safety Tips
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-[800px] rounded-xl bg-primary p-8 text-center text-primary-foreground shadow-lg md:p-12">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to stay safer in your community?</h2>
              <p className="mb-8 text-primary-foreground/90 md:text-lg">
                Join thousands of citizens using Satark to stay informed and vigilant.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary" className="w-full gap-1 sm:w-auto">
                    Get Started Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/safety-tips">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 sm:w-auto"
                  >
                    View Safety Tips
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col gap-10 md:flex-row md:gap-16">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2">
                <div className="relative size-8 overflow-hidden rounded-full bg-primary">
                  <div className="absolute inset-0 flex items-center justify-center text-primary-foreground">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                </div>
                <span className="text-xl font-bold">Satark</span>
              </div>
              <p className="mt-4 text-muted-foreground">
                Advanced crime prediction and awareness platform powered by machine learning to help citizens stay safe.
              </p>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="mb-3 text-sm font-medium">Platform</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#features">Features</Link>
                  </li>
                  <li>
                    <Link href="#how-it-works">How It Works</Link>
                  </li>
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link href="/safety-tips">Safety Tips</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#safety-tips">Safety Guide</Link>
                  </li>
                  <li>
                    <Link href="#contact">Community</Link>
                  </li>
                  <li>
                    <Link href="#contact">Support</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="#terms">Terms of Service</Link>
                  </li>
                  <li>
                    <Link href="#contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Satark. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="#terms">Terms</Link>
              <Link href="#privacy">Privacy</Link>
              <Link href="#cookies">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
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

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm relative">
      <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <h3 className="mb-2 text-xl font-bold mt-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function SafetyTipCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4">
        <Shield className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
