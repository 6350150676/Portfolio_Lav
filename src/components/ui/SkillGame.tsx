import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { projects, personalInfo } from '../../data'

/* Inline, controller-driven side-scroller. The 3D gamepad's buttons call
 * `press(btn)`:  A = Jump · B = Shoot · X = Dash · Y = Codex.
 * Collect skills, shoot open project crates. Theme-aware (day/night). */

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
const BULLET_SPEED = 15
const BASE_SPEED = 3.6

type Entity =
  | { id: string; type: 'skill'; wx: number; high: boolean; label: string; got?: boolean }
  | { id: string; type: 'drone'; wx: number; dead?: boolean; phase: number }
  | { id: string; type: 'project'; wx: number; label: string; tag: string; color: string; hp: number }

const PALETTES = {
  dark: { bg1: '#0a0e1a', bg2: '#0f1422', ground: 'rgba(124,108,255,0.5)', grid: 'rgba(124,108,255,0.07)', text: '#e7ecf6', sub: '#9aa6bb', star: 'rgba(124,108,255,0.28)' },
  light: { bg1: '#eaeefb', bg2: '#dde4f5', ground: 'rgba(107,79,251,0.55)', grid: 'rgba(107,79,251,0.08)', text: '#0e1525', sub: '#5b647a', star: 'rgba(107,79,251,0.22)' },
}

