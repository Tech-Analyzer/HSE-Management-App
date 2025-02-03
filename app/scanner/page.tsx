"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, X } from "lucide-react"
import jsQR from "jsqr"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { HSEPassportCard } from "@/components/hse-passport-card"

interface PassportData {
  passportId: string
  name: string
  company: string
  position: string
  projectName: string
  contractNumber: string
  photo?: string
  documentationPdfLink?: string
}

export default function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [scannedPassport, setScannedPassport] = useState<PassportData | null>(null)
  const { toast } = useToast()
  const router = useRouter()

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
          setScannedPassport(passportData)
          stopCamera()
          toast({
            title: "Success",
            description: "Passport scanned successfully",
          })
          // Redirect to the scan result page
          router.push(`/scan-result/${passportData.passportId}`)
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
    return () => {
      stopCamera()
    }
  }, [isCameraActive, scanQRCode]) // Added scanQRCode to dependencies

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="both" />

      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">QR Scanner</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Scan HSE e-Passport</CardTitle>
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
                  onClick={() => {
                    if (isCameraActive) {
                      stopCamera()
                    } else {
                      setScannedPassport(null)
                      startCamera()
                    }
                  }}
                >
                  {isCameraActive ? "Stop Camera" : "Start Camera"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div>
            {scannedPassport ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Scanned Passport Details</h2>
                  <Button variant="ghost" size="icon" onClick={() => setScannedPassport(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <HSEPassportCard
                  passportId={scannedPassport.passportId}
                  name={scannedPassport.name}
                  company={scannedPassport.company}
                  position={scannedPassport.position}
                  contactNumber=""
                  photo={scannedPassport.photo || ""}
                  projectName={scannedPassport.projectName}
                  contractNumber={scannedPassport.contractNumber}
                  documentationPdfLink={scannedPassport.documentationPdfLink}
                />
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">
                    <p>No passport scanned yet.</p>
                    <p className="text-sm">Start the camera and scan a valid HSE e-Passport QR code.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

