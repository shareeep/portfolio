export const profile = {
  greeting: "Hello, I’m Shariff.",
  headline: "Data Scientist & Software Engineer",
  introduction:
    "I build applied AI systems and dependable software. I’m completing a BSc in Information Systems at Singapore Management University, with a second major in Computer Science (Artificial Intelligence).",
  focus:
    "Recently, I’ve worked across the path from AI prototype to production: RAG and agent workflows, prompt tracing, document-processing reliability, and human review.",
} as const

export const experiences = [
  {
    organisation: "GovTech (Government Technology Agency)",
    role: "Data Scientist Intern",
    team: "SCG Digital Governance · Central Digital Assurance (CDA-IM8)",
    dates: "May 2026 – Present",
    logo: "/images/govtech_singapore_logo.jpeg",
    highlights: [
      "Own full-stack development, AI engineering, and production operations for two AI products; built one from scratch and took over the second through launch.",
      "Instrumented both products with Langfuse tracing and prompt version management; reworked prompts to improve cache reuse and reduce latency.",
      "Built a queue system for document jobs to resolve pre-production memory failures, then deployed shared PDF and DOCX ingestion for reuse across the team’s AI products.",
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
