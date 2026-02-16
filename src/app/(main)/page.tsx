import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
// Assuming a formatDate utility exists
import { buttonVariants } from "@/components/ui/button"
import { IconCloud } from "@/components/ui/icon-cloud"
import { LightRays } from "@/components/ui/light-rays"
import { HomeHero } from "@/components/home-hero"
import { Icons } from "@/components/icons"
import { ProjectsFilters } from "@/components/projects-filters"

// Import tag categorization utilities

export default async function IndexPage() {
  const linkedInUrl = "https://www.linkedin.com/in/shariffrashid"
  const emailAddress = "muhd.shariff01@gmail.com"

  const slugs = [
    "python",
    "typescript",
    "react",
    "express",
    "nodedotjs",
    "postgresql",
    "mysql",
    "amazonaws",
    "microsoftazure",
    "googlecloud",
    "docker",
    "rabbitmq",
    "apachekafka",
    "kubernetes",
    "grafana",
    "linux",
    "nginx",
    "git",
    "postman",
  ]

  const iconImages = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  )
  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <LightRays className="h-full w-full" />
      </div>

      <HomeHero />

      <section
        id="projects"
        className="bg-background container py-6 md:py-10 lg:py-16"
      >
        <ProjectsFilters />
      </section>

      <section
        id="skills-contact"
        className="bg-background container grid gap-8 py-6 md:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-center lg:py-16"
      >
        <div className="border-border bg-card relative flex min-h-[360px] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border p-6">
          <IconCloud images={iconImages} />
          <div className="border-border w-full border-t pt-4 text-center">
            <Link
              href="/capoo"
              className="text-muted-foreground hover:text-foreground text-xs uppercase tracking-[0.3em]"
            >
              Capoo
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-muted-foreground text-sm sm:text-base">
            connect with me! i'm always happy to talk :-)
          </p>
          <div className="flex items-center gap-3">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "border-border bg-card text-foreground hover:bg-muted"
              )}
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Icons.linkedIn className="size-5" />
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "border-border bg-card text-foreground hover:bg-muted"
              )}
              aria-label="GitHub"
              title="GitHub"
            >
              <Icons.gitHub className="size-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
