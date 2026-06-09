import { personalInfo } from '../../data'
import { openMail } from '../../lib/mail'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1.25rem, 5vw, 4rem)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1rem',
        fontWeight: 900,
        color: 'var(--accent)',
        letterSpacing: '0.2em',
      }}>
        LN<span style={{ color: 'var(--text)', opacity: 0.4 }}>.DEV</span>
      </div>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'var(--text-dim)',
        letterSpacing: '0.15em',
        textAlign: 'center',
      }}>
        © 2026 {personalInfo.name} · UNITY & VR/XR DEVELOPER · BUILT WITH REACT + THREE.JS
      </div>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {[
          { label: 'GH', href: personalInfo.github },
          { label: 'LI', href: personalInfo.linkedin },
          { label: 'ML', href: `mailto:${personalInfo.email}` },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            onClick={(e) => { if (s.href.startsWith('mailto:')) { e.preventDefault(); openMail(s.href) } }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-dim)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
          >
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
