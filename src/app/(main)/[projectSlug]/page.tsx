import "@/styles/mdx.css"

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { projects } from "#site/content"

import { getSiteUrl } from "@/config/site"
import { absoluteUrl, formatDate } from "@/lib/utils"
import { Mdx } from "@/components/mdx-components"

interface ProjectPageProps {
  params: Promise<{ projectSlug: string }>
}

async function getProject(params: ProjectPageProps["params"]) {
  const { projectSlug } = await params
  return projects.find(
    (project) => project.published && project.slugAsParams === projectSlug
  )
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params)

  if (!project) return {}

  const canonicalUrl = absoluteUrl(`/${project.slugAsParams}`)
  const ogUrl = new URL("/api/og", getSiteUrl())
  ogUrl.searchParams.set("heading", project.title)
  ogUrl.searchParams.set("type", "Project")
  ogUrl.searchParams.set("mode", "light")

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: canonicalUrl },
    authors: project.authors.map((author) => ({ name: author })),
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: canonicalUrl,
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

export function generateStaticParams() {
  return projects
    .filter((project) => project.published)
    .map((project) => ({ projectSlug: project.slugAsParams }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params)

  if (!project) notFound()

  return (
    <article className="project-page page-section">
      <Link href="/#projects" className="back-link">
        ← Back to projects
      </Link>

      <header>
        <p className="eyebrow">
          {project.projectType} · {formatDate(project.date)}
        </p>
        <h1>{project.title}</h1>
        {project.description && <p>{project.description}</p>}
      </header>

      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={675}
          className="project-cover"
          priority
        />
      )}

      <div className="project-body">
        <Mdx code={project.body} />
      </div>

      <Link href="/#projects" className="back-link project-back-link">
        ← Back to projects
      </Link>
    </article>
  )
}
