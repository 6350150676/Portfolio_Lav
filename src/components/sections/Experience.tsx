import { experience } from '../../data'
import Reveal from '../ui/Reveal'

export default function Experience() {
  return (
    <section id="experience" className="section-pad" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: -100, top: '20%', width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(124,108,255,0.08) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <div className="container">
        <Reveal>
          <div className="eyebrow">02 / Experience</div>
          <h2 className="section-title">Where I've shipped</h2>
          <p className="lead">From intern to developer shipping real-time multiplayer games — over a year of production work.</p>
        </Reveal>

        <div style={{ position: 'relative', marginTop: '3.5rem' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 23, top: 6, bottom: 6, width: 2, borderRadius: 2,
            background: 'linear-gradient(to bottom, var(--accent), var(--accent3), transparent)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {experience.map((exp, i) => (
              <Reveal key={i} delay={i * 120}>
                <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'flex-start' }}>
                  {/* Timeline dot */}
                  <div style={{
                    width: 48, height: 48, minWidth: 48,
                    background: 'var(--surface)', border: `2px solid ${exp.color}`, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 24px ${exp.color}55`, zIndex: 1,
                  }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: exp.color }}>{i + 1}</span>
                  </div>

                  {/* Card */}
                  <div className="hex-border" style={{ flex: 1, padding: '1.5rem 1.75rem', borderColor: exp.color + '40' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)' }}>{exp.role}</div>
                        <div style={{ fontSize: '1rem', color: exp.color, fontWeight: 500 }}>{exp.company}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>{exp.period}</div>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: exp.color,
                          border: `1px solid ${exp.color}55`, borderRadius: 999, padding: '0.2rem 0.6rem',
                        }}>{exp.type}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.1rem' }}>
                      {exp.stack.map((t) => (
                        <span key={t} style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: exp.color,
                          background: exp.color + '14', border: `1px solid ${exp.color}33`, borderRadius: 6, padding: '0.18rem 0.5rem',
                        }}>{t}</span>
                      ))}
                    </div>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                          <span style={{ color: exp.color, marginTop: 7, width: 6, height: 6, borderRadius: '50%', background: exp.color, flexShrink: 0 }} />
                          <span style={{ fontSize: '0.96rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
