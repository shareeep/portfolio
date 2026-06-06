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
    title: "GovTech (Government Technology Agency)",
    role: "Data Scientist Intern",
    meta: "May 2026 - Present",
    logo: "/images/govtech_singapore_logo.jpeg",
    summary: "SCG - DG; Central Digital Assurance (IM8)",
    highlights: [
      "Developing CDA-IM8 subtools for document processing, analysis, coaching, and management reporting workflows.",
      "Building a full-stack RAG application that retrieves policy context, generates LLM-backed insights, and exports compliance reports.",
      "Designing human-in-the-loop review workflows for policy documents, control evidence, and assurance material.",
    ],
  },
  {
    title: "iPiD - International Payments Identity",
    role: "Final Year Project",
    meta: "May 2026 - Present",
    logo: "/images/internationalpaymentsidentity_logo.jpeg",
    summary:
      "SMU Final Year Project - Growth Intelligence",
    highlights: [
      "Agentic platform for iPiD that turns account, market, regulatory, and GTM signals into grounded and high quality marketing material.",
      "Building account research and ABM brief generation services with source cards, run logs, review trails, and reusable context.",
      "Adding safeguards for hallucinations, stale evidence, and sponsor data.",
    ],
  },
  {
    title: "HTX (Home Team Science & Technology Agency)",
    role: "Software Engineering Intern",
    meta: "Jan 2026 - Apr 2026",
    logo: "/images/htxsg_logo.jpeg",
    summary: "Enterprise Group - xDigital, working on AI Products",
    highlights: [
      "Built a custom MCP server exposing key functionalities as tool contracts for future AI agent integration.",
      "Developed features for an AI-powered procurement report system serving Whole-of-Government (WoG).",
      "Implemented Playwright E2E suites in GitLab CI to enforce regression coverage across critical user flows ahead of launch.",
    ],
  },
  {
    title: "SMU Business Intelligence and Analytics",
    role: "Data Associate",
    meta: "Oct 2025 - Apr 2026",
    logo: "/images/smubia_logo.jpeg",
    summary:
      "Weekly co-learning sessions on regression, neural network architectures, transformers, and NLP.",

    highlights: [
      "Led a linear regression session focused on gradient descent.",
      "Built a hate speech classification project using LLMs and transformer models.",
    ],
  },
]

export function HomeHero() {
  return (
    <section className="bg-background">
      <div className="container flex flex-col gap-4 py-6 md:gap-5 md:py-8">
        <div className="border-border bg-card rounded-2xl border p-4 md:p-5">
          <div className="border-border border-b px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="bg-destructive size-2.5 rounded-full" />
              <span className="bg-muted size-2.5 rounded-full" />
              <span className="bg-accent size-2.5 rounded-full" />
              <span className="text-muted-foreground ml-2 text-xs uppercase tracking-[0.3em]">
                Profile & Experience
              </span>
            </div>
          </div>
          <div className="grid gap-6 px-2 py-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-stretch">
            <div className="min-w-0">
              <Accordion type="single" collapsible defaultValue="experience-0">
                {experienceCards.map((card, index) => (
                  <AccordionItem
                    key={card.title}
                    value={`experience-${index}`}
                    className="border-border/60"
                  >
                    <AccordionTrigger className="text-left">
                      <div className="flex w-full items-start gap-3 text-left">
                        <div className="border-border/60 bg-muted/40 relative size-12 shrink-0 overflow-hidden rounded-full border">
                          {card.logo ? (
                            <Image
                              src={card.logo}
                              alt={`${card.title} logo`}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="bg-muted size-full rounded-full" />
                          )}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
                            <span className="font-heading text-foreground text-base leading-tight">
                              {card.role}
                            </span>
                            <span className="text-muted-foreground w-full text-left text-xs uppercase tracking-[0.25em] sm:w-auto sm:tracking-[0.3em]">
                              {card.meta}
                            </span>
                          </div>
                          <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                            <span>{card.title}</span>
                            {card.location && <span>· {card.location}</span>}
                          </div>
                          {card.team && (
                            <span className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
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
                          <ul className="text-foreground mt-2 space-y-2 text-sm">
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
            <div className="border-border/70 bg-background/70 order-first flex min-h-48 items-center justify-center rounded-2xl border p-5 lg:order-last lg:my-4 lg:min-h-0 lg:self-stretch lg:p-6">
              <TypingAnimation
                words={[
                  "Muhammad Shariff Bin Abdul Rashid",
                  "Data Scientist / AI Engineer / Software Engineer",
                  "BSc Information Systems @ SMU",
                  "Product Development + Artificial Intelligence",
                ]}
                loop
                blinkCursor={true}
                pauseDelay={2000}
                cursorStyle="underscore"
                startOnView={false}
                as="div"
                className="text-foreground font-heading mx-auto block w-full max-w-sm whitespace-normal break-words text-center text-2xl leading-tight sm:text-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
