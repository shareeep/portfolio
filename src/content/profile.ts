export const profile = {
  greeting: "Hello, I’m Shariff.",
  headline: "Data Scientist & Software Engineer",
  introduction:
    "I build applied AI systems and dependable software. I’m completing a BSc in Information Systems at Singapore Management University, with a second major in Computer Science (Artificial Intelligence).",
  focus:
    "My recent work focuses on document intelligence, RAG systems, context engineering, and products that keep people in control of AI-assisted decisions.",
} as const

export const experiences = [
  {
    organisation: "GovTech (Government Technology Agency)",
    role: "Data Scientist Intern",
    team: "SCG Digital Governance · Central Digital Assurance (CDA-IM8)",
    dates: "May 2026 – Present",
    logo: "/images/govtech_singapore_logo.jpeg",
    highlights: [
      "I own two AI products from product-owner requirements through production. I built one from scratch and took over the other through launch.",
      "I added Langfuse tracing and prompt version management to both products, then reworked prompts to improve cache reuse and latency.",
      "I resolved pre-production memory failures by queueing document jobs and deploying shared PDF and DOCX ingestion for the team’s AI products.",
    ],
  },
  {
    organisation: "HTX (Home Team Science and Technology Agency)",
    role: "Software Engineering Intern",
    team: "xDigital · AI Products Team",
    dates: "Jan 2026 – Apr 2026",
    logo: "/images/htxsg_logo.jpeg",
    highlights: [
      "Developed features in a full-stack TypeScript codebase for AI-assisted government report workflows.",
      "Built a custom MCP server that exposed report creation, file upload, and lookup as typed tools for agent workflows.",
      "Added Playwright end-to-end coverage to GitLab CI for critical report journeys ahead of launch.",
    ],
  },
] as const
