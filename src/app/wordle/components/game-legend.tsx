type Props = {
  solutionHint: string
}

export function GameLegend({ solutionHint }: Props) {
  return (
    <div className="border-border/70 bg-card/60 text-muted-foreground grid gap-3 rounded-2xl border p-4 text-sm shadow-sm backdrop-blur sm:grid-cols-2">
      <div className="space-y-2">
        <p className="text-foreground font-semibold">How to play</p>
        <ul className="list-disc space-y-1 pl-4">
          <li>Guess the five-letter word in six tries.</li>
          <li>Letters turn green, amber, or gray after each guess.</li>
          <li>Use your keyboard or tap the on-screen keys.</li>
        </ul>
      </div>
      <div className="space-y-2">
        <p className="text-foreground font-semibold">Quick hints</p>
        <p className="border-border/60 bg-background/60 rounded-xl border px-3 py-2 text-xs">
          {solutionHint}
        </p>
        <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide">
          <span className="rounded-md bg-green-500 px-2 py-1 font-semibold text-white">
            Exact
          </span>
          <span className="rounded-md bg-amber-400 px-2 py-1 font-semibold text-white">
            Present
          </span>
          <span className="bg-muted text-foreground/70 rounded-md px-2 py-1 font-semibold">
            Miss
          </span>
        </div>
      </div>
    </div>
  )
}
