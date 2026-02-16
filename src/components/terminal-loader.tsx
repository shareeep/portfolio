"use client"

import React from "react"

import { cn } from "@/lib/utils"
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal"

interface TerminalLoaderProps {
  onComplete: () => void
  className?: string
}

const fallbackDurationMs = 9000
const exitDurationMs = 100
const exitDelayMs = 500
const typingDurationMs = 35

const awsDelayMs = 0
const checkDelayMs = 800
const aptDelayMs = 1200
const connectedDelayMs = 2600
const lsDelayMs = 3200
const lsOutputDelayMs = 3800
const pwdDelayMs = 4400
const pwdOutputDelayMs = 5000
const loadingDelayMs = 5600

const loadingCompleteText = "loading complete, welcome to my portfolio!"
const sequenceDurationMs =
  loadingDelayMs + loadingCompleteText.length * typingDurationMs + 300

export function TerminalLoader({ onComplete, className }: TerminalLoaderProps) {
  const hasCompletedRef = React.useRef(false)
  const [isExiting, setIsExiting] = React.useState(false)
  const sequenceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  const startExit = React.useCallback(
    (delayMs: number) => {
      if (hasCompletedRef.current) return
      hasCompletedRef.current = true
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(onComplete, exitDurationMs)
      }, delayMs)
    },
    [onComplete]
  )

  React.useEffect(() => {
    const timer = setTimeout(() => {
      startExit(exitDelayMs)
    }, fallbackDurationMs)

    return () => clearTimeout(timer)
  }, [startExit])

  React.useEffect(() => {
    sequenceTimerRef.current = setTimeout(() => {
      startExit(exitDelayMs)
    }, sequenceDurationMs)

    return () => {
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current)
    }
  }, [startExit])

  const handleComplete = React.useCallback(() => {
    startExit(0)
  }, [startExit])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return
      handleComplete()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleComplete])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-200 ease-out",
        isExiting ? "pointer-events-none opacity-0" : "opacity-100",
        className
      )}
      aria-live="polite"
    >
      <div className="w-full max-w-2xl px-6">
        <Terminal
          className="mx-auto w-full"
          sequence={false}
          header={
            <div className="flex items-center gap-2">
              <span className="bg-destructive size-2.5 rounded-full" />
              <span className="bg-muted size-2.5 rounded-full" />
              <span className="bg-accent size-2.5 rounded-full" />
            </div>
          }
        >
          <TypingAnimation
            delay={awsDelayMs}
            duration={typingDurationMs}
            startOnView={false}
          >
            $ aws --version
          </TypingAnimation>
          <AnimatedSpan
            delay={checkDelayMs}
            className="text-green-700 text-xs"
            startOnView={false}
          >
            ✔ checking the mainframe
          </AnimatedSpan>
          <TypingAnimation
            delay={aptDelayMs}
            duration={typingDurationMs}
            startOnView={false}
          >
            $ sudo apt-get update...
          </TypingAnimation>
          <AnimatedSpan
            delay={connectedDelayMs}
            className="text-green-700 text-xs"
            startOnView={false}
          >
            ✔ successfully connected to ap-southeast-1
          </AnimatedSpan>
          <TypingAnimation
            delay={lsDelayMs}
            duration={typingDurationMs}
            startOnView={false}
          >
            $ ls
          </TypingAnimation>
          <AnimatedSpan
            delay={lsOutputDelayMs}
            className="text-blue-700 block text-xs"
            startOnView={false}
          >
            <span className="flex flex-wrap gap-x-3 gap-y-1">
              <span>work_experience</span>
              <span>my_projects</span>
              <span>my_skills</span>
              <span>contact_me</span>
            </span>
          </AnimatedSpan>
          <TypingAnimation
            delay={pwdDelayMs}
            duration={typingDurationMs}
            startOnView={false}
          >
            $ pwd
          </TypingAnimation>
          <AnimatedSpan
            delay={pwdOutputDelayMs}
            className="text-blue-700 text-xs"
            startOnView={false}
          >
            /shariff/portfolio/home
          </AnimatedSpan>
          <TypingAnimation
            delay={loadingDelayMs}
            duration={typingDurationMs}
            startOnView={false}
            className="text-muted-foreground"
          >
            {loadingCompleteText}
          </TypingAnimation>
        </Terminal>
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleComplete}
            className="text-muted-foreground/60 hover:text-foreground/80 text-xs uppercase tracking-[0.25em]"
          >
            Press Enter to skip
          </button>
        </div>
      </div>
    </div>
  )
}
