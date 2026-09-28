import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { fmtTime } from './useLab'

/* EXPERIMENT — "Can you play this without instructions?"
 * Zip Puzzle's rules on a 5×5 board, with the tutorial removed. The board
 * never explains itself: illegal moves are simply refused, and every rule
 * the player bumps into is written into the observation log. */

const N = 5
const START = 0
const CHECK: Record<number, number> = { 0: 1, 7: 2, 20: 3, 13: 4, 22: 5 }
const MAX = 5

type Rule = 'start' | 'adjacent' | 'revisit' | 'order' | 'fill'
const RULE_TEXT: Record<Rule, string> = {
  start: 'It only starts from 1.',
  adjacent: 'One step at a time — up, down, left or right. No jumps, no diagonals.',
  revisit: 'A cell can only be used once.',
  order: 'The numbers have to be visited in order.',
  fill: 'Every cell has to be filled before the last number.',
}
const RULE_COUNT = Object.keys(RULE_TEXT).length

const rc = (i: number) => [Math.floor(i / N), i % N] as const
const isAdj = (a: number, b: number) => {
  const [ar, ac] = rc(a)
  const [br, bc] = rc(b)
  return Math.abs(ar - br) + Math.abs(ac - bc) === 1
}
const colName = (c: number) => 'ABCDE'[c]

