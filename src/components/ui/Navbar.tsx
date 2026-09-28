import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { personalInfo } from '../../data'

const navItems = [
  { label: 'Experiments', id: 'projects' },
  { label: 'Bench', id: 'bench' },
  { label: 'Lab log', id: 'experience' },
  { label: 'Inventor', id: 'about' },
  { label: 'Apparatus', id: 'skills' },
  { label: 'Credentials', id: 'achievements' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scroll-spy: highlight whichever section is crossing the upper third
  useEffect(() => {
    if (!onHome) { setActive(''); return }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' }
    )
    const t = setTimeout(() => {
      ;['home', ...navItems.map((n) => n.id)].forEach((id) => {
        const el = document.getElementById(id)
        if (el) obs.observe(el)
      })
    }, 60)
    return () => { clearTimeout(t); obs.disconnect() }
  }, [onHome])

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setOpen(false)
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <nav className={`nav ${scrolled || open ? 'nav--solid' : ''}`} aria-label="Main">
      <div className="container nav__bar">
        <a href="/#home" onClick={(e) => go(e, 'home')} className="nav__brand" aria-label="Lav's Lab — home">
          <Logo size={32} />
          <span className="nav__brand-name">
            Lav’s Lab
            <span className="nav__brand-sub">Notebook Nº 1</span>
          </span>
        </a>

        <div className="nav__links">
          {navItems.map((item, i) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(e) => go(e, item.id)}
              className={`nav__link ${active === item.id ? 'is-active' : ''}`}
            >
              <sup>{String(i + 1).padStart(2, '0')}</sup>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="nav__right">
          <a href={personalInfo.resume} download="Lav_Naruka_Resume.pdf" className="nav__cv">CV ↓</a>
          <ThemeToggle />
          <a href="/#contact" onClick={(e) => go(e, 'contact')} className="btn btn--signal btn--sm nav__hire">
            Hire me
          </a>
          <button
            className="nav__menu-btn"
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close ✕' : 'Index ≡'}
          </button>
        </div>
      </div>

      <div id="nav-drawer" className={`nav__drawer ${open ? 'is-open' : ''}`}>
        <div className="container nav__drawer-inner">
          {navItems.map((item, i) => (
            <a key={item.id} href={`/#${item.id}`} onClick={(e) => go(e, item.id)} className="nav__dlink" tabIndex={open ? 0 : -1}>
              <small>§{String(i + 1).padStart(2, '0')}</small>
              {item.label}
            </a>
          ))}
          <div className="nav__drawer-actions">
            <a href="/#contact" onClick={(e) => go(e, 'contact')} className="btn btn--signal" tabIndex={open ? 0 : -1}>Hire me</a>
            <a href={personalInfo.resume} download="Lav_Naruka_Resume.pdf" className="btn" tabIndex={open ? 0 : -1}>Download CV</a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn btn--ghost" tabIndex={open ? 0 : -1}>GitHub ↗</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
