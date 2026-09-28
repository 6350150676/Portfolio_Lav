import { useEffect, useState, type ComponentType } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { projects, projectExtra } from '../data'
import { getMedia } from '../lib/projectMedia'
import { benchFor, categoryShort, categoryTone, expNo, statusTone } from '../lib/lab'
import TechIcon from '../components/ui/TechIcon'
import Stamp from '../components/ui/Stamp'
import Reveal from '../components/ui/Reveal'
import { Specimen } from '../components/sections/Projects'
import BenchCard from '../components/bench/BenchCard'
import PathPuzzle from '../components/bench/PathPuzzle'
import WallsToy from '../components/bench/WallsToy'
import SpeedToy from '../components/bench/SpeedToy'
import HeartToy from '../components/bench/HeartToy'
import ReconnectToy from '../components/bench/ReconnectToy'
import SaveTheCatEconomy from '../components/report/SaveTheCatEconomy'

// bench experiments that can be re-run inside a lab report
const TRIALS: Record<string, ComponentType> = {
  'no-instructions': PathPuzzle,
  walls: WallsToy,
  speed: SpeedToy,
  heartbeat: HeartToy,
  reconnect: ReconnectToy,
}

// project-specific diagram sections, keyed by project id
const DESIGN_SECTIONS: Record<string, { title: string; anchor: string; Diagram: ComponentType }> = {
  'save-the-cat': { title: 'Monetization design', anchor: 'monetization', Diagram: SaveTheCatEconomy },
}

function Section({ n, title, id, children }: { n: number; title: string; id?: string; children: React.ReactNode }) {
  return (
    <Reveal className="rsec">
      <h2 className="rsec__title" id={id}>
        <span className="rsec__n">§{n}</span>
        {title}
      </h2>
      {children}
    </Reveal>
  )
}

