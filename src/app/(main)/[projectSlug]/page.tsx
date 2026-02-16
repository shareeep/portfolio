import { notFound } from "next/navigation"
import { projects as allProjects } from "#site/content"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Mdx } from "@/components/mdx-components"

import "@/styles/mdx.css"

import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { absoluteUrl, cn, formatDate } from "@/lib/utils"
import { getTagCategory, sortTags } from "@/app/(main)/projects/tag-categories"

interface ProjectSlugPageProps {
  params: Promise<{ projectSlug: string }>
}

async function getProjectFromParams(params: ProjectSlugPageProps["params"]) {
  const resolvedParams = await params
  const slug = resolvedParams?.projectSlug
  const project = allProjects.find((entry) => entry.slugAsParams === slug)

  if (!project) {
    return null
  }

  return project
}

export async function generateMetadata({
  params,
}: ProjectSlugPageProps): Promise<Metadata> {
  const project = await getProjectFromParams(params)

  if (!project) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL
  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", project.title)
  ogUrl.searchParams.set("type", "Project")
  ogUrl.searchParams.set("mode", "dark")

  return {
    metadataBase: new URL(siteConfig.url),
    title: project.title,
    description: project.description,
    authors: project.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: absoluteUrl(project.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  }
}

export async function generateStaticParams(): Promise<
  { projectSlug: string }[]
> {
  return allProjects.map((project) => ({
    projectSlug: project.slugAsParams,
  }))
}

export default async function ProjectSlugPage({
  params,
}: ProjectSlugPageProps) {
  const project = await getProjectFromParams(params)

  if (!project) {
    notFound()
  }

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 size-4" />
        Back to home
      </Link>
      <div>
        {project.date && (
          <time
            dateTime={project.date}
            className="text-muted-foreground block text-sm"
          >
            Published on {formatDate(project.date)}
          </time>
        )}
        <h1 className="font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl">
          {project.title}
        </h1>
        {project.tags && project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
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
                  className={`rounded-full px-2 py-1 text-sm ${colorClass}`}
                >
                  {tag}
                </span>
              )
            })}
          </div>
        )}
      </div>
      {project.image && (
        <AspectRatio
          ratio={720 / 405}
          className="bg-muted my-8 w-full overflow-hidden rounded-md border"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-colors"
            priority
          />
        </AspectRatio>
      )}
      <Mdx code={project.body} />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 size-4" />
          Back to home
        </Link>
      </div>
    </article>
  )
}
