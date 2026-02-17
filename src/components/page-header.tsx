import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function PageHeader({ className, children, ...props }: PageHeaderProps) {
  return (
    <section className={cn("flex flex-col gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20", className)} {...props}>
      {children}
    </section>
  )
}

interface PageHeaderHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "default" | "sm" | "lg" // Optional size prop
}

function PageHeaderHeading({ className, size = "default", children, ...props }: PageHeaderHeadingProps) {
  return (
    <h1
      className={cn(
        "font-bold leading-tight tracking-tighter lg:leading-[1.1]",
        size === "default" && "text-3xl md:text-4xl lg:text-5xl",
        size === "sm" && "text-2xl md:text-3xl lg:text-4xl",
        size === "lg" && "text-4xl md:text-5xl lg:text-6xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

interface PageHeaderDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "default" | "sm" | "lg" // Optional size prop
}

function PageHeaderDescription({ className, size = "default", children, ...props }: PageHeaderDescriptionProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground",
        size === "default" && "max-w-[750px] text-lg sm:text-xl",
        size === "sm" && "max-w-[650px] text-base sm:text-lg",
        size === "lg" && "max-w-[850px] text-xl sm:text-2xl",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

// The original DocsPageHeader can be kept if needed elsewhere,
// or refactored to use these new components, or removed if redundant.
// For now, I'll comment it out to avoid conflicts if it's not immediately used.
/*
interface DocsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
}

export function DocsPageHeader({
  heading,
  text,
  className,
  ...props
}: DocsPageHeaderProps) {
  return (
    <>
      <div className={cn("space-y-4", className)} {...props}>
        <h1 className="font-heading inline-block text-4xl lg:text-5xl">
          {heading}
        </h1>
        {text && <p className="text-muted-foreground text-xl">{text}</p>}
      </div>
      <hr className="my-4" />
    </>
  )
}
*/

export { PageHeader, PageHeaderHeading, PageHeaderDescription }
