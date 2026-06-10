import { skills } from '../../data'
import Reveal from '../ui/Reveal'

export default function Skills() {
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
            The full stack I build with — from real-time multiplayer, monetization &amp; clean architecture
            to GPU optimization and hands-on embedded hardware.
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
      </div>
    </section>
  )
}
