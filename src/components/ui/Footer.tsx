import { personalInfo } from '../../data'
import { openMail } from '../../lib/mail'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__end">— end of notebook (for now) —</p>
        <div className="footer__row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Logo size={26} />
            <span className="label" style={{ color: 'var(--ink-2)' }}>
              © {new Date().getFullYear()} {personalInfo.name} · Lav's Lab · built with React + three.js
            </span>
          </div>
          <div className="footer__links">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a
              href={`mailto:${personalInfo.email}`}
              onClick={(e) => { e.preventDefault(); openMail(`mailto:${personalInfo.email}`) }}
            >
              Email
            </a>
            <a href={personalInfo.resume} download="Lav_Naruka_Resume.pdf">CV ↓</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
