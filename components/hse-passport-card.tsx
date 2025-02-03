<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface HSEPassportCardProps {
=======
"use client"

import Image from "next/image"
import { User } from "lucide-react"
import { useRef, useState } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import type React from "react" // Added import for React

interface HSEPassportProps {
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
  passportId: string
  name: string
  company: string
  position: string
  sltpDoj: string
  contactNumber: string
  photo: string
<<<<<<< HEAD
}

export function HSEPassportCard({
  passportId,
  name,
  company,
  position,
  sltpDoj,
  contactNumber,
  photo,
}: HSEPassportCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>HSE e-Passport</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <Image src={photo || "/placeholder.svg"} alt={name} width={100} height={100} className="rounded-full" />
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm text-gray-500">{passportId}</p>
          </div>
        </div>
        <div className="grid gap-2">
          <p>
            <strong>Company:</strong> {company}
          </p>
          <p>
            <strong>Position:</strong> {position}
          </p>
          <p>
            <strong>SLTP DOJ:</strong> {sltpDoj}
          </p>
          <p>
            <strong>Contact:</strong> {contactNumber}
          </p>
        </div>
      </CardContent>
    </Card>
=======
  projectName?: string
  contractNumber?: string
  documentationPdfLink?: string
  bloodGroup?: string
  emergencyContact?: string
  assetReferenceNumber?: string
  registrationNumber?: string
  registrationExpiryDate?: string
  equipmentTestExpiryDate?: string
  linkedIndividualPassportId?: string
  linkedEquipmentIds?: string[]
  points?: number
  tier?: string
  badges?: Array<{ category: string; level: string }>
}

export function HSEPassportCard(props: HSEPassportProps) {
  const frontCardRef = useRef<HTMLDivElement>(null)
  const backCardRef = useRef<HTMLDivElement>(null)
  const [frontImageUrl, setFrontImageUrl] = useState<string | null>(null)
  const [backImageUrl, setBackImageUrl] = useState<string | null>(null)
  const [isGenerated, setIsGenerated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const cardStyle = "relative w-[216px] h-[342px] bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200"

  const convertCardToImage = async (cardRef: React.RefObject<HTMLDivElement>) => {
    if (cardRef.current) {
      // Force a pause to ensure proper rendering
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const canvas = await html2canvas(cardRef.current, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        windowWidth: cardRef.current.scrollWidth,
        windowHeight: cardRef.current.scrollHeight,
        onclone: (document, element) => {
          // Force consistent text rendering
          element.style.fontKerning = "none"
          element.style.fontSmoothing = "antialiased"
          element.style.letterSpacing = "normal"
          element.style.textRendering = "geometricPrecision"

          // Apply to all text elements inside
          const textElements = element.getElementsByTagName("*")
          for (const el of textElements) {
            if (el instanceof HTMLElement) {
              el.style.letterSpacing = "normal"
              el.style.lineHeight = "1.2"
            }
          }

          // Force a repaint
          element.style.opacity = "0.99"
          setTimeout(() => {
            element.style.opacity = "1"
          }, 500)
        },
      })
      return canvas.toDataURL("image/png", 1.0)
    }
    return null
  }

  const generateDownloadableImages = async () => {
    setIsLoading(true)
    try {
      // Force browser to complete all pending renders
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Generate front image
      const frontImage = await convertCardToImage(frontCardRef)
      if (frontImage) setFrontImageUrl(frontImage)

      // Add delay between front and back image generation
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Generate back image
      const backImage = await convertCardToImage(backCardRef)
      if (backImage) setBackImageUrl(backImage)

      // Final delay before showing images
      await new Promise((resolve) => setTimeout(resolve, 500))

      setIsGenerated(true)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadCard = (side: "front" | "back") => {
    const imageUrl = side === "front" ? frontImageUrl : backImageUrl
    if (!imageUrl) return

    const link = document.createElement("a")
    link.href = imageUrl
    link.download = `hse-passport-${side}-${props.passportId}.png`
    link.click()
  }

  const downloadPDF = async () => {
    const frontImage = await convertCardToImage(frontCardRef)
    const backImage = await convertCardToImage(backCardRef)

    if (frontImage && backImage) {
      const pdf = new jsPDF("p", "mm", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(frontImage, "PNG", 10, 10, 90, 142)
      pdf.addImage(backImage, "PNG", 10, 160, 90, 142)

      pdf.save(`hse-passport-${props.passportId}.pdf`)
    }
  }

  const frontCard = (
    <div
      ref={frontCardRef}
      className={cardStyle}
      style={{
        fontSmoothing: "antialiased",
        textRendering: "geometricPrecision",
        fontKerning: "none",
        letterSpacing: "normal",
      }}
    >
      <div className="absolute top-0 left-0 right-0 bg-white p-2 border-b">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logos-removebg-preview-oRYvP4U5n9GoWOUl723N8t3BG1zFR1.png"
          alt="Project Logo"
          width={180}
          height={30}
          className="w-full h-6 object-contain"
        />
      </div>

      <div className="absolute top-10 left-0 right-0 bg-gray-50 p-1 text-center border-b">
        <p className="text-[7px] font-semibold text-gray-800 leading-tight">{props.projectName}</p>
        <p className="text-[6px] text-gray-600">{props.contractNumber}</p>
      </div>

      <div className="absolute top-20 left-0 right-0 flex flex-col items-center">
        <div className="w-24 h-28 bg-gray-100 rounded-lg overflow-hidden border">
          {props.photo ? (
            <Image
              src={props.photo || "/placeholder.svg"}
              alt={props.name}
              width={96}
              height={112}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-full h-full p-4 text-gray-400" />
          )}
        </div>
        <p className="text-[10px] font-bold text-gray-800 mt-1">ID: {props.passportId}</p>
        <div className="h-2"></div>
      </div>

      <div
        className="absolute top-[218px] left-2 right-2 flex flex-col items-start space-y-0.5 overflow-y-auto max-h-[102px]"
        style={{ lineHeight: "1.2", letterSpacing: "normal" }}
      >
        {props.passportId.startsWith("SLTPHE") ? (
          <>
            <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
              <span className="font-normal">Equipment Type:</span> {props.name}
            </p>
            <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
              <span className="font-normal">Asset Ref:</span> {props.assetReferenceNumber}
            </p>
            {props.registrationNumber && (
              <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
                <span className="font-normal">Reg. No:</span> {props.registrationNumber}
              </p>
            )}
            {props.registrationExpiryDate && (
              <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
                <span className="font-normal">Reg. Expiry:</span> {props.registrationExpiryDate}
              </p>
            )}
            <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
              <span className="font-normal">Test Expiry:</span> {props.equipmentTestExpiryDate}
            </p>
            <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
              <span className="font-normal">Manufacturer:</span> {props.company}
            </p>
            <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
              <span className="font-normal">Model:</span> {props.position}
            </p>
            {props.linkedIndividualPassportId && (
              <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
                <span className="font-normal">Linked to:</span> {props.linkedIndividualPassportId}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
              <span className="font-normal">Full Name:</span> {props.name}
            </p>
            <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
              <span className="font-normal">Company:</span> {props.company}
            </p>
            <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
              <span className="font-normal">Position:</span> {props.position}
            </p>
            <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
              <span className="font-normal">SLTP DOJ:</span> {props.sltpDoj}
            </p>
            <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
              <span className="font-normal">Contact:</span> {props.contactNumber}
            </p>
            {props.bloodGroup && (
              <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
                <span className="font-normal">Blood Group:</span> {props.bloodGroup}
              </p>
            )}
            {props.emergencyContact && (
              <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
                <span className="font-normal">Emergency Contact:</span> {props.emergencyContact}
              </p>
            )}
            {props.linkedEquipmentIds && props.linkedEquipmentIds.length > 0 && (
              <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
                <span className="font-normal">Linked Equipment:</span> {props.linkedEquipmentIds.join(", ")}
              </p>
            )}
            {props.points !== undefined && (
              <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
                <span className="font-normal">Points:</span> {props.points}
              </p>
            )}
            {props.tier && (
              <p className="text-[8px] font-bold text-gray-800 leading-[1.2]">
                <span className="font-normal">Tier:</span> {props.tier}
              </p>
            )}
            {props.badges && props.badges.length > 0 && (
              <div className="text-[8px] font-bold text-gray-800">
                <span className="font-normal">Badges:</span>
                <ul
                  className="list-disc list-inside"
                  style={{
                    listStyleType: "disc",
                    lineHeight: "1.2",
                    letterSpacing: "normal",
                  }}
                >
                  {props.badges.map((badge, index) => (
                    <li key={index}>{`${badge.category}: ${badge.level}`}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 bg-[#2F5C57] text-white flex items-center justify-center"
        style={{ height: "14px" }}
      >
        <p className="text-[10px] font-semibold leading-none">HSE e-Passport</p>
      </div>
    </div>
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
  )
}

