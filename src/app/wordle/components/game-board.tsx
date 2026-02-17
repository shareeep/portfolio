import type { Board, State } from "../types"

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
                  className={cx(
                    "flex aspect-square items-center justify-center rounded-xl border text-2xl font-semibold uppercase transition-all sm:text-3xl",
                    filled && "border-foreground/40",
                    result === "exact" &&
                      "border-[#17c15f] bg-[#17c15f] text-white",
                    result === "present" &&
                      "border-[#f4a800] bg-[#f4a800] text-white",
                    result === "miss" &&
                      "border-[#3a3a3c] bg-[#3a3a3c] text-white",
                    isCurrentRow &&
                      !result &&
                      filled &&
                      "animate-[pulse_0.25s_ease-in-out]"
                  )}
                >
                  {letter}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
