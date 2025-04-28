import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-[800px] rounded-xl bg-primary p-8 text-center text-primary-foreground shadow-lg md:p-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to transform your approach to crime prevention?</h2>
          <p className="mb-8 text-primary-foreground/90 md:text-lg">
            Join over 200 law enforcement agencies using CrimeDrip AI to make their communities safer.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="w-full gap-1 sm:w-auto">
                Try Demo Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#contact-form">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 sm:w-auto"
              >
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
