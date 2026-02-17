"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { File, Folder } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type TreeNode = {
  id: string
  name: string
  tooltip?: string
  type: "folder" | "file"
  children?: TreeNode[]
  onSelect?: () => void
  defaultExpanded?: boolean
  isActive?: boolean
}

const demoData: TreeNode[] = [
  {
    id: "1",
    name: "src",
    tooltip: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        tooltip: "components",
        type: "folder",
        children: [
          {
            id: "3",
            name: "Button.tsx",
            tooltip: "Button's tooltip",
            type: "file",
          },
          {
            id: "4",
            name: "Card.tsx",
            tooltip: "Card's tooltip",
            type: "file",
          },
        ],
      },
      {
        id: "5",
        name: "lib",
        tooltip: "lib",
        type: "folder",
        children: [
          {
            id: "6",
            name: "utils.ts",
            tooltip: "utils's tooltip",
            type: "file",
          },
        ],
      },
    ],
  },
]

export default function TreeNodeTooltip({ node }: { node: TreeNode }) {
  const [expanded, setExpanded] = useState(node.defaultExpanded ?? false)

  const isFolder = node.type === "folder"

  const toggle = () => {
    if (isFolder) setExpanded((prev) => !prev)
  }

  const handleClick = () => {
    if (isFolder) {
      toggle()
      node.onSelect?.()
      return
    }
    node.onSelect?.()
  }

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleClick}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
                "hover:bg-muted/60 hover:text-foreground transition-colors",
                node.isActive && "bg-muted/30 text-foreground"
              )}
            >
              {isFolder ? (
                <Folder
                  className={cn(
                    "text-muted-foreground size-4 shrink-0",
                    expanded && "text-blue-500"
                  )}
                />
              ) : (
                <File className="text-muted-foreground size-4 shrink-0" />
              )}
              <span className="truncate">{node.name}</span>
            </button>
          </TooltipTrigger>
          {node.tooltip && (
            <TooltipContent side="right">{node.tooltip}</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      {/* Animate children */}
      {isFolder && (
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-border/60 ml-3 mt-1 space-y-1 border-l pl-3 pt-1"
            >
              {node.children?.map((child) => (
                <TreeNodeTooltip key={child.id} node={child} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
