export const siteConfig = {
  name: "Shariff Rashid",
  description:
    "Data scientist and software engineer building applied AI systems and dependable software.",
  url: "https://shariffrashid.com",
  location: "Singapore",
  email: "muhd.shariff01@gmail.com",
  links: {
    github: "https://github.com/shareeep",
    linkedin: "https://linkedin.com/in/shariff-rashid",
    resume: "/resume.pdf",
  },
} as const

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || siteConfig.url
}
