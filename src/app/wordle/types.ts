export type LetterResult = "exact" | "present" | "miss" | null

export type Cell = {
  letter: string | null
  result: LetterResult
}

export type Board = Cell[][]

export type Outcome = "win" | "lose" | null

export type State = {
  turn: number
  outcome: Outcome
  currentGuess: string
}

export type KeyboardColors = Record<string, LetterResult>
