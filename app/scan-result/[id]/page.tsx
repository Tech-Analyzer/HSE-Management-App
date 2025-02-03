<<<<<<< HEAD
=======
"use client"

import { useState } from "react"
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
import { MainNav } from "@/components/main-nav"
import { HSEPassportCard } from "@/components/hse-passport-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, AlertTriangle, CheckCircle } from "lucide-react"

<<<<<<< HEAD
async function getPassportData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sheets?sheet=HSE e-Passports&action=getById&query=${id}`,
    { cache: "no-store" },
  )
  if (!res.ok) throw new Error("Failed to fetch passport data")
  return res.json()
}

async function getTrainingRecords(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sheets?sheet=Training Records&action=getAll`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch training records")
  const data = await res.json()
  return data.filter((record: any) => record["Passport ID"] === id)
}

export default async function ScanResultPage({ params }: { params: { id: string } }) {
  const [passportData, trainingRecords] = await Promise.all([getPassportData(params.id), getTrainingRecords(params.id)])

  if (!passportData) {
    return <div>Passport not found</div>
=======
// Mock data for a scanned passport
const mockPassportData = {
  passportId: "SLTPH2500001",
  name: "ILLIYAS SHARFI",
  company: "IKAMC - ENGICON JV",
  position: "HSE Engineer",
  sltpDoj: "2024-09-16",
  contactNumber: "92301026",
  photo: "/placeholder.svg",
  bloodGroup: "O+",
  emergencyContact: "+968 9876 5432",
  projectName: "SEEB LONG TERM WATER NETWORK PROJECT",
  contractNumber: "OWWSC/T/02/E072/2022",
  complianceStatus: "Partially Compliant",
  tier: "Tier 2",
  points: 55,
  badges: [
    { category: "HSE Compliance", level: "Safety Pro 🥈" },
    { category: "Safety Leadership", level: "Squad Leader 🥈" },
    { category: "Risk Management", level: "Risk Watcher 🥉" },
  ],
  nationality: "Indian",
  civilId: "1234567890",
  civilIdExpiryDate: "2025-09-15",
}

// This would be populated from the Google Sheets API in the future
const mockLODHeaders = ["Passport Copy", "Visa Copy", "Medical Certificate", "Training Certificates"]

// Mock data for Training Certificates
const mockTrainingCertificates = [
  { name: "Working at Height", completionDate: "2024-08-01", expiryDate: "2025-08-01", status: "Valid" },
  { name: "Fire Safety", completionDate: "2024-07-15", expiryDate: "2025-07-15", status: "Valid" },
  { name: "First Aid", completionDate: "2024-06-30", expiryDate: "2025-06-30", status: "Valid" },
  { name: "Confined Space Entry", completionDate: "2023-12-01", expiryDate: "2024-12-01", status: "Expiring Soon" },
  { name: "HSE Induction", completionDate: "2024-09-15", expiryDate: "2025-09-15", status: "Valid" },
]

export default function ScanResultPage({ params }: { params: { id: string } }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const handleViewDocuments = () => {
    // This function would typically fetch the PDF URL from your backend
    // For now, we'll just simulate this with a timeout
    setTimeout(() => {
      setPdfUrl("https://example.com/mock-document.pdf")
    }, 1000)
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="both" />
      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Scanned HSE e-Passport Details</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
<<<<<<< HEAD
            <HSEPassportCard
              passportId={passportData["Passport ID"]}
              name={passportData.Name}
              company={passportData.Company}
              position={passportData.Position}
              sltpDoj={passportData["SLTP DOJ"]}
              contactNumber={passportData["Contact Number"]}
              photo={passportData["Photo URL"]}
            />
=======
            <HSEPassportCard {...mockPassportData} />
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Compliance Information</span>
<<<<<<< HEAD
                  {passportData["Compliance Status"] === "Fully Compliant" && (
=======
                  {mockPassportData.complianceStatus === "Fully Compliant" && (
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
                    <Badge variant="success" className="ml-2">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Fully Compliant
                    </Badge>
                  )}
<<<<<<< HEAD
                  {passportData["Compliance Status"] === "Partially Compliant" && (
=======
                  {mockPassportData.complianceStatus === "Partially Compliant" && (
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
                    <Badge variant="warning" className="ml-2">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Partially Compliant
                    </Badge>
                  )}
<<<<<<< HEAD
                  {passportData["Compliance Status"] === "Non-Compliant" && (
=======
                  {mockPassportData.complianceStatus === "Non-Compliant" && (
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
                    <Badge variant="destructive" className="ml-2">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Non-Compliant
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">Tier:</p>
<<<<<<< HEAD
                    <p>{passportData.Tier}</p>
=======
                    <p>{mockPassportData.tier}</p>
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
                  </div>
                  <div>
                    <p className="font-semibold">Points:</p>
                    <div className="flex items-center space-x-2">
<<<<<<< HEAD
                      <Progress value={passportData.Points} className="w-full" />
                      <span>{passportData.Points} / 100</span>
=======
                      <Progress value={mockPassportData.points} className="w-full" />
                      <span>{mockPassportData.points} / 100</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Badges:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {mockPassportData.badges.map((badge) => (
                        <Badge key={badge.category} variant="secondary">
                          {badge.category}: {badge.level}
                        </Badge>
                      ))}
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Nationality:</p>
<<<<<<< HEAD
                    <p>{passportData.Nationality}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Civil ID:</p>
                    <p>{passportData["Civil ID"]}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Civil ID Expiry Date:</p>
                    <p>{passportData["Civil ID Expiry Date"]}</p>
=======
                    <p>{mockPassportData.nationality}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Civil ID:</p>
                    <p>{mockPassportData.civilId}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Civil ID Expiry Date:</p>
                    <p>{mockPassportData.civilIdExpiryDate}</p>
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
<<<<<<< HEAD
=======
                <CardTitle>List of Documents (LOD)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {mockLODHeaders.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Note: This section will be dynamically populated based on the Google Sheets data in the future.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
                <CardTitle>Training Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
<<<<<<< HEAD
                  {trainingRecords.map((cert: any) => (
                    <li key={cert["Record ID"]} className="mb-2">
                      <span className="font-semibold">{cert["Course Name"]}</span>
                      <br />
                      <span className="text-sm">
                        Completed: {cert["Completion Date"]} | Expires: {cert["Expiry Date"]}
                      </span>
                      <Badge
                        variant={
                          cert.Status === "Valid"
                            ? "success"
                            : cert.Status === "Expiring Soon"
=======
                  {mockTrainingCertificates.map((cert) => (
                    <li key={cert.name} className="mb-2">
                      <span className="font-semibold">{cert.name}</span>
                      <br />
                      <span className="text-sm">
                        Completed: {cert.completionDate} | Expires: {cert.expiryDate}
                      </span>
                      <Badge
                        variant={
                          cert.status === "Valid"
                            ? "success"
                            : cert.status === "Expiring Soon"
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
                              ? "warning"
                              : "destructive"
                        }
                        className="ml-2"
                      >
<<<<<<< HEAD
                        {cert.Status}
=======
                        {cert.status}
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
                      </Badge>
                    </li>
                  ))}
                </ul>
<<<<<<< HEAD
=======
                <p className="text-sm text-muted-foreground mt-2">
                  Note: This section will be dynamically populated based on the Google Sheets data in the future.
                </p>
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                <Button className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  View Documents ({passportData["Passport ID"]})
                </Button>
=======
                <Button onClick={handleViewDocuments} disabled={pdfUrl !== null} className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  {pdfUrl ? "View Documents" : `View Documents (${mockPassportData.passportId})`}
                </Button>
                {pdfUrl && (
                  <div className="mt-4">
                    <iframe src={pdfUrl} className="w-full h-[500px]" title="Document Viewer"></iframe>
                  </div>
                )}
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

