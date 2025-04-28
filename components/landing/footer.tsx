import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export function Footer() {
  return (
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
              <span className="text-xl font-bold">CrimeDrip AI</span>
            </div>
            <p className="mt-4 text-muted-foreground">
              Advanced crime prediction and resource optimization platform powered by machine learning.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features">Features</Link>
                </li>
                <li>
                  <Link href="#how-it-works">How It Works</Link>
                </li>
                <li>
                  <Link href="/dashboard">Demo</Link>
                </li>
                <li>
                  <Link href="#pricing">Pricing</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#blog">Blog</Link>
                </li>
                <li>
                  <Link href="#case-studies">Case Studies</Link>
                </li>
                <li>
                  <Link href="#documentation">Documentation</Link>
                </li>
                <li>
                  <Link href="#support">Support</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#about">About</Link>
                </li>
                <li>
                  <Link href="#team">Team</Link>
                </li>
                <li>
                  <Link href="#careers">Careers</Link>
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
            &copy; {new Date().getFullYear()} CrimeDrip AI. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#terms">Terms</Link>
            <Link href="#privacy">Privacy</Link>
            <Link href="#cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
