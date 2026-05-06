import { useState, useEffect } from 'react'

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('HOME')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: scrolled ? 'rgba(5,10,15,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,229,255,0.1)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <a href="#home" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.2rem',
        fontWeight: 900,
        color: 'var(--accent)',
        textDecoration: 'none',
        letterSpacing: '0.2em',
        textShadow: '0 0 20px var(--accent)',
      }}>
        LN<span style={{ color: 'var(--text)', opacity: 0.5 }}>.DEV</span>
      </a>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setActive(item.label)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: active === item.label ? 'var(--accent)' : 'var(--text-dim)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              position: 'relative',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = active === item.label ? 'var(--accent)' : 'var(--text-dim)')}
          >
            {item.label}
            {active === item.label && (
              <span style={{
                position: 'absolute',
                bottom: -4,
                left: 0,
                width: '100%',
                height: '1px',
                background: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent)',
              }} />
            )}
          </a>
        ))}
        <a
          href="mailto:lovenaruka514@gmail.com"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: 'var(--bg)',
            background: 'var(--accent)',
            padding: '0.5rem 1rem',
            textDecoration: 'none',
            clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
        >
          HIRE ME
        </a>
      </div>
    </nav>
  )
}
