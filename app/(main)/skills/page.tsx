import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header"
import { Shell } from "@/components/shell"

// You might want to create a dedicated component for skill categories or individual skills
// e.g., import SkillCard from "@/components/skill-card"

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <div className="mb-6">
      <h3 className="font-heading text-xl mb-3">{title}</h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((skill) => (
          <li key={skill} className="bg-card p-3 rounded-md shadow-sm text-sm text-muted-foreground text-center">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "PHP", "HTML", "CSS", "JavaScript", "TypeScript"],
    },
    {
      title: "Frontend",
      skills: ["React", "Vue", "Bootstrap"],
    },
    {
      title: "Backend",
      skills: ["Flask", "Express"],
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MySQL"],
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS", "Azure", "GCP", "Firebase", "Docker", "RabbitMQ", "Kafka", "Kubernetes", "Grafana", "Linux", "Nginx", "Git"],
    },
    {
      title: "Tools",
      skills: ["Figma", "Postman"],
    },
  ];

  return (
    <Shell variant="default"> {/* Changed variant to default */}
      <PageHeader>
        <PageHeaderHeading size="lg">Languages and Tools</PageHeaderHeading>
        <PageHeaderDescription size="lg">
          A showcase of the technologies I'm proficient with and use to build solutions.
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-8">
        {skillCategories.map((category) => (
          <SkillCategory key={category.title} title={category.title} skills={category.skills} />
        ))}
        {/* 
          Consider adding a note about skill icons if you plan to implement them later:
          <p className="text-center text-sm text-muted-foreground pt-4">
            Visual skill icons powered by <a href="https://skillicons.dev" target="_blank" rel="noopener noreferrer" className="underline">skillicons.dev</a>.
          </p> 
        */}
      </div>
    </Shell>
  )
}
