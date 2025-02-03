import { MainNav } from "@/components/main-nav"
import { PTWTable } from "@/components/ptw-table"

// This would normally come from your Google Sheets API
const mockData = [
  {
    permitId: "11858",
    dateIssued: "13/01/2025",
    typeOfPermit: "Confined Work Permit",
    workLocation: "Al Khoud R3",
    aa: "S.B - 96594370",
    ac: "Sami - 79359362",
    pa: "Bashar - 97109166",
    ph: "Waqih - 78112905",
    permitDescription:
      "Surface preparation inside reservoir, Membrane strip installation, Sealant Application, Cutting, Grinding, and Cleaning Activity",
    permitValidityDate: "7 Days",
    permitStatus: "Closed",
    permitClosureDate: "19/01/2025",
  },
  {
    permitId: "11868",
    dateIssued: "13/01/2025",
    typeOfPermit: "Hot Work Permit",
    workLocation: "Al Khoud Village",
    aa: "S.B - 96594370",
    ac: "Sami - 79359362",
    pa: "Mahmood - 99440504",
    ph: "Prashant - 97108207",
    permitDescription: "Welding Activity",
    permitValidityDate: "7 Days",
    permitStatus: "Closed",
    permitClosureDate: "19/01/2025",
  },
] as const

export default function PTWLogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="both" />
      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">PTW Log</h1>
        <PTWTable data={mockData} />
      </main>
    </div>
  )
}

