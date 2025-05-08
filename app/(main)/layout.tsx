import Link from "next/link"

import { mainConfig } from "@/config/main" // Updated import path and name
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

// Renamed interface
interface MainLayoutProps { 
  children: React.ReactNode
}

// Renamed component (optional, but good practice)
export default async function MainLayout({ 
  children,
}: MainLayoutProps) { // Updated prop type name
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={mainConfig.mainNav} /> 
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
