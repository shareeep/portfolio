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
      {/* New Bento Grid Hero Section */}
      <section className="container mx-auto py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {/* Box 1: Main Intro */}
          <div className="bg-card flex min-h-56 flex-col items-start justify-center rounded-xl p-6 text-left shadow-lg sm:min-h-64 md:col-span-2 lg:col-span-2">
            {/* You'll need to add your avatar image to public/images/avatars/shariff-rashid.png or update path */}
            <Image src="/images/avatars/shariff-rashid.png" alt="Shariff Rashid" width={80} height={80} className="border-primary mb-4 rounded-full border-2" />
            <h1 className="font-heading mb-2 text-3xl sm:text-4xl md:text-5xl">
              Hi 👋, I&apos;m Shariff
            </h1>
            <h3 className="text-muted-foreground mb-3 text-xl sm:text-2xl">
              A passionate software developer from Singapore
            </h3>
            <p className="text-muted-foreground text-base sm:text-lg">
              I&apos;m enthusiastic about building robust backend systems and architecting scalable solutions.
            </p>
          </div>

          {/* Box 2: GitHub Link */}
          <div className="bg-card flex min-h-56 flex-col items-center justify-center rounded-xl p-6 text-center shadow-lg sm:min-h-64">
            <Icons.gitHub className="text-foreground mb-3 size-8 md:size-12" /> {/* Using the GitHub icon */}
            <h3 className="mb-1 text-lg font-semibold">My GitHub</h3>
            <p className="text-muted-foreground/80 mb-3 text-xs">{siteConfig.links.github.replace("https://", "")}</p>
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Explore My Repos
            </Link>
          </div>

          {/* Box 3: Currently Learning */}
          <div className="bg-card flex min-h-56 flex-col items-center justify-center rounded-xl p-6 text-center shadow-lg sm:min-h-64">
            <Icons.laptop className="text-foreground mb-3 size-8 md:size-12" /> {/* Using an icon */}
            <h3 className="mb-1 text-lg font-semibold">Currently Sharpening</h3>
            <p className="text-muted-foreground text-sm">
              Data Structures & Algorithms (DSA) and LeetCode skills.
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Learning Java & Spring Boot for Solutions Architect roles.
            </p>
          </div>
          
          {/* Box 4: Collaboration Interests */}
          <div className="bg-card flex min-h-56 flex-col justify-start rounded-xl p-6 text-left shadow-lg sm:min-h-64 md:col-span-2 lg:col-span-2">
            <h3 className="font-heading mb-3 text-xl sm:text-2xl">Collaboration Interests</h3>
            <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
              <li>Impactful projects, especially Hackathons for Social Good.</li>
              <li>Innovative AI Projects leveraging the latest tech.</li>
              <li>Open to discussing Docker, Microservices, AI Automations/Chatbots, Backend Development, or System Architecture.</li>
            </ul>
          </div>

          {/* Box 5: Fun Fact */}
          <div className="bg-card flex min-h-56 flex-col items-center justify-center rounded-xl p-6 text-center shadow-lg sm:min-h-64">
             <Icons.pizza className="text-foreground mb-3 size-8 md:size-12" /> {/* Using a fun icon */}
            <h3 className="mb-1 text-lg font-semibold">Fun Fact! ⚡</h3>
            <p className="text-muted-foreground text-sm">
              Formerly from the advertising industry, crafting creative solutions. Now, building them hands-on! 🤝
            </p>
          </div>

           {/* Box 6: Call to Action / Contact */}
           <div className="bg-card flex min-h-48 flex-col items-center justify-center rounded-xl p-6 text-center shadow-lg md:col-span-3 md:min-h-64 lg:col-span-4">
            <h3 className="font-heading mb-3 text-2xl sm:text-3xl">Let&apos;s Build Something Amazing!</h3>
            <p className="text-muted-foreground mb-4 max-w-xl sm:text-lg">
              Got an idea or a challenge? I&apos;m always excited to connect and explore new possibilities.
            </p>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
              Reach Out
            </Link>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="container space-y-8 bg-slate-50 py-8 md:py-12 lg:py-24 dark:bg-transparent"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
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

      <section id="contact" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
            Have a question or want to work together? Feel free to reach out.
            You can find me on GitHub (link in the hero section) or send an email.
          </p>
          {/* You can add a contact form or email link here */}
        </div>
      </section>
    </>
  )
}
