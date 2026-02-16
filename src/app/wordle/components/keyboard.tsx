import type { KeyboardColors } from "../types"

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ")
}

const ROWS = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  ["enter", ..."zxcvbnm".split(""), "back"],
]

const COLOR_CLASSES: Record<string, string> = {
  exact: "text-white",
  present: "text-white",
  miss: "text-white",
}

const COLOR_STYLES: Record<"exact" | "present" | "miss", React.CSSProperties> = {
  exact: {
    backgroundColor: "#17c15f",
    borderColor: "#17c15f",
  },
  present: {
    backgroundColor: "#f4a800",
    borderColor: "#f4a800",
  },
  miss: {
    backgroundColor: "#3a3a3c",
    borderColor: "#3a3a3c",
  },
}

type Props = {
  colors: KeyboardColors
  disabled?: boolean
  onEnter: () => void
  onBackspace: () => void
  onLetter: (letter: string) => void
}

export function Keyboard({
  colors,
  disabled,
  onEnter,
  onBackspace,
  onLetter,
}: Props) {
  const handleClick = (key: string) => {
    if (disabled) return
    if (key === "enter") onEnter()
    else if (key === "back") onBackspace()
    else onLetter(key)
  }

  return (
    <div className="border-border/70 bg-card/70 mx-auto w-full max-w-[26rem] select-none rounded-2xl border p-3 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-2 text-sm font-semibold uppercase">
        {ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((key) => {
              const color = colors[key]
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleClick(key)}
                  style={
                    color && color !== null
                      ? COLOR_STYLES[color as "exact" | "present" | "miss"]
                      : undefined
                  }
                  className={cx(
                    "flex-1 min-w-[32px] h-11 rounded-xl border border-border/70 bg-muted/70 px-2 text-center text-sm font-semibold leading-none text-foreground shadow-sm transition hover:-translate-y-[1px] hover:shadow",
                    key === "enter" && "min-w-[48px] text-xs sm:text-sm",
                    key === "back" && "min-w-[48px] text-xs sm:text-sm",
                    color && COLOR_CLASSES[color],
                    disabled && "opacity-60"
                  )}
                >
                  {key === "enter" ? "enter" : key === "back" ? "⌫" : key}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
