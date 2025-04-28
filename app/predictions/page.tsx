import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { PredictionsClientWrapper } from "@/components/predictions-client-wrapper"

export default function PredictionsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <AppHeader />
          <main className="flex-1">
            <Suspense fallback={<LoadingState />}>
              <PredictionsClientWrapper />
            </Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function LoadingState() {
  return (
    <div className="flex h-[600px] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-lg">Loading prediction data...</span>
    </div>
  )
}
