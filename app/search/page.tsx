"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data - would come from your Google Sheets API
const mockPassports = [
  {
    passportId: "SLTPH23000123",
    name: "Mohammed Ali",
    company: "Al Maha Contracting",
    position: "Safety Officer",
    contactNumber: "+968 9123 4567",
    photo: "/placeholder.svg",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-14",
    bloodGroup: "O+",
    emergencyContact: "+968 9876 5432",
    trainings: ["Working at Height", "Fire Safety", "First Aid"],
  },
  {
    passportId: "SLTPH23000124",
    name: "Ahmed Kumar",
    company: "Star Technical Services",
    position: "Site Engineer",
    contactNumber: "+968 9234 5678",
    photo: "/placeholder.svg",
    issueDate: "2024-01-20",
    expiryDate: "2025-01-19",
    bloodGroup: "B+",
    emergencyContact: "+968 9765 4321",
    trainings: ["Confined Space", "HSE Level 1", "Risk Assessment"],
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("passportId")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      const results = mockPassports.filter((passport) => {
        const searchValue = searchQuery.toLowerCase()
        switch (searchType) {
          case "passportId":
            return passport.passportId.toLowerCase() === searchValue
          case "name":
            return passport.name.toLowerCase().includes(searchValue)
          case "company":
            return passport.company.toLowerCase().includes(searchValue)
          default:
            return false
        }
      })
      setIsSearching(false)
      if (results.length > 0) {
        // Redirect to the scan result page for the first matching passport
        router.push(`/scan-result/${results[0].passportId}`)
      } else {
        toast({
          title: "No results found",
          description: "Please try a different search query.",
          variant: "destructive",
        })
      }
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="both" />
      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Search HSE e-Passports</h1>

        <div className="grid gap-6 mb-8">
          <div className="flex gap-4">
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passportId">Passport ID</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder={`Search by ${searchType}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                <SearchIcon className="w-4 h-4 mr-2" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

