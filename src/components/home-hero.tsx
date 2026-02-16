"use client"

import Image from "next/image"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { TypingAnimation } from "@/components/ui/typing-animation"

type ExperienceCard = {
  title: string
  role: string
  meta: string
  logo?: string
  summary?: string
  highlights: string[]
  location?: string
  team?: string
  link?: string
}

const experienceCards: ExperienceCard[] = [
  {
    title: "HTX (Home Team Science & Technology Agency)",
    role: "Software Engineer · Internship",
    meta: "Jan 2026 - Present",
    logo: "/images/htxsg_logo.jpeg",
    summary: "Enterprise Group - xDigital, working on AI Products",
    highlights: [
      "Fullstack development in TypeScript with services powered by React and NestJS.",
      "Built CI workflows in GitLab and robust Playwright E2E tests to surface regressions.",
      "Contributed to product development (details TBD).",
      "Built a custom MCP server to integrate app functionality with an agentic AI push.",
    ],
  },
  {
    title: "Singapore Management University",
    role: "Teaching Assistant",
    meta: "Jan 2026 - Present",
    logo: "/images/singapore_management_university_logo.jpeg",
    summary:
      "Enterprise Solution Development - IS213 under Prof. Jiang Lingxiao",

    highlights: [
      "Supported course delivery, lab facilitation, and mentorship for juniors.",
    ],
  },
  {
    title: "SMU Business Intelligence and Analytics",
    role: "Data Associate",
    meta: "Oct 2025 - Present",
    logo: "/images/smubia_logo.jpeg",
    summary:
      "Weekly co-learning session covering ML topics (Regression, NN Architectures, Transformers, NLP).",

    highlights: [
      "Led a session on Linear Regression, focusing on Gradient Descent.",
      "Building a comprehensive hate speech classification project using LLMs and related models.",
    ],
  },
  {
    title: "Zora Health",
    role: "Product · Internship",
    meta: "May 2024 - Jul 2024",
    logo: "/images/zorahealth_logo.jpeg",
    summary:
      "Zora Health is a leading platform for fertility, reproductive care, and family health, delivering tailored care directly or via employer benefits (B2C & B2B2C).",
    highlights: [
      "Owned key product: led the Learning Experience Platform (LXP), defined requirements, benchmarked competitors, and shaped the roadmap in Asana.",
      "Built a Python automation script to parse lesson content into JSON, reducing production time by 90%+.",
      "Managed stakeholder updates and coordinated with developers to ensure scalable feature delivery.",
      "Led a data-driven homepage redesign using Hotjar + Google Analytics, supporting a shift from B2C to B2B2C.",
    ],
  },
]

export function HomeHero() {
  return (
    <section className="bg-background">
      <div className="container flex flex-col gap-4 md:gap-5 py-6 md:py-8">
        <div className="border-border bg-card rounded-2xl border p-4 md:p-5">
          <TypingAnimation
            words={[
              "Muhammad Shariff Bin Abdul Rashid",
              "Software Engineer / AI Engineer",
              "Penultimate @ SMU; BSc Information Systems",
              "Double Major in Product Development & AI",
            ]}
            loop
            blinkCursor={true}
            pauseDelay={2000}
            cursorStyle="underscore"
            startOnView={false}
            className="text-foreground font-heading text-3xl sm:text-4xl md:text-5xl"
          />
        </div>

        <div className="border-border bg-card rounded-2xl border p-4 md:p-5">
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
          <div className="px-2 pb-4 pt-2">
            <Accordion type="single" collapsible defaultValue="experience-0">
              {experienceCards.map((card, index) => (
                <AccordionItem
                  key={card.title}
                  value={`experience-${index}`}
                  className="border-border/60"
                >
                  <AccordionTrigger className="text-left">
                    <div className="flex flex-wrap items-start gap-3 text-left">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-border/60 bg-muted/40">
                        {card.logo ? (
                          <Image
                            src={card.logo}
                            alt={`${card.title} logo`}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="size-full rounded-full bg-muted" />
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-heading text-base text-foreground">
                            {card.role}
                          </span>
                          <span className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
                            {card.meta}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>{card.title}</span>
                          {card.location && <span>· {card.location}</span>}
                        </div>
                        {card.team && (
                          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            {card.team}
                          </span>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <div className="flex flex-col">
                      {card.summary && (
                        <p className="text-foreground text-sm leading-relaxed">
                          {card.summary}
                        </p>
                      )}
                      <div>
                        <ul className="mt-2 space-y-2 text-sm text-foreground">
                          {card.highlights.map((highlight) => (
                            <li key={highlight}>• {highlight}</li>
                          ))}
                        </ul>
                      </div>
                      {card.link && (
                        <a
                          href={card.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium underline underline-offset-4"
                        >
                          View project
                        </a>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
