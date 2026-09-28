import { useEffect, useRef, useState } from 'react'
import { Finding } from './BenchCard'
import Stamp from '../ui/Stamp'

/* EXPERIMENT — "Can a live match survive the player locking their phone?"
 * A simulation of the reconnection layer from Online Multiplayer Checkers:
 * heartbeats, exponential-backoff retries, and state reconciled from the
 * authoritative server when the app resumes. */

type Conn = 'live' | 'down' | 'retrying'
type Match = 'on' | 'saved' | 'forfeit'
type Line = { t: number; text: string; tone?: 'bad' | 'good' }
type Try = { kind: 'try'; ok: boolean | null } | { kind: 'wait'; s: number }

const AUTO_UNLOCK_MS = 9000

export default function ReconnectToy() {
  const [layer, setLayer] = useState(true)
  const [conn, setConn] = useState<Conn>('live')
  const [locked, setLocked] = useState(false)
  const [match, setMatch] = useState<Match>('on')
  const [log, setLog] = useState<Line[]>([])
  const [tries, setTries] = useState<Try[]>([])
  const [result, setResult] = useState<{ lockedS: number; attempts: number } | null>(null)

  const timers = useRef<number[]>([])
  const t0 = useRef(performance.now())
  const lockedAt = useRef(0)
  const lockedRef = useRef(false)
  const layerRef = useRef(layer)
  layerRef.current = layer

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }
  const say = (text: string, tone?: Line['tone']) =>
    setLog((l) => [...l.slice(-7), { t: performance.now() - t0.current, text, tone }])

  const reset = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    t0.current = performance.now()
    setConn('live')
    lockedRef.current = false
    setLocked(false)
    setMatch('on')
    setTries([])
    setResult(null)
    setLog([{ t: 0, text: 'Match in progress · move 14 · your turn' }])
  }

  useEffect(() => {
    reset()
    return () => timers.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lock = () => {
    if (lockedRef.current || match !== 'on') return
    lockedAt.current = performance.now()
    lockedRef.current = true
    setLocked(true)
    setConn('down')
    say('Phone locked — Android closes the socket', 'bad')
    later(900, () =>
      say(layerRef.current ? 'Server: heartbeat missed — holding the match open' : 'Server: heartbeat missed')
    )
    later(AUTO_UNLOCK_MS, unlock)
  }

  const unlock = () => {
    // cancel the auto-unlock (and anything else pending) — we're driving now
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (!lockedRef.current) return
    lockedRef.current = false
    setLocked(false)
    const lockedS = Math.round((performance.now() - lockedAt.current) / 1000)
    say(`App resumed after ${lockedS}s`)
    if (!layerRef.current) {
      later(500, () => say('No reconnect logic — the socket stays closed', 'bad'))
      later(1500, () => {
        say('Server: player timed out → match forfeited', 'bad')
        setMatch('forfeit')
        setResult({ lockedS, attempts: 0 })
      })
    } else {
      const fails = 1 + (Math.random() < 0.5 ? 1 : 0)
      const attempt = (n: number) => {
        setConn('retrying')
        setTries((t) => [...t, { kind: 'try', ok: null }])
        say(`Reconnect attempt ${n}…`)
        later(650, () => {
          if (n <= fails) {
            const wait = 2 ** (n - 1)
            setTries((t) => [...t.slice(0, -1), { kind: 'try', ok: false }, { kind: 'wait', s: wait }])
            say(`Attempt ${n} failed (network still waking) — retry in ${wait}s`)
            later(wait * 1000, () => attempt(n + 1))
          } else {
            setTries((t) => [...t.slice(0, -1), { kind: 'try', ok: true }])
            setConn('live')
            say('Socket restored · session re-authenticated', 'good')
            later(600, () => {
              say('State reconciled from server: move 14 · your turn', 'good')
              setMatch('saved')
              setResult({ lockedS, attempts: n })
            })
          }
        })
      }
      later(300, () => attempt(1))
    }
  }

  const fmt = (ms: number) => `t+${(ms / 1000).toFixed(1)}s`

  return (
    <div className="rc">
      <div className="rc__stage">
        <div className={`rc__phone ${locked ? 'is-locked' : ''}`}>
          <div className="rc__screen">
            <div className="rc__board" aria-hidden>
              {Array.from({ length: 16 }, (_, i) => (
                <span key={i} className={(Math.floor(i / 4) + i) % 2 ? 'dk' : ''}>
                  {[1, 3, 4, 6].includes(i) && <i className="pc pc--a" />}
                  {[9, 11, 12, 14].includes(i) && <i className="pc pc--b" />}
                </span>
              ))}
            </div>
            <span className="rc__turn">move 14 · your turn</span>
            {locked && <div className="rc__lock"><span>🔒</span>locked</div>}
            {match === 'forfeit' && <Stamp tone="signal" rotate={-12} className="rc__stamp">Forfeited</Stamp>}
            {match === 'saved' && <Stamp tone="ok" rotate={-10} className="rc__stamp">Match saved</Stamp>}
          </div>
          <span className="label">your phone</span>
        </div>

        <div className={`rc__wire rc__wire--${conn}`} aria-label={`Connection ${conn}`} role="img">
          <span className="rc__wire-line" />
          {conn === 'live' && <><i className="rc__pulse" /><i className="rc__pulse rc__pulse--2" /></>}
          <span className="rc__wire-label label">
            {conn === 'live' ? 'socket · heartbeat ok' : conn === 'down' ? 'socket closed' : 'reconnecting…'}
          </span>
        </div>

        <div className="rc__server">
          <div className="rc__rack" aria-hidden><i /><i /><i /></div>
          <span className="rc__server-state">
            {match === 'forfeit' ? 'match closed' : conn === 'live' ? 'in match' : layer ? 'holding match' : 'waiting…'}
          </span>
          <span className="label">server</span>
        </div>
      </div>

      {tries.length > 0 && (
        <div className="rc__backoff" aria-label="Reconnect attempts">
          {tries.map((t, i) =>
            t.kind === 'try' ? (
              <span key={i} className={`rc__try ${t.ok === true ? 'ok' : t.ok === false ? 'bad' : ''}`}>
                {t.ok === true ? '✓' : t.ok === false ? '✕' : '…'}
              </span>
            ) : (
              <span key={i} className="rc__wait" style={{ flexGrow: t.s }}>wait {t.s}s</span>
            )
          )}
        </div>
      )}

      <ol className="rc__log" aria-live="polite">
        {log.map((l, i) => (
          <li key={`${l.t}-${i}`} className={l.tone ? `is-${l.tone}` : ''}>
            <span>{fmt(l.t)}</span>
            {l.text}
          </li>
        ))}
      </ol>

      <div className="rc__controls">
        {locked ? (
          <button className="btn btn--signal" onClick={unlock}>Unlock phone</button>
        ) : (
          <button className="btn btn--signal" onClick={lock} disabled={match !== 'on' || conn !== 'live'}>🔒 Lock phone mid-match</button>
        )}
        <label className={`switch ${layer ? 'is-on' : ''}`}>
          <input type="checkbox" checked={layer} onChange={() => setLayer((v) => !v)} disabled={locked || conn !== 'live' || match !== 'on'} />
          <span className="switch__box" aria-hidden />
          Reconnect layer
        </label>
        <button className="btn btn--sm btn--ghost" onClick={reset}>Reset</button>
      </div>

      <Finding>
        {!result && (
          <p>Lock the phone mid-match, unlock it, and watch the connection. Then flip the reconnect layer off and try again.</p>
        )}
        {result && match === 'saved' && (
          <p>
            <strong>The match survived.</strong> Locked for {result.lockedS}s, back after {result.attempts} reconnect attempts,
            each wait twice as long as the last. The board came back from the server's copy, so nothing desynced.
          </p>
        )}
        {result && match === 'forfeit' && (
          <p>
            <strong>Match lost.</strong> Without the reconnect layer, locking the phone for {result.lockedS}s cost the whole game —
            exactly what the real layer in my checkers game prevents.
          </p>
        )}
        <p className="finding__note">A simulation of the real system: heartbeats, backoff retries, and state restored from the authoritative server.</p>
      </Finding>
    </div>
  )
}
