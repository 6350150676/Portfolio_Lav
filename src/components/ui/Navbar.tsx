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
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    const onResize = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) setOpen(false)
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const handleNavClick = (label: string) => {
    setActive(label)
    setOpen(false)
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: isMobile ? '0.85rem 1.25rem' : '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: scrolled || open ? 'rgba(5,10,15,0.95)' : 'transparent',
      backdropFilter: scrolled || open ? 'blur(20px)' : 'none',
      borderBottom: scrolled || open ? '1px solid rgba(0,229,255,0.1)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <a href="#home" style={{
        fontFamily: 'var(--font-display)',
        fontSize: isMobile ? '1rem' : '1.2rem',
        fontWeight: 900,
        color: 'var(--accent)',
        textDecoration: 'none',
        letterSpacing: '0.2em',
        textShadow: '0 0 20px var(--accent)',
      }}>
        LN<span style={{ color: 'var(--text)', opacity: 0.5 }}>.DEV</span>
      </a>

      {/* Desktop nav links */}
      {!isMobile && (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleNavClick(item.label)}
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
      )}

      {/* Mobile hamburger button */}
      {isMobile && (
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
          style={{
            background: 'transparent',
            border: '1px solid var(--accent)',
            padding: '0.55rem 0.7rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 4,
            width: 38,
            height: 34,
            clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
          }}
        >
          <span style={{
            display: 'block',
            width: 18,
            height: 1.5,
            background: 'var(--accent)',
            transition: 'transform 0.25s',
            transform: open ? 'translateY(3px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block',
            width: 18,
            height: 1.5,
            background: 'var(--accent)',
            opacity: open ? 0 : 1,
            transition: 'opacity 0.2s',
          }} />
          <span style={{
            display: 'block',
            width: 18,
            height: 1.5,
            background: 'var(--accent)',
            transition: 'transform 0.25s',
            transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
          }} />
        </button>
      )}

      {/* Mobile drawer */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            background: 'rgba(5,10,15,0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0,229,255,0.15)',
            padding: open ? '1.5rem 1.25rem 2rem' : '0 1.25rem',
            maxHeight: open ? 500 : 0,
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleNavClick(item.label)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                color: active === item.label ? 'var(--accent)' : 'var(--text)',
                textDecoration: 'none',
                padding: '0.85rem 0.25rem',
                borderBottom: '1px solid rgba(26,58,80,0.4)',
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="mailto:lovenaruka514@gmail.com"
            onClick={() => setOpen(false)}
            style={{
              marginTop: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'var(--bg)',
              background: 'var(--accent)',
              padding: '0.85rem 1rem',
              textDecoration: 'none',
              textAlign: 'center',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
            }}
          >
            HIRE ME →
          </a>
        </div>
      )}
    </nav>
  )
}
