import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { guideLines } from '../../data'

const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'skills', 'contact']
const TAGS: Record<string, string> = {
  home: 'BIT · intro',
  about: 'BIT · bio',
  experience: 'BIT · history',
  projects: 'BIT · work',
  skills: 'BIT · skills',
  contact: 'BIT · hire',
  project: 'BIT · deep dive',
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
  const [open, setOpen] = useState(true)
  const lastSpoken = useRef('home')
  const location = useLocation()
  const onProjectPage = location.pathname.startsWith('/projects/')

  // On a project page there are no observed sections — narrate the deep dive.
  useEffect(() => {
    if (onProjectPage) {
      setActive('project')
      setOpen(true)
    } else {
      setActive('home')
    }
  }, [onProjectPage, location.pathname])

  useEffect(() => {
    if (onProjectPage) return // skip section observer off-home
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most-visible section currently intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          setActive(visible.target.id)
          if (visible.target.id !== lastSpoken.current) {
            lastSpoken.current = visible.target.id
            setOpen(true) // re-open BIT when entering a new section
          }
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-10% 0px -10% 0px' }
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
            onClick={() => setOpen(false)}
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
        onClick={() => setOpen((o) => !o)}
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
