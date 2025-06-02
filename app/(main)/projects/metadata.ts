import { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Projects",
  metadataBase: new URL(siteConfig.url),
}