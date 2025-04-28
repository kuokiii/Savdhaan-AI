import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function TestimonialSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <div className="mx-auto mb-16 max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Trusted by Law Enforcement</h2>
          <p className="text-muted-foreground md:text-lg">
            Hear from the agencies that have transformed their approach to crime prevention with CrimeDrip AI.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            quote="CrimeDrip AI has revolutionized how we allocate patrol resources. We've seen a 28% reduction in property crimes in our highest-risk areas."
            name="Captain Sarah Johnson"
            role="Metro Police Department"
            avatar="/placeholder.svg?height=80&width=80"
            initials="SJ"
          />
          <TestimonialCard
            quote="The predictive accuracy is remarkable. We've been able to prevent several incidents by having officers in the right place at the right time."
            name="Chief Michael Rodriguez"
            role="County Sheriff's Office"
            avatar="/placeholder.svg?height=80&width=80"
            initials="MR"
          />
          <TestimonialCard
            quote="The dashboard is intuitive and provides our analysts with powerful insights. It's become an essential part of our daily operations."
            name="Lt. David Chen"
            role="Crime Analysis Unit"
            avatar="/placeholder.svg?height=80&width=80"
            initials="DC"
          />
        </div>

        <div className="mt-16">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="aspect-video bg-muted md:aspect-auto">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Case study preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Quote className="h-5 w-5 text-primary" />
                  </div>
                  <blockquote className="mb-6 text-xl font-medium italic">
                    "After implementing CrimeDrip AI, we've seen a 32% reduction in violent crimes and saved an
                    estimated $1.2M in operational costs through optimized resource allocation."
                  </blockquote>
                  <div>
                    <div className="font-bold">Commissioner Thomas Wilson</div>
                    <div className="text-muted-foreground">Metropolitan Police Department</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  quote,
  name,
  role,
  avatar,
  initials,
}: {
  quote: string
  name: string
  role: string
  avatar: string
  initials: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Quote className="h-5 w-5 text-primary" />
        </div>
        <blockquote className="mb-6 text-lg">{quote}</blockquote>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
