"use client"

import { HardHat, Home, QrCode, Search, Shield, Users, BadgeIcon as IdCard, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: ("consultant" | "contractor" | "both")[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    roles: ["consultant", "contractor", "both"],
  },
  {
    title: "Contractor",
    href: "/contractor",
    icon: HardHat,
    roles: ["contractor", "both"],
  },
  {
    title: "Consultant",
    href: "/consultant",
    icon: Users,
    roles: ["consultant", "both"],
  },
  {
    title: "Assign PTW",
    href: "/assign-ptw",
    icon: HardHat,
    roles: ["contractor", "both"],
  },
  {
    title: "Search",
    href: "/search",
    icon: Search,
    roles: ["consultant", "contractor", "both"],
  },
  {
    title: "QR Scanner",
    href: "/scanner",
    icon: QrCode,
    roles: ["consultant", "contractor", "both"],
  },
  {
    title: "Generate e-Passport",
    href: "/generate-passport",
    icon: Shield,
    roles: ["consultant"],
  },
]

export function MainNav({ userRole }: { userRole: "consultant" | "contractor" | "both" }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logos-removebg-preview-oRYvP4U5n9GoWOUl723N8t3BG1zFR1.png"
              alt="Company Logos"
              width={400}
              height={50}
              className="h-8 w-auto"
            />
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                  <nav className="flex flex-col gap-4">
                    {navItems
                      .filter((item) => item.roles.includes(userRole))
                      .map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 px-2 py-1 rounded-md",
                            pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <h2 className="font-semibold text-sm md:text-base text-center">
            SEEB LONG TERM WATER NETWORK PROJECT OWWSC/T/02/E072/2022
          </h2>
          <div className="text-xs text-muted-foreground text-center md:text-right">
            <p>Contact: illiyas@ikamc.com</p>
          </div>
        </div>
      </div>
      <nav className="container mx-auto px-4 py-2 hidden md:flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <IdCard className="h-6 w-6" />
          <span>HSE e-Passport System</span>
        </Link>
        <div className="flex items-center gap-4">
          {navItems
            .filter((item) => item.roles.includes(userRole))
            .map((item) => (
              <Button key={item.href} variant={pathname === item.href ? "default" : "ghost"}>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon
                    className={cn("h-4 w-4", pathname === item.href ? "text-primary-foreground" : "text-foreground")}
                  />
                  <span>{item.title}</span>
                </Link>
              </Button>
            ))}
        </div>
      </nav>
    </div>
  )
}

