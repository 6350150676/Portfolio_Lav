import { useState } from 'react'
import { achievements } from '../../data'
import SectionHead from '../ui/SectionHead'
import Reveal from '../ui/Reveal'

// A wax/ink seal emblem (used when no real badge image is provided)
function Seal({ label, i }: { label: string; i: number }) {
  const tone = ['var(--signal)', 'var(--blue)', 'var(--ok)', 'var(--signal)'][i % 4]
  return (
    <svg className="seal" width="78" height="78" viewBox="0 0 78 78" aria-hidden style={{ color: tone }}>
      <g transform="translate(39 39)">
        {Array.from({ length: 24 }).map((_, k) => (
          <path key={k} d="M0 -36 L4 -29 L-4 -29 Z" fill="currentColor" transform={`rotate(${k * 15})`} />
        ))}
      </g>
      <circle cx="39" cy="39" r="29" fill="currentColor" />
      <circle cx="39" cy="39" r="24" fill="none" stroke="var(--card)" strokeWidth="1.2" strokeDasharray="2 2.5" />
      <text x="39" y="40" textAnchor="middle" dominantBaseline="central" fontFamily="Fraunces, serif" fontWeight="700" fontSize={label.length > 2 ? 13 : 19} fill="var(--card)">
        {label}
      </text>
    </svg>
  )
}

function Badge({ a, i }: { a: (typeof achievements)[number]; i: number }) {
  const [ok, setOk] = useState(!!a.badge)
  if (ok && a.badge) {
    return <img className="seal" src={a.badge} alt={`${a.title} badge`} onError={() => setOk(false)} width={78} height={78} style={{ objectFit: 'contain' }} />
  }
  return <Seal label={a.emblem} i={i} />
}

export default function Achievements() {
  return (
    <section id="achievements" className="section-pad">
      <div className="container">
        <SectionHead
          no="06"
          kicker="Credentials"
          title={<>Pinned to <em>the wall.</em></>}
          lead="Credentials backing the work above — from Unity, GeeksforGeeks and GATE. Where there's a public record, the card links straight to it."
        />

        <div className="certs">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={(i % 2) * 90}>
              <article className="cert sheet" style={{ ['--tilt' as string]: `${[-0.8, 0.6, 0.5, -0.6][i % 4]}deg` }}>
                <span className="cert__pin" aria-hidden />
                <div className="cert__frame">
                  <div className="cert__top">
                    <Badge a={a} i={i} />
                    <div>
                      <p className="label cert__kind">{a.kind}</p>
                      <h3 className="display cert__title">{a.title}</h3>
                      <p className="cert__issuer">{a.issuer}</p>
                    </div>
                  </div>
                  <p className="cert__blurb">{a.blurb}</p>
                  {a.points.length > 0 && (
                    <ul className="cert__points">
                      {a.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  )}
                  <div className="cert__foot">
                    {a.link ? (
                      <a href={a.link} target="_blank" rel="noreferrer" className="btn btn--sm">Verify ↗</a>
                    ) : (
                      <span className="label">no public link</span>
                    )}
                    {a.credentialId && <span className="cert__id label">ID {a.credentialId}</span>}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
