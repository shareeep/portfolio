export const siteConfig = {
  name: "Shariff's Portfolio",
  description: "Shariff Rashid's portfolio. I build AI solutions.",
  url: "https://shariffrashid.com",
  ogImage: "https://shariffrashid.com/og-placeholder.jpg",
  links: {
    github: "https://github.com/shareeep",
  },
} as const

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || siteConfig.url
}
