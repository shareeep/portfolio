import { notFound } from "next/navigation"
// Updated import: using 'projects' and 'Project' type
import { authors as allAuthors, projects as allProjects, type Project } from "#site/content" 

import { Mdx } from "@/components/mdx-components"

import "@/styles/mdx.css"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { env } from "@/env.mjs"
import { absoluteUrl, cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

// Renamed props interface
interface ProjectPageProps {
  params: {
    slug: string[]
  }
}

// Renamed function and internal variable
async function getProjectFromParams(params) {
  const slug = params?.slug?.join("/")
  const project = allProjects.find((project) => project.slugAsParams === slug) // Use allProjects

  if (!project) { // Use project
    null
  }

  return project // Use project
}

// Removed duplicate function definition

// Updated function signature to use renamed Props type
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> { 
  const project = await getProjectFromParams(params) // Use renamed function and variable

  if (!project) { // Use project
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", project.title) // Use project
  ogUrl.searchParams.set("type", "Project") // Updated type
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: project.title, // Use project
    description: project.description, // Use project
    authors: project.authors.map((author) => ({ // Use project
      name: author,
    })),
    openGraph: {
      title: project.title, // Use project
      description: project.description, // Use project
      type: "article",
      url: absoluteUrl(project.slug), // Use project
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: project.title, // Use project
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title, // Use project
      description: project.description, // Use project
      images: [ogUrl.toString()],
    },
  }
}

// Updated function signature and variable names
export async function generateStaticParams(): Promise<
  ProjectPageProps["params"][] 
> {
  return allProjects.map((project) => ({ // Use allProjects and project
    slug: project.slugAsParams.split("/"), // Use project
  }))
}

// Renamed component and updated props type
export default async function ProjectPage({ params }: ProjectPageProps) { 
  const project = await getProjectFromParams(params) // Use renamed function and variable

  if (!project) { // Use project
    notFound()
  }

  // Use project variable here
  const authors = project.authors.map((author) => 
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/projects" // Updated link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 size-4" />
        See all projects
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
        {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author) => {
              if (!author) {
                return null;
              }
              // Render author info even if Twitter is not available
              return (
                <div key={author.slug} className="flex items-center space-x-2 text-sm">
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      alt={author.title}
                      width={42}
                      height={42}
                      className="rounded-full border bg-white" // Added border for better visibility if avatar is white
                    />
                  )}
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.title}</p>
                    {author.twitter && ( // Conditionally render Twitter link if available
                      <Link
                        href={`https://twitter.com/${author.twitter}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground text-[12px] hover:underline"
                      >
                        @{author.twitter}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      {project.image && ( // Use project
        <Image
          src={project.image} // Use project
          alt={project.title} // Use project
          width={720}
          height={405}
          className="bg-muted my-8 rounded-md border transition-colors"
          priority
        />
      )}
      <Mdx code={project.body} /> 
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/projects" className={cn(buttonVariants({ variant: "ghost" }))}> 
          <Icons.chevronLeft className="mr-2 size-4" />
          See all projects 
        </Link>
      </div>
    </article>
  )
}
