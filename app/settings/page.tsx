import { Suspense } from "react"
import { Loader2, Moon, Sun } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <AppHeader />
          <main className="flex-1">
            <Suspense fallback={<LoadingState />}>
              <div className="p-4 md:p-6">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                  <p className="text-muted-foreground">Manage your account settings and preferences</p>
                </div>

                <Tabs defaultValue="account" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="account" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your account information and profile details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your name" defaultValue="Guest User" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Your email" defaultValue="guest@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="Your phone number" defaultValue="+91 98765 43210" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="Your location" defaultValue="Mumbai, Maharashtra" />
                        </div>
                        <Button>Save Changes</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>Update your password to keep your account secure</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button>Update Password</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>Choose what notifications you want to receive</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="crime-alerts">Crime Alerts</Label>
                            <p className="text-sm text-muted-foreground">Receive alerts about crimes in your area</p>
                          </div>
                          <Switch id="crime-alerts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="safety-tips">Safety Tips</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive periodic safety tips and recommendations
                            </p>
                          </div>
                          <Switch id="safety-tips" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="prediction-updates">Prediction Updates</Label>
                            <p className="text-sm text-muted-foreground">
                              Get notified when new crime predictions are available
                            </p>
                          </div>
                          <Switch id="prediction-updates" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                          </div>
                          <Switch id="email-notifications" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="sms-notifications">SMS Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                          </div>
                          <Switch id="sms-notifications" />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="privacy" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Privacy Settings</CardTitle>
                        <CardDescription>Manage your privacy and data sharing preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="location-sharing">Location Sharing</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow the app to access your location for better predictions
                            </p>
                          </div>
                          <Switch id="location-sharing" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="data-collection">Data Collection</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow anonymous data collection to improve our services
                            </p>
                          </div>
                          <Switch id="data-collection" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="third-party-sharing">Third-Party Sharing</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow sharing data with trusted third parties
                            </p>
                          </div>
                          <Switch id="third-party-sharing" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="data-retention">Data Retention Period</Label>
                          <Select defaultValue="90">
                            <SelectTrigger id="data-retention">
                              <SelectValue placeholder="Select a retention period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                              <SelectItem value="180">180 days</SelectItem>
                              <SelectItem value="365">1 year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button variant="outline" className="w-full">
                          Download My Data
                        </Button>
                        <Button variant="destructive" className="w-full">
                          Delete My Account
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="appearance" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Appearance Settings</CardTitle>
                        <CardDescription>Customize how the application looks and feels</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Theme</Label>
                          <div className="flex gap-4">
                            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4 w-full">
                              <Sun className="h-6 w-6" />
                              <span>Light</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="flex flex-col items-center gap-2 h-auto p-4 w-full bg-secondary"
                            >
                              <Moon className="h-6 w-6" />
                              <span>Dark</span>
                            </Button>
                            <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4 w-full">
                              <div className="flex">
                                <Sun className="h-6 w-6" />
                                <Moon className="h-6 w-6" />
                              </div>
                              <span>System</span>
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="hi">Hindi</SelectItem>
                              <SelectItem value="mr">Marathi</SelectItem>
                              <SelectItem value="ta">Tamil</SelectItem>
                              <SelectItem value="te">Telugu</SelectItem>
                              <SelectItem value="bn">Bengali</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="animations">Animations</Label>
                            <p className="text-sm text-muted-foreground">
                              Enable animations throughout the application
                            </p>
                          </div>
                          <Switch id="animations" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="compact-view">Compact View</Label>
                            <p className="text-sm text-muted-foreground">
                              Use a more compact layout to show more content
                            </p>
                          </div>
                          <Switch id="compact-view" />
                        </div>
                        <Button>Save Preferences</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
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
      <span className="ml-2 text-lg">Loading settings...</span>
    </div>
  )
}
