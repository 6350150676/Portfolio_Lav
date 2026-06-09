import { useEffect, useState } from 'react'

/* Animated logo mark — cross-fades through a loop:
   squares → LN → VR headset → LN → controller → LN → (repeat)
   Each shape morphs into the next with a scale/rotate cross-fade. */

const SEQUENCE = [
  'squares', 'name', 'headset', 'name', 'gamepad', 'name',
  'joystick', 'name', 'dice', 'name', 'ghost', 'name',
] as const
type Frame = (typeof SEQUENCE)[number]
const FRAME_TYPES: Frame[] = ['squares', 'name', 'headset', 'gamepad', 'joystick', 'dice', 'ghost']

function FrameSquares() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="4" y="4" width="10.5" height="10.5" rx="2.5" fill="#7c6cff" />
      <rect x="17.5" y="4" width="10.5" height="10.5" rx="2.5" fill="#a78bfa" />
      <rect x="4" y="17.5" width="10.5" height="10.5" rx="2.5" fill="#5b8cff" />
      <rect x="17.5" y="17.5" width="10.5" height="10.5" rx="2.5" fill="#38bdf8" />
    </svg>
  )
}

function FrameHeadset() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <defs>
        <linearGradient id="hs" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c6cff" />
          <stop offset="1" stopColor="#5b8cff" />
        </linearGradient>
      </defs>
      {/* strap */}
      <path d="M4 12 Q3 7 8 7" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 12 Q29 7 24 7" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      {/* visor */}
      <rect x="3" y="11" width="26" height="13.5" rx="6" fill="url(#hs)" />
      {/* lenses */}
      <circle cx="11" cy="17.7" r="3.1" fill="#0b0f18" />
      <circle cx="21" cy="17.7" r="3.1" fill="#0b0f18" />
    </svg>
  )
}

function FrameGamepad() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="3.5" y="11" width="25" height="13" rx="6.5" fill="none" stroke="#7c6cff" strokeWidth="2" />
      {/* d-pad */}
      <rect x="8" y="16.2" width="5.2" height="1.8" rx="0.9" fill="#a78bfa" />
      <rect x="9.7" y="14.5" width="1.8" height="5.2" rx="0.9" fill="#a78bfa" />
      {/* buttons */}
      <circle cx="21" cy="15.4" r="1.5" fill="#5b8cff" />
      <circle cx="24" cy="18.3" r="1.5" fill="#38bdf8" />
      <circle cx="18" cy="18.3" r="1.5" fill="#a78bfa" />
    </svg>
  )
}

function FrameJoystick() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      {/* base */}
      <ellipse cx="16" cy="25" rx="9.5" ry="3.2" fill="#5b8cff" />
      <rect x="9" y="20" width="14" height="5" rx="2.5" fill="#2e3650" />
      {/* shaft */}
      <rect x="14.7" y="11" width="2.6" height="11" rx="1.3" fill="#7c6cff" />
      {/* ball top */}
      <circle cx="16" cy="9" r="4.2" fill="#a78bfa" />
      <circle cx="14.6" cy="7.8" r="1.2" fill="#ffffff" opacity="0.7" />
    </svg>
  )
}

function FrameDice() {
  const pip = (x: number, y: number) => <circle cx={x} cy={y} r="1.7" fill="#a78bfa" />
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <rect x="6" y="6" width="20" height="20" rx="5" fill="none" stroke="#7c6cff" strokeWidth="2" />
      {pip(11, 11)}{pip(21, 11)}
      {pip(16, 16)}
      {pip(11, 21)}{pip(21, 21)}
    </svg>
  )
}

function FrameGhost() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <defs>
        <linearGradient id="gh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#5b8cff" />
        </linearGradient>
      </defs>
      <path
        d="M5 26 V15 a11 11 0 0 1 22 0 V26 l-3.7 -3 -3.6 3 -3.7 -3 -3.6 3 -3.7 -3 -3.7 3 Z"
        fill="url(#gh)"
      />
      <circle cx="12" cy="14.5" r="2.6" fill="#0b0f18" />
      <circle cx="20" cy="14.5" r="2.6" fill="#0b0f18" />
      <circle cx="12.9" cy="14.5" r="1" fill="#fff" />
      <circle cx="20.9" cy="14.5" r="1" fill="#fff" />
    </svg>
  )
}

function FrameName() {
  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg, #7c6cff, #a78bfa)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      LN
    </span>
  )
}

const RENDER: Record<Frame, () => JSX.Element> = {
  squares: FrameSquares,
  name: FrameName,
  headset: FrameHeadset,
  gamepad: FrameGamepad,
  joystick: FrameJoystick,
  dice: FrameDice,
  ghost: FrameGhost,
}

export default function Logo({ size = 30 }: { size?: number }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SEQUENCE.length), 1900)
    return () => clearInterval(t)
  }, [])
  const current = SEQUENCE[i]

  return (
    <span
      aria-label="Lav Naruka logo"
      style={{ position: 'relative', width: size, height: size, flexShrink: 0, display: 'inline-block' }}
    >
      {FRAME_TYPES.map((type) => {
        const Cmp = RENDER[type]
        const active = type === current
        return (
          <span
            key={type}
            className="logo-frame"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'scale(1) rotate(0deg)' : 'scale(0.45) rotate(-35deg)',
            }}
          >
            <Cmp />
          </span>
        )
      })}
    </span>
  )
}
