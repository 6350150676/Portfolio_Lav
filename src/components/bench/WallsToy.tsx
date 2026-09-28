import { useMemo, useState } from 'react'
import { Finding } from './BenchCard'
import Stamp from '../ui/Stamp'

/* EXPERIMENT — "Does every wall make a puzzle harder?"
 * From Zip Puzzle's level pipeline: difficulty tracks how open the solution
 * space is. Toggle walls and a DFS solver (pruned + node-budgeted, like the
 * real one) counts every valid way to fill the board from the 1. */

const N = 5
const T = N * N
const START = 0
const BUDGET = 400_000

const key = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`)

type Edge = { k: string; x1: number; y1: number; x2: number; y2: number }
const EDGES: Edge[] = []
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    const i = r * N + c
    if (c < N - 1) EDGES.push({ k: key(i, i + 1), x1: c + 1, y1: r, x2: c + 1, y2: r + 1 })
    if (r < N - 1) EDGES.push({ k: key(i, i + N), x1: c, y1: r + 1, x2: c + 1, y2: r + 1 })
  }
}

function solve(walls: Set<string>) {
  const adj: number[][] = []
  for (let i = 0; i < T; i++) {
    const r = Math.floor(i / N)
    const c = i % N
    const o: number[] = []
    if (r > 0 && !walls.has(key(i, i - N))) o.push(i - N)
    if (r < N - 1 && !walls.has(key(i, i + N))) o.push(i + N)
    if (c > 0 && !walls.has(key(i, i - 1))) o.push(i - 1)
    if (c < N - 1 && !walls.has(key(i, i + 1))) o.push(i + 1)
    adj.push(o)
  }
  const vis = new Uint8Array(T)
  const path: number[] = []
  let count = 0
  let nodes = 0
  let first: number[] | null = null

  const dfs = (i: number, depth: number) => {
    if (++nodes > BUDGET) return
    vis[i] = 1
    path.push(i)
    if (depth === T) {
      count++
      if (!first) first = path.slice()
    } else {
      // connectivity pruning: an unvisited cell with no way in is fatal,
      // and at most one cell may be a forced dead end (the path's last cell)
      let ends = 0
      for (let j = 0; j < T && ends < 2; j++) {
        if (vis[j]) continue
        let free = 0
        for (const m of adj[j]) if (!vis[m] || m === i) free++
        if (free === 0) ends = 2
        else if (free === 1) ends++
      }
      if (ends < 2) for (const m of adj[i]) if (!vis[m]) dfs(m, depth + 1)
    }
    vis[i] = 0
    path.pop()
  }
  dfs(START, 1)
  return { count, first: first as number[] | null, capped: nodes > BUDGET }
}

const OPEN_BOARD = solve(new Set())
const OPEN = OPEN_BOARD.count

function verdict(n: number) {
  if (n === 0) return { tone: 'mute' as const, stamp: 'Unshippable', text: 'No way to fill the board. My level pipeline runs a solver over every level for exactly this reason — a board like this never ships.' }
  if (n === 1) return { tone: 'ok' as const, stamp: 'Forced', text: 'Exactly one solution. The walls now tell you what to do at every step — in my difficulty model, this is the easy end.' }
  if (n <= 12) return { tone: 'ok' as const, stamp: 'Easy', text: 'Nearly forced. The walls are doing most of the thinking for you.' }
  if (n <= 200) return { tone: 'blue' as const, stamp: 'Medium', text: 'Narrowing. Each wall rules out whole families of paths, so there are fewer wrong turns to take.' }
  return { tone: 'signal' as const, stamp: 'Hard', text: 'Wide open. Hundreds of valid paths and nothing forcing your hand, so you have to search. Counter-intuitive, but true: the empty board is the hardest one.' }
}

export default function WallsToy() {
  const [walls, setWalls] = useState<string[]>([])
  const wallSet = useMemo(() => new Set(walls), [walls])
  const result = useMemo(() => (wallSet.size ? solve(wallSet) : OPEN_BOARD), [wallSet])
  const v = verdict(result.count)

  const toggle = (k: string) => setWalls((w) => (w.includes(k) ? w.filter((x) => x !== k) : [...w, k]))
  const addRandom = () => {
    const free = EDGES.filter((e) => !wallSet.has(e.k))
    if (free.length) toggle(free[Math.floor(Math.random() * free.length)].k)
  }

  // position on a log scale: 1 solution = easy (left) … open board = hard (right)
  const pos = result.count <= 1 ? 0 : Math.min(1, Math.log(result.count) / Math.log(OPEN))
  const ghost = result.first?.map((i) => `${(i % N) + 0.5},${Math.floor(i / N) + 0.5}`).join(' ')

  return (
    <div className="wt">
      <div className="wt__stage">
        <svg className="wt__board" viewBox={`-0.12 -0.12 ${N + 0.24} ${N + 0.24}`} aria-hidden>
          {Array.from({ length: T }, (_, i) => (
            <rect key={i} className="wt__cell" x={i % N} y={Math.floor(i / N)} width="1" height="1" />
          ))}
          {ghost && <polyline className="wt__ghost" points={ghost} />}
          <rect className="wt__frame" x="0" y="0" width={N} height={N} />
          {EDGES.map((e) => (
            <g key={e.k} className={`wt__edge ${wallSet.has(e.k) ? 'is-wall' : ''}`} onClick={() => toggle(e.k)}>
              <line className="wt__edge-hit" x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
              <line className="wt__edge-vis" x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
            </g>
          ))}
          <circle className="wt__start" cx="0.5" cy="0.5" r="0.3" />
          <text className="wt__start-t" x="0.5" y="0.5" textAnchor="middle" dominantBaseline="central">1</text>
        </svg>
        <p className="hand wt__hint">tap the lines between cells to build walls</p>
      </div>

      <div className="wt__readout">
        <div className="wt__count">
          <span className="display wt__num">{result.count.toLocaleString()}{result.capped ? '+' : ''}</span>
          <span className="label">valid ways to fill the board from the 1</span>
        </div>
        <div className="wt__walls label">walls placed: {walls.length}</div>

        <div className="wt__meter" aria-hidden>
          <div className="wt__meter-track">
            <span className="wt__meter-mark" style={{ left: `${pos * 100}%`, opacity: result.count === 0 ? 0 : 1 }} />
          </div>
          <div className="wt__meter-ends label">
            <span>easy · forced</span>
            <span>hard · wide open</span>
          </div>
        </div>

        <div className="wt__actions">
          <button className="btn btn--sm" onClick={addRandom}>+ Random wall</button>
          <button className="btn btn--sm btn--ghost" onClick={() => setWalls((w) => w.slice(0, -1))} disabled={!walls.length}>Undo</button>
          <button className="btn btn--sm btn--ghost" onClick={() => setWalls([])} disabled={!walls.length}>Clear</button>
        </div>

        <Finding>
          <Stamp tone={v.tone} rotate={-4} className="wt__stamp">{v.stamp}</Stamp>
          <p>{v.text}</p>
        </Finding>
      </div>
    </div>
  )
}
