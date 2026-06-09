import { useEffect, useRef, useState } from 'react'
import { skills, proficiencies } from '../../data'
import Reveal from '../ui/Reveal'

export default function Skills() {
  const barsRef = useRef<HTMLDivElement>(null)
  const [barsIn, setBarsIn] = useState(false)

  useEffect(() => {
    const el = barsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setBarsIn(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="section-pad" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(124,108,255,0.02) 60px, rgba(124,108,255,0.02) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(124,108,255,0.02) 60px, rgba(124,108,255,0.02) 61px)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <Reveal>
          <div className="eyebrow">04 / Skills</div>
          <h2 className="section-title">Technical Skills</h2>
          <p className="lead">
            The stack I use to ship production mobile games — engine &amp; language, monetization &amp; SDKs,
            architecture, and the optimization that keeps it all at 60 fps.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          {Object.entries(skills).map(([category, { items, color }], idx) => (
            <Reveal key={category} delay={idx * 70}>
              <div className="hex-border" style={{ padding: '1.75rem', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.25rem' }}>
                  <span style={{ width: 9, height: 9, borderRadius: 3, background: color, boxShadow: `0 0 10px ${color}`, flexShrink: 0 }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.14em', color }}>
                    {category.toUpperCase()}
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {items.map((skill, i) => (
                    <div
                      key={i}
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 500,
                        color: 'var(--text)', background: color + '14', border: `1px solid ${color}33`,
                        padding: '0.32rem 0.7rem', borderRadius: 8, transition: 'all 0.2s', cursor: 'default',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = color + '2e'; e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = color + '14'; e.currentTarget.style.borderColor = color + '33'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Proficiency bars — fill when scrolled into view */}
        <div ref={barsRef} style={{ marginTop: '4rem' }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: '2rem' }}>Proficiency</div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem' }}>
            {proficiencies.map((skill, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--text)' }}>{skill.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: skill.color }}>{skill.pct}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--track)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: barsIn ? `${skill.pct}%` : '0%',
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                    borderRadius: 999,
                    boxShadow: `0 0 12px ${skill.color}66`,
                    transition: `width 1.1s cubic-bezier(0.2,0.7,0.2,1) ${i * 80}ms`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
