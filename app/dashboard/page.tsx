import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HardHat, ShieldCheck, Truck } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="consultant" />
      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">HSE Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-secondary dark:bg-secondary-dark">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Manpower Today</CardTitle>
              <HardHat className="h-4 w-4 text-accent dark:text-accent-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">123</div>
              <p className="text-xs text-muted-foreground">Across 5 active PTWs</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary dark:bg-secondary-dark">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Equipment Assigned</CardTitle>
              <Truck className="h-4 w-4 text-accent dark:text-accent-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Across 3 active PTWs</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary dark:bg-secondary-dark">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <ShieldCheck className="h-4 w-4 text-success dark:text-success-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">2 non-compliant items</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

