import Link from "next/link"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio" // Added import
import { projects } from "#site/content"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/utils" // Assuming a formatDate utility exists
import { Icons } from "@/components/icons" // Import Icons

export default async function IndexPage() {
  const sortedPublishedProjects = projects
    .filter((project) => project.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <>
    {/* Updated section background to use theme variable */}
    <section className="bg-background py-16">
      <div className="container mx-auto grid grid-cols-1
                      gap-6
                      sm:grid-cols-2
                      lg:grid-cols-4
                      xl:grid-cols-6">
        {/* 1) Main Intro: spans 4 on lg, 4 on xl. XS: icon centered above text. */}
        {/* Updated card background and text colors */}
        <div className="bg-card col-span-1 flex flex-col 
                        justify-between rounded-2xl p-8 text-center shadow-md sm:col-span-2 sm:text-left lg:col-span-4 xl:col-span-4">
          <div className="mt-4 flex flex-col items-center space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <Image
              src="/images/avatars/shariff-rashid.png"
              alt="Shariff Rashid"
              width={200}
              height={200}
              className="border-primary mx-auto rounded-full border-4 sm:mx-0"
            />
            <h1 className="font-heading text-foreground text-4xl lg:text-5xl">
              Hi 👋, I’m <span className="text-primary">Shariff</span>
            </h1>
          </div>

          <p className="text-muted-foreground mt-4 text-lg">
            I enjoy building robust systems and architecting solutions.
          </p>
        </div>

        {/* 2) Currently Sharpening: Adjusted col-spans & centered content */}
        {/* Updated card background and text colors */}
        <div className="bg-card flex flex-col items-center justify-center rounded-2xl 
                        p-6 text-center shadow-md sm:col-span-1 lg:col-span-2 xl:col-span-2">
          <Icons.laptop className="text-primary mb-4 size-12" /> {/* Increased icon size */}
          <h3 className="font-heading text-foreground mb-2 text-2xl">Current focus</h3>
          <ul className="text-muted-foreground space-y-1 text-center sm:text-left">
            <li className="flex items-center">
              <Icons.brain className="text-primary/80 mr-2 size-5" /> {/* Added Icon */}
              DSA & LeetCode challenges
            </li>
            <li className="flex items-center">
              <Icons.server className="text-primary/80 mr-2 size-5" /> {/* Added Icon */}
              Java & SpringBoot
            </li>
          </ul>
        </div>

        {/* 3) GitHub */}
        {/* Updated card background, text, icon, and button colors */}
        <div className="bg-card rounded-2xl p-6 text-center shadow-md lg:col-span-1 xl:col-span-3">
          <Icons.gitHub className="text-primary mx-auto mb-3 size-10" />
          <h3 className="text-foreground mb-1 text-xl font-semibold">My GitHub</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            {siteConfig.links.github.replace('https://', '')}
          </p>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            )}
          >
            Explore Repos
          </Link>
        </div>

        {/* 4) Fun Fact */}
        {/* Updated card background, text, and icon colors */}
        <div className="bg-card rounded-2xl p-6 text-center shadow-md lg:col-span-1 xl:col-span-3">
          <Icons.pizza className="text-primary mx-auto mb-3 size-10" />
          <h3 className="text-foreground mb-2 text-xl font-semibold">Fun Fact!</h3>
          <p className="text-muted-foreground mb-4 text-sm"> {/* Added mb-4 for spacing */}
            From advertising copy to code—now I get to build the solutions I pitch.
          </p>
          <Link
            href="/projects" // Changed href to projects page
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            )}
          >
            Explore Projects {/* Changed button text */}
          </Link>
        </div>

        {/* 6) Call To Action */}
        {/* Updated card background, text, and button colors */}
        <div className="bg-card flex flex-col justify-center rounded-2xl p-8 shadow-md lg:col-span-4 xl:col-span-6">
          <h3 className="font-heading text-foreground mb-4 text-2xl">Let’s Build Something Amazing!</h3>
          <p className="text-muted-foreground mb-6">
            Got an idea or a challenge? I’m always excited to connect and explore new possibilities.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({variant: "default", size: "lg"}), "bg-primary text-primary-foreground hover:bg-primary/90")}
          >
            Reach Out
          </Link>
        </div>
      </div>
    </section>

      {/* Updated section background */}
      <section
        id="projects"
        className="bg-background container space-y-8 py-8 md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-foreground text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            My Projects
          </h2>
          <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
            Here are some of the projects I&apos;ve worked on. Click on them to learn more.
          </p>
        </div>

        {sortedPublishedProjects?.length > 0 ? (
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl lg:grid-cols-3">
            {sortedPublishedProjects.map((project) => (
              <article
                key={project.slug}
                className="bg-background group relative flex flex-col space-y-2 overflow-hidden rounded-lg border p-4"
              >
                {project.image && (
                  <AspectRatio ratio={804 / 452} className="bg-muted overflow-hidden rounded-md border">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      priority={false} // Set to true for LCP images if applicable
                    />
                  </AspectRatio>
                )}
                <h3 className="font-heading text-xl">{project.title}</h3>
                {project.description && (
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                )}
                <p className="text-muted-foreground text-sm">
                  {formatDate(project.date)} 
                </p>
                <Link href={`/projects/${project.slugAsParams}`} className="absolute inset-0">
                  <span className="sr-only">View Project</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground mx-auto max-w-[58rem] text-center">
            No projects published yet. Check back soon!
          </p>
        )}
      </section>
    </>
  )
}
