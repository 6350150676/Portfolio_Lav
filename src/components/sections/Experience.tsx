import { experience } from '../../data'

export default function Experience() {
  return (
    <section id="experience" style={{
      minHeight: '100vh',
      padding: '6rem 4rem',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG decoration */}
      <div style={{
        position: 'absolute',
        left: -100,
        top: '20%',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-tag">02 / EXPERIENCE</div>
        <h2 className="section-title">Battle Log</h2>
        <div className="accent-line" />

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          color: 'var(--text-dim)',
          marginBottom: '4rem',
          maxWidth: 500,
        }}>
          From intern to sole developer shipping production games. 1.5+ years in the trenches.
        </p>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 24,
            top: 0,
            bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, var(--accent), var(--accent3), transparent)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {experience.map((exp, i) => (
              <div key={i} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                {/* Timeline dot */}
                <div style={{
                  width: 48,
                  height: 48,
                  minWidth: 48,
                  background: 'var(--bg)',
                  border: `2px solid ${exp.color}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 20px ${exp.color}40`,
                  zIndex: 1,
                }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {i === 0 ? '🚀' : i === 1 ? '⚙️' : '🥽'}
                  </span>
                </div>

                {/* Card */}
                <div className="hex-border" style={{
                  flex: 1,
                  padding: '1.5rem 2rem',
                  borderColor: exp.color + '40',
                  transition: 'border-color 0.3s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = exp.color)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = exp.color + '40')}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--text)',
                        marginBottom: '0.25rem',
                      }}>
                        {exp.role}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        color: exp.color,
                        fontWeight: 600,
                      }}>
                        {exp.company}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--text-dim)',
                        letterSpacing: '0.1em',
                        marginBottom: '0.25rem',
                      }}>
                        {exp.period}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        color: exp.color,
                        border: `1px solid ${exp.color}`,
                        padding: '0.2rem 0.5rem',
                        letterSpacing: '0.1em',
                      }}>
                        {exp.type}
                      </div>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <span style={{ color: exp.color, marginTop: '0.15rem', fontSize: '0.8rem' }}>▶</span>
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '1rem',
                          color: 'var(--text-dim)',
                          lineHeight: 1.6,
                        }}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
