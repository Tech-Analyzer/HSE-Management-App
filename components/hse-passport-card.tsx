import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface HSEPassportCardProps {
  passportId: string
  name: string
  company: string
  position: string
  sltpDoj: string
  contactNumber: string
  photo: string
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
  )
}