const SkillGame = forwardRef<SkillGameHandle, { height?: number }>(function SkillGame({ height = 340 }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [unlocked, setUnlocked] = useState<{ title: string; tag: string; color: string }[]>([])
  const [health, setHealth] = useState(3)
  const [codex, setCodex] = useState(false)
  const [done, setDone] = useState(false)
  const codexRef = useRef(false)
  useEffect(() => { codexRef.current = codex }, [codex])

  const track = useMemo<Entity[]>(() => {
    const t: Entity[] = []
    let x = 720
    let pi = 0
    SKILLS.forEach((sk, i) => {
      t.push({ id: 's' + i, type: 'skill', wx: x, high: i % 3 === 0, label: sk })
      x += 290
      if (i % 2 === 1) { t.push({ id: 'd' + i, type: 'drone', wx: x + 100, phase: i }); x += 240 }
      if (i % 4 === 3 && pi < projects.length) {
        const p = projects[pi]
        t.push({ id: 'p' + p.id, type: 'project', wx: x + 60, label: p.title, tag: p.tagline, color: PCOLORS[pi % PCOLORS.length], hp: 3 })
        pi++; x += 440
      }
    })
    while (pi < projects.length) {
      const p = projects[pi]
      t.push({ id: 'p' + p.id, type: 'project', wx: x, label: p.title, tag: p.tagline, color: PCOLORS[pi % PCOLORS.length], hp: 3 })
      pi++; x += 440
    }
    return t
  }, [])
  const endX = useMemo(() => track[track.length - 1].wx + 480, [track])

  const G = useRef({ cam: 0, py: 0, vy: 0, onGround: true, bullets: [] as { wx: number; y: number }[], invuln: 0, dash: 0, hp: 3, mode: 'idle' as 'idle' | 'playing' | 'over' | 'done', blocked: false })

  const reset = () => {
    const g = G.current
    g.cam = 0; g.py = 0; g.vy = 0; g.onGround = true; g.bullets = []; g.invuln = 0; g.dash = 0; g.hp = 3; g.mode = 'playing'
    track.forEach((e) => { if (e.type === 'skill') e.got = false; if (e.type === 'drone') e.dead = false; if (e.type === 'project') e.hp = 3 })
    setSkills([]); setUnlocked([]); setHealth(3); setDone(false); setCodex(false)
  }
  const ensurePlaying = () => { const g = G.current; if (g.mode !== 'playing') reset() }
  const jump = () => { ensurePlaying(); const g = G.current; if (g.onGround) { g.vy = JUMP; g.onGround = false } }
  const shoot = () => {
    ensurePlaying()
    const g = G.current
    const H = canvasRef.current?.clientHeight ?? height
    g.bullets.push({ wx: g.cam + PLAYER_X + 20, y: H - 70 + g.py - 4 })
    if (g.bullets.length > 30) g.bullets.shift()
  }
  const dash = () => { ensurePlaying(); const g = G.current; g.dash = 26; g.invuln = Math.max(g.invuln, 22) }

  const press = (b: string) => {
    if (b === 'A') jump()
    else if (b === 'B') shoot()
    else if (b === 'X') dash()
    else if (b === 'Y') setCodex((c) => !c)
  }
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
    const got = new Set<string>()

    const loop = () => {
      const g = G.current
      const pal = PALETTES[document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark']
      const groundY = H - 70
      const PSIZE = 22

      if (g.mode === 'playing' && !codexRef.current) {
        let blockCam = Infinity
        for (const e of track) if (e.type === 'project' && e.hp > 0) {
          const target = e.wx - (PLAYER_X + 30)
          if (g.cam >= target - 4 && g.cam <= target + 240) blockCam = Math.min(blockCam, target)
        }
        const speed = BASE_SPEED + (g.dash > 0 ? 6 : 0)
        if (blockCam !== Infinity && g.cam + speed > blockCam) { g.cam = blockCam; g.blocked = true } else { g.cam += speed; g.blocked = false }
        if (g.dash > 0) g.dash--
        if (g.invuln > 0) g.invuln--
        g.vy += GRAV; g.py += g.vy
        if (g.py >= 0) { g.py = 0; g.vy = 0; g.onGround = true }
        for (const b of g.bullets) b.wx += BULLET_SPEED
        g.bullets = g.bullets.filter((b) => b.wx - g.cam < W + 40)
        const playerWx = g.cam + PLAYER_X
        const playerY = groundY + g.py
        for (const e of track) {
          if (e.type === 'skill' && !e.got) {
            const ey = e.high ? groundY - 100 : groundY - 6
            if (Math.abs(e.wx - playerWx) < 28 && Math.abs(ey - playerY) < 36) { e.got = true; if (!got.has(e.label)) { got.add(e.label); setSkills(Array.from(got)) } }
          } else if (e.type === 'drone' && !e.dead) {
            const ey = groundY - 14 + Math.sin(g.cam * 0.01 + e.phase) * 14
            for (const b of g.bullets) if (Math.abs(b.wx - e.wx) < 22 && Math.abs(b.y - ey) < 22) { e.dead = true; b.wx = 1e9 }
            if (!e.dead && g.invuln === 0 && Math.abs(e.wx - playerWx) < 26 && Math.abs(ey - playerY) < 28) { g.invuln = 80; g.cam = Math.max(0, g.cam - 55); g.hp -= 1; if (g.hp <= 0) g.hp = 3; setHealth(g.hp) }
          } else if (e.type === 'project' && e.hp > 0) {
            for (const b of g.bullets) if (b.wx - g.cam > PLAYER_X && Math.abs(b.wx - e.wx) < 34 && b.y > groundY - 70) { e.hp -= 1; b.wx = 1e9; if (e.hp <= 0) setUnlocked((u) => u.some((x) => x.title === e.label) ? u : [...u, { title: e.label, tag: e.tag, color: e.color }]) }
          }
        }
        if (g.cam > endX) { g.mode = 'done'; setDone(true); setCodex(true) }
      }

      // render
      ctx.clearRect(0, 0, W, H)
      const grad = ctx.createLinearGradient(0, 0, 0, H); grad.addColorStop(0, pal.bg1); grad.addColorStop(1, pal.bg2)
      ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = pal.star
      for (let i = 0; i < 50; i++) { const sx = ((i * 137 - g.cam * 0.3) % (W + 40) + W + 40) % (W + 40); const sy = (i * 53) % Math.max(40, H - 120); ctx.fillRect(sx, sy, 2, 2) }
      const groundLineY = groundY + 11 + 6
      ctx.strokeStyle = pal.ground; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, groundLineY); ctx.lineTo(W, groundLineY); ctx.stroke()

      for (const e of track) {
        const sx = e.wx - g.cam
        if (sx < -90 || sx > W + 90) continue
        if (e.type === 'skill' && !e.got) {
          const ey = e.high ? groundY - 100 : groundY - 6
          ctx.beginPath(); ctx.arc(sx, ey, 14, 0, Math.PI * 2); ctx.fillStyle = 'rgba(124,108,255,0.18)'; ctx.fill()
          ctx.lineWidth = 2; ctx.strokeStyle = '#a78bfa'; ctx.stroke()
          ctx.fillStyle = pal.text; ctx.font = '600 11px "JetBrains Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(e.label, sx, ey - 22)
        } else if (e.type === 'drone' && !e.dead) {
          const ey = groundY - 14 + Math.sin(g.cam * 0.01 + e.phase) * 14
          ctx.fillStyle = '#ff5470'; roundRect(ctx, sx - 13, ey - 10, 26, 20, 6); ctx.fill()
          ctx.fillStyle = '#fff'; ctx.fillRect(sx - 5, ey - 2, 4, 4); ctx.fillRect(sx + 1, ey - 2, 4, 4)
        } else if (e.type === 'project') {
          const alive = e.hp > 0
          ctx.fillStyle = alive ? 'rgba(124,108,255,0.12)' : `${e.color}22`
          roundRect(ctx, sx - 30, groundY - 74, 60, 86, 9); ctx.fill()
          ctx.lineWidth = 2; ctx.strokeStyle = e.color; ctx.stroke(); ctx.textAlign = 'center'
          if (alive) {
            ctx.fillStyle = pal.text; ctx.font = '700 16px "Space Grotesk", sans-serif'; ctx.fillText('?', sx, groundY - 26)
            ctx.fillStyle = pal.sub; ctx.font = '500 8px "JetBrains Mono", monospace'; ctx.fillText('SHOOT (B)', sx, groundY - 8)
            for (let i = 0; i < e.hp; i++) { ctx.fillStyle = e.color; ctx.fillRect(sx - 13 + i * 10, groundY - 66, 7, 3) }
          } else {
            ctx.fillStyle = e.color; ctx.font = '700 10px "Space Grotesk", sans-serif'; wrap(ctx, e.label, sx, groundY - 40, 54, 12)
            ctx.fillStyle = pal.sub; ctx.font = '500 7px "JetBrains Mono", monospace'; ctx.fillText('UNLOCKED', sx, groundY + 6)
          }
        }
      }

      ctx.fillStyle = '#7cf6ff'
      for (const b of g.bullets) { const bx = b.wx - g.cam; if (bx < W + 20) { roundRect(ctx, bx, b.y - 2, 12, 4, 2); ctx.fill() } }

      const py = groundY + g.py
      const flash = g.invuln > 0 && Math.floor(g.invuln / 4) % 2 === 0
      ctx.fillStyle = flash ? '#7c84a0' : '#a78bfa'; roundRect(ctx, PLAYER_X - PSIZE / 2, py - PSIZE / 2, PSIZE, PSIZE, 6); ctx.fill()
      ctx.fillStyle = pal.bg1; ctx.fillRect(PLAYER_X + 2, py - 5, 4, 4)
      ctx.fillStyle = '#cdbbff'; ctx.fillRect(PLAYER_X + PSIZE / 2 - 2, py - 2, 13, 5)

      // HUD on canvas
      ctx.textAlign = 'left'; ctx.fillStyle = pal.text; ctx.font = '600 11px "JetBrains Mono", monospace'
      ctx.fillText(`SKILLS ${skills.length}/${SKILLS.length}   PROJECTS ${unlocked.length}/${projects.length}`, 14, 20)
      for (let i = 0; i < 3; i++) { ctx.fillStyle = i < health ? '#ff5470' : 'rgba(127,127,127,0.3)'; roundRect(ctx, W - 16 - (3 - i) * 18, 12, 13, 13, 3); ctx.fill() }
      const prog = Math.min(1, g.cam / endX)
      ctx.fillStyle = 'rgba(127,127,127,0.25)'; ctx.fillRect(W / 2 - 90, 14, 180, 5); ctx.fillStyle = '#7c6cff'; ctx.fillRect(W / 2 - 90, 14, 180 * prog, 5)

      ctx.textAlign = 'center'
      if (g.mode === 'idle') {
        ctx.fillStyle = pal.text; ctx.font = '700 18px "Space Grotesk", sans-serif'; ctx.fillText('SKILL RUN', W / 2, H / 2 - 8)
        ctx.fillStyle = pal.sub; ctx.font = '500 11px "JetBrains Mono", monospace'; ctx.fillText('press A on the controller to start →', W / 2, H / 2 + 14)
      } else if (g.blocked) {
        ctx.fillStyle = '#ffd166'; ctx.font = '600 12px "JetBrains Mono", monospace'; ctx.fillText('PRESS  B  TO SHOOT THE CRATE', PLAYER_X + 230, groundY - 96)
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [track, endX, height, skills.length, unlocked.length, health])

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height, display: 'block', borderRadius: 14, border: '1px solid var(--border-strong)', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.35)' }} />

      {codex && (
        <div style={{ position: 'absolute', inset: 0, background: 'color-mix(in srgb, var(--surface) 88%, transparent)', backdropFilter: 'blur(6px)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ width: '100%', maxHeight: '100%', overflowY: 'auto', padding: '0.5rem 0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)' }}>{done ? 'Run complete!' : 'Codex'}</h3>
              <button onClick={() => setCodex(false)} className="btn btn-ghost" style={{ marginLeft: 'auto', padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>{done ? 'Replay-ready ▸' : 'Resume ▸'}</button>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.18em', color: 'var(--accent)', marginBottom: '0.5rem' }}>SKILLS {skills.length}/{SKILLS.length}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
              {SKILLS.map((sk) => { const g = skills.includes(sk); return (
                <span key={sk} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', padding: '0.22rem 0.55rem', borderRadius: 999, border: `1px solid ${g ? 'var(--accent)' : 'var(--border)'}`, color: g ? 'var(--text)' : 'var(--text-faint)', background: g ? 'var(--accent-soft)' : 'transparent' }}>{g ? '✓ ' : ''}{sk}</span>
              ) })}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.18em', color: 'var(--accent)', marginBottom: '0.5rem' }}>PROJECTS {unlocked.length}/{projects.length}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' }}>
              {projects.map((p) => { const g = unlocked.some((u) => u.title === p.title); return (
                <div key={p.id} style={{ border: `1px solid ${g ? p.color + '66' : 'var(--border)'}`, borderRadius: 9, padding: '0.6rem', background: g ? `${p.color}10` : 'transparent', opacity: g ? 1 : 0.5 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.82rem', color: 'var(--text)' }}>{g ? p.title : '???'}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: 3, lineHeight: 1.35 }}>{g ? p.tagline : 'Shoot its crate (B) to unlock'}</div>
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
  lines.slice(0, 3).forEach((l, i) => ctx.fillText(l, cx, y + i * lh))
}
