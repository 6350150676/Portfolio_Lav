import { useEffect, useRef, useState } from 'react'
import { Finding } from './BenchCard'
import { fmtTime, useCanvasSize, useInView, useLabColors } from './useLab'

/* EXPERIMENT — "Can a heartbeat set the pace of a climb?"
 * From the VR acrophobia-therapy project: virtual height only rises while
 * the patient stays calm. Here the pulse is simulated; hold "breathe" to
 * bring it down. Switch pacing off to see why the real rig needed it. */

const GOAL = 50 // metres
const CALM = 100 // bpm — the platform only climbs below this
const PANIC = 135
const RATE = 1.6 // m/s while climbing
const SAMPLE_HZ = 150

type Phase = 'idle' | 'climbing' | 'holding' | 'done' | 'aborted'

// one heartbeat, p in [0,1): P wave, QRS spike, T wave
function ecg(p: number) {
  const g = (c: number, w: number, a: number) => a * Math.exp(-(((p - c) / w) ** 2))
  return g(0.15, 0.03, 0.12) + g(0.3, 0.008, -0.12) + g(0.32, 0.011, 1) + g(0.345, 0.01, -0.28) + g(0.56, 0.05, 0.26)
}

export default function HeartToy() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const size = useCanvasSize(canvasRef)
  const [colors, themeVersion] = useLabColors()
  const inView = useInView(wrapRef)

  const [adaptive, setAdaptive] = useState(true)
  const [phase, setPhase] = useState<Phase>('idle')
  const [view, setView] = useState({ h: 0, bpm: 72, beat: 0 })
  const [summary, setSummary] = useState({ ms: 0, holds: 0, h: 0, bpm: 0 })
  const breathing = useRef(false)
  const [breathingUi, setBreathingUi] = useState(false)

  const sim = useRef({ h: 0, bpm: 72, phase: 'idle' as Phase, beatPhase: 0, t: 0, holds: 0, buf: [] as number[], acc: 0, beats: 0 })
  const adaptiveRef = useRef(adaptive)
  adaptiveRef.current = adaptive

  const start = () => {
    sim.current = { h: 0, bpm: 72, phase: 'climbing', beatPhase: 0, t: 0, holds: 0, buf: sim.current.buf, acc: 0, beats: 0 }
    setPhase('climbing')
  }

  useEffect(() => {
    const c = canvasRef.current
    if (!c || !size.w) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const W = size.w
    const H = size.h
    const maxSamples = Math.round(SAMPLE_HZ * 4)

    const step = (dt: number) => {
      const s = sim.current
      const running = s.phase === 'climbing' || s.phase === 'holding'
      const climbing = s.phase === 'climbing'
      const b = breathing.current
      let target: number
      if (!running) target = 72
      else if (adaptiveRef.current) target = 70 + s.h * 0.75 + (climbing ? 7 : 0) - (b ? 24 : 0)
      else target = 80 + s.h * 1.5 - (b ? 10 : 0)
      target += Math.sin(s.t * 0.7) * 1.4
      s.bpm += (target - s.bpm) * Math.min(1, dt * 0.8)
      s.t += dt

      if (running) {
        let next: Phase = adaptiveRef.current ? (s.bpm < CALM ? 'climbing' : 'holding') : 'climbing'
        if (next === 'climbing') s.h = Math.min(GOAL, s.h + RATE * dt)
        if (s.phase === 'climbing' && next === 'holding') s.holds++
        if (!adaptiveRef.current && s.bpm > PANIC) next = 'aborted'
        if (s.h >= GOAL) next = 'done'
        if (next !== s.phase) {
          s.phase = next
          setPhase(next)
          if (next === 'done' || next === 'aborted') {
            setSummary({ ms: s.t * 1000, holds: s.holds, h: s.h, bpm: Math.round(s.bpm) })
          }
        }
      }

      // chart recorder: sample the waveform at a fixed rate
      s.acc += dt
      while (s.acc >= 1 / SAMPLE_HZ) {
        s.acc -= 1 / SAMPLE_HZ
        const prev = s.beatPhase
        s.beatPhase = (s.beatPhase + s.bpm / 60 / SAMPLE_HZ) % 1
        if (s.beatPhase < prev) s.beats++
        s.buf.push(ecg(s.beatPhase))
        if (s.buf.length > maxSamples) s.buf.shift()
      }
    }

    const draw = () => {
      const col = colors.current
      const s = sim.current
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = col.card
      ctx.fillRect(0, 0, W, H)
      // chart paper
      ctx.strokeStyle = col.signal
      for (let x = 0; x <= W; x += 12) {
        ctx.globalAlpha = x % 60 === 0 ? 0.22 : 0.08
        ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); ctx.stroke()
      }
      for (let y = 0; y <= H; y += 12) {
        ctx.globalAlpha = y % 60 === 0 ? 0.22 : 0.08
        ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); ctx.stroke()
      }
      ctx.globalAlpha = 1
      // calm threshold marker
      const mid = H * 0.62
      const amp = H * 0.5
      // trace
      const buf = s.buf
      ctx.strokeStyle = col.ink
      ctx.lineWidth = 1.8
      ctx.lineJoin = 'round'
      ctx.beginPath()
      const dx = W / maxSamples
      const x0 = W - buf.length * dx
      for (let i = 0; i < buf.length; i++) {
        const x = x0 + i * dx
        const y = mid - buf[i] * amp
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      // pen tip
      if (buf.length) {
        ctx.fillStyle = col.signal
        ctx.beginPath()
        ctx.arc(W - 2, mid - buf[buf.length - 1] * amp, 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let raf = 0
    let last = performance.now()
    let uiT = 0
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      step(dt)
      draw()
      uiT += dt
      if (uiT > 0.08) {
        uiT = 0
        const s = sim.current
        setView({ h: s.h, bpm: Math.round(s.bpm), beat: s.beats })
      }
      raf = requestAnimationFrame(frame)
    }
    if (inView) raf = requestAnimationFrame(frame)
    else draw()
    return () => cancelAnimationFrame(raf)
  }, [inView, size.w, size.h, themeVersion, colors])

  const breathe = (on: boolean) => {
    breathing.current = on
    setBreathingUi(on)
  }

  const running = phase === 'climbing' || phase === 'holding'
  const pct = (view.h / GOAL) * 100
  const stateLabel: Record<Phase, string> = {
    idle: 'Standby',
    climbing: 'Climbing',
    holding: `Holding — pulse over ${CALM}`,
    done: 'Session complete',
    aborted: 'Session aborted',
  }

  return (
    <div className="ht" ref={wrapRef}>
      <div className="ht__rig">
        <div className="ht__alt" aria-label={`Height ${view.h.toFixed(1)} metres of ${GOAL}`} role="img">
          <div className="ht__alt-scale">
            {[50, 40, 30, 20, 10, 0].map((m) => (
              <span key={m} style={{ bottom: `${(m / GOAL) * 100}%` }}>{m}</span>
            ))}
          </div>
          <div className="ht__alt-shaft">
            <div className="ht__alt-fill" style={{ height: `${pct}%` }} />
            <div className="ht__platform" style={{ bottom: `${pct}%` }}>
              <span className="ht__person" />
            </div>
          </div>
          <div className="ht__alt-read"><b>{view.h.toFixed(1)}</b> m</div>
        </div>

        <div className="ht__monitor">
          <div className="ht__monitor-head">
            <span className={`ht__state ht__state--${phase}`}>{stateLabel[phase]}</span>
            <span className="ht__bpm">
              <span key={view.beat} className="ht__heart" aria-hidden>♥</span>
              <b>{view.bpm}</b> bpm
            </span>
          </div>
          <canvas ref={canvasRef} className="ht__canvas" role="img" aria-label={`Simulated pulse trace, ${view.bpm} beats per minute`} />
          <div className="ht__monitor-foot label">
            <span>simulated pulse</span>
            <span>{adaptive ? `climbs only below ${CALM} bpm` : 'pacing off — climbs regardless'}</span>
          </div>
        </div>
      </div>

      <div className="ht__controls">
        {phase === 'idle' || phase === 'done' || phase === 'aborted' ? (
          // distinct keys: releasing a held "breathe" must not land as a click on this button
          <button key="start" className="btn btn--signal" onClick={start}>{phase === 'idle' ? '▶ Start session' : '↺ Run again'}</button>
        ) : (
          <button
            key="breathe"
            className={`btn ht__breathe ${breathingUi ? 'is-on' : ''}`}
            onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); breathe(true) }}
            onPointerUp={() => breathe(false)}
            onPointerCancel={() => breathe(false)}
            onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); breathe(true) } }}
            onKeyUp={(e) => { if (e.key === ' ' || e.key === 'Enter') breathe(false) }}
            onBlur={() => breathe(false)}
            onContextMenu={(e) => e.preventDefault()}
          >
            {breathingUi ? 'Breathing… slowly…' : 'Hold to breathe'}
          </button>
        )}
        <label className={`switch ${adaptive ? 'is-on' : ''}`}>
          <input type="checkbox" checked={adaptive} onChange={() => setAdaptive((a) => !a)} disabled={running} />
          <span className="switch__box" aria-hidden />
          Heart-rate pacing
        </label>
      </div>

      <Finding>
        {phase === 'idle' && (
          <p>Press start. The platform only rises while the pulse stays under {CALM} bpm — hold <em>breathe</em> when it creeps up.</p>
        )}
        {running && adaptive && (
          <p>{phase === 'holding' ? 'Pulse is high, so the climb is waiting for you. Breathe.' : 'Climbing. Watch what the pulse does as the ground drops away.'}</p>
        )}
        {running && !adaptive && <p>Pacing is off: the height keeps rising on a timer, whatever the pulse says.</p>}
        {phase === 'done' && (
          <p>
            <strong>Reached {GOAL} m in {fmtTime(summary.ms)}.</strong>{' '}
            {summary.holds === 0
              ? 'You kept the pulse under the line the whole way, so the climb never had to wait.'
              : `The climb paused ${summary.holds} ${summary.holds === 1 ? 'time' : 'times'} to wait for you — the pace was set by the heartbeat, not a timer.`}
          </p>
        )}
        {phase === 'aborted' && (
          <p>
            <strong>Aborted at {summary.h.toFixed(1)} m — pulse hit {summary.bpm} bpm.</strong> With pacing off, the height rises no
            matter how the patient feels. That's the problem the real project solved.
          </p>
        )}
        <p className="finding__note">
          The real rig read a pulse sensor on an ESP32 and streamed it to Unity over BLE. This one is a simulation.
        </p>
      </Finding>
    </div>
  )
}
