import type { Project } from "#site/content"

export function sortProjectsByNewest(projects: Project[]) {
  return [...projects].sort(
    (a, b) =>
      Date.parse(b.date) - Date.parse(a.date) || a.title.localeCompare(b.title)
  )
}

export function projectHref(project: Project) {
  return `/${project.slugAsParams}`
}

export function projectYear(project: Project) {
  return new Date(project.date).getUTCFullYear()
}
