import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HardHat, Search, QrCode } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContractorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="contractor" />

      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Contractor Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="h-5 w-5" />
                Assign to PTW
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage PTW assignments for workers and equipment.</p>
              <Button>
                <Link href="/assign-ptw">Go to Assign PTW</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Search for workers, equipment, or PTWs.</p>
              <Button>
                <Link href="/search">Go to Search</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Scanner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Scan QR codes for quick access to information.</p>
              <Button>
                <Link href="/scanner">Go to QR Scanner</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

