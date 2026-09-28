import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { guideLines } from '../../data'

const SECTION_IDS = ['home', 'projects', 'bench', 'experience', 'about', 'skills', 'achievements', 'contact']
const TAGS: Record<string, string> = {
  home: 'Lab assistant · BIT',
  projects: 'BIT · experiment files',
  bench: 'BIT · the bench',
  experience: 'BIT · lab log',
  about: 'BIT · the inventor',
  skills: 'BIT · apparatus',
  achievements: 'BIT · credentials',
  contact: 'BIT · requests',
  project: 'BIT · lab report',
}

// Render text with *word* → <em>word</em> (BIT's emphasis)
function renderLine(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((p, i) =>
    p.startsWith('*') && p.endsWith('*') ? <em key={i}>{p.slice(1, -1)}</em> : <span key={i}>{p}</span>
  )
}

export default function Companion() {
  const [active, setActive] = useState('home')
  // starts quiet so it never covers the hero experiment; speaks on first scroll
  const [open, setOpen] = useState(false)
  const lastSpoken = useRef('home')
  // once the visitor shushes BIT, it stays quiet until they click it again
  const dismissed = useRef(false)
  const location = useLocation()
  const onProjectPage = location.pathname.startsWith('/projects/')

  // On a project page there are no observed sections — narrate the deep dive.
  useEffect(() => {
    if (onProjectPage) {
      setActive('project')
      if (!dismissed.current) setOpen(true)
    } else {
      setActive('home')
    }
  }, [onProjectPage, location.pathname])

  useEffect(() => {
    if (onProjectPage) return // skip section observer off-home
    // whichever section crosses the middle of the viewport is "current"
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const id = e.target.id
          setActive(id)
          if (id !== lastSpoken.current) {
            lastSpoken.current = id
            if (!dismissed.current) setOpen(true)
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    // small delay so freshly-mounted HomePage sections exist in the DOM
    const t = setTimeout(() => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 50)
    return () => {
      clearTimeout(t)
      observer.disconnect()
    }
  }, [onProjectPage, location.pathname])

  const line = guideLines[active] ?? guideLines.home

  return (
    <div className="bit-companion" aria-live="polite">
      {open && (
        <div className="bit-bubble" key={active}>
          <span className="bit-bubble-tag">{TAGS[active] ?? 'BIT'}</span>
          <button
            className="bit-bubble-close"
            aria-label="Dismiss BIT"
            onClick={() => { dismissed.current = true; setOpen(false) }}
          >
            ✕
          </button>
          {renderLine(line)}
        </div>
      )}

      {/* The robot — click to toggle the bubble */}
      <div
        className="bit-bot"
        role="button"
        aria-label="Toggle BIT the guide"
        title={open ? 'Shush BIT' : 'Ask BIT'}
        onClick={() => { dismissed.current = open; setOpen(!open) }}
      >
        <div className="bit-head">
          <span className="bit-eye left" />
          <span className="bit-eye right" />
          <span className="bit-mouth" />
        </div>
        <div className="bit-body" />
      </div>
    </div>
  )
}
