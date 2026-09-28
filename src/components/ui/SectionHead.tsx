import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { Arrow } from './Scribble'

// "§02 ———————— THE BENCH" + big title + lead + optional margin note.
export default function SectionHead({
  no,
  kicker,
  title,
  lead,
  note,
  className = '',
}: {
  no: string
  kicker: string
  title: ReactNode
  lead?: ReactNode
  note?: ReactNode
  className?: string
}) {
  return (
    <Reveal className={`shead ${className}`}>
      <div className="shead__rule">
        <span className="shead__no">§{no}</span>
        <span className="shead__line" />
        <span className="label shead__kicker">{kicker}</span>
      </div>
      <h2 className="display shead__title">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      {note && (
        <p className="hand shead__note">
          {note}
          <Arrow width={60} />
        </p>
      )}
    </Reveal>
  )
}
