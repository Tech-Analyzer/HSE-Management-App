"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Search, QrCode, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PointBasedSystem } from "@/components/point-based-system"
import { BadgeAwardingSystem } from "@/components/badge-awarding-system"

// Mock data for demonstration
const mockPassports = [
  { id: "SLTPH2500001", name: "John Doe", points: 30 },
  { id: "SLTPH2500002", name: "Jane Smith", points: 55 },
  { id: "SLTPH2500003", name: "Bob Johnson", points: 80 },
]

export default function ConsultantPage() {
  const [selectedPassport, setSelectedPassport] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    const foundPassport = mockPassports.find(
      (passport) =>
        passport.id.toLowerCase() === searchQuery.toLowerCase() ||
        passport.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    if (foundPassport) {
      setSelectedPassport(foundPassport.id)
    } else {
      setSelectedPassport(null)
    }
  }

  const handlePointsUpdate = (newPoints: number) => {
    // In a real application, this would update the backend
    console.log(`Updated points for ${selectedPassport}: ${newPoints}`)
  }

  const handleBadgeAward = (category: string, level: string) => {
    // In a real application, this would update the backend
    console.log(`Awarded ${level} badge in ${category} to ${selectedPassport}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="consultant" />

      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Consultant Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Generate e-Passport
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Create new HSE e-Passports for workers or equipment.</p>
              <Button>
                <Link href="/generate-passport">Generate e-Passport</Link>
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Point Based System & Badge Awards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage points, tiers, and badges for HSE e-Passports.</p>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Search by Passport ID or Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button onClick={handleSearch}>Search</Button>
                </div>
                {selectedPassport && (
                  <>
                    <PointBasedSystem
                      passportId={selectedPassport}
                      currentPoints={mockPassports.find((p) => p.id === selectedPassport)?.points || 0}
                      onPointsUpdate={handlePointsUpdate}
                    />
                    <BadgeAwardingSystem passportId={selectedPassport} onBadgeAward={handleBadgeAward} />
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

