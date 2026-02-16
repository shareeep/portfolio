import { WordleClient } from "./wordle-client"
import { pickAnswerWord } from "./lib/answer-words"

import "./styles.css"

export const metadata = {
  title: "wordle",
}

export const dynamic = "force-dynamic"

export default function WordlePage() {
  const initialSolution = pickAnswerWord()

  return (
    <main className="bg-background relative min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center px-4 pb-16 pt-10 sm:px-6">
        <WordleClient initialSolution={initialSolution} />
      </div>
    </main>
  )
}
