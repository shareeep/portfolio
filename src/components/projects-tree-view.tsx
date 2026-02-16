"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { projects as allProjects } from "#site/content"
import { compareDesc } from "date-fns"

import { cn, formatDate } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import TreeNodeTooltip, {
  type TreeNode,
} from "@/components/ruixen/tree-node-tooltip"

type ProjectType = "AI/ML" | "SWE" | "DESIGN" | "DATA"

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  "AI/ML": "AI / ML",
  SWE: "Software Engineering",
  DESIGN: "Design",
  DATA: "Data Engineering",
}

const PROJECT_TYPE_TOOLTIP: Record<ProjectType, string> = {
  "AI/ML": "Research, modeling, and ML systems",
  SWE: "Product engineering and systems work",
  DESIGN: "UX/UI and product design projects",
  DATA: "Data pipelines and analytics systems",
}

export function ProjectsTreeView() {
  const rightPaneRef = useRef<HTMLDivElement | null>(null)
  const [activeFolder, setActiveFolder] = useState<ProjectType | null>(null)
  const [expandedProjectSlug, setExpandedProjectSlug] = useState<string | null>(
    null
  )

  const publishedProjects = useMemo(() => {
    return allProjects
      .filter((project) => project.published)
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  }, [])

  const projectsByType = useMemo(() => {
    const buckets: Record<ProjectType, typeof publishedProjects> = {
      "AI/ML": [],
      SWE: [],
      DESIGN: [],
      DATA: [],
    }

    publishedProjects.forEach((project) => {
      const type = (project.projectType || "SWE") as ProjectType
      buckets[type].push(project)
    })
    ;(Object.keys(buckets) as ProjectType[]).forEach((type) => {
      buckets[type].sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
      )
    })

    return buckets
  }, [publishedProjects])

  useEffect(() => {
    if (activeFolder) return
    if (projectsByType["AI/ML"].length > 0) {
      setActiveFolder("AI/ML")
      setExpandedProjectSlug(projectsByType["AI/ML"][0]?.slugAsParams ?? null)
      return
    }
    if (projectsByType.SWE.length > 0) {
      setActiveFolder("SWE")
      setExpandedProjectSlug(projectsByType.SWE[0]?.slugAsParams ?? null)
      return
    }
    setActiveFolder(null)
  }, [activeFolder, projectsByType])

  const gridProjects = useMemo(() => {
    if (activeFolder) return projectsByType[activeFolder]
    return projectsByType["AI/ML"].length > 0
      ? projectsByType["AI/ML"]
      : publishedProjects
  }, [activeFolder, projectsByType, publishedProjects])

  const gridProjectsWithoutExpanded = useMemo(() => {
    if (!expandedProjectSlug) return gridProjects.slice(0, 2)
    return gridProjects
      .filter((project) => project.slugAsParams !== expandedProjectSlug)
      .slice(0, 2)
  }, [gridProjects, expandedProjectSlug])

  const expandedProject = useMemo(() => {
    if (!expandedProjectSlug) return null
    return (
      publishedProjects.find(
        (project) => project.slugAsParams === expandedProjectSlug
      ) ?? null
    )
  }, [expandedProjectSlug, publishedProjects])

  const treeNodes: TreeNode[] = useMemo(() => {
    const orderedTypes: ProjectType[] = ["AI/ML", "SWE", "DESIGN", "DATA"]
    return orderedTypes.map((type) => {
      const projects = projectsByType[type]
      const firstSlug = projects[0]?.slugAsParams ?? null
      return {
        id: type,
        name: PROJECT_TYPE_LABELS[type],
        tooltip: PROJECT_TYPE_TOOLTIP[type],
        type: "folder",
        defaultExpanded: type === "AI/ML",
        isActive: activeFolder === type,
        onSelect: () => {
          setActiveFolder(type)
          setExpandedProjectSlug(firstSlug)
        },
        children: projects.map((project) => ({
          id: project.slugAsParams,
          name: project.shortTitle || project.title,
          tooltip: project.description || project.title,
          type: "file",
          onSelect: () => {
            setExpandedProjectSlug(project.slugAsParams)
            setActiveFolder(type)
          },
          isActive: expandedProjectSlug === project.slugAsParams,
        })),
      }
    })
  }, [projectsByType, activeFolder, expandedProjectSlug])

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]">
      <div className="bg-card border-border flex flex-col gap-4 rounded-2xl border p-4 shadow-sm lg:sticky lg:top-4 lg:self-start">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
            Projects
          </p>
        </div>
        <div className="space-y-2">
          {treeNodes.map((node) => (
            <TreeNodeTooltip key={node.id} node={node} />
          ))}
        </div>
      </div>

      <div
        ref={rightPaneRef}
        className="bg-card border-border rounded-2xl border p-5 shadow-sm"
      >
        {expandedProject ? (
          <div className="flex flex-col gap-8">
            <article className="rounded-2xl border border-border/70 bg-background/80 p-5">
              {(() => {
                const projectType = (expandedProject.projectType ||
                  "SWE") as ProjectType
                return (
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-muted-foreground text-[10px] uppercase tracking-[0.3em]">
                          {PROJECT_TYPE_LABELS[projectType]}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {formatDate(expandedProject.date)}
                        </span>
                      </div>
                      <h3 className="font-heading text-2xl lg:text-3xl">
                        {expandedProject.title}
                      </h3>
                      {expandedProject.description && (
                        <p className="text-muted-foreground text-sm lg:text-base">
                          {expandedProject.description}
                        </p>
                      )}
                      <div className="rounded-xl border border-border/60 bg-background/60 p-4 text-sm text-muted-foreground">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          Quick breakdown
                        </p>
                        {expandedProject.highlights &&
                        expandedProject.highlights.length > 0 ? (
                          <ul className="mt-3 space-y-2">
                            {expandedProject.highlights.map((highlight) => (
                              <li key={highlight}>• {highlight}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-3 text-sm text-muted-foreground">
                            Highlights coming soon.
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/${expandedProject.slugAsParams}`}
                          className="text-sm font-medium underline underline-offset-4"
                        >
                          View all details
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      {expandedProject.image && (
                        <AspectRatio
                          ratio={804 / 452}
                          className="bg-muted overflow-hidden rounded-xl border"
                        >
                          <Image
                            src={expandedProject.image}
                            alt={expandedProject.title}
                            fill
                            className="object-cover"
                            priority
                          />
                        </AspectRatio>
                      )}
                    </div>
                  </div>
                )
              })()}
            </article>

            <div className="grid gap-6 md:grid-cols-2">
              {gridProjectsWithoutExpanded.map((project, index) => {
                const projectType = (project.projectType ||
                  "SWE") as ProjectType
                const isActive =
                  expandedProjectSlug === project.slugAsParams ||
                  expandedProject.slugAsParams === project.slugAsParams
                return (
                  <article
                    key={project.slugAsParams}
                    className={cn(
                      "flex flex-col gap-3 rounded-xl border border-border/60 bg-background/80 p-4 shadow-sm",
                      isActive &&
                        "border-border/80 bg-muted/20 ring-1 ring-border/40"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-[10px] uppercase tracking-[0.3em]">
                        {PROJECT_TYPE_LABELS[projectType]}
                      </span>
                    </div>
                    {project.image && (
                      <AspectRatio
                        ratio={804 / 452}
                        className="bg-muted overflow-hidden rounded-md border"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </AspectRatio>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        {formatDate(project.date)}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl">{project.title}</h3>
                    {project.description && (
                      <p className="text-muted-foreground text-sm">
                        {project.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        className="text-sm font-medium underline underline-offset-4"
                        onClick={() => {
                          setExpandedProjectSlug(project.slugAsParams)
                          setActiveFolder(projectType)
                        }}
                      >
                        Expand
                      </button>
                      <Link
                        href={`/${project.slugAsParams}`}
                        className="text-sm font-medium underline underline-offset-4"
                      >
                        View all details
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-border/60 bg-background/60 px-4 text-center">
            <p className="text-muted-foreground text-sm">
              Select a project from the left to preview it here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
