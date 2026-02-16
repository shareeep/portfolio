"use client"

import { useMemo, useState } from "react"
import type { KeyboardEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { projects as allProjects } from "#site/content"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pill } from "@/components/kibo-ui/pill"
import { getTagCategory, sortTags } from "@/app/(main)/projects/tag-categories"

export function ProjectsFilters() {
  const [selectedTags, setSelectedTags] = useState<{
    scope: string[]
    tools: string[]
    focus: string[]
  }>({
    scope: [],
    tools: [],
    focus: [],
  })

  const [activeTab, setActiveTab] = useState<"scope" | "tools" | "focus">(
    "scope"
  )

  const [showAllTags, setShowAllTags] = useState<{
    scope: boolean
    tools: boolean
    focus: boolean
  }>({
    scope: false,
    tools: false,
    focus: false,
  })

  const publishedProjects = useMemo(() => {
    return allProjects
      .filter((project) => project.published)
      .sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
      })
  }, [])

  const categorizedTags = useMemo(() => {
    const uniqueTags = {
      scope: new Set<string>(),
      tools: new Set<string>(),
      focus: new Set<string>(),
    }

    publishedProjects.forEach((project) => {
      if (project.tags && project.tags.length > 0) {
        project.tags.forEach((tag) => {
          const category = getTagCategory(tag)
          uniqueTags[category].add(tag)
        })
      }
    })

    return {
      scope: Array.from(uniqueTags.scope).sort(),
      tools: Array.from(uniqueTags.tools).sort(),
      focus: Array.from(uniqueTags.focus).sort(),
    }
  }, [publishedProjects])

  const toggleTag = (tag: string) => {
    const category = getTagCategory(tag)

    setSelectedTags((prev) => {
      const nextSelected = { ...prev }

      if (nextSelected[category].includes(tag)) {
        nextSelected[category] = nextSelected[category].filter((t) => t !== tag)
      } else {
        nextSelected[category] = [...nextSelected[category], tag]
      }

      return nextSelected
    })
  }

  const handlePillKeyDown = (event: KeyboardEvent, onActivate: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onActivate()
    }
  }

  const toggleShowAllTags = (category: "scope" | "tools" | "focus") => {
    setShowAllTags((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const clearTags = () => {
    setSelectedTags({
      scope: [],
      tools: [],
      focus: [],
    })
  }

  const clearCategoryTags = (category: "scope" | "tools" | "focus") => {
    setSelectedTags((prev) => ({
      ...prev,
      [category]: [],
    }))
  }

  const filteredProjects = useMemo(() => {
    const allSelectedTags = [
      ...selectedTags.scope,
      ...selectedTags.tools,
      ...selectedTags.focus,
    ]

    if (allSelectedTags.length === 0) {
      return publishedProjects
    }

    return publishedProjects.filter((project) => {
      if (!project.tags) return false
      return allSelectedTags.every(
        (tag) => project.tags?.includes(tag) || false
      )
    })
  }, [selectedTags, publishedProjects])

  return (
    <div className="space-y-6">
      {(categorizedTags.scope.length > 0 ||
        categorizedTags.tools.length > 0 ||
        categorizedTags.focus.length > 0) && (
        <div className="border-border bg-card rounded-2xl border p-4 shadow-sm">
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "scope" | "tools" | "focus")
            }
          >
            <TabsList className="mb-4 flex w-full flex-wrap rounded-full border border-border bg-background/70 p-1 shadow-sm max-[400px]:flex-col max-[400px]:gap-1 md:flex-nowrap">
              <TabsTrigger
                value="scope"
                className="min-w-[80px] flex-1 rounded-full font-heading text-sm text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm sm:text-base"
              >
                Domain
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="min-w-[80px] flex-1 rounded-full font-heading text-sm text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm sm:text-base"
              >
                Tech
              </TabsTrigger>
              <TabsTrigger
                value="focus"
                className="min-w-[80px] flex-1 rounded-full font-heading text-sm text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm sm:text-base"
              >
                Focus
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scope" className="mb-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {(showAllTags.scope
                  ? categorizedTags.scope
                  : categorizedTags.scope.slice(0, 10)
                ).map((tag) => (
                  <Pill
                    key={tag}
                    className={`cursor-pointer border-transparent px-3 py-1 text-xs shadow-none sm:text-sm ${selectedTags.scope.includes(tag) ? "bg-blue-600/35 text-blue-950 shadow-sm" : "bg-blue-500/10 text-blue-800 hover:bg-blue-500/15"}`}
                    onClick={() => toggleTag(tag)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedTags.scope.includes(tag)}
                    onKeyDown={(event) =>
                      handlePillKeyDown(event, () => toggleTag(tag))
                    }
                  >
                    {tag}
                  </Pill>
                ))}
                {categorizedTags.scope.length > 10 && (
                  <Pill
                    className="cursor-pointer border-transparent px-3 py-1 text-xs text-blue-800 shadow-none hover:bg-blue-500/10 sm:text-sm"
                    onClick={() => toggleShowAllTags("scope")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) =>
                      handlePillKeyDown(event, () => toggleShowAllTags("scope"))
                    }
                  >
                    {showAllTags.scope
                      ? "Show less ↑"
                      : `+${categorizedTags.scope.length - 10} more`}
                  </Pill>
                )}
              </div>
              {selectedTags.scope.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearCategoryTags("scope")}
                  className="mt-2"
                >
                  Clear scope filters
                </Button>
              )}
            </TabsContent>

            <TabsContent value="tools" className="mb-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {(showAllTags.tools
                  ? categorizedTags.tools
                  : categorizedTags.tools.slice(0, 10)
                ).map((tag) => (
                  <Pill
                    key={tag}
                    className={`cursor-pointer border-transparent px-3 py-1 text-xs shadow-none sm:text-sm ${selectedTags.tools.includes(tag) ? "bg-emerald-600/35 text-emerald-950 shadow-sm" : "bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/15"}`}
                    onClick={() => toggleTag(tag)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedTags.tools.includes(tag)}
                    onKeyDown={(event) =>
                      handlePillKeyDown(event, () => toggleTag(tag))
                    }
                  >
                    {tag}
                  </Pill>
                ))}
                {categorizedTags.tools.length > 10 && (
                  <Pill
                    className="cursor-pointer border-transparent px-3 py-1 text-xs text-emerald-800 shadow-none hover:bg-emerald-500/10 sm:text-sm"
                    onClick={() => toggleShowAllTags("tools")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) =>
                      handlePillKeyDown(event, () => toggleShowAllTags("tools"))
                    }
                  >
                    {showAllTags.tools
                      ? "Show less ↑"
                      : `+${categorizedTags.tools.length - 10} more`}
                  </Pill>
                )}
              </div>
              {selectedTags.tools.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearCategoryTags("tools")}
                  className="mt-2"
                >
                  Clear tools filters
                </Button>
              )}
            </TabsContent>

            <TabsContent value="focus" className="mb-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {(showAllTags.focus
                  ? categorizedTags.focus
                  : categorizedTags.focus.slice(0, 10)
                ).map((tag) => (
                  <Pill
                    key={tag}
                    className={`cursor-pointer border-transparent px-3 py-1 text-xs shadow-none sm:text-sm ${selectedTags.focus.includes(tag) ? "bg-purple-600/35 text-purple-950 shadow-sm" : "bg-purple-500/10 text-purple-800 hover:bg-purple-500/15"}`}
                    onClick={() => toggleTag(tag)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedTags.focus.includes(tag)}
                    onKeyDown={(event) =>
                      handlePillKeyDown(event, () => toggleTag(tag))
                    }
                  >
                    {tag}
                  </Pill>
                ))}
                {categorizedTags.focus.length > 10 && (
                  <Pill
                    className="cursor-pointer border-transparent px-3 py-1 text-xs text-purple-800 shadow-none hover:bg-purple-500/10 sm:text-sm"
                    onClick={() => toggleShowAllTags("focus")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) =>
                      handlePillKeyDown(event, () => toggleShowAllTags("focus"))
                    }
                  >
                    {showAllTags.focus
                      ? "Show less ↑"
                      : `+${categorizedTags.focus.length - 10} more`}
                  </Pill>
                )}
              </div>
              {selectedTags.focus.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearCategoryTags("focus")}
                  className="mt-2"
                >
                  Clear focus filters
                </Button>
              )}
            </TabsContent>
          </Tabs>

          {(selectedTags.scope.length > 0 ||
            selectedTags.tools.length > 0 ||
            selectedTags.focus.length > 0) && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium">Active filters:</h3>
                <Button variant="ghost" size="sm" onClick={clearTags}>
                  Clear all filters
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedTags.scope.map((tag) => (
                  <Pill
                    key={tag}
                    className="flex cursor-pointer items-center gap-1 border-0 bg-blue-600/35 px-3 py-1 text-xs text-blue-950 shadow-sm"
                    onClick={() => toggleTag(tag)}
                    role="button"
                    tabIndex={0}
                    aria-pressed
                    onKeyDown={(event) =>
                      handlePillKeyDown(event, () => toggleTag(tag))
                    }
                  >
                    {tag} <span className="ml-1 text-xs font-bold">×</span>
                  </Pill>
                ))}
                {selectedTags.tools.map((tag) => (
                  <Pill
                    key={tag}
                    className="flex cursor-pointer items-center gap-1 border-0 bg-emerald-600/35 px-3 py-1 text-xs text-emerald-950 shadow-sm"
                    onClick={() => toggleTag(tag)}
                    role="button"
                    tabIndex={0}
                    aria-pressed
                    onKeyDown={(event) =>
                      handlePillKeyDown(event, () => toggleTag(tag))
                    }
                  >
                    {tag} <span className="ml-1 text-xs font-bold">×</span>
                  </Pill>
                ))}
                {selectedTags.focus.map((tag) => (
                  <Pill
                    key={tag}
                    className="flex cursor-pointer items-center gap-1 border-0 bg-purple-600/35 px-3 py-1 text-xs text-purple-950 shadow-sm"
                    onClick={() => toggleTag(tag)}
                    role="button"
                    tabIndex={0}
                    aria-pressed
                    onKeyDown={(event) =>
                      handlePillKeyDown(event, () => toggleTag(tag))
                    }
                  >
                    {tag} <span className="ml-1 text-xs font-bold">×</span>
                  </Pill>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {filteredProjects.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={project.slug}
              className="bg-card border-border group relative flex flex-col space-y-2 overflow-hidden rounded-2xl border p-4 shadow-sm"
            >
              {project.image && (
                <AspectRatio
                  ratio={804 / 452}
                  className="bg-muted overflow-hidden rounded-md border"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    priority={index <= 1}
                  />
                </AspectRatio>
              )}
              <h3 className="font-heading text-xl">{project.title}</h3>
              {project.tags && project.tags.length > 0 && (
                <div className="mb-2 mt-1 flex flex-wrap gap-1">
                  {sortTags(project.tags).map((tag) => {
                    const category = getTagCategory(tag)
                    const colorClass =
                      category === "scope"
                        ? "bg-blue-600/40 text-blue-900"
                        : category === "tools"
                          ? "bg-green-600/40 text-green-900"
                          : "bg-purple-600/40 text-purple-900"

                    return (
                      <span
                        key={tag}
                        className={`rounded-full px-2 py-1 text-xs ${colorClass}`}
                      >
                        {tag}
                      </span>
                    )
                  })}
                </div>
              )}
              {project.description && (
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              )}
              <p className="text-muted-foreground text-sm">
                {formatDate(project.date)}
              </p>
              <Link
                href={`/${project.slugAsParams}`}
                className="absolute inset-0"
              >
                <span className="sr-only">View Project</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No projects published.</p>
      )}
    </div>
  )
}
