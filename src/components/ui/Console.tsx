import { Link } from 'react-router-dom'
import { useState, type CSSProperties } from 'react'
import { projects, proficiencies, personalInfo } from '../../data'
import { openMail, copyToClipboard } from '../../lib/mail'

// Maps the controller's face buttons to a "screen" of live content.
const META: Record<string, { title: string; color: string; sectionId: string }> = {
  A: { title: 'About', color: '#7c6cff', sectionId: 'about' },
  Y: { title: 'Projects', color: '#a78bfa', sectionId: 'projects' },
  B: { title: 'Skills', color: '#5b8cff', sectionId: 'skills' },
  X: { title: 'Contact', color: '#38bdf8', sectionId: 'contact' },
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Console({ active }: { active: string }) {
  const meta = META[active] ?? META.A
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    if (await copyToClipboard(personalInfo.email)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    }
  }

  return (
    <div
      className="console-card"
      style={{
        background: 'var(--panel)',
        border: `1px solid ${meta.color}40`,
        borderRadius: 'var(--radius)',
        backdropFilter: 'blur(14px)',
        padding: '1rem 1.15rem',
        boxShadow: `0 12px 30px rgba(0,0,0,0.35)`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: meta.color, boxShadow: `0 0 8px ${meta.color}` }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)' }}>{meta.title}</span>
        <button
          onClick={() => scrollTo(meta.sectionId)}
          style={{
            marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em',
            color: meta.color,
          }}
        >
          Open full →
        </button>
      </div>

      {/* body — scrolls if needed */}
      <div key={active} style={{ overflowY: 'auto', minHeight: 0, animation: 'fadeIn 0.3s ease' }}>
        {active === 'A' && (
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              {personalInfo.bio}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['India', 'NIT Hamirpur', 'Open to work', 'Mobile games'].map((f) => (
                <span key={f} style={chip(meta.color)}>{f}</span>
              ))}
            </div>
          </div>
        )}

        {active === 'Y' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {projects.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none',
                  padding: '0.45rem 0.55rem', borderRadius: 8, border: '1px solid var(--border)',
                  transition: 'all 0.2s', background: 'var(--chip-bg)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.background = `${p.color}14` }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--chip-bg)' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 500 }}>{p.title}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-faint)', marginLeft: 'auto' }}>{p.category}</span>
                <span style={{ color: p.color, fontSize: '0.8rem' }}>→</span>
              </Link>
            ))}
          </div>
        )}

        {active === 'B' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {proficiencies.slice(0, 5).map((s) => (
              <div key={s.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text)' }}>{s.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: s.color }}>{s.pct}%</span>
                </div>
                <div style={{ height: 4, background: 'var(--track)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {active === 'X' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text)' }}>{personalInfo.email}</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button onClick={copyEmail} style={{ ...solidBtn(meta.color) }}>{copied ? '✓ Copied' : 'Copy email'}</button>
              <a href={`mailto:${personalInfo.email}`} onClick={(e) => { e.preventDefault(); openMail(`mailto:${personalInfo.email}`) }} style={ghostBtn()}>Email me</a>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={ghostBtn()}>LinkedIn</a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" style={ghostBtn()}>GitHub</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const chip = (c: string): CSSProperties => ({
  fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: c,
  background: `${c}16`, border: `1px solid ${c}33`, borderRadius: 999, padding: '0.2rem 0.6rem',
})
const solidBtn = (c: string): CSSProperties => ({
  fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: '#fff',
  background: c, border: 'none', borderRadius: 8, padding: '0.45rem 0.85rem', cursor: 'pointer',
})
const ghostBtn = (): CSSProperties => ({
  fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text)',
  background: 'transparent', border: '1px solid var(--border-strong)', borderRadius: 8,
  padding: '0.45rem 0.85rem', textDecoration: 'none',
})
