import Link from "next/link"

import { siteConfig } from "@/config/site"

const navigation = [
  { href: "/", label: "Home", mobile: false },
  { href: "/#experience", label: "Experience", mobile: true },
  { href: "/#projects", label: "Projects", mobile: true },
  { href: "/#playground", label: "Play", mobile: true },
] as const

function Brand() {
  return (
    <Link href="/" className="portfolio-mark">
      SR
      <span className="sr-only"> — {siteConfig.name}, home</span>
    </Link>
  )
}

function PrimaryLinks() {
  return (
    <nav className="rail-links" aria-label="Contact and profile links">
      <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
        GitHub
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href={`mailto:${siteConfig.email}`}>Email</a>
    </nav>
  )
}

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="portfolio-frame">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="mobile-nav">
        <Brand />
        <nav aria-label="Primary navigation">
          {navigation
            .filter((item) => item.mobile)
            .map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
        </nav>
      </header>

      <aside className="left-rail">
        <div className="rail-inner">
          <div>
            <Brand />
            <nav className="desktop-nav" aria-label="Primary navigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <PrimaryLinks />
        </div>
      </aside>

      <div className="reading-column">
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="portfolio-footer">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <span>Built with Next.js and MDX.</span>
        </footer>
      </div>
    </div>
  )
}
