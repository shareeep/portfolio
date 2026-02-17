import { NextResponse } from "next/server"

import { pickAnswerWord } from "@/app/wordle/lib/answer-words"

export const dynamic = "force-dynamic"

export async function GET() {
  const word = pickAnswerWord()
  return NextResponse.json({ word })
}
