import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import Dashboard from "@/components/dashboard-with-api"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <AppHeader />
          <main className="flex-1">
            <Suspense fallback={<LoadingState />}>
              <Dashboard />
            </Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function LoadingState() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-lg">Loading dashboard...</span>
    </div>
  )
}
