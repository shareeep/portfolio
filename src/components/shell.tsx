import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const shellVariants = cva("grid items-start gap-8", {
  variants: {
    variant: {
      default: "container",
      sidebar: "container md:grid-cols-[220px_1fr] lg:md:grid-cols-[240px_1fr]", // Example sidebar variant
      centered: "container flex h-[calc(100vh-var(--header-height))] max-w-md flex-col justify-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {}

export function Shell({
  className,
  variant,
  children,
  ...props
}: ShellProps) {
  return (
    <div className={cn(shellVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}
