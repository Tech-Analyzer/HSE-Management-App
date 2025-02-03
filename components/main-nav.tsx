import Link from "next/link"

export function MainNav({ userRole }: { userRole: "consultant" | "both" }) {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/scan-result">Scan Result</Link>
        </li>
        {userRole === "consultant" && (
          <li>
            <Link href="/generate-passport">Generate Passport</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

