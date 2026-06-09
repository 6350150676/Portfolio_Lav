import { useState } from 'react'
import { achievements } from '../../data'
import Reveal from '../ui/Reveal'

// A generated medal emblem (used when no real badge image is provided)
function Emblem({ color, label }: { color: string; label: string }) {
  return (
    <svg width="74" height="74" viewBox="0 0 74 74" aria-hidden>
      <defs>
        <linearGradient id={`g-${label}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor="#5b8cff" />
        </linearGradient>
      </defs>
      {/* ribbon */}
      <path d="M28 52 L24 70 L31 64 L37 70 L37 50 Z" fill={color} opacity="0.5" />
      <path d="M46 52 L50 70 L43 64 L37 70 L37 50 Z" fill={color} opacity="0.8" />
      {/* notched medal */}
      <g transform="translate(37 33)">
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="-2" y="-30" width="4" height="8" rx="1" fill={color} opacity="0.55" transform={`rotate(${i * 30})`} />
        ))}
      </g>
      <circle cx="37" cy="33" r="25" fill={`url(#g-${label})`} />
      <circle cx="37" cy="33" r="25" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <text x="37" y="33" textAnchor="middle" dominantBaseline="central" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize={label.length > 2 ? 12 : 18} fill="#fff">{label}</text>
    </svg>
  )
}

function Badge({ a }: { a: (typeof achievements)[number] }) {
  const [ok, setOk] = useState(!!a.badge)
  if (ok && a.badge) {
    return <img src={a.badge} alt={`${a.title} badge`} onError={() => setOk(false)} style={{ width: 74, height: 74, objectFit: 'contain', flexShrink: 0 }} />
  }
  return <div style={{ flexShrink: 0 }}><Emblem color={a.color} label={a.emblem} /></div>
}

export default function Achievements() {
  return (
    <section id="achievements" className="section-pad" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">05 / Achievements</div>
          <h2 className="section-title">Certifications &amp; Badges</h2>
          <p className="lead">Verified credentials backing the skills above — issued by Unity, GeeksforGeeks, and GATE.</p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 90}>
              <div className="hex-border" style={{ padding: '1.5rem', height: '100%', display: 'flex', gap: '1.1rem' }}>
                <Badge a={a} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{a.title}</h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', color: a.color, marginTop: '0.25rem' }}>
                    {a.issuer} · {a.kind}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.55, margin: '0.7rem 0' }}>{a.blurb}</p>

                  {a.points.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem 0.8rem', marginBottom: '0.8rem' }}>
                      {a.points.map((p) => (
                        <div key={p} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                          <span style={{ color: a.color, fontSize: '0.7rem', marginTop: 2 }}>▹</span>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {a.link && (
                      <a href={a.link} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: a.color, textDecoration: 'none', border: `1px solid ${a.color}55`, borderRadius: 999, padding: '0.3rem 0.7rem' }}>
                        Verify ↗
                      </a>
                    )}
                    {a.credentialId && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-faint)', wordBreak: 'break-all' }}>
                        ID: {a.credentialId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