export default function PathPuzzle() {
  const [path, setPathState] = useState<number[]>([])
  const pathRef = useRef<number[]>([])
  const setPath = (p: number[]) => {
    pathRef.current = p
    setPathState(p)
  }

  const [found, setFound] = useState<{ rule: Rule; at: number }[]>([])
  const foundRef = useRef<Set<Rule>>(new Set())
  const [rejects, setRejects] = useState(0)
  const [flash, setFlash] = useState<{ cell: number; n: number } | null>(null)
  const [doneMs, setDoneMs] = useState<number | null>(null)
  const t0 = useRef<number | null>(null)
  const dragging = useRef(false)
  const hover = useRef(-1)
  const gridRef = useRef<HTMLDivElement>(null)

  const solved = doneMs !== null

  const reject = (rule: Rule, cell: number) => {
    setRejects((r) => r + 1)
    setFlash((f) => ({ cell, n: (f?.n ?? 0) + 1 }))
    if (!foundRef.current.has(rule)) {
      foundRef.current.add(rule)
      const at = t0.current ? performance.now() - t0.current : 0
      setFound((f) => [...f, { rule, at }])
    }
  }

  // One attempted step onto `cell`. Returns false if the board refused it.
  const tryStep = (cell: number): boolean => {
    const p = pathRef.current
    if (p.length === 0) {
      if (cell !== START) { reject('start', cell); return false }
      if (t0.current === null) t0.current = performance.now()
      setPath([cell])
      return true
    }
    const last = p[p.length - 1]
    if (cell === last) return true
    if (p.length >= 2 && cell === p[p.length - 2]) { setPath(p.slice(0, -1)); return true }
    if (!isAdj(last, cell)) { reject('adjacent', cell); return false }
    if (p.includes(cell)) { reject('revisit', cell); return false }
    const num = CHECK[cell]
    if (num !== undefined) {
      const expected = p.filter((c) => CHECK[c] !== undefined).length + 1
      if (num !== expected) { reject('order', cell); return false }
      if (num === MAX && p.length + 1 < N * N) { reject('fill', cell); return false }
    }
    const next = [...p, cell]
    setPath(next)
    if (next.length === N * N) setDoneMs(performance.now() - (t0.current ?? performance.now()))
    return true
  }

  // Fast drags can skip cells — walk straight lines one cell at a time.
  const stepToward = (cell: number) => {
    const p = pathRef.current
    if (p.length === 0) { tryStep(cell); return }
    const [lr, lc] = rc(p[p.length - 1])
    const [tr, tc] = rc(cell)
    if ((lr === tr || lc === tc) && !isAdj(p[p.length - 1], cell) && cell !== p[p.length - 1]) {
      const dr = Math.sign(tr - lr)
      const dc = Math.sign(tc - lc)
      let r = lr
      let c = lc
      while (r !== tr || c !== tc) {
        r += dr
        c += dc
        if (!tryStep(r * N + c)) break
      }
      return
    }
    tryStep(cell)
  }

  const cellAt = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y)?.closest('[data-cell]') as HTMLElement | null
    if (!el || !gridRef.current?.contains(el)) return -1
    return Number(el.dataset.cell)
  }

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (solved) return
    const cell = cellAt(e.clientX, e.clientY)
    if (cell < 0) return
    e.preventDefault()
    gridRef.current?.setPointerCapture(e.pointerId)
    dragging.current = true
    hover.current = cell
    const idx = pathRef.current.indexOf(cell)
    if (idx >= 0) setPath(pathRef.current.slice(0, idx + 1)) // finger-down: jump back anywhere
    else stepToward(cell)
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || solved) return
    const cell = cellAt(e.clientX, e.clientY)
    if (cell < 0 || cell === hover.current) return
    hover.current = cell
    stepToward(cell)
  }
  const onUp = () => {
    dragging.current = false
    hover.current = -1
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (solved) return
    const p = pathRef.current
    if (e.key === 'Backspace') { e.preventDefault(); if (p.length) setPath(p.slice(0, -1)); return }
    const d: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }
    if (!(e.key in d) && e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    if (p.length === 0) { tryStep(START); return }
    if (!(e.key in d)) return
    const [r, c] = rc(p[p.length - 1])
    const nr = r + d[e.key][0]
    const nc = c + d[e.key][1]
    if (nr < 0 || nr >= N || nc < 0 || nc >= N) return
    tryStep(nr * N + nc)
  }

  const reset = () => {
    setPath([])
    setFound([])
    foundRef.current = new Set()
    setRejects(0)
    setFlash(null)
    setDoneMs(null)
    t0.current = null
  }

  const visited = new Set(path)
  const lastCell = path.length ? rc(path[path.length - 1]) : null
  const points = path.map((i) => { const [r, c] = rc(i); return `${c + 0.5},${r + 0.5}` }).join(' ')

  return (
    <div className={`pz ${solved ? 'is-solved' : ''}`}>
      <div className="pz__meta">
        <span className="label">Instructions: <b>none.</b></span>
        <span className="label pz__count">{path.length}/{N * N} filled</span>
      </div>

      <div className="pz__board">
        <div
          ref={gridRef}
          className="pz__grid"
          style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}
          tabIndex={0}
          role="application"
          aria-label="Path puzzle board. Arrow keys draw a line from its end, Backspace undoes a step."
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={onKey}
        >
          {Array.from({ length: N * N }, (_, i) => {
            const shaking = flash?.cell === i
            return (
              <div
                key={shaking ? `${i}-${flash!.n}` : i}
                data-cell={i}
                className={`pz__cell ${visited.has(i) ? 'is-on' : ''} ${shaking ? 'is-bad' : ''}`}
              />
            )
          })}
        </div>

        <svg className="pz__line" viewBox={`0 0 ${N} ${N}`} aria-hidden>
          {path.length > 1 && <polyline points={points} />}
          {path.length === 1 && <circle cx={rc(path[0])[1] + 0.5} cy={rc(path[0])[0] + 0.5} r="0.14" />}
        </svg>

        <div className="pz__nums" style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }} aria-hidden>
          {Array.from({ length: N * N }, (_, i) => (
            <span key={i}>
              {CHECK[i] !== undefined && (
                <b className={`pz__num ${visited.has(i) ? 'is-on' : ''} ${path.length === 0 && CHECK[i] === 1 ? 'is-next' : ''}`}>
                  {CHECK[i]}
                </b>
              )}
            </span>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {path.length === 0
          ? 'Board empty.'
          : `${path.length} of ${N * N} cells filled, line ends at ${colName(lastCell![1])}${lastCell![0] + 1}.`}
      </p>

      <div className="pz__log">
        <div className="pz__log-head">
          <span className="label">Observations</span>
          <span className="label">rules found {found.length}/{RULE_COUNT} · refused moves {rejects}</span>
        </div>
        <ol className="pz__obs">
          {found.map((f) => (
            <li key={f.rule}>
              <span className="pz__t">t+{fmtTime(f.at)}</span>
              {RULE_TEXT[f.rule]}
            </li>
          ))}
          {Array.from({ length: RULE_COUNT - found.length }, (_, i) => (
            <li key={`blank${i}`} className="pz__blank" aria-hidden>
              <span className="pz__t">t+?:??</span>
              <span className="pz__blank-line" />
            </li>
          ))}
        </ol>
      </div>

      {solved && (
        <div className="finding pz__result" aria-live="polite">
          <span className="label finding__label">Result</span>
          <div className="finding__text">
            <p>
              <strong>Solved in {fmtTime(doneMs!)}</strong>, with {rejects} refused {rejects === 1 ? 'move' : 'moves'} and zero
              words of instruction.{' '}
              {found.length === 0
                ? "You didn't bump into a single rule — either you've played Zip before, or the board did its job."
                : `The board taught you ${found.length} of its ${RULE_COUNT} rules by saying “no”.`}
            </p>
            <p className="pz__small">
              Same rules as my <Link className="link" to="/projects/zip-puzzle">Zip Puzzle</Link>, with the tutorial removed to see
              whether the grid can teach on its own.
            </p>
            <button className="btn btn--sm" onClick={reset}>Run it again ↺</button>
          </div>
        </div>
      )}
      {!solved && path.length > 0 && (
        <button className="pz__reset label" onClick={reset}>reset board</button>
      )}
    </div>
  )
}
