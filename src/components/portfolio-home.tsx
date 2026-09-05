import Image from "next/image"
import Link from "next/link"
import { experiences, profile } from "@/content/profile"
import type { Project } from "#site/content"

import { siteConfig } from "@/config/site"
import {
  CompactProjectList,
  FeaturedProjects,
} from "@/components/project-lists"

function ProfileLinks() {
  return (
    <nav className="profile-links" aria-label="Contact and profile links">
      <a href={`mailto:${siteConfig.email}`}>Email</a>
      <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <a href={siteConfig.links.resume}>Resume</a>
    </nav>
  )
}

export function PortfolioHome({
  featuredProjects,
  olderProjects,
}: {
  featuredProjects: Project[]
  olderProjects: Project[]
}) {
  return (
    <>
      <section id="about" className="profile-section page-section">
        <div className="identity-heading">
          <Image
            src="/images/avatars/shariff-rashid.png"
            alt={`Portrait of ${siteConfig.name}`}
            width={64}
            height={64}
            priority
          />
          <div>
            <h1>{profile.greeting}</h1>
            <p>{profile.headline}</p>
          </div>
        </div>
        <p>{profile.introduction}</p>
        <p>{profile.focus}</p>
        <ProfileLinks />
        <div className="tablet-status" aria-label="Availability">
          <span>
            <span className="status-dot" aria-hidden="true" />
            {profile.availability}
          </span>
          <span>{siteConfig.location} · SGT</span>
        </div>
      </section>

      <section id="experience" className="page-section">
        <h2>Work experience</h2>
        <div className="experience-list">
          {experiences.map((experience) => (
            <details key={experience.organisation}>
              <summary>
                <Image src={experience.logo} alt="" width={36} height={36} />
                <span className="experience-heading">
                  <strong>{experience.organisation}</strong>
                  <span>{experience.role}</span>
                  <small>{experience.dates}</small>
                </span>
              </summary>
              <div className="experience-details">
                <p>{experience.team}</p>
                <ul>
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="projects" className="page-section">
        <h2>Featured projects</h2>
        <FeaturedProjects projects={featuredProjects} />

        <h3 className="older-heading">Older projects</h3>
        <CompactProjectList projects={olderProjects} />
      </section>

      <section id="playground" className="page-section playground-section">
        <div>
          <h2>Playground</h2>
          <p>Small experiments kept separate from the résumé flow.</p>
        </div>
        <div className="playground-links">
          <Link href="/capoo">Capoo ↗</Link>
          <Link href="/wordle">Wordle ↗</Link>
        </div>
      </section>
    </>
  )
}
