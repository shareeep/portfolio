"use client"

import { TypingAnimation } from "@/components/ui/typing-animation"

const experienceCards = [
  {
    title: "HTX (Home Team Science & Technology Agency)",
    role: "Software Engineer · Internship",
    meta: "Jan 2026 - Present Enterprise Group · xDigital - AI Products",
    body: "Fullstack development in TypeScript with React and NestJS. Built end-to-end tests with Playwright and contributed to an agentic AI integration via a custom MCP server.",
  },
  {
    title: "Singapore Management University",
    role: "Teaching Assistant",
    meta: "Jan 2026 - Present· Enterprise Solution Development - IS213",
    body: "Supporting course delivery under Prof. Jiang Lingxiao, sharing with assisting with labs, and guiding my juniors :)",
  },
  {
    title: "SMU Business Intelligence and Analytics",
    role: "Data Associate",
    meta: "Oct 2025 - Present",
    body: "Led weekly co-learning sessions on ML topics and built a hate speech classification project using LLMs and related models.",
  },
  {
    title: "Zora Health",
    role: "Product · Internship",
    meta: "May 2024 - Jul 2024",
    body: "Owned the Learning Experience Platform roadmap, automated content production with Python, and led a data-driven homepage redesign.",
  },
]

export function HomeHero() {
  return (
    <section className="bg-background">
      <div className="container flex flex-col gap-6 py-8">
        <div className="border-border bg-card rounded-2xl border p-4">
          <TypingAnimation
            words={[
              "Shariff Rashid",
              "Software Engineer",
              "Penultimate Bachelors of Information Systems",
              "Double Major in Product Development & Artificial Intelligence",
            ]}
            loop
            blinkCursor={true}
            pauseDelay={2000}
            cursorStyle="underscore"
            startOnView={false}
            className="text-foreground font-heading text-3xl sm:text-4xl md:text-5xl"
          />
        </div>

        <div className="border-border bg-card rounded-2xl border p-4">
          <div className="border-border border-b px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="bg-destructive size-2.5 rounded-full" />
              <span className="bg-muted size-2.5 rounded-full" />
              <span className="bg-accent size-2.5 rounded-full" />
              <span className="text-muted-foreground ml-2 text-xs uppercase tracking-[0.3em]">
                Professional Experience
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto px-2 pb-6 pt-10">
              {experienceCards.map((card) => (
                <div key={card.title} className="min-w-[280px] max-w-[320px]">
                  <div className="border-border bg-background mt-3 rounded-2xl border p-4 shadow-sm">
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
                      {card.meta}
                    </p>
                    <h3 className="font-heading text-foreground mt-3 text-lg">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {card.role}
                    </p>
                    <p className="text-foreground mt-3 text-sm leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
