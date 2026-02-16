"use client"

import type { Outcome } from "../types"

type Props = {
  outcome: Outcome
  solution: string
  onPlayAgain: () => void
}

export function ResultToast({ outcome, solution, onPlayAgain }: Props) {
  if (!outcome) return null

  const isWin = outcome === "win"

  return (
    <div className="fixed inset-x-0 bottom-6 z-30 flex justify-center px-4">
      <div className="border-border/80 bg-card/95 w-full max-w-lg animate-[fade-in_0.3s_ease-out] rounded-2xl border p-4 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">
              {isWin ? "Nice!" : "Good try"}
            </p>
            <p className="text-muted-foreground text-xs">
              The word was{" "}
              <span className="font-semibold uppercase">{solution}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onPlayAgain}
            className="border-border/70 bg-primary text-primary-foreground mt-2 inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-px hover:shadow sm:mt-0"
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  )
}
