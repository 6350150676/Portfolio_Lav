import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { projects, personalInfo } from '../../data'

/* Inline, controller-driven side-scroller.
 *   A = Jump · B = Shoot · X = Dash · Y = Codex
 * SKILLS are power-ups you collect. BUGS and your PROJECTS are enemies:
 * shoot the bugs, and defeat each project "boss" to unlock it. Theme-aware. */

export type SkillGameHandle = { press: (b: string) => void }

const SKILLS = [
  'Unity', 'C#', 'OOP', 'Firebase', 'Unity Ads', 'ironSource', 'Google AdMob',
  'SDK Integration', 'Object Pooling', 'Addressables', 'Clean Architecture',
  'ScriptableObjects', 'UI/UX Systems', 'Optimization', 'REST APIs', 'Git',
]
const PCOLORS = ['#7c6cff', '#a78bfa', '#5b8cff', '#38bdf8', '#7c6cff']
const PLAYER_X = 150
const GRAV = 0.62
const JUMP = -11.5
const BULLET_SPEED = 16
const BASE_SPEED = 3.4

type Ent =
  | { id: string; type: 'skill'; wx: number; high: boolean; label: string; got: boolean }
  | { id: string; type: 'bug'; wx: number; baseWx: number; dead: boolean; amp: number; phase: number }
  | { id: string; type: 'boss'; wx: number; label: string; tag: string; color: string; hp: number; max: number; cd: number }

type Shot = { wx: number; y: number }

const PAL = {
  dark: { bg1: '#0a0e1a', bg2: '#0f1422', ground: 'rgba(124,108,255,0.5)', text: '#e7ecf6', sub: '#9aa6bb', star: 'rgba(124,108,255,0.28)' },
  light: { bg1: '#eaeefb', bg2: '#dde4f5', ground: 'rgba(107,79,251,0.55)', text: '#0e1525', sub: '#5b647a', star: 'rgba(107,79,251,0.22)' },
}

