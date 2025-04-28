import type React from "react"
import { Suspense } from "react"
import { Loader2, AlertTriangle, Shield, Home, MapPin, Phone, Clock, Users } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function SafetyTipsPage() {
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
                  <h1 className="text-2xl font-bold tracking-tight">Safety Tips & Resources</h1>
                  <p className="text-muted-foreground">
                    Learn how to stay safe and protect yourself and your community
                  </p>
                </div>

                <Tabs defaultValue="personal">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="personal">Personal Safety</TabsTrigger>
                    <TabsTrigger value="home">Home Security</TabsTrigger>
                    <TabsTrigger value="travel">Travel Safety</TabsTrigger>
                    <TabsTrigger value="digital">Digital Security</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <SafetyCard
                        icon={<AlertTriangle className="h-8 w-8 text-primary" />}
                        title="Be Aware of Your Surroundings"
                        description="Always stay alert and aware of your surroundings, especially in unfamiliar areas or at night. Avoid distractions like using your phone while walking."
                      />
                      <SafetyCard
                        icon={<Users className="h-8 w-8 text-primary" />}
                        title="Travel in Groups"
                        description="Whenever possible, travel with friends or in groups, especially at night. There's safety in numbers."
                      />
                      <SafetyCard
                        icon={<Phone className="h-8 w-8 text-primary" />}
                        title="Keep Emergency Contacts Ready"
                        description="Save emergency contacts on speed dial. Keep family and friends informed about your whereabouts."
                      />
                      <SafetyCard
                        icon={<MapPin className="h-8 w-8 text-primary" />}
                        title="Avoid High-Risk Areas"
                        description="Be aware of high-crime areas in your city and avoid them, especially at night. Use the Suraksha AI map to identify these areas."
                      />
                      <SafetyCard
                        icon={<Clock className="h-8 w-8 text-primary" />}
                        title="Plan Your Route"
                        description="Plan your travel route in advance, especially at night. Stick to well-lit, busy streets and avoid shortcuts through isolated areas."
                      />
                      <SafetyCard
                        icon={<Shield className="h-8 w-8 text-primary" />}
                        title="Self-Defense Basics"
                        description="Consider learning basic self-defense techniques. Carry legal personal safety devices like whistles or pepper spray where permitted."
                      />
                    </div>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Emergency Contacts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          <div className="rounded-lg border p-4">
                            <h3 className="font-bold flex items-center">
                              <Phone className="mr-2 h-4 w-4 text-primary" /> Police Emergency
                            </h3>
                            <p className="text-2xl font-bold mt-2">100</p>
                          </div>
                          <div className="rounded-lg border p-4">
                            <h3 className="font-bold flex items-center">
                              <Phone className="mr-2 h-4 w-4 text-primary" /> Women Helpline
                            </h3>
                            <p className="text-2xl font-bold mt-2">1091</p>
                          </div>
                          <div className="rounded-lg border p-4">
                            <h3 className="font-bold flex items-center">
                              <Phone className="mr-2 h-4 w-4 text-primary" /> Ambulance
                            </h3>
                            <p className="text-2xl font-bold mt-2">108</p>
                          </div>
                          <div className="rounded-lg border p-4">
                            <h3 className="font-bold flex items-center">
                              <Phone className="mr-2 h-4 w-4 text-primary" /> Fire Emergency
                            </h3>
                            <p className="text-2xl font-bold mt-2">101</p>
                          </div>
                          <div className="rounded-lg border p-4">
                            <h3 className="font-bold flex items-center">
                              <Phone className="mr-2 h-4 w-4 text-primary" /> Child Helpline
                            </h3>
                            <p className="text-2xl font-bold mt-2">1098</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="home" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <SafetyCard
                        icon={<Home className="h-8 w-8 text-primary" />}
                        title="Secure Entry Points"
                        description="Install sturdy doors with deadbolts and reinforce windows. Consider adding security grilles for ground floor windows in high-risk areas."
                      />
                      <SafetyCard
                        icon={<AlertTriangle className="h-8 w-8 text-primary" />}
                        title="Install Security Systems"
                        description="Consider installing a home security system with cameras, motion sensors, and alarms. Even visible security cameras can deter potential intruders."
                      />
                      <SafetyCard
                        icon={<Clock className="h-8 w-8 text-primary" />}
                        title="Lighting Matters"
                        description="Keep the exterior of your home well-lit. Install motion-sensor lights around entry points and dark corners of your property."
                      />
                      <SafetyCard
                        icon={<Users className="h-8 w-8 text-primary" />}
                        title="Know Your Neighbors"
                        description="Build relationships with neighbors and create a community watch program. Alert neighbors when you'll be away for extended periods."
                      />
                      <SafetyCard
                        icon={<Shield className="h-8 w-8 text-primary" />}
                        title="Secure Valuables"
                        description="Keep valuables in a safe or hidden location. Don't display expensive items where they can be seen from windows."
                      />
                      <SafetyCard
                        icon={<Phone className="h-8 w-8 text-primary" />}
                        title="Emergency Plan"
                        description="Create a family emergency plan. Ensure everyone knows emergency contacts and escape routes in case of break-ins or fire."
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="travel" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <SafetyCard
                        icon={<MapPin className="h-8 w-8 text-primary" />}
                        title="Research Your Destination"
                        description="Before traveling, research the safety of your destination. Be aware of high-risk areas and local emergency contacts."
                      />
                      <SafetyCard
                        icon={<Clock className="h-8 w-8 text-primary" />}
                        title="Plan Your Route"
                        description="Plan your travel route in advance. Use well-lit, busy streets and avoid shortcuts through isolated areas, especially at night."
                      />
                      <SafetyCard
                        icon={<Users className="h-8 w-8 text-primary" />}
                        title="Use Verified Transportation"
                        description="Use official taxis or verified ride-sharing services. Avoid unmarked or unofficial transportation, especially at night."
                      />
                      <SafetyCard
                        icon={<AlertTriangle className="h-8 w-8 text-primary" />}
                        title="Public Transport Safety"
                        description="Stay alert on public transportation. Keep valuables secure and be aware of your surroundings, especially in crowded areas."
                      />
                      <SafetyCard
                        icon={<Phone className="h-8 w-8 text-primary" />}
                        title="Share Your Itinerary"
                        description="Share your travel plans with trusted friends or family. Check in regularly, especially when traveling alone."
                      />
                      <SafetyCard
                        icon={<Shield className="h-8 w-8 text-primary" />}
                        title="Secure Your Belongings"
                        description="Keep valuables secure and out of sight. Use hotel safes for important documents and valuables when available."
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="digital" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <SafetyCard
                        icon={<Shield className="h-8 w-8 text-primary" />}
                        title="Strong Passwords"
                        description="Use strong, unique passwords for different accounts. Consider using a password manager to keep track of them securely."
                      />
                      <SafetyCard
                        icon={<AlertTriangle className="h-8 w-8 text-primary" />}
                        title="Beware of Phishing"
                        description="Be cautious of suspicious emails, messages, or calls asking for personal information. Verify the source before sharing any sensitive data."
                      />
                      <SafetyCard
                        icon={<Clock className="h-8 w-8 text-primary" />}
                        title="Regular Updates"
                        description="Keep your devices and software updated with the latest security patches to protect against vulnerabilities."
                      />
                      <SafetyCard
                        icon={<Users className="h-8 w-8 text-primary" />}
                        title="Social Media Privacy"
                        description="Review and adjust your privacy settings on social media. Be cautious about sharing personal information or location data publicly."
                      />
                      <SafetyCard
                        icon={<Phone className="h-8 w-8 text-primary" />}
                        title="Secure Your Devices"
                        description="Use screen locks, biometric authentication, and encryption on your devices. Install reputable security software."
                      />
                      <SafetyCard
                        icon={<Home className="h-8 w-8 text-primary" />}
                        title="Public Wi-Fi Caution"
                        description="Avoid accessing sensitive information when using public Wi-Fi. Consider using a VPN for additional security."
                      />
                    </div>
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

function SafetyCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function LoadingState() {
  return (
    <div className="flex h-[600px] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-lg">Loading safety tips...</span>
    </div>
  )
}
