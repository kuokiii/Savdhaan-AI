"use client"

import { useState } from "react"
import { FileText, Download, Printer, Share2, Filter } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ReportsClientWrapper() {
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() })

  const handleDateChange = (range: { from: Date; to: Date }) => {
    setDateRange(range)
  }

  const handleFilterClick = () => {
    console.log("Filter clicked")
  }

  const handleExportClick = () => {
    console.log("Export clicked")
  }

  const handlePrintClick = () => {
    console.log("Print clicked")
  }

  const handleShareClick = () => {
    console.log("Share clicked")
  }

  const handleViewReport = (reportId: string) => {
    console.log(`View report ${reportId}`)
  }

  const handleGenerateReport = () => {
    console.log("Generate report")
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Crime Reports</h1>
          <p className="text-muted-foreground">View and download reports on crime incidents and trends</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DateRangePicker onDateChange={handleDateChange} />
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleFilterClick}>
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Recent Reports</CardTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8" onClick={handleExportClick}>
                <Download className="mr-2 h-3.5 w-3.5" />
                Export
              </Button>
              <Button size="sm" variant="outline" className="h-8" onClick={handlePrintClick}>
                <Printer className="mr-2 h-3.5 w-3.5" />
                Print
              </Button>
              <Button size="sm" variant="outline" className="h-8" onClick={handleShareClick}>
                <Share2 className="mr-2 h-3.5 w-3.5" />
                Share
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">REP-2023-001</TableCell>
                    <TableCell>12 Apr 2023</TableCell>
                    <TableCell>Theft</TableCell>
                    <TableCell>Andheri East</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                        In Progress
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("REP-2023-001")}>
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REP-2023-002</TableCell>
                    <TableCell>15 Apr 2023</TableCell>
                    <TableCell>Assault</TableCell>
                    <TableCell>Dadar West</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Resolved
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("REP-2023-002")}>
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REP-2023-003</TableCell>
                    <TableCell>18 Apr 2023</TableCell>
                    <TableCell>Burglary</TableCell>
                    <TableCell>Bandra West</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("REP-2023-003")}>
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REP-2023-004</TableCell>
                    <TableCell>22 Apr 2023</TableCell>
                    <TableCell>Robbery</TableCell>
                    <TableCell>Kurla</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                        In Progress
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("REP-2023-004")}>
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REP-2023-005</TableCell>
                    <TableCell>25 Apr 2023</TableCell>
                    <TableCell>Vandalism</TableCell>
                    <TableCell>Juhu</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Resolved
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport("REP-2023-005")}>
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Report Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Daily Crime Summary</span>
                  <Button size="sm" variant="ghost" onClick={() => console.log("Download Daily Crime Summary")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Weekly Trend Analysis</span>
                  <Button size="sm" variant="ghost" onClick={() => console.log("Download Weekly Trend Analysis")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Monthly Statistics</span>
                  <Button size="sm" variant="ghost" onClick={() => console.log("Download Monthly Statistics")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Area Safety Report</span>
                  <Button size="sm" variant="ghost" onClick={() => console.log("Download Area Safety Report")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Prediction Accuracy</span>
                  <Button size="sm" variant="ghost" onClick={() => console.log("Download Prediction Accuracy")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Generate Custom Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option>Crime Summary</option>
                    <option>Trend Analysis</option>
                    <option>Area Statistics</option>
                    <option>Prediction Report</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <DateRangePicker onDateChange={handleDateChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="Enter location" />
                </div>
                <Button className="w-full" onClick={handleGenerateReport}>
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
