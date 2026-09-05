import { PortfolioShell } from "@/components/portfolio-shell"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PortfolioShell>{children}</PortfolioShell>
}
