import { useEffect, useRef, useState, type RefObject } from 'react'

// Colours for <canvas> experiments, read from the CSS tokens so the
// drawings follow day/night mode.
export type LabColors = {
  ink: string
  ink2: string
  ink3: string
  paper: string
  card: string
  card2: string
  line: string
  line2: string
  grid: string
  signal: string
  blue: string
  ok: string
}

function readColors(): LabColors {
  const cs = getComputedStyle(document.documentElement)
  const v = (n: string) => cs.getPropertyValue(n).trim()
  return {
    ink: v('--ink'),
    ink2: v('--ink-2'),
    ink3: v('--ink-3'),
    paper: v('--paper'),
    card: v('--card'),
    card2: v('--card-2'),
    line: v('--line'),
    line2: v('--line-2'),
    grid: v('--grid-major'),
    signal: v('--signal'),
    blue: v('--blue'),
    ok: v('--ok'),
  }
}

// Returns a ref (for animation loops) plus a version number that bumps
// whenever the theme flips (for static redraws).
export function useLabColors() {
  const ref = useRef<LabColors>(readColors())
  const [version, setVersion] = useState(0)
  useEffect(() => {
    const mo = new MutationObserver(() => {
      ref.current = readColors()
      setVersion((v) => v + 1)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])
  return [ref, version] as const
}

export function useInView(ref: RefObject<Element>, rootMargin = '80px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, rootMargin])
  return inView
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return reduced
}

// Keeps a canvas' backing store matched to its CSS size × devicePixelRatio.
// Returns the CSS-pixel size to draw in.
export function useCanvasSize(ref: RefObject<HTMLCanvasElement>) {
  const [size, setSize] = useState({ w: 0, h: 0 })
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const fit = () => {
      const r = c.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(r.width))
      const h = Math.max(1, Math.round(r.height))
      c.width = w * dpr
      c.height = h * dpr
      const ctx = c.getContext('2d')
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
      setSize({ w, h })
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(c)
    return () => ro.disconnect()
  }, [ref])
  return size
}

export const fmtTime = (ms: number) => {
  const s = Math.max(0, Math.round(ms / 1000))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
