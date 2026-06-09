import { useEffect, useMemo } from 'react'

const COLORS = ['#7c6cff', '#5b8cff', '#a78bfa', '#38bdf8', '#22c55e', '#ffffff']

export default function Confetti({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  const pieces = useMemo(
    () =>
      Array.from({ length: 110 }, (_, i) => ({
        left: Math.random() * 100,
        size: 6 + Math.random() * 8,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.6,
        dur: 1.8 + Math.random() * 1.4,
        rounded: Math.random() > 0.5,
        drift: (Math.random() - 0.5) * 120,
      })),
    []
  )

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3000, pointerEvents: 'none', overflow: 'hidden' }}>
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-6vh',
            width: p.size,
            height: p.size * (p.rounded ? 1 : 0.5),
            background: p.color,
            borderRadius: p.rounded ? '50%' : 2,
            // @ts-expect-error custom prop for keyframe
            '--drift': `${p.drift}px`,
            animation: `confettiFall ${p.dur}s linear ${p.delay}s forwards`,
            boxShadow: `0 0 6px ${p.color}aa`,
          }}
        />
      ))}
    </div>
  )
}
