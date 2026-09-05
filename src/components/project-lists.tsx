import Link from "next/link"
import type { Project } from "#site/content"

import { projectHref, projectYear } from "@/lib/projects"

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="featured-projects">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={projectHref(project)}
          className="featured-project"
        >
          <span className="project-row-heading">
            <strong>{project.shortTitle ?? project.title}</strong>
            <span aria-hidden="true">↗</span>
          </span>
          <span className="project-meta">
            {project.projectType} · {projectYear(project)}
          </span>
          {project.description && <span>{project.description}</span>}
        </Link>
      ))}
    </div>
  )
}

export function CompactProjectList({ projects }: { projects: Project[] }) {
  return (
    <ol className="compact-projects">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link href={projectHref(project)}>
            <time dateTime={project.date}>{projectYear(project)}</time>
            <span>{project.shortTitle ?? project.title}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
