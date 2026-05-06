import { skills } from '../../data'

export default function Skills() {
  return (
    <section id="skills" className="section-pad" style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG grid decoration */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0,229,255,0.02) 60px, rgba(0,229,255,0.02) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,229,255,0.02) 60px, rgba(0,229,255,0.02) 61px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div className="section-tag">04 / SKILLS</div>
        <h2 className="section-title">Tech Arsenal</h2>
        <div className="accent-line" />
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          color: 'var(--text-dim)',
          marginBottom: '4rem',
          maxWidth: 500,
        }}>
          1.5 years of sharpening the tools that matter for shipping real games.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {Object.entries(skills).map(([category, { items, color }]) => (
            <div
              key={category}
              className="hex-border"
              style={{
                padding: '1.75rem',
                borderColor: color + '30',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = color + '30')}
            >
              {/* Category header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.25rem',
              }}>
                <div style={{
                  width: 10,
                  height: 10,
                  background: color,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  boxShadow: `0 0 10px ${color}`,
                  flexShrink: 0,
                }} />
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color,
                }}>
                  {category.toUpperCase()}
                </div>
              </div>

              {/* Skill tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {items.map((skill, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text)',
                      background: color + '12',
                      border: `1px solid ${color}25`,
                      padding: '0.3rem 0.7rem',
                      transition: 'all 0.2s',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = color + '25'
                      e.currentTarget.style.borderColor = color
                      e.currentTarget.style.color = color
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = color + '12'
                      e.currentTarget.style.borderColor = color + '25'
                      e.currentTarget.style.color = 'var(--text)'
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency bar section for key skills */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--accent)', marginBottom: '2rem' }}>
            PROFICIENCY LEVELS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {[
              { name: 'Unity 3D', pct: 90, color: '#00e5ff' },
              { name: 'C#', pct: 88, color: '#00e5ff' },
              { name: 'Level Design', pct: 85, color: '#ff6b35' },
              { name: 'Mobile Game Dev', pct: 87, color: '#ff6b35' },
              { name: 'AR/VR (Oculus/ARCore)', pct: 75, color: '#7c3aed' },
              { name: 'Photon Multiplayer', pct: 72, color: '#7c3aed' },
              { name: 'Shader Graph', pct: 65, color: '#22c55e' },
              { name: 'Blender', pct: 60, color: '#22c55e' },
            ].map((skill, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>
                    {skill.name}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: skill.color }}>
                    {skill.pct}%
                  </span>
                </div>
                <div style={{
                  height: 4,
                  background: 'var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    left: 0, top: 0, bottom: 0,
                    width: `${skill.pct}%`,
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                    boxShadow: `0 0 10px ${skill.color}`,
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
