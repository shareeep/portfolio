import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@/components/ui/aspect-ratio" // Added import
import { compareDesc } from "date-fns"
import { projects as allProjects } from "#site/content" // Updated import

import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Projects", // Updated title
}

export default async function ProjectsPage() { // Renamed component
  const projects = allProjects // Renamed variable
    .filter((project) => project.published) // Renamed loop variable
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-heading inline-block text-4xl tracking-tight lg:text-5xl">
            Projects
          </h1>
          <p className="text-muted-foreground text-xl">
            A collection of projects. Content is managed using Velite and MDX.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {projects?.length ? ( // Renamed variable
        <div className="grid gap-10 sm:grid-cols-2">
          {/* TODO: Update this map to use ProjectItem component if it exists */}
          {projects.map((project, index) => ( // Renamed variable and loop variable
            <article // This might be replaced by <ProjectItem key={...} project={...} />
              key={project.slug} // Renamed loop variable
              className="group relative flex flex-col space-y-2"
            >
              {project.image && ( // Renamed loop variable
                <AspectRatio ratio={804 / 452} className="bg-muted overflow-hidden rounded-md border">
                  <Image
                    src={project.image} // Renamed loop variable
                    alt={project.title} // Renamed loop variable
                    fill
                    className="object-cover transition-colors" // Added object-cover
                    priority={index <= 1}
                  />
                </AspectRatio>
              )}
              <h2 className="text-2xl font-extrabold">{project.title}</h2> 
              {project.description && ( // Renamed loop variable
                <p className="text-muted-foreground">{project.description}</p> // Renamed loop variable
              )}
              {project.date && ( // Renamed loop variable
                <p className="text-muted-foreground text-sm">
                  {formatDate(project.date)} 
                </p>
              )}
              <Link href={project.slug} className="absolute inset-0"> 
                <span className="sr-only">View Project</span> 
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No projects published.</p> // Updated empty state text
      )}
    </div>
  )
}
