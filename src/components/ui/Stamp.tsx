import type { CSSProperties, ReactNode } from 'react'
import type { Tone } from '../../lib/lab'

// A rubber stamp. Inside a <Reveal> it "thunks" onto the page on scroll.
export default function Stamp({
  children,
  tone = 'blue',
  rotate,
  large = false,
  className = '',
  style,
}: {
  children: ReactNode
  tone?: Tone
  rotate?: number
  large?: boolean
  className?: string
  style?: CSSProperties
}) {
  const vars = rotate !== undefined ? ({ '--stamp-r': `${rotate}deg` } as CSSProperties) : undefined
  return (
    <span className={`stamp stamp--${tone}${large ? ' stamp--lg' : ''} ${className}`} style={{ ...vars, ...style }}>
      {children}
    </span>
  )
}
