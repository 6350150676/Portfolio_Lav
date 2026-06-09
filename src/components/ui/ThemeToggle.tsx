import { useEffect, useState, type CSSProperties } from 'react'

function current(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

const Sun = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
const Moon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

export default function ThemeToggle({ style }: { style?: CSSProperties }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(current)

  // follow OS preference live, but only while the user hasn't chosen manually
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      let saved: string | null = null
      try { saved = localStorage.getItem('theme') } catch { /* ignore */ }
      if (saved === 'light' || saved === 'dark') return
      const next = mq.matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', next)
      setTheme(next)
    }
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch { /* ignore */ }
    setTheme(next)
  }

  return (
    <button
      className="theme-switch"
      data-on={theme === 'light'}
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`${theme === 'light' ? 'Light' : 'Dark'} mode — click to switch`}
      style={style}
    >
      <span className="theme-switch-track">
        <Sun className="hint" />
        <Moon className="hint" />
        <span className="theme-switch-knob">{theme === 'light' ? <Sun /> : <Moon />}</span>
      </span>
    </button>
  )
}
