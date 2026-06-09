import { useEffect, useRef, useState } from 'react'

// Animates the numeric part of a value (e.g. "20+", "60", "'24") from 0 → target
// when it scrolls into view. Non-numeric prefixes/suffixes are preserved.
export default function CountUp({ value, duration = 1300 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const m = value.match(/^(\D*)(\d+)(.*)$/)
  const target = m ? parseInt(m[2], 10) : 0
  const prefix = m ? m[1] : ''
  const suffix = m ? m[3] : ''
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || target === 0) return
    let raf = 0
    let started = false
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true
          obs.disconnect()
          const t0 = performance.now()
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setN(Math.round(target * eased))
            if (p < 1) raf = requestAnimationFrame(tick)
          }
          raf = requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
    // depend only on stable primitives — NOT the regex match object
  }, [target, duration])

  if (!m) return <span ref={ref}>{value}</span>
  return <span ref={ref}>{prefix}{n}{suffix}</span>
}