const SkillGame = forwardRef<SkillGameHandle, { height?: number }>(function SkillGame({ height = 360 }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [unlocked, setUnlocked] = useState<string[]>([])
  const [health, setHealth] = useState(3)
  const [codex, setCodex] = useState(false)
  const [done, setDone] = useState(false)
  const codexRef = useRef(false)
  useEffect(() => { codexRef.current = codex }, [codex])

  // immutable layout
  const layout = useMemo<Ent[]>(() => {
    const t: Ent[] = []
    let x = 700
    let pi = 0
    let bi = 0
    SKILLS.forEach((sk, i) => {
      t.push({ id: 's' + i, type: 'skill', wx: x, high: i % 3 === 0, label: sk, got: false })
      x += 235
      // patrolling bugs — more of them, 1–2 per stretch
      const count = i % 3 === 0 ? 2 : 1
      for (let k = 0; k < count; k++) {
        const bx = x + 70
        t.push({ id: 'b' + bi, type: 'bug', wx: bx, baseWx: bx, dead: false, amp: 36 + (bi % 3) * 16, phase: bi * 1.3 })
        bi++; x += 155
      }
      if (i % 4 === 3 && pi < projects.length) {
        const p = projects[pi]
        t.push({ id: 'B' + p.id, type: 'boss', wx: x + 80, label: p.title, tag: p.tagline, color: PCOLORS[pi % PCOLORS.length], hp: 6, max: 6, cd: 70 })
        pi++; x += 460
      }
    })
    while (pi < projects.length) {
      const p = projects[pi]
      t.push({ id: 'B' + p.id, type: 'boss', wx: x, label: p.title, tag: p.tagline, color: PCOLORS[pi % PCOLORS.length], hp: 6, max: 6, cd: 70 })
      pi++; x += 470
    }
    return t
  }, [])
  const endX = useMemo(() => layout[layout.length - 1].wx + 460, [layout])

  const ent = useRef<Ent[]>([])
  const gotRef = useRef<Set<string>>(new Set())
  const unlRef = useRef<Set<string>>(new Set())
  const G = useRef({
    cam: 0, py: 0, vy: 0, onGround: true, bullets: [] as Shot[], eshots: [] as Shot[],
    invuln: 0, dash: 0, hp: 3, score: 0, mode: 'idle' as 'idle' | 'playing' | 'done', blocked: false,
    t: 0, flash: 0, pop: 0,
    floats: [] as { wx: number; y: number; text: string; life: number; color: string }[],
    rings: [] as { wx: number; y: number; life: number; color: string }[],
  })

  const clone = () => layout.map((e) => ({ ...e }))
  useEffect(() => { ent.current = clone() }, []) // eslint-disable-line

  const reset = () => {
    const g = G.current
    Object.assign(g, { cam: 0, py: 0, vy: 0, onGround: true, bullets: [], eshots: [], invuln: 0, dash: 0, hp: 3, score: 0, mode: 'playing', blocked: false, t: 0, flash: 0, pop: 0, floats: [], rings: [] })
    ent.current = clone()
    gotRef.current = new Set(); unlRef.current = new Set()
    setSkills([]); setUnlocked([]); setHealth(3); setDone(false); setCodex(false)
  }
  const ensure = () => { if (G.current.mode !== 'playing') reset() }
  const jump = () => { ensure(); const g = G.current; if (g.onGround) { g.vy = JUMP; g.onGround = false } }
  const shoot = () => { ensure(); const g = G.current; const H = canvasRef.current?.clientHeight ?? height; g.bullets.push({ wx: g.cam + PLAYER_X + 20, y: H - 70 + g.py - 4 }); if (g.bullets.length > 28) g.bullets.shift() }
  const dash = () => { ensure(); const g = G.current; g.dash = 26; g.invuln = Math.max(g.invuln, 24) }
  const press = (b: string) => { if (b === 'A') jump(); else if (b === 'B') shoot(); else if (b === 'X') dash(); else if (b === 'Y') setCodex((c) => !c) }
  useImperativeHandle(ref, () => ({ press }))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let W = 0, H = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => { W = canvas.clientWidth; H = canvas.clientHeight; canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    resize()
    window.addEventListener('resize', resize)

    const hit = () => { const g = G.current; if (g.invuln > 0) return; g.invuln = 80; g.cam = Math.max(0, g.cam - 50); g.hp -= 1; if (g.hp <= 0) g.hp = 3; setHealth(g.hp) }

    const loop = () => {
      const g = G.current
      const pal = PAL[document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark']
      const groundY = H - 70
      const PS = 22

      if (g.mode === 'playing' && !codexRef.current) {
        // boss block
        let block = Infinity
        for (const e of ent.current) if (e.type === 'boss' && e.hp > 0) { const tg = e.wx - (PLAYER_X + 34); if (g.cam >= tg - 4 && g.cam <= tg + 240) block = Math.min(block, tg) }
        const speed = BASE_SPEED + (g.dash > 0 ? 6 : 0)
        if (block !== Infinity && g.cam + speed > block) { g.cam = block; g.blocked = true } else { g.cam += speed; g.blocked = false }
        if (g.dash > 0) g.dash--
        if (g.invuln > 0) g.invuln--
        g.t++
        g.vy += GRAV; g.py += g.vy
        if (g.py >= 0) { g.py = 0; g.vy = 0; g.onGround = true }
        for (const b of g.bullets) b.wx += BULLET_SPEED
        g.bullets = g.bullets.filter((b) => b.wx - g.cam < W + 40)
        for (const b of g.eshots) b.wx -= 7
        g.eshots = g.eshots.filter((b) => b.wx - g.cam > -30)
        const pwx = g.cam + PLAYER_X
        const py = groundY + g.py

        for (const e of ent.current) {
          if (e.type === 'skill' && !e.got) {
            const ey = e.high ? groundY - 100 : groundY - 6
            if (Math.abs(e.wx - pwx) < 28 && Math.abs(ey - py) < 38) {
              e.got = true; g.score += 50
              g.flash = 0.7; g.pop = 1
              g.floats.push({ wx: pwx, y: py - 30, text: e.label, life: 1, color: '#cdbbff' })
              g.rings.push({ wx: pwx, y: py, life: 1, color: '#a78bfa' })
              if (!gotRef.current.has(e.label)) { gotRef.current.add(e.label); setSkills(Array.from(gotRef.current)) }
              if (g.hp < 3) { g.hp += 1; setHealth(g.hp) } // power-up heals
            }
          } else if (e.type === 'bug' && !e.dead) {
            e.wx = e.baseWx + Math.sin(g.t * 0.035 + e.phase) * e.amp // patrol forward/back
            const ey = groundY - 12 + Math.sin(g.t * 0.06 + e.phase) * 12
            for (const b of g.bullets) if (Math.abs(b.wx - e.wx) < 22 && Math.abs(b.y - ey) < 22) { e.dead = true; b.wx = 1e9; g.score += 30; g.rings.push({ wx: e.wx, y: ey, life: 0.8, color: '#ff5470' }) }
            if (!e.dead && Math.abs(e.wx - pwx) < 24 && Math.abs(ey - py) < 26) { if (g.dash > 0) { e.dead = true; g.score += 30 } else hit() }
          } else if (e.type === 'boss' && e.hp > 0) {
            for (const b of g.bullets) if (b.wx - g.cam > PLAYER_X && Math.abs(b.wx - e.wx) < 38 && b.y > groundY - 78) { e.hp -= 2; b.wx = 1e9; g.score += 10 }
            if (e.hp <= 0) { g.score += 150; if (!unlRef.current.has(e.label)) { unlRef.current.add(e.label); setUnlocked(Array.from(unlRef.current)) } }
            // boss attacks while you fight it
            if (g.blocked && Math.abs(e.wx - (PLAYER_X + 34 + g.cam)) < 6) {
              e.cd--
              if (e.cd <= 0) { g.eshots.push({ wx: e.wx - 30, y: groundY - 4 }); e.cd = 80 }
            }
          }
        }
        // enemy shots hit player
        for (const b of g.eshots) if (Math.abs(b.wx - pwx) < 20 && Math.abs(b.y - py) < 22) { b.wx = -1e9; hit() }

        // VFX decay
        g.flash *= 0.9; g.pop *= 0.88
        for (const f of g.floats) { f.y -= 0.7; f.life -= 0.02 }
        g.floats = g.floats.filter((f) => f.life > 0)
        for (const r of g.rings) r.life -= 0.045
        g.rings = g.rings.filter((r) => r.life > 0)

        if (g.cam > endX) { g.mode = 'done'; setDone(true); setCodex(true) }
      }

      // ── RENDER ──
      ctx.clearRect(0, 0, W, H)
      const grad = ctx.createLinearGradient(0, 0, 0, H); grad.addColorStop(0, pal.bg1); grad.addColorStop(1, pal.bg2)
      ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = pal.star
      for (let i = 0; i < 50; i++) { const sx = ((i * 137 - g.cam * 0.3) % (W + 40) + W + 40) % (W + 40); const sy = (i * 53) % Math.max(40, H - 120); ctx.fillRect(sx, sy, 2, 2) }
      ctx.strokeStyle = pal.ground; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, groundY + 17); ctx.lineTo(W, groundY + 17); ctx.stroke()

      for (const e of ent.current) {
        const sx = e.wx - g.cam
        if (sx < -110 || sx > W + 110) continue
        if (e.type === 'skill' && !e.got) {
          const ey = e.high ? groundY - 100 : groundY - 6
          const pulse = 13 + Math.sin(g.cam * 0.05 + e.wx) * 1.5
          ctx.beginPath(); ctx.arc(sx, ey, pulse, 0, Math.PI * 2); ctx.fillStyle = 'rgba(124,108,255,0.2)'; ctx.fill()
          ctx.lineWidth = 2; ctx.strokeStyle = '#a78bfa'; ctx.stroke()
          ctx.fillStyle = '#cdbbff'; ctx.font = '700 11px "JetBrains Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('+', sx, ey + 4)
          ctx.fillStyle = pal.text; ctx.font = '600 10px "JetBrains Mono", monospace'; ctx.fillText(e.label, sx, ey - 22)
        } else if (e.type === 'bug' && !e.dead) {
          const ey = groundY - 12 + Math.sin(g.t * 0.06 + e.phase) * 12
          ctx.fillStyle = '#ff5470'; roundRect(ctx, sx - 12, ey - 9, 24, 18, 6); ctx.fill()
          // legs
          ctx.strokeStyle = '#ff5470'; ctx.lineWidth = 2
          ctx.beginPath(); ctx.moveTo(sx - 10, ey + 8); ctx.lineTo(sx - 14, ey + 13); ctx.moveTo(sx + 10, ey + 8); ctx.lineTo(sx + 14, ey + 13); ctx.stroke()
          ctx.fillStyle = '#fff'; ctx.fillRect(sx - 5, ey - 3, 4, 4); ctx.fillRect(sx + 1, ey - 3, 4, 4)
        } else if (e.type === 'boss') {
          const alive = e.hp > 0
          ctx.fillStyle = alive ? `${e.color}22` : `${e.color}14`
          roundRect(ctx, sx - 32, groundY - 80, 64, 92, 10); ctx.fill()
          ctx.lineWidth = 2.5; ctx.strokeStyle = e.color; ctx.stroke(); ctx.textAlign = 'center'
          if (alive) {
            // angry eyes
            ctx.fillStyle = e.color; ctx.fillRect(sx - 16, groundY - 60, 11, 7); ctx.fillRect(sx + 5, groundY - 60, 11, 7)
            ctx.fillStyle = pal.bg1; ctx.fillRect(sx - 13, groundY - 58, 4, 4); ctx.fillRect(sx + 8, groundY - 58, 4, 4)
            // mouth
            ctx.fillStyle = e.color; ctx.fillRect(sx - 12, groundY - 42, 24, 4)
            ctx.fillStyle = pal.sub; ctx.font = '500 8px "JetBrains Mono", monospace'; ctx.fillText('SHOOT (B)', sx, groundY - 24)
            // hp bar
            ctx.fillStyle = 'rgba(127,127,127,0.4)'; ctx.fillRect(sx - 26, groundY - 92, 52, 5)
            ctx.fillStyle = e.color; ctx.fillRect(sx - 26, groundY - 92, 52 * (e.hp / e.max), 5)
            ctx.fillStyle = pal.text; ctx.font = '700 8px "Space Grotesk", sans-serif'; wrap(ctx, e.label, sx, groundY - 12, 58, 9)
          } else {
            ctx.fillStyle = e.color; ctx.font = '700 10px "Space Grotesk", sans-serif'; wrap(ctx, e.label, sx, groundY - 46, 56, 12)
            ctx.fillStyle = pal.sub; ctx.font = '500 7px "JetBrains Mono", monospace'; ctx.fillText('UNLOCKED ✓', sx, groundY + 4)
          }
        }
      }

      // VFX rings
      for (const r of g.rings) {
        const rx = r.wx - g.cam
        ctx.globalAlpha = Math.max(0, r.life)
        ctx.beginPath(); ctx.arc(rx, r.y, (1 - r.life) * 34 + 6, 0, Math.PI * 2)
        ctx.strokeStyle = r.color; ctx.lineWidth = 2; ctx.stroke()
        ctx.globalAlpha = 1
      }

      // bullets / enemy shots
      ctx.fillStyle = '#7cf6ff'
      for (const b of g.bullets) { const bx = b.wx - g.cam; if (bx < W + 20) { roundRect(ctx, bx, b.y - 2, 12, 4, 2); ctx.fill() } }
      ctx.fillStyle = '#ff8a5b'
      for (const b of g.eshots) { const bx = b.wx - g.cam; if (bx > -20) { ctx.beginPath(); ctx.arc(bx, b.y, 4, 0, Math.PI * 2); ctx.fill() } }

      // player
      const py = groundY + g.py
      if (g.flash > 0.02) { ctx.globalAlpha = g.flash * 0.5; ctx.fillStyle = '#cdbbff'; ctx.beginPath(); ctx.arc(PLAYER_X, py, PS * 1.35, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1 }
      const grow = 1 + Math.min(gotRef.current.size * 0.014, 0.22) + g.pop * 0.4 // grows as it powers up
      const ps = PS * grow
      const inv = g.invuln > 0 && Math.floor(g.invuln / 4) % 2 === 0
      ctx.fillStyle = inv ? '#7c84a0' : '#a78bfa'; roundRect(ctx, PLAYER_X - ps / 2, py - ps / 2, ps, ps, 6); ctx.fill()
      ctx.fillStyle = pal.bg1; ctx.fillRect(PLAYER_X + ps * 0.12, py - 5, 4, 4)
      ctx.fillStyle = '#cdbbff'; ctx.fillRect(PLAYER_X + ps / 2 - 2, py - 2, 13, 5)

      // floating power-up labels
      ctx.textAlign = 'center'
      for (const f of g.floats) {
        ctx.globalAlpha = Math.max(0, f.life)
        ctx.fillStyle = f.color; ctx.font = '700 11px "JetBrains Mono", monospace'
        ctx.fillText('+ ' + f.text, f.wx - g.cam, f.y)
        ctx.globalAlpha = 1
      }

      // HUD
      ctx.textAlign = 'left'; ctx.fillStyle = pal.text; ctx.font = '600 11px "JetBrains Mono", monospace'
      ctx.fillText(`SCORE ${g.score}`, 14, 20)
      ctx.fillStyle = pal.sub; ctx.font = '500 10px "JetBrains Mono", monospace'
      ctx.fillText(`SKILLS ${gotRef.current.size}/${SKILLS.length}  ·  PROJECTS ${unlRef.current.size}/${projects.length}`, 14, 36)
      for (let i = 0; i < 3; i++) { ctx.fillStyle = i < g.hp ? '#ff5470' : 'rgba(127,127,127,0.3)'; roundRect(ctx, W - 16 - (3 - i) * 18, 12, 13, 13, 3); ctx.fill() }
      const prog = Math.min(1, g.cam / endX)
      ctx.fillStyle = 'rgba(127,127,127,0.25)'; ctx.fillRect(W / 2 - 90, 14, 180, 5); ctx.fillStyle = '#7c6cff'; ctx.fillRect(W / 2 - 90, 14, 180 * prog, 5)

      ctx.textAlign = 'center'
      if (g.mode === 'idle') {
        ctx.fillStyle = pal.text; ctx.font = '700 18px "Space Grotesk", sans-serif'; ctx.fillText('SKILL RUN', W / 2, H / 2 - 18)
        ctx.fillStyle = pal.sub; ctx.font = '500 11px "JetBrains Mono", monospace'
        ctx.fillText('press A to start — collect skills, defeat projects', W / 2, H / 2 + 4)
        ctx.fillText('A jump · B shoot · X dash · Y codex', W / 2, H / 2 + 22)
      } else if (g.blocked) {
        ctx.fillStyle = '#ffd166'; ctx.font = '600 12px "JetBrains Mono", monospace'; ctx.fillText('BOSS! PRESS  B  TO DEFEAT IT', PLAYER_X + 250, groundY - 100)
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [endX, height])

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height, display: 'block', borderRadius: 14, border: '1px solid var(--border-strong)', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.35)' }} />

      {codex && (
        <div style={{ position: 'absolute', inset: 0, background: 'color-mix(in srgb, var(--surface) 90%, transparent)', backdropFilter: 'blur(6px)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ width: '100%', maxHeight: '100%', overflowY: 'auto', padding: '0.5rem 0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)' }}>{done ? 'Run complete!' : 'Codex'}</h3>
              <button onClick={() => setCodex(false)} className="btn btn-ghost" style={{ marginLeft: 'auto', padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>{done ? 'Play again ▸' : 'Resume ▸'}</button>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.18em', color: 'var(--accent)', marginBottom: '0.5rem' }}>SKILLS · POWER-UPS {skills.length}/{SKILLS.length}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
              {SKILLS.map((sk) => { const g = skills.includes(sk); return (
                <span key={sk} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', padding: '0.22rem 0.55rem', borderRadius: 999, border: `1px solid ${g ? 'var(--accent)' : 'var(--border)'}`, color: g ? 'var(--text)' : 'var(--text-faint)', background: g ? 'var(--accent-soft)' : 'transparent' }}>{g ? '✓ ' : ''}{sk}</span>
              ) })}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.18em', color: 'var(--accent)', marginBottom: '0.5rem' }}>PROJECTS · DEFEATED {unlocked.length}/{projects.length}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' }}>
              {projects.map((p) => { const g = unlocked.includes(p.title); return (
                <div key={p.id} style={{ border: `1px solid ${g ? p.color + '66' : 'var(--border)'}`, borderRadius: 9, padding: '0.6rem', background: g ? `${p.color}10` : 'transparent', opacity: g ? 1 : 0.5 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.82rem', color: 'var(--text)' }}>{g ? p.title : '???'}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: 3, lineHeight: 1.35 }}>{g ? p.tagline : 'Defeat its boss (B) to unlock'}</div>
                </div>
              ) })}
            </div>
            {done && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <a href="/resume.pdf" download="Lav_Naruka_Resume.pdf" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Download CV</a>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>GitHub</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
})

export default SkillGame

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath()
}
function wrap(ctx: CanvasRenderingContext2D, text: string, cx: number, y: number, maxW: number, lh: number) {
  const words = text.split(' '); let line = ''; const lines: string[] = []
  for (const w of words) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w } else line = t }
  if (line) lines.push(line)
  lines.slice(0, 2).forEach((l, i) => ctx.fillText(l, cx, y + i * lh))
}
