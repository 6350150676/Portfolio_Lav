import { projects } from '../../data'

export default function Projects() {
  return (
    <section id="projects" className="section-pad" style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        right: -50,
        bottom: '10%',
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="section-tag">03 / PROJECTS</div>
        <h2 className="section-title">Shipped Work</h2>
        <div className="accent-line" />
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          color: 'var(--text-dim)',
          marginBottom: '4rem',
          maxWidth: 500,
        }}>
          Games and tools built from design document to shipped product.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {projects.map((project, i) => (
            <div
              key={i}
              className="hex-border"
              style={{
                padding: '2rem',
                borderColor: project.color + '30',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = project.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 20px 40px ${project.color}20`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = project.color + '30'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

              {/* Status badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                color: project.status === 'Shipped' ? '#22c55e' : project.color,
                border: `1px solid ${project.status === 'Shipped' ? '#22c55e' : project.color}`,
                padding: '0.2rem 0.5rem',
                letterSpacing: '0.1em',
              }}>
                {project.status === 'Shipped' ? '✓ ' : '⚡ '}{project.status.toUpperCase()}
              </div>

              {/* Icon */}
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{project.icon}</div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.25rem',
              }}>
                {project.title}
              </h3>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: project.color,
                marginBottom: '1rem',
                fontWeight: 600,
              }}>
                {project.subtitle}
              </div>

              {/* Tech stack */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {project.tech.map((t, j) => (
                  <span key={j} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'var(--text-dim)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border)',
                    padding: '0.2rem 0.5rem',
                    letterSpacing: '0.05em',
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-dim)',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}>
                {project.description}
              </p>

              {/* Highlights */}
              <div style={{
                borderTop: `1px solid ${project.color}30`,
                paddingTop: '1rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.4rem',
              }}>
                {project.highlights.slice(0, 4).map((h, j) => (
                  <div key={j} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                    <span style={{ color: project.color, fontSize: '0.7rem', marginTop: '0.1rem' }}>◆</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
