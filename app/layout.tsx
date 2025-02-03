<<<<<<< HEAD
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ErrorBoundary } from "@/components/error-boundary"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "HSE Management System",
    template: "%s | HSE Management System",
  },
  description: "HSE e-Passport and PTW Management System",
  keywords: ["HSE", "Safety", "Permit to Work", "e-Passport"],
  authors: [{ name: "Your Company Name" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
}

=======
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<<<<<<< HEAD
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>{children}</ErrorBoundary>
=======
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background text-foreground")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
      </body>
    </html>
  )
}

<<<<<<< HEAD
=======


import './globals.css'
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
