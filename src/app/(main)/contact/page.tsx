import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header"
import { Shell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site" // To get GitHub link

// You might want to import icons for LinkedIn, Email, GitHub
// import { Icons } from "@/components/icons" 

export default function ContactPage() {
  // Replace with your actual LinkedIn profile URL and email address
  const linkedInUrl = "https://www.linkedin.com/in/shariffrashid"; // Added semicolon
  const emailAddress = "muhd.shariff01@gmail.com"; // Added semicolon

  return (
    <Shell variant="default"> {/* Changed variant to default */}
      {/* Removed text-center from PageHeader, adding text-left, further reducing bottom padding */}
      <PageHeader className="pb-2 text-left lg:pb-4"> 
        <PageHeaderHeading size="lg">Get In Touch</PageHeaderHeading>
        <PageHeaderDescription size="lg">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
        </PageHeaderDescription>
      </PageHeader>
      {/* Ensured no centering classes on this div, removed mx-auto, further reduced top padding to pt-0 */}
      <div className="max-w-2xl space-y-8 pb-8 pt-0"> 
        <section id="contact-links" className="w-full space-y-6"> {/* Keep text-center removed */}
          {/* Removed centering from button group div */}
          <div className="flex flex-col items-start gap-4 sm:flex-row"> 
            {/* LinkedIn */}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
            >
              {/* <Icons.linkedin className="mr-2 h-5 w-5" /> Placeholder for icon */}
              LinkedIn
            </a>

            {/* GitHub */}
            <a
              href={siteConfig.links.github} // Using the one from siteConfig
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
            >
              {/* <Icons.gitHub className="mr-2 h-5 w-5" /> Placeholder for icon */}
              GitHub
            </a>
            
            {/* Email */}
            <a
              href={`mailto:${emailAddress}`}
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full sm:w-auto")}
            >
              {/* <Icons.mail className="mr-2 h-5 w-5" /> Placeholder for icon */}
              Send an Email
            </a>
          </div>
          {/* Ensured text-center is removed from this paragraph */}
          <p className="text-muted-foreground text-sm"> 
            Feel free to reach out via any of these platforms. I look forward to hearing from you!
          </p>
        </section>

        {/* Optional: You could add a simple contact form here if desired */}
        {/* 
        <section id="contact-form" className="space-y-4">
          <h2 className="font-heading text-2xl text-center">Or Send a Message Directly</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</label>
              <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-input bg-background p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
              <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border-input bg-background p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-input bg-background p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" placeholder="Your message..."></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
                Send Message
              </button>
            </div>
          </form>
        </section>
        */}
      </div>
    </Shell>
  )
}
