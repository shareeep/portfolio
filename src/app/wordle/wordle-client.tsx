"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { GameBoard } from "./components/game-board"
import { GameLegend } from "./components/game-legend"
import { Keyboard } from "./components/keyboard"
import { KeyboardListener } from "./components/keyboard-listener"
import { ResultToast } from "./components/result-toast"
import { useWordle } from "./hooks/use-wordle"

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ")
}

interface WordleClientProps {
  initialSolution: string
}

export function WordleClient({ initialSolution }: WordleClientProps) {
  const [solution, setSolution] = useState(initialSolution)
  const [showHelp, setShowHelp] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const {
    board,
    keyboardColors,
    state,
    submitGuess,
    addLetter,
    removeLetter,
    reset,
  } = useWordle(solution)

  const statusText = useMemo(() => {
    if (state.outcome === "win") return "You got it!"
    if (state.outcome === "lose") return "Out of tries"
    return `Turn ${state.turn + 1} of 6`
  }, [state.outcome, state.turn])

  const hint = useMemo(() => {
    const first = solution[0]?.toUpperCase()
    const last = solution[solution.length - 1]?.toUpperCase()
    return `Starts with ${first}, ends with ${last}.`
  }, [solution])

  const handleNewWord = async () => {
    if (refreshing) return

    setRefreshing(true)
    try {
      const response = await fetch("/api/wordle/next", {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch next word")
      }

      const data = (await response.json()) as { word?: string }
      if (!data.word || data.word.length !== 5) {
        throw new Error("Invalid word payload")
      }

      setSolution(data.word.toLowerCase())
      reset()
    } catch {
      setSolution(initialSolution)
      reset()
    } finally {
      window.setTimeout(() => setRefreshing(false), 350)
    }
  }

  return (
    <div className="mt-2 w-full max-w-[30rem] space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="border-border text-foreground bg-card/80 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-sm backdrop-blur"
        >
          <span aria-hidden>←</span>
          Back
        </Link>

        <div className="flex items-center gap-3">
          <span className="bg-card text-foreground rounded-full px-3 py-[6px] text-sm font-medium shadow-sm">
            {statusText}
          </span>

          <button
            type="button"
            onClick={handleNewWord}
            className="border-border text-foreground bg-card/80 group inline-flex items-center gap-2 rounded-full border px-3 py-[6px] text-sm font-medium shadow-sm backdrop-blur transition hover:-translate-y-px hover:shadow active:scale-[0.98]"
          >
            <span
              aria-hidden
              className={cx(
                "inline-flex h-4 w-4 items-center justify-center transition-transform",
                refreshing && "animate-spin"
              )}
            >
              ⟳
            </span>
            New word
          </button>
        </div>
      </div>

      <GameBoard board={board} state={state} />

      <KeyboardListener
        disabled={state.outcome !== null}
        onEnter={submitGuess}
        onBackspace={removeLetter}
        onLetter={addLetter}
      />

      <Keyboard
        colors={keyboardColors}
        disabled={state.outcome !== null}
        onEnter={submitGuess}
        onBackspace={removeLetter}
        onLetter={addLetter}
      />

      <div className="border-border/70 bg-card/70 mx-auto w-full max-w-[30rem] rounded-2xl border p-4 shadow-sm backdrop-blur">
        <button
          type="button"
          onClick={() => setShowHelp((v) => !v)}
          className="text-muted-foreground hover:text-foreground flex w-full items-center justify-between text-xs uppercase tracking-[0.2em] transition"
        >
          <span>{showHelp ? "Hide instructions" : "Show instructions"}</span>
          <span className="text-lg leading-none">{showHelp ? "–" : "+"}</span>
        </button>

        {showHelp && (
          <div className="pt-4">
            <GameLegend solutionHint={hint} />
          </div>
        )}
      </div>

      <ResultToast
        outcome={state.outcome}
        solution={solution}
        onPlayAgain={reset}
      />
    </div>
  )
}
