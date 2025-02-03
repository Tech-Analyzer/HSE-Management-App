import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">HSE Management System</h1>
      <nav className="space-y-4">
        <Link
          href="/scan-result"
          className="block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Scan Result
        </Link>
        <Link
          href="/generate-passport"
          className="block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Generate Passport
        </Link>
        <Link
          href="/dashboard"
          className="block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Dashboard
        </Link>
      </nav>
    </div>
  )
}

