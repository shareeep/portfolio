import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header"
import { Shell } from "@/components/shell"

// You might want to create a dedicated component for your timeline
// e.g., import Timeline from "@/components/timeline"

export default function AboutPage() {
  return (
    <Shell variant="default"> {/* Changed variant to default */}
      <PageHeader>
        <PageHeaderHeading size="lg">Hi 👋, I'm Shariff</PageHeaderHeading>
        <PageHeaderDescription size="lg">
          A passionate software developer from Singapore, enthusiastic about building robust backend systems and architecting scalable solutions.
        </PageHeaderDescription>
      </PageHeader>
      <div className="prose dark:prose-invert max-w-none space-y-8"> {/* Added prose for better markdown-like styling */}
        <section id="current-focus" className="space-y-4">
          <h2 className="font-heading text-2xl">Current Focus & Learning</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Currently sharpening my <strong>Data Structures & Algorithms (DSA)</strong> and <strong>LeetCode</strong> skills for exciting future opportunities.</li>
            <li>Expanding my backend expertise by learning <strong>Java & Spring Boot</strong>, aiming towards <strong>Solutions Architect</strong> roles.</li>
          </ul>
        </section>

        <section id="collaboration" className="space-y-4">
          <h2 className="font-heading text-2xl">Collaboration & Interests</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Keen to collaborate on impactful projects, especially <strong>Hackathons for Social Good</strong> and innovative <strong>AI Projects</strong> leveraging the latest tech.</li>
            <li>I leverage the latest AI tools to assist the software development process. Currently, I am hooked onto <strong>Cline with Gemini 2.5Pro</strong> for AI assisted development in VSCode.</li>
            <li>Feel free to reach out about <strong>Docker, Microservices, AI Automations/Chatbots, Backend Development,</strong> or <strong>System Architecture</strong> – I love discussing these topics!</li>
          </ul>
        </section>
        
        <section id="fun-fact" className="space-y-4">
          <h2 className="font-heading text-2xl">Fun Fact ⚡</h2>
          <p>
            I was formerly from the advertising industry, where I crafted creative solutions to drive business value. Now, I'm building them hands-on! 🤝
          </p>
        </section>

        <section id="experience-timeline" className="space-y-4">
          <h2 className="font-heading text-2xl">My Journey (Experience Timeline)</h2>
          <div className="text-muted-foreground leading-relaxed">
            {/* Placeholder for Experience Timeline. 
                You can structure this as a list or use a custom timeline component.
                For each item, include: Role, Company, Dates, Key Responsibilities/Achievements.
            */}
            <div className="mb-6 p-4 border-l-4 border-primary">
              <h3 className="font-semibold text-lg">Your Most Recent Role</h3>
              <p className="text-sm text-muted-foreground/80">Company Name | City, Country | Month Year – Month Year (or Present)</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Responsibility/Achievement 1.</li>
                <li>Responsibility/Achievement 2.</li>
                <li>Responsibility/Achievement 3.</li>
              </ul>
            </div>
            <div className="mb-6 p-4 border-l-4 border-muted">
              <h3 className="font-semibold text-lg">Previous Role</h3>
              <p className="text-sm text-muted-foreground/80">Company Name | City, Country | Month Year – Month Year</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Responsibility/Achievement 1.</li>
                <li>Responsibility/Achievement 2.</li>
              </ul>
            </div>
            {/* Add more roles as needed */}
            <p className="italic">
              (More details to be filled in here for a comprehensive resume/timeline.)
            </p>
          </div>
        </section>

        <section id="philosophy-values" className="space-y-4">
          <h2 className="font-heading text-2xl">Philosophy & Values</h2>
          <p className="text-muted-foreground leading-relaxed">
            {/* Placeholder: Discuss your work philosophy, core values, what you look for in projects/teams. */}
            I believe in continuous learning, collaboration, and a user-centric approach to development and design. 
            I thrive in environments where I can contribute to meaningful projects and grow alongside talented individuals.
          </p>
        </section>
        
        {/* You can add more sections like "Education", "Interests", etc. */}
      </div>
    </Shell>
  )
}
