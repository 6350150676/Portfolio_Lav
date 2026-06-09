import { useEffect, useState } from 'react'
import CountUp from '../ui/CountUp'
import { personalInfo, stats, projects } from '../../data'

// Showreel placeholder — swap for your real gameplay reel (YouTube URL/id)
const SHOWREEL = 'https://www.youtube.com/embed/ScMzIvxBSi4'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false
  )

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const texts = personalInfo.roles
    let textIndex = 0
    let charIndex = 0
    let deleting = false
    const el = document.getElementById('hero-subtitle')
    if (!el) return
    let timer: ReturnType<typeof setTimeout>
    const type = () => {
      const current = texts[textIndex]
      if (!deleting) {
        el.textContent = current.slice(0, charIndex + 1)
        charIndex++
        if (charIndex === current.length) { deleting = true; timer = setTimeout(type, 1600); return }
      } else {
        el.textContent = current.slice(0, charIndex - 1)
        charIndex--
        if (charIndex === 0) { deleting = false; textIndex = (textIndex + 1) % texts.length }
      }
      timer = setTimeout(type, deleting ? 45 : 75)
    }
    type()
    return () => clearTimeout(timer)
  }, [])

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div className="container responsive-grid-2" style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
        {/* ── Left: who + what + CTAs ─────────────────── */}
        <div style={{ animation: 'fadeIn 0.7s ease both' }}>
          <span className="eyebrow">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            Available for work
          </span>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 6.5vw, 4.6rem)', fontWeight: 700,
            letterSpacing: '-0.03em', lineHeight: 1.02, color: 'var(--text)', margin: '0.25rem 0 0.6rem',
          }}>
            {personalInfo.name}
          </h1>

          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.05rem, 2.2vw, 1.5rem)', fontWeight: 500,
            color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap',
          }}>
            Unity Developer&nbsp;&amp;&nbsp;
            <span style={{ color: 'var(--accent2)', minWidth: 150 }} id="hero-subtitle" />
            <span style={{ color: 'var(--accent)', animation: 'pulse 1.1s infinite' }}>|</span>
          </div>

          <p className="lead">{personalInfo.tagline}</p>

          {/* recruiter quick-scan facts */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.55rem 0.85rem', marginTop: '1.1rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            {['India · remote-friendly', '2+ yrs Unity', 'Full-time / Contract', 'Mobile · Monetization · SDKs'].map((f, i) => (
              <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.85rem' }}>
                {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-faint)' }} />}
                {f}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', margin: '1.75rem 0 2.5rem' }}>
            <a href="#projects" className="btn btn-primary" onClick={scrollToProjects}>View Work →</a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
            <a href="/resume.pdf" download="Lav_Naruka_Resume.pdf" className="btn btn-ghost">Download CV</a>
          </div>

          {/* stats */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, minmax(0, 1fr))', gap: '1.25rem', maxWidth: 460 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                  <CountUp value={s.value} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: '0.2rem', lineHeight: 1.3 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: SHOWREEL — best work, front and center ── */}
        <div style={{ order: isMobile ? -1 : 0, animation: 'fadeIn 0.9s ease both' }}>
          <div style={{
            position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden',
            border: '1px solid var(--border)', boxShadow: '0 30px 70px rgba(0,0,0,0.5), 0 0 60px var(--glow)',
          }}>
            <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.45rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#fff', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', borderRadius: 999, padding: '0.3rem 0.7rem' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5470', boxShadow: '0 0 8px #ff5470' }} />
              Showreel
            </div>
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src={SHOWREEL}
                title="Gameplay showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)', marginTop: '0.6rem', textAlign: 'center' }}>
            ✦ placeholder reel — drop your real gameplay montage here
          </div>

          {/* quick featured projects under the reel */}
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {projects.slice(0, 3).map((p) => (
              <a key={p.id} href="#projects" onClick={scrollToProjects} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', textDecoration: 'none',
                border: `1px solid ${p.color}40`, borderRadius: 999, padding: '0.3rem 0.75rem', background: `${p.color}10`,
              }}>
                {p.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
