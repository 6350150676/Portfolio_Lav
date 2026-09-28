// Hand-drawn marks for margin notes: arrows, underlines, circles.

export function Arrow({
  width = 70,
  flip = false,
  down = false,
  className = '',
}: {
  width?: number
  flip?: boolean
  down?: boolean
  className?: string
}) {
  const t = [flip ? 'scaleX(-1)' : '', down ? 'rotate(35deg)' : ''].join(' ')
  return (
    <svg
      className={className}
      width={width}
      height={width * 0.55}
      viewBox="0 0 100 55"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: t || undefined }}
      aria-hidden
    >
      <path d="M96 6 C 70 4, 38 12, 12 44" />
      <path d="M6 30 L 11 46 L 27 42" />
    </svg>
  )
}

export function Underline({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 18" preserveAspectRatio="none" fill="none" aria-hidden>
      <path
        d="M3 12 C 60 5, 120 4, 180 8 S 270 13, 297 6"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M20 15 C 90 10, 170 10, 250 12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}

// Tally marks (|||| with a strike) — how a lab counts things.
export function Tally({ n, className = '' }: { n: number; className?: string }) {
  const groups = Math.floor(n / 5)
  const rest = n % 5
  const marks: JSX.Element[] = []
  let x = 2
  for (let g = 0; g < groups; g++) {
    for (let i = 0; i < 4; i++) marks.push(<path key={`g${g}${i}`} d={`M${x + i * 5} 3 L${x + i * 5 - 1} 19`} />)
    marks.push(<path key={`s${g}`} d={`M${x - 3} 15 L${x + 18} 6`} />)
    x += 28
  }
  for (let i = 0; i < rest; i++) marks.push(<path key={`r${i}`} d={`M${x + i * 5} 3 L${x + i * 5 - 1} 19`} />)
  const w = x + rest * 5 + 4
  return (
    <svg
      className={className}
      width={w}
      height={22}
      viewBox={`0 0 ${w} 22`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      {marks}
    </svg>
  )
}
