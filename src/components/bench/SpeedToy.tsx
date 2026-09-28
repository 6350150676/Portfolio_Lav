import { useEffect, useRef, useState } from 'react'
import { Finding } from './BenchCard'
import { useCanvasSize, useInView, useLabColors, useReducedMotion } from './useLab'

/* EXPERIMENT — "Can 'fast' be felt without going any faster?"
 * From the car racer's speed-reactive chase camera. The car never changes
 * speed; only the camera does. */

const V = 26.7 // m/s
const KMH = Math.round(V * 3.6)
const CAM_H = 1.25
const ROAD = 3.4

type Fx = { fov: boolean; blur: boolean; shake: boolean }
const FX_LABEL: Record<keyof Fx, string> = { fov: 'FOV kick', blur: 'Motion blur', shake: 'Camera shake' }

export default function SpeedToy() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const size = useCanvasSize(canvasRef)
  const [colors, themeVersion] = useLabColors()
  const inView = useInView(wrapRef)
  const reduced = useReducedMotion()
  const [playing, setPlaying] = useState(!reduced)
  const [fx, setFx] = useState<Fx>({ fov: false, blur: false, shake: false })
  const fxRef = useRef(fx)
  fxRef.current = fx
  const [answer, setAnswer] = useState<null | 'faster' | 'same'>(null)
  const sim = useRef({ travel: 0, fov: 55 })

  useEffect(() => {
    const c = canvasRef.current
    if (!c || !size.w) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const W = size.w
    const H = size.h

    const step = (dt: number) => {
      const s = sim.current
      s.travel += V * dt
      const target = fxRef.current.fov ? 84 : 55
      s.fov += (target - s.fov) * Math.min(1, dt * 3)
    }

    const draw = () => {
      const s = sim.current
      const f = fxRef.current
      const col = colors.current
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = col.card
      ctx.fillRect(0, 0, W, H)

      ctx.save()
      if (f.shake) ctx.translate((Math.random() - 0.5) * 3.4, (Math.random() - 0.5) * 2.6)
      const F = W / 2 / Math.tan((s.fov * Math.PI) / 360)
      const cx = W / 2
      const hy = H * 0.42
      const P = (x: number, y: number, z: number): [number, number] => [cx + (x * F) / z, hy + ((CAM_H - y) * F) / z]
      const seg = (a: [number, number], b: [number, number]) => {
        ctx.beginPath()
        ctx.moveTo(a[0], a[1])
        ctx.lineTo(b[0], b[1])
        ctx.stroke()
      }
      const quad = (a: [number, number], b: [number, number], c2: [number, number], d: [number, number]) => {
        ctx.beginPath()
        ctx.moveTo(a[0], a[1])
        ctx.lineTo(b[0], b[1])
        ctx.lineTo(c2[0], c2[1])
        ctx.lineTo(d[0], d[1])
        ctx.closePath()
        ctx.fill()
      }

      // distant hills — hand-drawn bumps on the horizon
      ctx.strokeStyle = col.ink3
      ctx.lineWidth = 1.2
      ctx.beginPath()
      for (let x = -20; x <= W + 20; x += 8) {
        const y = hy - 10 - Math.sin(x * 0.012) * 9 - Math.sin(x * 0.031 + 1) * 5
        if (x === -20) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.strokeStyle = col.ink2
      seg([0, hy], [W, hy])

      // road edges
      ctx.strokeStyle = col.ink
      ctx.lineWidth = 1.8
      for (const side of [-1, 1]) seg(P(side * ROAD, 0, 1.1), P(side * ROAD, 0, 140))

      // centre dashes
      ctx.fillStyle = col.ink
      const off = s.travel % 9
      for (let k = 0; k < 16; k++) {
        const z0 = k * 9 - off + 1.5
        const z1 = z0 + 4
        if (z1 < 1.1) continue
        const zs = Math.max(z0, 1.1)
        const hw = 0.12
        if (f.blur) {
          ctx.globalAlpha = 0.28
          const zb = z1 + V * 0.09 // where the dash was a moment ago
          quad(P(-hw, 0, zs), P(hw, 0, zs), P(hw, 0, zb), P(-hw, 0, zb))
          ctx.globalAlpha = 1
        }
        quad(P(-hw, 0, zs), P(hw, 0, zs), P(hw, 0, z1), P(-hw, 0, z1))
      }

      // roadside posts with reflectors
      const off2 = s.travel % 12
      for (let k = 0; k < 12; k++) {
        const z = k * 12 - off2 + 2
        if (z < 1.3) continue
        for (const side of [-1, 1]) {
          const x = side * 5.4
          const base = P(x, 0, z)
          const top = P(x, 1.3, z)
          if (f.blur) {
            const zb = z + V * 0.1 // where the post was a moment ago
            ctx.globalAlpha = 0.22
            ctx.fillStyle = col.ink2
            quad(base, top, P(x, 1.3, zb), P(x, 0, zb))
            ctx.globalAlpha = 1
          }
          ctx.strokeStyle = col.ink
          ctx.lineWidth = Math.max(1, (0.13 * F) / z)
          seg(base, top)
          ctx.fillStyle = col.signal
          const rw = Math.max(1.5, (0.14 * F) / z)
          ctx.fillRect(top[0] - rw / 2, top[1], rw, rw * 1.3)
        }
      }

      // speed lines at the edges of vision
      if (f.blur) {
        ctx.strokeStyle = col.ink2
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.35
        const R = Math.hypot(W, H) / 2
        for (let i = 0; i < 26; i++) {
          const a = Math.random() * Math.PI * 2
          const r1 = R * (0.55 + Math.random() * 0.25)
          const r2 = r1 + 30 + Math.random() * 70
          seg([cx + Math.cos(a) * r1, hy + Math.sin(a) * r1], [cx + Math.cos(a) * r2, hy + Math.sin(a) * r2])
        }
        ctx.globalAlpha = 1
      }

      // the car, seen from the chase cam
      const cw = Math.min(W * 0.3, 230)
      const ch = cw * 0.36
      const bx = cx - cw / 2
      const by = H - ch - H * 0.07
      ctx.fillStyle = col.card2
      ctx.strokeStyle = col.ink
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(bx + cw * 0.2, by)
      ctx.lineTo(bx + cw * 0.8, by)
      ctx.lineTo(bx + cw * 0.92, by + ch * 0.42)
      ctx.lineTo(bx + cw, by + ch * 0.5)
      ctx.lineTo(bx + cw, by + ch)
      ctx.lineTo(bx, by + ch)
      ctx.lineTo(bx, by + ch * 0.5)
      ctx.lineTo(bx + cw * 0.08, by + ch * 0.42)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = col.ink2
      ctx.globalAlpha = 0.25
      ctx.fillRect(bx + cw * 0.26, by + ch * 0.1, cw * 0.48, ch * 0.26)
      ctx.globalAlpha = 1
      ctx.fillStyle = col.signal
      ctx.fillRect(bx + cw * 0.05, by + ch * 0.58, cw * 0.14, ch * 0.13)
      ctx.fillRect(bx + cw * 0.81, by + ch * 0.58, cw * 0.14, ch * 0.13)
      ctx.fillStyle = col.ink
      ctx.fillRect(bx + cw * 0.06, by + ch, cw * 0.16, ch * 0.16)
      ctx.fillRect(bx + cw * 0.78, by + ch, cw * 0.16, ch * 0.16)
      ctx.restore()
    }

    let raf = 0
    let last = performance.now()
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      step(dt)
      draw()
      raf = requestAnimationFrame(frame)
    }
    if (inView && playing) raf = requestAnimationFrame(frame)
    else draw()
    return () => cancelAnimationFrame(raf)
  }, [inView, playing, size.w, size.h, themeVersion, fx, colors])

  const toggle = (k: keyof Fx) => {
    setFx((f) => ({ ...f, [k]: !f[k] }))
    setAnswer(null)
  }
  const on = (Object.keys(fx) as (keyof Fx)[]).filter((k) => fx[k]).map((k) => FX_LABEL[k].toLowerCase())
  const list = on.length > 1 ? `${on.slice(0, -1).join(', ')} and ${on[on.length - 1]}` : on[0]

  return (
    <div className="sp" ref={wrapRef}>
      <div className="sp__screen">
        <canvas ref={canvasRef} className="sp__canvas" aria-label="Chase-camera view of a car on a road" role="img" />
        <span className="sp__hud label">chase cam</span>
        <span className="sp__speedo">
          <b>{KMH}</b> km/h
          <small>constant</small>
        </span>
        <button className="sp__play label" onClick={() => setPlaying((p) => !p)}>
          {playing ? '❚❚ pause' : '▶ play'}
        </button>
      </div>

      <div className="sp__controls" role="group" aria-label="Camera effects">
        {(Object.keys(FX_LABEL) as (keyof Fx)[]).map((k) => (
          <label key={k} className={`switch ${fx[k] ? 'is-on' : ''}`}>
            <input type="checkbox" checked={fx[k]} onChange={() => toggle(k)} />
            <span className="switch__box" aria-hidden />
            {FX_LABEL[k]}
          </label>
        ))}
      </div>

      <Finding>
        {!on.length && (
          <p>Baseline: {KMH} km/h, no camera tricks. Switch them on one at a time and watch the speedometer — it won't move.</p>
        )}
        {on.length > 0 && !answer && (
          <>
            <p>Still exactly {KMH} km/h, now with {list}. Does it feel faster?</p>
            <div className="finding__choices">
              <button className="btn btn--sm btn--signal" onClick={() => setAnswer('faster')}>Yes, faster</button>
              <button className="btn btn--sm" onClick={() => setAnswer('same')}>Same to me</button>
            </div>
          </>
        )}
        {answer === 'faster' && (
          <p>
            <strong>Your result: faster — at the same {KMH} km/h.</strong> Speed is partly a camera effect. My racer's chase cam
            widens its field of view and adds motion blur as the car speeds up, for exactly this reason.
          </p>
        )}
        {answer === 'same' && (
          <p>
            <strong>Your result: no difference.</strong> Fair — it's subtle on a flat sketch. In the racer these effects ramp
            with real speed, so you feel the change rather than a fixed level.
          </p>
        )}
      </Finding>
    </div>
  )
}
