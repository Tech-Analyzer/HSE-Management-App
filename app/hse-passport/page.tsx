import { HSEPassportCard } from "@/components/hse-passport-card"

export default function HSEPassportPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">HSE e-Passport Preview</h1>
      <HSEPassportCard
        passportId="SLTPH2500001"
        name="ILLIYAS SHARFI"
        company="IKAMC - ENGICON JV"
        position="HSE Engineer"
        sltpDoj="16-09-2024"
        contactNumber="92301026"
        photo="/placeholder.svg"
      />
    </div>
  )
}

