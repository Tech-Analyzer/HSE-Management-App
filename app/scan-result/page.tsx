"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { HSEPassportCard } from "@/components/hse-passport-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
}

// Mock training records
const mockTrainingRecords = [
  { course: "Working at Height", completionDate: "2024-08-01", expiryDate: "2025-08-01", status: "Valid" },
  { course: "Fire Safety", completionDate: "2024-07-15", expiryDate: "2025-07-15", status: "Valid" },
  { course: "First Aid", completionDate: "2024-06-30", expiryDate: "2025-06-30", status: "Valid" },
  { course: "Confined Space Entry", completionDate: "2023-12-01", expiryDate: "2024-12-01", status: "Valid" },
  { course: "HSE Induction", completionDate: "2024-09-15", expiryDate: "2025-09-15", status: "Valid" },
]

// Mock current assignment
const mockCurrentAssignment = {
  permitId: "PTW-2025-001",
  workLocation: "Al Khoud R3",
  assignmentDate: "2025-01-20",
  expectedEndDate: "2025-01-27",
  status: "Active",
}

export default function ScanResultPage() {
  const [activeTab, setActiveTab] = useState<"details" | "training" | "assignment">("details")

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="both" />
      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Scanned HSE e-Passport Details</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <HSEPassportCard {...mockPassportData} />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Blood Group</p>
                    <p>{mockPassportData.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                    <p>{mockPassportData.emergencyContact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Passport Details</CardTitle>
                  <div className="flex space-x-2">
                    <Badge
                      variant={activeTab === "details" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                    </Badge>
                    <Badge
                      variant={activeTab === "training" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setActiveTab("training")}
                    >
                      Training
                    </Badge>
                    <Badge
                      variant={activeTab === "assignment" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setActiveTab("assignment")}
                    >
                      Assignment
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {activeTab === "details" && (
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Project Name:</span> {mockPassportData.projectName}
                    </p>
                    <p>
                      <span className="font-medium">Contract Number:</span> {mockPassportData.contractNumber}
                    </p>
                    <p>
                      <span className="font-medium">SLTP Date of Joining:</span>{" "}
                      {new Date(mockPassportData.sltpDoj).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {activeTab === "training" && (
                  <ScrollArea className="h-[200px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Completion Date</TableHead>
                          <TableHead>Expiry Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTrainingRecords.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.course}</TableCell>
                            <TableCell>{record.completionDate}</TableCell>
                            <TableCell>{record.expiryDate}</TableCell>
                            <TableCell>
                              <Badge variant={record.status === "Valid" ? "success" : "destructive"}>
                                {record.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                )}
                {activeTab === "assignment" && (
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Current Permit ID:</span> {mockCurrentAssignment.permitId}
                    </p>
                    <p>
                      <span className="font-medium">Work Location:</span> {mockCurrentAssignment.workLocation}
                    </p>
                    <p>
                      <span className="font-medium">Assignment Date:</span> {mockCurrentAssignment.assignmentDate}
                    </p>
                    <p>
                      <span className="font-medium">Expected End Date:</span> {mockCurrentAssignment.expectedEndDate}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <Badge variant="success">{mockCurrentAssignment.status}</Badge>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

