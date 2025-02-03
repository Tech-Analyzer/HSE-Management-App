"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Camera, Upload, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { QRCodeSVG } from "qrcode.react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MainNav } from "@/components/main-nav"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type React from "react" // Added import for React

async function getLastUsedPassportId(type: "individual" | "equipment"): Promise<string> {
  try {
    const response = await fetch(`/api/sheets?sheet=HSE e-Passports&action=getAll`, { cache: "no-store" })
    if (!response.ok) throw new Error("Failed to fetch passport data")
    const data = await response.json()

    const passports = data.filter((passport: any) => passport.Type === type)
    if (passports.length === 0) {
      return type === "individual" ? "SLTPH2500001" : "SLTPHE2500001"
    }

    const sortedPassports = passports.sort((a: any, b: any) => {
      const aNum = Number.parseInt(a["Passport ID"].slice(-4))
      const bNum = Number.parseInt(b["Passport ID"].slice(-4))
      return bNum - aNum
    })

    const lastId = sortedPassports[0]["Passport ID"]
    const lastNumber = Number.parseInt(lastId.slice(-4))
    const nextNumber = (lastNumber + 1).toString().padStart(4, "0")

    return type === "individual" ? `SLTPH25${nextNumber}` : `SLTPHE25${nextNumber}`
  } catch (error) {
    console.error("Error getting last passport ID:", error)
    return type === "individual" ? "SLTPH2500001" : "SLTPHE2500001"
  }
}

export default function GeneratePassportPage() {
  const [passportType, setPassportType] = useState<"individual" | "equipment">("individual")
  const [nextPassportId, setNextPassportId] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    position: "",
    sltpDoj: "",
    contactNumber: "",
    photo: "",
    equipmentType: "",
    assetReferenceNumber: "",
    registrationNumber: "",
    registrationExpiryDate: "",
    equipmentTestExpiryDate: "",
    manufacturer: "",
    modelNumber: "",
    linkedIndividualPassportId: "",
  })
  const [previewPhoto, setPreviewPhoto] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedQR, setGeneratedQR] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const generateNextPassportId = async () => {
      const nextId = await getLastUsedPassportId(passportType)
      setNextPassportId(nextId)
    }
    generateNextPassportId()
  }, [passportType])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewPhoto(result)
        setFormData((prev) => ({ ...prev, photo: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const qrData = JSON.stringify({
        passportId: nextPassportId,
        name: formData.name || formData.equipmentType,
        company: formData.company || formData.manufacturer,
        position: formData.position || formData.modelNumber,
        type: passportType,
      })

      const response = await fetch("/api/sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sheet: "HSE e-Passports",
          action: "addRow",
          data: {
            "Passport ID": nextPassportId,
            Type: passportType,
            Name: formData.name || formData.equipmentType,
            Company: formData.company || formData.manufacturer,
            Position: formData.position || formData.modelNumber,
            "SLTP DOJ": formData.sltpDoj,
            "Contact Number": formData.contactNumber,
            "Photo URL": formData.photo,
            "Asset Reference Number": formData.assetReferenceNumber,
            "Registration Number": formData.registrationNumber,
            "Registration Expiry Date": formData.registrationExpiryDate,
            "Equipment Test Expiry Date": formData.equipmentTestExpiryDate,
            "Linked Individual Passport ID": formData.linkedIndividualPassportId,
            "Compliance Status": "Pending",
            Points: "0",
            Tier: "Basic",
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save passport data")
      }

      setGeneratedQR(qrData)
      toast({
        title: "Success",
        description: `HSE e-Passport QR generated successfully: ${nextPassportId}`,
      })

      const nextId = await getLastUsedPassportId(passportType)
      setNextPassportId(nextId)
    } catch (error) {
      console.error("Error generating passport:", error)
      toast({
        title: "Error",
        description: "Failed to generate HSE e-Passport QR",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const downloadQR = () => {
    if (!generatedQR) return

    const qrCodeSvg = document.getElementById("qr-code")
    if (qrCodeSvg) {
      const svgData = new XMLSerializer().serializeToString(qrCodeSvg)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL("image/png")
        const downloadLink = document.createElement("a")
        downloadLink.download = `hse-passport-qr-${nextPassportId}.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="consultant" />

      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Generate HSE e-Passport QR Code</h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <Card className="p-6 h-fit">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Passport Type</Label>
                <RadioGroup
                  defaultValue="individual"
                  onValueChange={(value) => setPassportType(value as "individual" | "equipment")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="equipment" id="equipment" />
                    <Label htmlFor="equipment">Equipment</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Passport ID to be generated</Label>
                <Input value={nextPassportId} disabled className="font-mono" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Photo</Label>
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-40 bg-gray-100 rounded-lg overflow-hidden">
                    {previewPhoto ? (
                      <img
                        src={previewPhoto || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-full h-full p-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <Input id="photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    <Button type="button" variant="outline" onClick={() => document.getElementById("photo")?.click()}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </div>

              {passportType === "individual" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="ILLIYAS SHARFI"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="IKAMC - ENGICON JV"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="HSE Engineer"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sltpDoj">SLTP DOJ</Label>
                    <Input id="sltpDoj" type="date" value={formData.sltpDoj} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="92301026"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="equipmentType">Equipment Type</Label>
                    <Input
                      id="equipmentType"
                      value={formData.equipmentType}
                      onChange={handleInputChange}
                      placeholder="Enter equipment type"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assetReferenceNumber">Company Asset Reference Number</Label>
                    <Input
                      id="assetReferenceNumber"
                      value={formData.assetReferenceNumber}
                      onChange={handleInputChange}
                      placeholder="Asset Reference Number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number (Optional)</Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      placeholder="Registration Number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationExpiryDate">Registration Expiry Date (Optional)</Label>
                    <Input
                      id="registrationExpiryDate"
                      type="date"
                      value={formData.registrationExpiryDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="equipmentTestExpiryDate">Equipment Test Expiry Date</Label>
                    <Input
                      id="equipmentTestExpiryDate"
                      type="date"
                      value={formData.equipmentTestExpiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input
                      id="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleInputChange}
                      placeholder="Manufacturer"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="modelNumber">Model Number</Label>
                    <Input
                      id="modelNumber"
                      value={formData.modelNumber}
                      onChange={handleInputChange}
                      placeholder="Model Number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedIndividualPassportId">Linked Individual Passport ID (Optional)</Label>
                    <Input
                      id="linkedIndividualPassportId"
                      value={formData.linkedIndividualPassportId}
                      onChange={handleInputChange}
                      placeholder="SLTPH25XXXX"
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate e-Passport QR"}
              </Button>
            </form>
          </Card>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full flex flex-col items-center justify-start"
          >
            {generatedQR ? (
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <QRCodeSVG id="qr-code" value={generatedQR} size={200} level="H" includeMargin />
                </div>
                <Button onClick={downloadQR} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500">QR code will appear here after generation</div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

