import { SiteFooter } from "@/components/site-footer"
import { TerminalLoaderWrapper } from "@/components/terminal-loader-wrapper"

// Renamed interface
interface MainLayoutProps {
  children: React.ReactNode
}

// Renamed component (optional, but good practice)
export default async function MainLayout({ children }: MainLayoutProps) {
  // Updated prop type name
  return (
    <TerminalLoaderWrapper>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 space-y-6 md:space-y-8 lg:space-y-10">
          {children}
        </main>
        <SiteFooter />
      </div>
    </TerminalLoaderWrapper>
  )
}
