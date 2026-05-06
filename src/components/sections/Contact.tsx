import { personalInfo } from '../../data'

export default function Contact() {
  return (
    <section id="contact" className="section-pad" style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative lines */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: 0, right: 0,
          top: `${15 + i * 18}%`,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.05), transparent)',
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <div className="section-tag">05 / CONTACT</div>
        <h2 className="section-title">Let's Build<br />Something</h2>
        <div className="accent-line" />

        <div className="responsive-grid-2col" style={{ marginTop: '3rem' }}>
          {/* Left: Info */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              color: 'var(--text-dim)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}>
              I'm actively looking for game development roles — full-time, freelance, or contract. If you're building a mobile game, XR experience, or need a Unity developer who ships, let's talk.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                {
                  icon: '📧',
                  label: 'EMAIL',
                  value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                },
                {
                  icon: '📱',
                  label: 'PHONE',
                  value: personalInfo.phone,
                  href: `tel:${personalInfo.phone}`,
                },
                {
                  icon: '💼',
                  label: 'LINKEDIN',
                  value: 'linkedin.com/in/lavnaruka',
                  href: personalInfo.linkedin,
                },
                {
                  icon: '🐙',
                  label: 'GITHUB',
                  value: 'github.com/6350150676',
                  href: personalInfo.github,
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="hex-border"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    borderColor: 'var(--border)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.background = 'rgba(0,229,255,0.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = ''
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-dim)', letterSpacing: '0.2em', marginBottom: '0.15rem' }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text)', fontWeight: 600 }}>
                      {item.value}
                    </div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'var(--accent)', opacity: 0.5 }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Quick message */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '1.5rem' }}>
              QUICK MESSAGE
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(['Your Name', 'Your Email'] as const).map((placeholder, i) => (
                <input
                  key={i}
                  type={i === 1 ? 'email' : 'text'}
                  placeholder={placeholder}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    padding: '0.9rem 1.25rem',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              ))}
              <textarea
                placeholder="Tell me about your project..."
                rows={5}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  padding: '0.9rem 1.25rem',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              <a
                href={`mailto:${personalInfo.email}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  color: 'var(--bg)',
                  background: 'var(--accent)',
                  padding: '1rem 2rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                  clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                  boxShadow: '0 0 30px var(--glow)',
                  transition: 'all 0.2s',
                  display: 'block',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent2)'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(255,107,53,0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--accent)'
                  e.currentTarget.style.boxShadow = '0 0 30px var(--glow)'
                }}
              >
                SEND MESSAGE →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
