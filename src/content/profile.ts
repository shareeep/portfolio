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
    organisation: "GovTech Singapore",
    role: "Data Scientist Intern",
    team: "SCG Digital Governance · Central Digital Assurance",
    dates: "May 2026 – Present",
    logo: "/images/govtech_singapore_logo.jpeg",
    highlights: [
      "Build tools that process control evidence, support IM8 assurance reviews, and produce management reports.",
      "Develop a full-stack agentic application that retrieves policy evidence with RAG, generates insights, and exports assurance reports.",
      "Design context and human-review checkpoints so users can assess model outputs against source material.",
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
