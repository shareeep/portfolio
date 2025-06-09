"use client"

import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@/components/ui/aspect-ratio" // Added import
import { compareDesc } from "date-fns"
import { projects as allProjects } from "#site/content" // Updated import
import { useState, useEffect } from "react"

import { formatDate } from "@/lib/utils"
import { siteConfig } from "@/config/site" // Added import
import { Badge } from "@/components/ui/badge" // Import Badge for tags
import { Button } from "@/components/ui/button" // Import Button for clear filters
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  tagCategories,
  tagCategoryMap,
  getTagCategory,
  categorizeProjectTags
} from "./tag-categories"

// We need to move metadata to a separate file since we're using client components
// Created via static metadata.ts file (will create it after this)

export default function ProjectsPage() {
  // State for categorized tags
  const [categorizedTags, setCategorizedTags] = useState<{
    scope: string[];
    tools: string[];
    focus: string[];
  }>({
    scope: [],
    tools: [],
    focus: []
  });
  
  // State for selected tags by category
  const [selectedTags, setSelectedTags] = useState<{
    scope: string[];
    tools: string[];
    focus: string[];
  }>({
    scope: [],
    tools: [],
    focus: []
  });
  
  // State for active filter tab
  const [activeTab, setActiveTab] = useState<"scope" | "tools" | "focus">("scope");
  
  // State for showing all tags in each category
  const [showAllTags, setShowAllTags] = useState<{
    scope: boolean;
    tools: boolean;
    focus: boolean;
  }>({
    scope: false,
    tools: false,
    focus: false
  });
  
  // State for filtered projects
  const [filteredProjects, setFilteredProjects] = useState<typeof publishedProjects>([]);

  // Get all published projects and sort them by date
  const publishedProjects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    });

  // Extract and categorize all unique tags from projects
  useEffect(() => {
    const uniqueTags = {
      scope: new Set<string>(),
      tools: new Set<string>(),
      focus: new Set<string>()
    };
    
    publishedProjects.forEach(project => {
      if (project.tags && project.tags.length > 0) {
        project.tags.forEach(tag => {
          const category = getTagCategory(tag);
          uniqueTags[category].add(tag);
        });
      }
    });
    
    // Set initial categorized tags and filtered projects
    setCategorizedTags({
      scope: Array.from(uniqueTags.scope).sort(),
      tools: Array.from(uniqueTags.tools).sort(),
      focus: Array.from(uniqueTags.focus).sort()
    });
  }, [publishedProjects]);

  // Set initial filtered projects only once
  useEffect(() => {
    setFilteredProjects(publishedProjects);
  }, [publishedProjects]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    const category = getTagCategory(tag);
    
    setSelectedTags(prev => {
      // Create a copy of the previous state
      const newSelected = { ...prev };
      
      // If tag is already selected, remove it
      if (newSelected[category].includes(tag)) {
        newSelected[category] = newSelected[category].filter(t => t !== tag);
      } else {
        // Otherwise add it
        newSelected[category] = [...newSelected[category], tag];
      }
      
      return newSelected;
    });
  };

  // Toggle showing all tags for a category
  const toggleShowAllTags = (category: "scope" | "tools" | "focus") => {
    setShowAllTags(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Clear all selected tags
  const clearTags = () => {
    setSelectedTags({
      scope: [],
      tools: [],
      focus: []
    });
  };
  
  // Clear selected tags for a specific category
  const clearCategoryTags = (category: "scope" | "tools" | "focus") => {
    setSelectedTags(prev => ({
      ...prev,
      [category]: []
    }));
  };

  // Filter projects based on selected tags
  useEffect(() => {
    const allSelectedTags = [
      ...selectedTags.scope,
      ...selectedTags.tools,
      ...selectedTags.focus
    ];
    
    if (allSelectedTags.length === 0) {
      // If no tags selected, show all projects
      setFilteredProjects(publishedProjects);
    } else {
      // Filter projects that have ALL selected tags (AND logic)
      const filtered = publishedProjects.filter(project => {
        if (!project.tags) return false;
        return allSelectedTags.every(tag => project.tags?.includes(tag) || false);
      });
      setFilteredProjects(filtered);
    }
  }, [selectedTags, publishedProjects]);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-heading inline-block text-4xl tracking-tight lg:text-5xl">
            Projects
          </h1>
          <p className="text-muted-foreground text-xl">
            Here are some of the projects I have worked on.
          </p>
        </div>
      </div>
      
      {/* Tag filter section */}
      {(categorizedTags.scope.length > 0 || categorizedTags.tools.length > 0 || categorizedTags.focus.length > 0) && (
        <div className="my-6">
          <h2 className="mb-3 text-xl font-bold">Filter by:</h2>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "scope" | "tools" | "focus")}>
            {/* Responsive TabsList that stacks vertically on very small screens */}
            <TabsList className="mb-4 flex w-full flex-wrap max-[400px]:flex-col max-[400px]:gap-1 md:flex-nowrap">
              <TabsTrigger
                value="scope"
                className="min-w-[80px] flex-1 text-sm text-blue-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 sm:text-base dark:text-blue-300 dark:data-[state=active]:bg-blue-900/40 dark:data-[state=active]:text-blue-50"
              >
                Domain
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="min-w-[80px] flex-1 text-sm text-green-700 data-[state=active]:bg-green-100 data-[state=active]:text-green-900 sm:text-base dark:text-green-300 dark:data-[state=active]:bg-green-900/40 dark:data-[state=active]:text-green-50"
              >
                Tech
              </TabsTrigger>
              <TabsTrigger
                value="focus"
                className="min-w-[80px] flex-1 text-sm text-purple-700 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 sm:text-base dark:text-purple-300 dark:data-[state=active]:bg-purple-900/40 dark:data-[state=active]:text-purple-50"
              >
                Focus
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="scope" className="mb-3">
              <div className="mb-3 flex flex-wrap gap-1 sm:gap-2">
                {(showAllTags.scope ? categorizedTags.scope : categorizedTags.scope.slice(0, 10)).map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.scope.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm ${selectedTags.scope.includes(tag) ? "bg-blue-600/40 text-blue-900 dark:text-blue-50" : "border-blue-200 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30 hover:dark:text-blue-300"}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                {categorizedTags.scope.length > 10 && (
                  <Badge
                    variant="outline"
                    className="cursor-pointer border-blue-200 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100 sm:px-3 sm:py-1 sm:text-sm dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30"
                    onClick={() => toggleShowAllTags("scope")}
                  >
                    {showAllTags.scope ? "Show less ↑" : `+${categorizedTags.scope.length - 10} more`}
                  </Badge>
                )}
              </div>
              {selectedTags.scope.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => clearCategoryTags("scope")} className="mt-2">
                  Clear scope filters
                </Button>
              )}
            </TabsContent>
            
            <TabsContent value="tools" className="mb-3">
              <div className="mb-3 flex flex-wrap gap-1 sm:gap-2">
                {(showAllTags.tools ? categorizedTags.tools : categorizedTags.tools.slice(0, 10)).map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.tools.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm ${selectedTags.tools.includes(tag) ? "bg-green-600/40 text-green-900 dark:text-green-50" : "border-green-200 text-green-600 hover:bg-green-100 hover:text-green-700 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30 hover:dark:text-green-300"}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                {categorizedTags.tools.length > 10 && (
                  <Badge
                    variant="outline"
                    className="cursor-pointer border-green-200 px-2 py-1 text-xs text-green-600 hover:bg-green-100 sm:px-3 sm:py-1 sm:text-sm dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30"
                    onClick={() => toggleShowAllTags("tools")}
                  >
                    {showAllTags.tools ? "Show less ↑" : `+${categorizedTags.tools.length - 10} more`}
                  </Badge>
                )}
              </div>
              {selectedTags.tools.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => clearCategoryTags("tools")} className="mt-2">
                  Clear tools filters
                </Button>
              )}
            </TabsContent>
            
            <TabsContent value="focus" className="mb-3">
              <div className="mb-3 flex flex-wrap gap-1 sm:gap-2">
                {(showAllTags.focus ? categorizedTags.focus : categorizedTags.focus.slice(0, 10)).map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.focus.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm ${selectedTags.focus.includes(tag) ? "bg-purple-600/40 text-purple-900 dark:text-purple-50" : "border-purple-200 text-purple-600 hover:bg-purple-100 hover:text-purple-700 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/30 hover:dark:text-purple-300"}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                {categorizedTags.focus.length > 10 && (
                  <Badge
                    variant="outline"
                    className="cursor-pointer border-purple-200 px-2 py-1 text-xs text-purple-600 hover:bg-purple-100 sm:px-3 sm:py-1 sm:text-sm dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/30"
                    onClick={() => toggleShowAllTags("focus")}
                  >
                    {showAllTags.focus ? "Show less ↑" : `+${categorizedTags.focus.length - 10} more`}
                  </Badge>
                )}
              </div>
              {selectedTags.focus.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => clearCategoryTags("focus")} className="mt-2">
                  Clear focus filters
                </Button>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Active filters section */}
          {(selectedTags.scope.length > 0 || selectedTags.tools.length > 0 || selectedTags.focus.length > 0) && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium">Active filters:</h3>
                <Button variant="ghost" size="sm" onClick={clearTags}>
                  Clear all filters
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedTags.scope.map(tag => (
                  <Badge key={tag} variant="default" className="flex cursor-pointer items-center gap-1 bg-blue-600/40 text-xs text-blue-900 sm:text-sm dark:text-blue-50">
                    {tag} <span onClick={() => toggleTag(tag)} className="ml-1 text-xs font-bold">×</span>
                  </Badge>
                ))}
                {selectedTags.tools.map(tag => (
                  <Badge key={tag} variant="default" className="flex cursor-pointer items-center gap-1 bg-green-600/40 text-xs text-green-900 sm:text-sm dark:text-green-50">
                    {tag} <span onClick={() => toggleTag(tag)} className="ml-1 text-xs font-bold">×</span>
                  </Badge>
                ))}
                {selectedTags.focus.map(tag => (
                  <Badge key={tag} variant="default" className="flex cursor-pointer items-center gap-1 bg-purple-600/40 text-xs text-purple-900 sm:text-sm dark:text-purple-50">
                    {tag} <span onClick={() => toggleTag(tag)} className="ml-1 text-xs font-bold">×</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <hr className="my-6" />
      
      {filteredProjects.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <article // This might be replaced by <ProjectItem key={...} project={...} />
              key={project.slug} // Renamed loop variable
              className="group relative flex flex-col space-y-2"
            >
              {project.image && ( // Renamed loop variable
                <AspectRatio ratio={804 / 452} className="bg-muted overflow-hidden rounded-md border">
                  <Image
                    src={project.image} // Renamed loop variable
                    alt={project.title} // Renamed loop variable
                    fill
                    className="object-cover transition-colors" // Added object-cover
                    priority={index <= 1}
                  />
                </AspectRatio>
              )}
              <h2 className="text-2xl font-extrabold">{project.title}</h2>
              {project.tags && project.tags.length > 0 && (
                <div className="my-2 flex flex-wrap gap-1">
                  {project.tags.map((tag) => {
                    const category = getTagCategory(tag);
                    const colorClass =
                      category === "scope" ? "bg-blue-600/40 text-blue-900 dark:text-blue-50" :
                      category === "tools" ? "bg-green-600/40 text-green-900 dark:text-green-50" :
                      "bg-purple-600/40 text-purple-900 dark:text-purple-50";
                    
                    return (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className={`text-xs ${colorClass}`}
                      >
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
              )}
              {project.description && ( // Renamed loop variable
                <p className="text-muted-foreground">{project.description}</p> // Renamed loop variable
              )}
              {project.date && ( // Renamed loop variable
                <p className="text-muted-foreground text-sm">
                  {formatDate(project.date)} 
                </p>
              )}
              <Link href={project.slug} className="absolute inset-0"> 
                <span className="sr-only">View Project</span> 
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No projects published.</p> // Updated empty state text
      )}
    </div>
  )
}
