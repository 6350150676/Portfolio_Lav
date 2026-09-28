import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { benchExperiments } from '../../data'
import { expNo, projectById } from '../../lib/lab'
import Stamp from '../ui/Stamp'

type Exp = (typeof benchExperiments)[number]

// The index-card frame every bench experiment sits in.
export default function BenchCard({
  exp,
  children,
  wide = false,
  className = '',
}: {
  exp: Exp
  children: ReactNode
  wide?: boolean
  className?: string
}) {
  const from = exp.from ? projectById(exp.from) : undefined
  return (
    <article className={`bcard sheet ${wide ? 'bcard--wide' : ''} ${className}`} id={`exp-${exp.no}`}>
      <header className="bcard__head">
        <span className="label bcard__no">Experiment {expNo(exp.no)}</span>
        <Stamp tone="signal" rotate={4} className="bcard__stamp">Playable</Stamp>
      </header>
      <h3 className="display bcard__q">{exp.question}</h3>
      <p className="bcard__from">
        {from ? (
          <>
            Pulled from <Link className="link" to={`/projects/${from.id}`}>{expNo(from.no)} · {from.title}</Link>
          </>
        ) : (
          <>Pulled from this website</>
        )}
      </p>
      <div className="bcard__body">{children}</div>
    </article>
  )
}

export function Finding({ children, label = 'Finding' }: { children: ReactNode; label?: string }) {
  return (
    <div className="finding" aria-live="polite">
      <span className="label finding__label">{label}</span>
      <div className="finding__text">{children}</div>
    </div>
  )
}
