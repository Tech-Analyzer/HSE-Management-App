<<<<<<< HEAD
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">HSE Management System</h1>
      <nav className="space-y-4">
        <Link
          href="/scan-result"
          className="block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Scan Result
        </Link>
        <Link
          href="/generate-passport"
          className="block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Generate Passport
        </Link>
        <Link
          href="/dashboard"
          className="block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Dashboard
        </Link>
      </nav>
=======
"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HardHat, Truck, FileText, Users, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

const styles = {
  noScrollbar: cn(
    "scrollbar-none",
    "[&::-webkit-scrollbar]:hidden",
    "[&-ms-overflow-style:'none']",
    "[&::-webkit-scrollbar]:h-0",
    "[&::-webkit-scrollbar]:w-0",
  ),
}

// Mock data - replace with actual API calls in production
const manpowerData = [
  { permitId: "PTW001", location: "Site A", count: 50, status: "Open" },
  { permitId: "PTW002", location: "Site B", count: 30, status: "Closing Today" },
  { permitId: "PTW003", location: "Site C", count: 43, status: "Open" },
]

const equipmentData = [
  { permitId: "PTW001", location: "Site A", count: 10, status: "Open" },
  { permitId: "PTW002", location: "Site B", count: 5, status: "Closing Today" },
  { permitId: "PTW003", location: "Site C", count: 8, status: "Open" },
]

interface PTWLogEntry {
  permitId: string
  dateIssued: string
  typeOfPermit: string
  workLocation: string
  aa: string
  ac: string
  pa: string
  ph: string
  permitDescription: string
  permitValidityDate: string
  permitStatus: string
  permitCancelDate: string
  permitClosureDate: string
}

const ptwLogData: PTWLogEntry[] = [
  {
    permitId: "1199",
    dateIssued: "19/01/2025",
    typeOfPermit: "Cold Work Permit",
    workLocation: "Mabellah Pipeline",
    aa: "",
    ac: "",
    pa: "",
    ph: "Ganga - 94584193",
    permitDescription: "Excavation, Lifting, Installation of Fitting for washout and Air Valve Chamber, Backfilling",
    permitValidityDate: "14 Days",
    permitStatus: "Open",
    permitCancelDate: "",
    permitClosureDate: "01/02/2025",
  },
  {
    permitId: "1200",
    dateIssued: "19/01/2025",
    typeOfPermit: "Cold Work Permit",
    workLocation: "Al Khoud R5",
    aa: "",
    ac: "",
    pa: "",
    ph: "Basam - 98970111",
    permitDescription: "Surface Preparation, Cleaning",
    permitValidityDate: "14 Days",
    permitStatus: "Open",
    permitCancelDate: "",
    permitClosureDate: "01/02/2025",
  },
  {
    permitId: "1204",
    dateIssued: "21/01/2025",
    typeOfPermit: "Cold Work Permit",
    workLocation: "Mabellah Pipeline",
    aa: "",
    ac: "",
    pa: "",
    ph: "Ganga - 94584193",
    permitDescription: "Offloading of 1000 & 1200 Dia DI Pipe",
    permitValidityDate: "14 Days",
    permitStatus: "Open",
    permitCancelDate: "",
    permitClosureDate: "03/02/2025",
  },
]

const totalManpower = manpowerData.reduce((sum, item) => sum + item.count, 0)
const totalEquipment = equipmentData.reduce((sum, item) => sum + item.count, 0)
const openPtws = ptwLogData.filter((ptw) => ptw.permitStatus === "Open").length

export default function HomePage() {
  const [manpowerDialogOpen, setManpowerDialogOpen] = useState(false)
  const [equipmentDialogOpen, setEquipmentDialogOpen] = useState(false)
  const [ptwDialogOpen, setPtwDialogOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="both" />

      <main className="flex-1 container mx-auto py-4 px-4 md:py-8">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="cursor-pointer" onClick={() => setManpowerDialogOpen(true)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Total Manpower Today</CardTitle>
              <HardHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{totalManpower}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{format(new Date(), "dd/MM/yyyy")}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Across {manpowerData.length} active PTWs</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer" onClick={() => setEquipmentDialogOpen(true)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Equipment Assigned</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{totalEquipment}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{format(new Date(), "dd/MM/yyyy")}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Across {equipmentData.length} active PTWs</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer" onClick={() => setPtwDialogOpen(true)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Open PTWs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{openPtws}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground">All permits are currently open</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Compliance Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">98%</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground">2% non-compliant</p>
            </CardContent>
          </Card>
        </div>

        <Dialog open={manpowerDialogOpen} onOpenChange={setManpowerDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Total Manpower Breakdown</DialogTitle>
              <DialogDescription>
                Breakdown of manpower across active PTWs on {format(new Date(), "dd/MM/yyyy")}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[300px] sm:h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permit ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Manpower</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {manpowerData.map((item) => (
                    <TableRow key={item.permitId}>
                      <TableCell>{item.permitId}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <Dialog open={equipmentDialogOpen} onOpenChange={setEquipmentDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Equipment Assigned Breakdown</DialogTitle>
              <DialogDescription>
                Breakdown of equipment assigned across active PTWs on {format(new Date(), "dd/MM/yyyy")}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[300px] sm:h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permit ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Equipment Count</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipmentData.map((item) => (
                    <TableRow key={item.permitId}>
                      <TableCell>{item.permitId}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <Dialog open={ptwDialogOpen} onOpenChange={setPtwDialogOpen}>
          <DialogContent className="w-full sm:max-w-[90vw] h-[90vh] p-0 overflow-hidden">
            <DialogHeader className="p-4 sm:p-6 sticky top-0 bg-background z-10 border-b flex flex-col items-center justify-center">
              <DialogTitle className="text-center">PTW Log</DialogTitle>
              <DialogDescription className="text-center">Details of all Permits to Work</DialogDescription>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setPtwDialogOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogHeader>
            <div className={cn("overflow-auto h-[calc(90vh-100px)]", styles.noScrollbar)}>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[100px]">
                      Permit ID
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[100px]">
                      Date Issued
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[120px]">
                      Type of Permit
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[120px]">
                      Work Location
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[100px]">
                      A. A.
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[100px]">
                      A. C.
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[100px]">
                      P. A.
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[100px]">
                      P. H.
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[200px]">
                      Permit Description
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[120px]">
                      Permit Validity Date
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[100px]">
                      Permit Status
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[120px]">
                      Permit Cancel Date
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background z-10 text-center align-middle min-w-[120px]">
                      Permit Closure Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ptwLogData.map((ptw) => (
                    <TableRow key={ptw.permitId}>
                      <TableCell className="whitespace-nowrap">{ptw.permitId}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.dateIssued}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.typeOfPermit}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.workLocation}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.aa}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.ac}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.pa}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.ph}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.permitDescription}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.permitValidityDate}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.permitStatus}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.permitCancelDate}</TableCell>
                      <TableCell className="whitespace-nowrap">{ptw.permitClosureDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </main>
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
    </div>
  )
}

