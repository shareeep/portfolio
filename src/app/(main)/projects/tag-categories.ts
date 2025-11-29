/**
 * Tag Categories for Project Filtering
 * 
 * This file defines the categorization system for project tags, organizing them into:
 * - scope: The domain or area of development (e.g., Frontend, Backend)
 * - tools: Specific technologies, frameworks or platforms used
 * - focus: The type of work or solution delivered
 */

/**
 * Tag categories with their associated tags
 */
export const tagCategories = {
  scope: [
    "Frontend", 
    "Backend", 
    "AI/ML", 
    "UI/UX", 
    "DevOps", 
    "Cloud",
    "Security",
    "Data Analysis",
    "Big Data",
    "Data Engineering",
    "NLP",
    "Generative AI",
    "Gen AI",
    "Computer Vision",
    "Project Management",
    "Agile",
    "Quality Assurance"
  ],
  tools: [
    "React", 
    "Vue.js", 
    "JavaScript", 
    "TypeScript",
    "Python",
    "Flask", 
    "ExpressJS",
    "Firebase",
    "PostgreSQL", 
    "NoSQL",
    "Kafka", 
    "Temporal",
    "Docker", 
    "Kubernetes",
    "Grafana", 
    "Prometheus",
    "AWS", 
    "Azure",
    "YOLO",
    "Figma",
    "Apache Spark",
    "PySpark",
    "AWS Glue",
    "AWS Athena",
    "AWS EMR",
    "YOLOv11",
    "Transformers",
    "BERT",
    "LoRA",
    "PyTorch",
    "Ollama",
    "FastAPI",
    "Next.js",
    "Jira",
    "GitHub Actions",
    "RAG"
  ],
  focus: [
    "Digital Transformation",
    "Solution Architecture",
    "Web Application",
    "Mobile Application",
    "Machine Learning",
    "Cloud Migration",
    "Design Thinking",
    "Prototyping",
    "DevSecOps",
    "Hate Speech",
    "Sarcasm Detection",
    "Multi-task Learning",
    "Fine-tuning",
    "Recommender Systems",
    "User Research",
    "Scrum",
    "CI/CD",
    "Feature Engineering",
    "Classification",
    "URL Analysis",
    "Privacy",
    "Healthcare"
  ]
};

/**
 * Map each tag to its corresponding category
 */
export const tagCategoryMap: Record<string, "scope" | "tools" | "focus"> = {
  // Scope/Domain
  "Frontend": "scope",
  "Backend": "scope",
  "AI/ML": "scope",
  "UI/UX": "scope",
  "DevOps": "scope",
  "Cloud": "scope",
  "Security": "scope",
  "Data Analysis": "scope",
  "Big Data": "scope",
  "Data Engineering": "scope",
  "NLP": "scope",
  "Generative AI": "scope",
  "Gen AI": "scope",
  "Computer Vision": "scope",
  "Project Management": "scope",
  "Agile": "scope",
  "Quality Assurance": "scope",
  
  // Tools & Technologies
  "React": "tools",
  "Vue.js": "tools",
  "JavaScript": "tools",
  "TypeScript": "tools",
  "Python": "tools",
  "Flask": "tools",
  "ExpressJS": "tools",
  "Firebase": "tools",
  "PostgreSQL": "tools",
  "NoSQL": "tools",
  "Kafka": "tools",
  "Temporal": "tools",
  "Docker": "tools", 
  "Kubernetes": "tools",
  "Grafana": "tools",
  "Prometheus": "tools",
  "AWS": "tools",
  "Azure": "tools",
  "YOLO": "tools",
  "YOLOv11": "tools",
  "Figma": "tools",
  "Clerk Auth": "tools",
  "Stripe API": "tools",
  "Saga Pattern": "tools",
  "ITIL": "tools",
  "IaaS": "tools",
  "Odoo": "tools",
  "Microservices": "tools",
  "Classification": "tools",
  "URL Analysis": "tools",
  "Feature Engineering": "tools",
  "Apache Spark": "tools",
  "PySpark": "tools",
  "AWS Glue": "tools",
  "AWS Athena": "tools",
  "AWS EMR": "tools",
  "Transformers": "tools",
  "BERT": "tools",
  "LoRA": "tools",
  "PyTorch": "tools",
  "Ollama": "tools",
  "FastAPI": "tools",
  "Next.js": "tools",
  "Jira": "tools",
  "GitHub Actions": "tools",
  "RAG": "tools",
  
  // Work Focus
  "Digital Transformation": "focus",
  "Solution Architecture": "focus",
  "Web Application": "focus",
  "Mobile Application": "focus",
  "Machine Learning": "focus",
  "Cloud Migration": "focus",
  "Design Thinking": "focus",
  "Prototyping": "focus",
  "DevSecOps": "focus",
  "AutoRec": "focus",
  "UX Design": "focus",
  "Cybersecurity": "focus",
  "Hate Speech": "focus",
  "Sarcasm Detection": "focus",
  "Multi-task Learning": "focus",
  "Fine-tuning": "focus",
  "Recommender Systems": "focus",
  "User Research": "focus",
  "Scrum": "focus",
  "CI/CD": "focus",
  "Privacy": "focus",
  "Healthcare": "focus"
};

/**
 * Get the category for a specific tag
 * @param tag The tag to find the category for
 * @returns The category or "tools" as default if not found
 */
export function getTagCategory(tag: string): "scope" | "tools" | "focus" {
  return tagCategoryMap[tag] || "tools";
}

/**
 * Group tags by their categories
 * @param tags Array of tags to categorize
 * @returns Object with tags grouped by category
 */
export function categorizeProjectTags(tags: string[]) {
  const categorized = {
    scope: [] as string[],
    tools: [] as string[],
    focus: [] as string[]
  };
  
  tags.forEach(tag => {
    const category = getTagCategory(tag);
    categorized[category].push(tag);
  });
  
  return categorized;
}

/**
 * Get representative tags from each category (for homepage display)
 * @param tags Array of all tags for a project
 * @returns Object with one representative tag from each category
 */
export function getRepresentativeTags(tags: string[]) {
  const categorized = categorizeProjectTags(tags);
  
  return {
    scope: categorized.scope[0] || null,
    tools: categorized.tools[0] || null,
    focus: categorized.focus[0] || null
  };
}