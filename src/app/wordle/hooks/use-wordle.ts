import { useCallback, useMemo, useState } from "react"

import type { Board, Cell, KeyboardColors, State } from "../types"

const GUESSES = 6
const WORD_LENGTH = 5

const emptyRow = (): Cell[] =>
  Array.from({ length: WORD_LENGTH }, () => ({ letter: null, result: null }))

const emptyBoard = (): Board => Array.from({ length: GUESSES }, emptyRow)

const normalize = (value: string) => value.trim().toLowerCase()

const evaluateGuess = (guess: string, solution: string): Cell[] => {
  const result: Cell[] = []
  const solutionChars = solution.split("")
  const guessChars = guess.split("")

  // First pass: exact matches
  const remaining: string[] = []
  guessChars.forEach((char, idx) => {
    if (solutionChars[idx] === char) {
      result[idx] = { letter: char, result: "exact" }
      solutionChars[idx] = ""
    } else {
      remaining.push(char)
      result[idx] = { letter: char, result: null }
    }
  })

  // Second pass: present vs miss
  result.forEach((cell, idx) => {
    if (cell.result) return
    const char = cell.letter!
    const foundIndex = solutionChars.indexOf(char)
    if (foundIndex !== -1) {
      result[idx] = { letter: char, result: "present" }
      solutionChars[foundIndex] = ""
    } else {
      result[idx] = { letter: char, result: "miss" }
    }
  })

  return result
}

export function useWordle(solutionWord: string) {
  const solution = useMemo(() => normalize(solutionWord), [solutionWord])
  const [board, setBoard] = useState<Board>(() => emptyBoard())
  const [state, setState] = useState<State>({
    turn: 0,
    outcome: null,
    currentGuess: "",
  })
  const [keyboardColors, setKeyboardColors] = useState<KeyboardColors>({})

  const addLetter = useCallback(
    (letter: string) => {
      if (state.outcome) return
      if (state.currentGuess.length >= WORD_LENGTH) return
      if (!/^[a-z]$/i.test(letter)) return
      setState((prev) => ({
        ...prev,
        currentGuess: prev.currentGuess + letter.toLowerCase(),
      }))
    },
    [state.currentGuess.length, state.outcome]
  )

  const removeLetter = useCallback(() => {
    if (state.outcome) return
    setState((prev) => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1),
    }))
  }, [state.outcome])

  const submitGuess = useCallback(() => {
    setState((prev) => {
      if (prev.outcome) return prev
      const guess = normalize(prev.currentGuess)
      if (guess.length !== WORD_LENGTH) return prev
      const nextTurn = prev.turn
      if (nextTurn >= GUESSES) return prev

      const evaluated = evaluateGuess(guess, solution)

      setBoard((old) => {
        const copy = old.map((row) => row.slice())
        copy[nextTurn] = evaluated
        return copy
      })

      setKeyboardColors((old) => {
        const next = { ...old }
        evaluated.forEach(({ letter, result }) => {
          if (!letter) return
          const current = next[letter]
          if (result === "exact") {
            next[letter] = "exact"
          } else if (result === "present") {
            if (current !== "exact") next[letter] = "present"
          } else {
            if (!current) next[letter] = "miss"
          }
        })
        return next
      })

      const isWin = guess === solution
      const isLastTurn = nextTurn === GUESSES - 1

      return {
        turn: prev.turn + 1,
        currentGuess: "",
        outcome: isWin ? "win" : isLastTurn ? "lose" : null,
      }
    })
  }, [solution])

  const reset = useCallback(() => {
    setBoard(emptyBoard())
    setState({ turn: 0, outcome: null, currentGuess: "" })
    setKeyboardColors({})
  }, [])

  return {
    board,
    state,
    keyboardColors,
    addLetter,
    removeLetter,
    submitGuess,
    reset,
  }
}
