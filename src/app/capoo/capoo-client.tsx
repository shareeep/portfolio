"use client"

import React from "react"

interface CapooClientProps {
  art: string
}

export function CapooClient({ art }: CapooClientProps) {
  const [blocks, setBlocks] = React.useState(3)
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setBlocks((count) => count + 1)
        }
      },
      { rootMargin: "800px" }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="mx-auto flex w-full flex-col items-center overflow-x-auto px-4 pb-24 pt-28">
      {Array.from({ length: blocks }).map((_, index) => (
        <pre
          key={index}
          className="text-foreground w-max whitespace-pre font-mono text-[10px] leading-[1.1] sm:text-[11px] sm:leading-[1.15]"
        >
          {art}
        </pre>
      ))}
      <div ref={sentinelRef} className="h-10" />
    </div>
  )
}
