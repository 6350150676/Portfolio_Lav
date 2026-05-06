import { personalInfo, education, certifications } from '../../data'

export default function About() {
  return (
    <section id="about" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '6rem 4rem',
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        right: -200,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        {/* Left: Avatar block */}
        <div style={{ position: 'relative' }}>
          {/* Main avatar box */}
          <div style={{
            width: '100%',
            aspectRatio: '1',
            maxWidth: 420,
            position: 'relative',
          }}>
            {/* Corner decorations */}
            {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((corner) => (
              <div key={corner} style={{
                position: 'absolute',
                width: 30,
                height: 30,
                borderTop: corner.includes('top') ? '2px solid var(--accent)' : 'none',
                borderBottom: corner.includes('bottom') ? '2px solid var(--accent)' : 'none',
                borderLeft: corner.includes('Left') ? '2px solid var(--accent)' : 'none',
                borderRight: corner.includes('Right') ? '2px solid var(--accent)' : 'none',
                top: corner.includes('top') ? 0 : 'auto',
                bottom: corner.includes('bottom') ? 0 : 'auto',
                left: corner.includes('Left') ? 0 : 'auto',
                right: corner.includes('Right') ? 0 : 'auto',
              }} />
            ))}

            {/* Avatar background with initials */}
            <div style={{
              margin: '1.5rem',
              height: 'calc(100% - 3rem)',
              background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Hexagonal avatar */}
              <div style={{
                width: 160,
                height: 160,
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent3) 100%)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'float 4s ease-in-out infinite',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  fontWeight: 900,
                  color: 'var(--bg)',
                }}>LN</span>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)' }}>
                  {personalInfo.name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.2em' }}>
                  GAME DEVELOPER
                </div>
              </div>

              {/* Grid overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(0,229,255,0.03) 30px, rgba(0,229,255,0.03) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,229,255,0.03) 30px, rgba(0,229,255,0.03) 31px)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>

          {/* Info cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
            {[
              { label: 'LOCATION', value: '📍 India' },
              { label: 'STATUS', value: '🟢 Open to Work' },
              { label: 'COLLEGE', value: '🏫 NIT Hamirpur' },
              { label: 'FOCUS', value: '🎮 Mobile & XR Games' },
            ].map((item) => (
              <div key={item.label} className="hex-border" style={{ padding: '0.75rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-dim)', letterSpacing: '0.2em', marginBottom: '0.25rem' }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text)', fontWeight: 600 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Bio + Education */}
        <div>
          <div className="section-tag">01 / ABOUT ME</div>
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
            Crafting<br />Player Experiences
          </h2>
          <div className="accent-line" />

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--text-dim)',
            lineHeight: 1.8,
            marginBottom: '2rem',
          }}>
            {personalInfo.bio}
          </p>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            color: 'var(--text-dim)',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            My background in <strong style={{ color: 'var(--accent)' }}>Engineering Physics from NIT Hamirpur</strong> gives me a unique perspective on simulation, physics-based puzzles, and emergent gameplay systems. I approach game design with both technical rigor and creative intuition.
          </p>

          {/* Education */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '1rem' }}>
              EDUCATION
            </div>
            {education.map((e, i) => (
              <div key={i} className="hex-border" style={{ padding: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>
                  {e.degree}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--accent)' }}>{e.school}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>{e.period}</div>
              </div>
            ))}
          </div>

          {/* Certs */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '0.75rem' }}>
            CERTIFICATIONS
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {certifications.map((c, i) => (
              <div key={i} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
                padding: '0.4rem 0.8rem',
                letterSpacing: '0.05em',
                background: 'rgba(0,229,255,0.05)',
              }}>
                🏆 {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
