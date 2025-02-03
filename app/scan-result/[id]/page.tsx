import { MainNav } from "@/components/main-nav"
import { HSEPassportCard } from "@/components/hse-passport-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, AlertTriangle, CheckCircle } from "lucide-react"

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
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="both" />
      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Scanned HSE e-Passport Details</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <HSEPassportCard
              passportId={passportData["Passport ID"]}
              name={passportData.Name}
              company={passportData.Company}
              position={passportData.Position}
              sltpDoj={passportData["SLTP DOJ"]}
              contactNumber={passportData["Contact Number"]}
              photo={passportData["Photo URL"]}
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Compliance Information</span>
                  {passportData["Compliance Status"] === "Fully Compliant" && (
                    <Badge variant="success" className="ml-2">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Fully Compliant
                    </Badge>
                  )}
                  {passportData["Compliance Status"] === "Partially Compliant" && (
                    <Badge variant="warning" className="ml-2">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Partially Compliant
                    </Badge>
                  )}
                  {passportData["Compliance Status"] === "Non-Compliant" && (
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
                    <p>{passportData.Tier}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Points:</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={passportData.Points} className="w-full" />
                      <span>{passportData.Points} / 100</span>
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
                    <p>{passportData.Nationality}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Civil ID:</p>
                    <p>{passportData["Civil ID"]}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Civil ID Expiry Date:</p>
                    <p>{passportData["Civil ID Expiry Date"]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
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
                              ? "warning"
                              : "destructive"
                        }
                        className="ml-2"
                      >
                        {cert.Status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  View Documents ({passportData["Passport ID"]})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

