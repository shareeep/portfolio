import { projects } from "#site/content"

import { sortProjectsByNewest } from "@/lib/projects"
import { PortfolioHome } from "@/components/portfolio-home"

export default function HomePage() {
  const publishedProjects = projects.filter((project) => project.published)
  const featuredProjects = publishedProjects
    .filter((project) => project.homepageOrder !== undefined)
    .sort(
      (a, b) => (a.homepageOrder ?? Infinity) - (b.homepageOrder ?? Infinity)
    )
  const olderProjects = sortProjectsByNewest(
    publishedProjects.filter((project) => project.homepageOrder === undefined)
  )

  return (
    <PortfolioHome
      featuredProjects={featuredProjects}
      olderProjects={olderProjects}
    />
  )
}
