import { useState } from 'react'
import { LuGamepad2, LuGlasses, LuGlobe } from 'react-icons/lu'
import { SiUnity } from 'react-icons/si'
import { personalInfo } from '../../data'
import { openMail, copyToClipboard } from '../../lib/mail'

const LOOKING_FOR = [
  { icon: LuGamepad2, label: 'Gameplay Programming' },
  { icon: SiUnity, label: 'Unity Development' },
  { icon: LuGlasses, label: 'XR Development' },
  { icon: LuGlobe, label: 'Remote / Relocation' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    const ok = await copyToClipboard(personalInfo.email)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

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
          background: 'linear-gradient(90deg, transparent, rgba(124,108,255,0.05), transparent)',
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <div className="eyebrow">06 / Contact</div>
        <h2 className="section-title">Let's build something</h2>

        <div className="responsive-grid-2col" style={{ marginTop: '2.5rem' }}>
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

            {/* Looking for — tells recruiters what I'm open to at a glance */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                Looking for
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {LOOKING_FOR.map(({ icon: Icon, label }) => (
                  <span key={label} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text)',
                    background: 'var(--accent-soft)', border: '1px solid var(--border-strong)',
                    borderRadius: 999, padding: '0.45rem 0.95rem',
                  }}>
                    <Icon size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} aria-hidden />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary actions — copy avoids the OS mail popup entirely */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button onClick={copyEmail} className="btn btn-primary" style={{ minWidth: 170 }}>
                {copied ? '✓ Copied!' : 'Copy email'}
              </button>
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn btn-ghost"
                onClick={(e) => { e.preventDefault(); openMail(`mailto:${personalInfo.email}`) }}
              >
                Email me
              </a>
            </div>

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
                  onClick={(e) => { if (item.href.startsWith('mailto:')) { e.preventDefault(); openMail(item.href) } }}
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
                    e.currentTarget.style.background = 'var(--accent-soft)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = ''
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: 'var(--accent)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 8,
                    width: 38,
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>{item.label.slice(0, 2)}</span>
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
                    borderRadius: 'var(--radius-sm)',
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
                  borderRadius: 'var(--radius-sm)',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              <a
                href={`mailto:${personalInfo.email}`}
                onClick={(e) => { e.preventDefault(); openMail(`mailto:${personalInfo.email}`) }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  color: 'var(--bg)',
                  background: 'var(--accent)',
                  padding: '1rem 2rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: '0 8px 24px var(--glow)',
                  transition: 'all 0.2s',
                  display: 'block',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent2)'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(91,140,255,0.4)'
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