export default function ProjectPage() {
  const { id } = useParams()
  const { hash } = useLocation()
  const project = projects.find((p) => p.id === id)
  const [zoom, setZoom] = useState<{ src: string; caption: string } | null>(null)

  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 120)
    return () => clearTimeout(t)
  }, [id, hash])

  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoom])

  if (!project) {
    return (
      <main className="container report report--missing">
        <p className="label">Error 404 · specimen not found</p>
        <h1 className="display">This experiment <em>doesn't exist</em> (yet).</h1>
        <p className="lead">Either it was never logged, or it escaped. Back to the notebook?</p>
        <Link to="/#projects" className="btn btn--signal">← All experiments</Link>
      </main>
    )
  }

  const extra = projectExtra[project.id]
  const media = getMedia(project.id)
  const trials = benchFor(project.id).filter((b) => TRIALS[b.id])
  const design = DESIGN_SECTIONS[project.id]
  const related = projects
    .filter((p) => p.id !== project.id)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, 3)
  const links = [
    project.links.playStore && { href: project.links.playStore, label: 'Google Play ↗', main: true },
    project.links.appStore && { href: project.links.appStore, label: 'App Store ↗', main: !project.links.playStore },
    project.links.demo && { href: project.links.demo, label: 'Live demo ↗', main: true },
    project.links.github && { href: project.links.github, label: 'GitHub ↗', main: false },
  ].filter(Boolean) as { href: string; label: string; main: boolean }[]
  let sec = 0

  return (
    <main className="report">
      <div className="container">
        <Link to="/#projects" className="report__back label">← Back to all experiments</Link>

        {/* ── Cover sheet ─────────────────────────────── */}
        <header className="report__head sheet">
          <div className="report__strip">
            <span className="label">Lab report · Experiment {expNo(project.no)}</span>
            <span className={`xcard__tab tone-${categoryTone[project.category] ?? 'blue'}`}>
              Filed under {categoryShort[project.category] ?? project.category}
            </span>
          </div>

          <div className="report__head-grid">
            <div>
              <p className="label report__qlabel">The question</p>
              <p className="display report__q">“{project.question}”</p>
              <h1 className="report__title">{project.title}</h1>
              <p className="report__sub">{project.subtitle}</p>
              <p className="report__abstract">{project.tagline}</p>
              {links.length > 0 && (
                <div className="report__links">
                  {links.map((l) => (
                    <a key={l.href + l.label} href={l.href} target="_blank" rel="noreferrer" className={`btn ${l.main ? 'btn--signal' : ''}`}>
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="report__fig">
              <Specimen p={project} />
              <Stamp tone={statusTone(project.status)} rotate={-10} large className="report__stamp">{project.status}</Stamp>
            </div>
          </div>

          {extra?.metrics?.length ? (
            <dl className="report__metrics">
              {extra.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="label">{m.label}</dt>
                  <dd className="display">{m.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </header>

        {/* ── Body ────────────────────────────────────── */}
        <div className="report__grid">
          <div className="report__main">
            {design && (
              <Section n={++sec} title={design.title} id={design.anchor}>
                <design.Diagram />
              </Section>
            )}

            <Section n={++sec} title="Abstract">
              <p className="rsec__lead">{project.description}</p>
            </Section>

            {project.csr && (
              <Section n={++sec} title="Problem · Method · Findings">
                <div className="pmf">
                  <div className="pmf__col">
                    <p className="label">Problem</p>
                    <p>{project.csr.challenge}</p>
                  </div>
                  <div className="pmf__col">
                    <p className="label">Method</p>
                    <p>{project.csr.solution}</p>
                  </div>
                  <div className="pmf__col pmf__col--find">
                    <p className="label">Findings</p>
                    <ul>
                      {project.csr.result.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                  </div>
                </div>
              </Section>
            )}

            <Section n={++sec} title="Observations">
              <p className="rsec__body">{project.overview}</p>
            </Section>

            {extra?.deepDive?.length ? (
              <Section n={++sec} title="Lab notes">
                <div className="notes">
                  {extra.deepDive.map((d, i) => (
                    <article key={d.title} className="note">
                      <p className="label note__n">Note {String(i + 1).padStart(2, '0')}</p>
                      <h3 className="note__title">{d.title}</h3>
                      <p className="note__body">{d.body}</p>
                    </article>
                  ))}
                </div>
              </Section>
            ) : null}

            {project.process.length > 0 && (
              <Section n={++sec} title="Procedure">
                <ol className="procedure">
                  {project.process.map((step, i) => (
                    <li key={step.title}>
                      <span className="procedure__n">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            {media.gallery.length > 0 && (
              <Section n={++sec} title="Figures">
                <div className="figures">
                  {media.gallery.map((im, i) => (
                    <figure key={im.src} className="figure">
                      <button className="figure__btn" onClick={() => setZoom(im)} aria-label={`Enlarge figure ${i + 2}`}>
                        <img src={im.src} alt={im.caption || project.title} loading="lazy" />
                      </button>
                      <figcaption className="label">Fig. {i + 2}{im.caption ? ` — ${im.caption}` : ''}</figcaption>
                    </figure>
                  ))}
                </div>
              </Section>
            )}

            {trials.length > 0 && (
              <Section n={++sec} title="Reproduce it yourself">
                <p className="rsec__body" style={{ marginBottom: '1.5rem' }}>
                  A small piece of this project, pulled out so you can run it right here.
                </p>
                <div className="report__trials">
                  {trials.map((t) => {
                    const Trial = TRIALS[t.id]
                    return <BenchCard key={t.id} exp={t}><Trial /></BenchCard>
                  })}
                </div>
              </Section>
            )}
          </div>

          {/* ── Side panel ──────────────────────────── */}
          <aside className="report__side">
            {extra?.role && (
              <div className="side-block sheet">
                <p className="label">My role</p>
                <p className="side-block__text">{extra.role}</p>
              </div>
            )}

            {project.highlights.length > 0 && (
              <div className="side-block sheet">
                <p className="label">Key results</p>
                <ul className="checklist checklist--tight">
                  {project.highlights.map((h) => (
                    <li key={h}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M2.5 8.5 L6.5 12 L13.5 3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="side-block sheet">
              <p className="label">Apparatus</p>
              <div className="side-block__tags">
                {project.tech.map((t) => (
                  <span key={t} className="tag"><TechIcon name={t} size={12} />{t}</span>
                ))}
              </div>
              {extra?.architecture?.length ? (
                <>
                  <p className="label" style={{ marginTop: '1.1rem' }}>Patterns</p>
                  <div className="side-block__tags">
                    {extra.architecture.map((a) => <span key={a} className="tag">{a}</span>)}
                  </div>
                </>
              ) : null}
            </div>

            {project.roadmap.length > 0 && (
              <div className="side-block sheet">
                <p className="label">Status &amp; next trials</p>
                <ul className="roadmap">
                  {project.roadmap.map((r) => (
                    <li key={r.label} className={r.done ? 'is-done' : ''}>
                      <span className="roadmap__box" aria-hidden>{r.done ? '✓' : ''}</span>
                      <span>{r.label}</span>
                      <span className="sr-only">{r.done ? '(done)' : '(next)'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* ── Related ─────────────────────────────────── */}
        <section className="related">
          <div className="shead__rule">
            <span className="shead__no">→</span>
            <span className="shead__line" />
            <span className="label shead__kicker">Related experiments</span>
          </div>
          <div className="related__grid">
            {related.map((p) => (
              <Link key={p.id} to={`/projects/${p.id}`} className="related__card sheet">
                <span className="label">Experiment {expNo(p.no)} · {categoryShort[p.category] ?? p.category}</span>
                <span className="display related__q">{p.question}</span>
                <span className="related__title">{p.title} →</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)} role="dialog" aria-label="Enlarged figure">
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={zoom.src} alt={zoom.caption || project.title} />
            {zoom.caption && <figcaption className="label">{zoom.caption}</figcaption>}
          </figure>
          <button className="lightbox__close btn btn--sm" aria-label="Close" onClick={() => setZoom(null)}>✕ close</button>
        </div>
      )}
    </main>
  )
}
