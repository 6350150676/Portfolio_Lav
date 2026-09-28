import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects, projectCategories } from '../../data'
import { getMedia } from '../../lib/projectMedia'
import { categoryShort, categoryTone, expNo, statusTone, type Project } from '../../lib/lab'
import SectionHead from '../ui/SectionHead'
import Reveal from '../ui/Reveal'
import Stamp from '../ui/Stamp'
import Spotlight from './Spotlight'

// Specimen photo, or a hatched "photo pending" slot when a project has none yet.
export function Specimen({ p, fig = 1 }: { p: Project; fig?: number }) {
  const cover = getMedia(p.id).cover
  return (
    <figure className="specimen">
      <span className="tape tape--tl" />
      <div className="specimen__frame">
        {cover ? (
          <img src={cover} alt={`${p.title} — cover`} loading="lazy" />
        ) : (
          <div className="specimen__missing">
            <span className="display">{expNo(p.no)}</span>
            <span className="hand">photo pending</span>
          </div>
        )}
      </div>
      <figcaption className="label">Fig. {fig} — {p.title}</figcaption>
    </figure>
  )
}

function ExperimentCard({ p, featured }: { p: Project; featured: boolean }) {
  return (
    <Link to={`/projects/${p.id}`} className={`xcard sheet ${featured ? 'xcard--featured' : ''}`}>
      <div className="xcard__head">
        <span className="label">Experiment {expNo(p.no)}</span>
        <span className={`xcard__tab tone-${categoryTone[p.category] ?? 'blue'}`}>{categoryShort[p.category] ?? p.category}</span>
      </div>

      <div className="xcard__body">
        <div className="xcard__fig">
          <Specimen p={p} />
          <Stamp tone={statusTone(p.status)} rotate={-9} className="xcard__stamp">{p.status}</Stamp>
        </div>

        <div className="xcard__text">
          <p className="xcard__qlabel label">Question</p>
          <h3 className="display xcard__q">{p.question}</h3>
          <p className="xcard__title">
            <strong>{p.title}</strong>
            <span>{p.subtitle}</span>
          </p>
          {featured && <p className="xcard__tagline">{p.tagline}</p>}
          {p.csr?.result?.[0] && (
            <p className="xcard__finding">
              <span className="label">Finding</span>
              {p.csr.result[0]}
            </p>
          )}
          <span className="xcard__open">Open lab report <span aria-hidden>→</span></span>
        </div>
      </div>
    </Link>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<string>('All')
  const tabs = [
    { key: 'All', label: 'All', n: projects.length },
    ...projectCategories.map((c) => ({
      key: c.key,
      label: categoryShort[c.key] ?? c.key,
      n: projects.filter((p) => p.category === c.key).length,
    })),
  ].filter((t) => t.n > 0)
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const blurb = projectCategories.find((c) => c.key === filter)?.blurb
  // feature one wide card — or two, if one would leave a lonely card in the 3-column grid
  const featured = shown.length > 1 && (shown.length - 1) % 3 === 1 ? 2 : 1

  return (
    <section id="projects" className="section-pad">
      <div className="container">
        <SectionHead
          no="01"
          kicker="Experiment files"
          title={<>Every project started as <em>a question.</em></>}
          lead={`${projects.length} experiments, filed by what they are. Each file opens a full lab report — the problem, the method, what I measured, and what I'd try next.`}
        />

        <Spotlight />

        <div className="dividers" role="tablist" aria-label="Filter experiments by category">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={filter === t.key}
              className={`dividers__tab ${filter === t.key ? 'is-on' : ''}`}
              onClick={() => setFilter(t.key)}
            >
              {t.label} <sup>{t.n}</sup>
            </button>
          ))}
          <span className="dividers__rule" />
        </div>
        {blurb && <p className="dividers__blurb hand">{blurb}</p>}

        <div className="xgrid">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 70} className={i < featured ? 'xgrid__featured' : ''}>
              <ExperimentCard p={p} featured={i < featured} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
