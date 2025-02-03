"use client"

import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Cog, FileText, ShieldCheck } from "lucide-react"

interface DashboardData {
  totalManpower: number
  equipmentAssigned: number
  openPTWs: number
  complianceRate: number
  activePTWs: number
  nonCompliantPercentage: number
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    totalManpower: 0,
    equipmentAssigned: 0,
    openPTWs: 0,
    complianceRate: 0,
    activePTWs: 0,
    nonCompliantPercentage: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch manpower allocation data
        const manpowerResponse = await fetch("/api/sheets?sheet=Manpower Allocation&action=getAll")
        const manpowerData = await manpowerResponse.json()
        const activeManpower = manpowerData.filter((record: any) => record.Status === "Active")

        // Fetch equipment allocation data
        const equipmentResponse = await fetch("/api/sheets?sheet=Equipment Allocation&action=getAll")
        const equipmentData = await equipmentResponse.json()
        const activeEquipment = equipmentData.filter((record: any) => record.Status === "Active")

        // Fetch PTW data
        const ptwResponse = await fetch("/api/sheets?sheet=PTW Log&action=getAll")
        const ptwData = await ptwResponse.json()
        const openPTWs = ptwData.filter((record: any) => record["Permit Status"] === "Open")

        // Fetch HSE e-Passports for compliance data
        const passportsResponse = await fetch("/api/sheets?sheet=HSE e-Passports&action=getAll")
        const passportsData = await passportsResponse.json()
        const compliantPassports = passportsData.filter(
          (record: any) =>
            record["Compliance Status"] === "Fully Compliant" || record["Compliance Status"] === "Partially Compliant",
        )

        const complianceRate = (compliantPassports.length / passportsData.length) * 100
        const nonCompliantPercentage = 100 - complianceRate

        setData({
          totalManpower: activeManpower.length,
          equipmentAssigned: activeEquipment.length,
          openPTWs: openPTWs.length,
          complianceRate: Math.round(complianceRate),
          activePTWs: openPTWs.length,
          nonCompliantPercentage: Math.round(nonCompliantPercentage),
        })
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <MainNav userRole="both" />
        <main className="flex-1 container mx-auto py-8">
          <div className="text-red-500 text-center">{error}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="both" />
      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Manpower Today</p>
                  {isLoading ? (
                    <div className="h-8 w-16 animate-pulse bg-gray-200 rounded" />
                  ) : (
                    <h2 className="text-3xl font-bold">{data.totalManpower}</h2>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {isLoading ? (
                  <div className="h-4 w-32 animate-pulse bg-gray-200 rounded" />
                ) : (
                  `Across ${data.activePTWs} active PTWs`
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Cog className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Equipment Assigned</p>
                  {isLoading ? (
                    <div className="h-8 w-16 animate-pulse bg-gray-200 rounded" />
                  ) : (
                    <h2 className="text-3xl font-bold">{data.equipmentAssigned}</h2>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {isLoading ? (
                  <div className="h-4 w-32 animate-pulse bg-gray-200 rounded" />
                ) : (
                  `Across ${data.activePTWs} active PTWs`
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Open PTWs</p>
                  {isLoading ? (
                    <div className="h-8 w-16 animate-pulse bg-gray-200 rounded" />
                  ) : (
                    <h2 className="text-3xl font-bold">{data.openPTWs}</h2>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {isLoading ? (
                  <div className="h-4 w-32 animate-pulse bg-gray-200 rounded" />
                ) : (
                  "All permits are currently open"
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Compliance Rate</p>
                  {isLoading ? (
                    <div className="h-8 w-16 animate-pulse bg-gray-200 rounded" />
                  ) : (
                    <h2 className="text-3xl font-bold">{data.complianceRate}%</h2>
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {isLoading ? (
                  <div className="h-4 w-32 animate-pulse bg-gray-200 rounded" />
                ) : (
                  `${data.nonCompliantPercentage}% non-compliant`
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

