import type { Board, State } from "../types"

const RESULT_LABELS = {
  exact: "correct position",
  present: "present elsewhere",
  miss: "not in the word",
} as const

const RESULT_SYMBOLS = {
  exact: "●",
  present: "◆",
  miss: "×",
} as const

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  board: Board
  state: State
}

export function GameBoard({ board, state }: Props) {
  return (
    <div className="border-border/70 bg-card/70 mx-auto flex w-full max-w-md flex-col gap-3 rounded-2xl border p-3 shadow-sm backdrop-blur sm:p-4">
      {board.map((row, rowIndex) => {
        const isCurrentRow = rowIndex === state.turn && state.outcome === null
        const currentGuessLetters = isCurrentRow
          ? state.currentGuess.split("")
          : []

        return (
          <div
            key={rowIndex}
            role="group"
            className="grid grid-cols-5 gap-2 sm:gap-3"
            aria-label={`Row ${rowIndex + 1}`}
          >
            {row.map((cell, colIndex) => {
              const letter = cell.letter ?? currentGuessLetters[colIndex] ?? ""
              const filled = Boolean(letter)
              const result = cell.result
              return (
                <div
                  key={colIndex}
                  role="img"
                  aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}: ${letter ? `${letter.toUpperCase()}${result ? `, ${RESULT_LABELS[result]}` : ""}` : "empty"}`}
                  className={cx(
                    "relative flex aspect-square items-center justify-center rounded-xl border text-2xl font-semibold uppercase transition-all sm:text-3xl",
                    filled && "border-foreground/40",
                    result === "exact" &&
                      "border-[#15803d] bg-[#15803d] text-white",
                    result === "present" &&
                      "border-[#b45309] bg-[#b45309] text-white",
                    result === "miss" &&
                      "border-[#3a3a3c] bg-[#3a3a3c] text-white",
                    isCurrentRow &&
                      !result &&
                      filled &&
                      "animate-[pulse_0.25s_ease-in-out]"
                  )}
                >
                  <span aria-hidden="true">{letter}</span>
                  {result && (
                    <span
                      aria-hidden="true"
                      className="absolute right-1.5 top-1.5 text-[10px] leading-none"
                    >
                      {RESULT_SYMBOLS[result]}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
