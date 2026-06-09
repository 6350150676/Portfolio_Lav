import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { personalInfo } from '../../data'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 820 : false
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    const onResize = () => {
      setIsMobile(window.innerWidth <= 820)
      if (window.innerWidth > 820) setOpen(false)
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const location = useLocation()
  const navigate = useNavigate()

  const go = (e: React.MouseEvent, item: { label: string; id: string }) => {
    setActive(item.label)
    setOpen(false)
    if (location.pathname === '/') {
      // already home → smooth-scroll in place
      e.preventDefault()
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // on a project page → go home, then scroll once mounted
      e.preventDefault()
      navigate('/')
      setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 60)
    }
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled || open ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(16px)' : 'none',
        borderBottom: scrolled || open ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 68,
        }}
      >
        {/* Logo */}
        <a
          href="/#home"
          onClick={(e) => go(e, { label: 'Home', id: 'home' })}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <Logo size={34} />
          Lav Naruka
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`/#${item.id}`}
                onClick={(e) => go(e, item)}
                className={`nav-link ${active === item.label ? 'active' : ''}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: active === item.label ? 'var(--text)' : 'var(--text-dim)',
                  textDecoration: 'none',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 8,
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = active === item.label ? 'var(--text)' : 'var(--text-dim)')}
              >
                {item.label}
              </a>
            ))}
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="nav-link" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-dim)', textDecoration: 'none', padding: '0.5rem 0.85rem' }}>
              GitHub
            </a>
            <a href="/resume.pdf" download="Lav_Naruka_Resume.pdf" className="nav-link" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-dim)', textDecoration: 'none', padding: '0.5rem 0.85rem' }}>
              CV
            </a>
            <ThemeToggle style={{ marginLeft: '0.25rem' }} />
            <a href="/#contact" onClick={(e) => go(e, { label: 'Contact', id: 'contact' })} className="btn btn-primary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
              Hire me
            </a>
          </div>
        )}

        {/* Mobile: theme toggle + hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-strong)',
              borderRadius: 8,
              padding: '0.5rem 0.6rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              width: 40,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 18,
                  height: 2,
                  borderRadius: 2,
                  background: 'var(--text)',
                  transition: 'all 0.25s',
                  transform: open && i === 0 ? 'translateY(6px) rotate(45deg)' : open && i === 2 ? 'translateY(-6px) rotate(-45deg)' : 'none',
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {isMobile && (
        <div
          style={{
            overflow: 'hidden',
            maxHeight: open ? 420 : 0,
            transition: 'max-height 0.3s ease',
            background: 'var(--panel)',
            backdropFilter: 'blur(16px)',
            borderBottom: open ? '1px solid var(--border)' : 'none',
          }}
        >
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: open ? '1rem 2rem 1.5rem' : '0 2rem' }}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`/#${item.id}`}
                onClick={(e) => go(e, item)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: active === item.label ? 'var(--accent2)' : 'var(--text)',
                  textDecoration: 'none',
                  padding: '0.8rem 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {item.label}
              </a>
            ))}
            <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 500, color: 'var(--text)', textDecoration: 'none', padding: '0.8rem 0', borderBottom: '1px solid var(--border)' }}>
              GitHub ↗
            </a>
            <a href="/resume.pdf" download="Lav_Naruka_Resume.pdf" style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 500, color: 'var(--text)', textDecoration: 'none', padding: '0.8rem 0', borderBottom: '1px solid var(--border)' }}>
              Download CV
            </a>
            <a href="/#contact" onClick={(e) => go(e, { label: 'Contact', id: 'contact' })} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Hire me
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
