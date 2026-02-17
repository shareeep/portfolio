"use client"

import React from "react"

import { TerminalLoader } from "@/components/terminal-loader"

interface TerminalLoaderWrapperProps {
  children: React.ReactNode
}

export function TerminalLoaderWrapper({
  children,
}: TerminalLoaderWrapperProps) {
  const [showLoader, setShowLoader] = React.useState(true)

  const handleComplete = React.useCallback(() => {
    setShowLoader(false)
  }, [])

  return (
    <>
      {children}
      {showLoader ? <TerminalLoader onComplete={handleComplete} /> : null}
    </>
  )
}
