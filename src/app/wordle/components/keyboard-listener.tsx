"use client"

import { useEffect } from "react"

type Props = {
  disabled?: boolean
  onLetter: (letter: string) => void
  onBackspace: () => void
  onEnter: () => void
}

export function KeyboardListener({
  disabled,
  onLetter,
  onBackspace,
  onEnter,
}: Props) {
  useEffect(() => {
    if (disabled) return
    const handler = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest("a, button, input, select, textarea")
      ) {
        return
      }

      const { key } = event
      if (key === "Enter") {
        onEnter()
      } else if (key === "Backspace") {
        onBackspace()
      } else if (/^[a-zA-Z]$/.test(key)) {
        onLetter(key.toLowerCase())
      }
    }

    window.addEventListener("keyup", handler)
    return () => window.removeEventListener("keyup", handler)
  }, [disabled, onBackspace, onEnter, onLetter])

  return null
}
