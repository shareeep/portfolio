import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/page-header"
import { Shell } from "@/components/shell"
import {
  SiPython, SiPhp, SiHtml5, SiCss3, SiJavascript, SiTypescript,
  SiReact, SiVuedotjs, SiBootstrap, SiFlask, SiExpress,
  SiPostgresql, SiMysql, SiAmazon, SiGooglecloud, // Removed SiAzuredevops
  SiFirebase, SiDocker, SiRabbitmq, SiApachekafka, SiKubernetes,
  SiGrafana, SiLinux, SiNginx, SiGit, SiFigma, SiPostman
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc"; // Added VscAzure import
import { IconType } from "react-icons";

// Component for individual skill with icon
interface SkillItemProps {
  name: string;
  icon?: IconType; // Icon component from react-icons
}

function SkillItem({ name, icon: Icon }: SkillItemProps) {
  return (
    <li className="bg-card text-muted-foreground flex flex-col items-center justify-center rounded-md p-4 text-center text-sm shadow-sm">
      {Icon && <Icon className="mb-2 size-8" />} {/* Increased icon size and added margin */}
      <span>{name}</span>
    </li>
  );
}

interface SkillCategoryProps {
  title: string;
  skills: Array<{ name: string; icon?: IconType }>;
}

function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <div className="mb-8"> {/* Increased bottom margin */}
      <h3 className="font-heading mb-4 text-2xl">{title}</h3> {/* Increased font size and bottom margin */}
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"> {/* Adjusted grid and gap */}
        {skills.map((skill) => (
          <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
        ))}
      </ul>
    </div>
  )
}

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", icon: SiPython }, { name: "PHP", icon: SiPhp },
        { name: "HTML", icon: SiHtml5 }, { name: "CSS", icon: SiCss3 },
        { name: "JavaScript", icon: SiJavascript }, { name: "TypeScript", icon: SiTypescript },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: SiReact }, { name: "Vue", icon: SiVuedotjs },
        { name: "Bootstrap", icon: SiBootstrap },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Flask", icon: SiFlask }, { name: "Express", icon: SiExpress },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", icon: SiPostgresql }, { name: "MySQL", icon: SiMysql },
      ],
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", icon: SiAmazon }, { name: "Azure", icon: VscAzure }, // Changed to VscAzure
        { name: "GCP", icon: SiGooglecloud }, { name: "Firebase", icon: SiFirebase },
        { name: "Docker", icon: SiDocker }, { name: "RabbitMQ", icon: SiRabbitmq },
        { name: "Kafka", icon: SiApachekafka }, { name: "Kubernetes", icon: SiKubernetes },
        { name: "Grafana", icon: SiGrafana }, { name: "Linux", icon: SiLinux },
        { name: "Nginx", icon: SiNginx }, { name: "Git", icon: SiGit },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Figma", icon: SiFigma }, { name: "Postman", icon: SiPostman },
      ],
    },
  ];

  return (
    <Shell variant="default">
      <PageHeader>
        <PageHeaderHeading size="lg">Languages and Tools</PageHeaderHeading>
        <PageHeaderDescription size="lg">
          A showcase of the technologies I&apos;m proficient with and use to build solutions.
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-6"> {/* Adjusted space-y */}
        {skillCategories.map((category) => (
          <SkillCategory key={category.title} title={category.title} skills={category.skills} />
        ))}
      </div>
    </Shell>
  )
}
