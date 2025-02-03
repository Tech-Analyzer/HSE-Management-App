"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Camera, X } from "lucide-react"
import jsQR from "jsqr"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { PermitIdSelect } from "@/components/permit-id-select"

interface PassportData {
  passportId: string
  name: string
  company: string
  position: string
}

// This would typically come from an API or database
const mockPermitIds = [
  { id: "PTW-001", status: "Open" as const },
  { id: "PTW-002", status: "Closing Today" as const },
  { id: "PTW-003", status: "Open" as const },
  { id: "PTW-004", status: "Closing Today" as const },
]

export default function AssignPTWPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [permitId, setPermitId] = useState("")
  const [scannedCodes, setScannedCodes] = useState<PassportData[]>([])
  const { toast } = useToast()

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      setStream(mediaStream)
      setIsCameraActive(true)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      setIsCameraActive(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!permitId) {
      toast({
        title: "Error",
        description: "Please select a Permit ID",
        variant: "destructive",
      })
      return
    }
    if (scannedCodes.length === 0) {
      toast({
        title: "Error",
        description: "Please scan at least one passport",
        variant: "destructive",
      })
      return
    }
    // Here you would typically send the data to your backend
    console.log("Submitting:", { permitId, scannedCodes })
    toast({
      title: "Success",
      description: `Assigned ${scannedCodes.length} passports to PTW ${permitId}`,
    })
    // Reset form
    setPermitId("")
    setScannedCodes([])
  }

  const scanQRCode = () => {
    const video = videoRef.current
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    if (video && context) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code) {
        try {
          const passportData = JSON.parse(code.data) as PassportData
          if (!scannedCodes.some((code) => code.passportId === passportData.passportId)) {
            setScannedCodes((prev) => [...prev, passportData])
            toast({
              title: "Success",
              description: "Passport scanned successfully",
            })
          } else {
            toast({
              title: "Duplicate",
              description: "This passport has already been scanned",
              variant: "warning",
            })
          }
        } catch (error) {
          toast({
            title: "Invalid QR Code",
            description: "This QR code is not a valid HSE e-Passport",
            variant: "destructive",
          })
        }
      }
    }
  }

  useEffect(() => {
    if (isCameraActive) {
      const interval = setInterval(scanQRCode, 500)
      return () => clearInterval(interval)
    }
  }, [isCameraActive, scannedCodes, scanQRCode]) // Added scanQRCode to dependencies

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="contractor" />

      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Assign to PTW</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>PTW Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="permitId">Permit ID</Label>
                  <PermitIdSelect permitIds={mockPermitIds} value={permitId} onValueChange={setPermitId} />
                </div>

                <div className="space-y-2">
                  <Label>Scanned Passports</Label>
                  <div className="border rounded-lg p-4 min-h-[100px] space-y-2">
                    {scannedCodes.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No passports scanned yet</p>
                    ) : (
                      scannedCodes.map((code, index) => (
                        <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded">
                          <span>
                            {code.name} - {code.passportId}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setScannedCodes((prev) => prev.filter((_, i) => i !== index))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={!permitId || scannedCodes.length === 0}>
                  Assign to PTW
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scan QR Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
                  {!isCameraActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => (isCameraActive ? stopCamera() : startCamera())}
                >
                  {isCameraActive ? "Stop Camera" : "Start Camera"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

