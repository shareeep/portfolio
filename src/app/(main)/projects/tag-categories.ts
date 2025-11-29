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
    "Solution Architecture",
    "Cloud Migration",
    "DevSecOps",
    "CI/CD",
    "Scrum",
    "Design Thinking",
    "User Research",
    "Prototyping",
    "Fine-tuning",
    "RAG",
    "Multi-task Learning",
    "Recommender Systems",
    "Feature Engineering",
    "Classification",
    "Microservices",
    "Data Pipelines",
    "Predictive Modelling",
    "NER",
    "Prompt Engineering",
    "Serverless"
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
  "Figma": "tools",
  "Clerk Auth": "tools",
  "Stripe API": "tools",
  "Saga Pattern": "tools",
  "ITIL": "tools",
  "IaaS": "tools",
  "Odoo": "tools",
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
  "LLM": "tools",
  
  // Work Focus (Technical Methodologies & Architecture)
  "Solution Architecture": "focus",
  "Cloud Migration": "focus",
  "DevSecOps": "focus",
  "CI/CD": "focus",
  "Scrum": "focus",
  "Design Thinking": "focus",
  "User Research": "focus",
  "Prototyping": "focus",
  "Fine-tuning": "focus",
  "RAG": "focus",
  "Multi-task Learning": "focus",
  "Recommender Systems": "focus",
  "Feature Engineering": "focus",
  "Classification": "focus",
  "Microservices": "focus",
  "Data Pipelines": "focus",
  "Predictive Modelling": "focus",
  "NER": "focus",
  "Prompt Engineering": "focus",
  "Serverless": "focus"
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

/**
 * Sort tags by category priority: Scope (Blue) -> Tools (Green) -> Focus (Purple)
 * @param tags Array of tags to sort
 * @returns Sorted array of tags
 */
export function sortTags(tags: string[]): string[] {
  const categoryPriority = {
    scope: 0,
    tools: 1,
    focus: 2
  };

  return [...tags].sort((a, b) => {
    const catA = getTagCategory(a);
    const catB = getTagCategory(b);
    
    // First sort by category priority
    if (categoryPriority[catA] !== categoryPriority[catB]) {
      return categoryPriority[catA] - categoryPriority[catB];
    }
    
    // Then sort alphabetically within category
    return a.localeCompare(b);
  });
}