import { Link } from 'react-router-dom'
import CountUp from '../ui/CountUp'
import Stamp from '../ui/Stamp'
import { Arrow, Tally, Underline } from '../ui/Scribble'
import PathPuzzle from '../bench/PathPuzzle'
import { SPOTLIGHT_HREF } from './Spotlight'
import { personalInfo, benchExperiments } from '../../data'
import { expNo, onTheBench, projectById, tally } from '../../lib/lab'

export default function Hero() {
  const heroExp = benchExperiments.find((b) => b.id === 'no-instructions')!
  const from = projectById(heroExp.from)
  const bench = onTheBench()

  const counts = [
    { n: tally.experiments, label: 'experiments logged' },
    { n: tally.playable, label: 'playable on this page' },
    { n: tally.shipped, label: 'shipped' },
    { n: tally.running, label: 'still running' },
    ...(tally.abandoned ? [{ n: tally.abandoned, label: 'abandoned' }] : []),
  ]

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="label hero__kicker">
            Notebook Nº 1 <span className="hero__dash" /> {personalInfo.name} · game designer &amp; Unity developer
          </p>

          <h1 className="display hero__title">
            <span className="hero__l1">Lav’s</span>
            <span className="hero__l2">
              <em>Experiments</em>
              <Underline className="hero__underline" />
            </span>
          </h1>
          <p className="hand hero__aside" aria-hidden>
            <Arrow width={54} />
            mostly games{' '}
            <br />
            (and one drone)
          </p>

          <p className="hero__intro">
            I'm {personalInfo.name}. I design and build multiplayer mobile games, XR experiences and gameplay systems in
            Unity — and I treat every one of them like an experiment: <span className="hl">a question, a prototype, and
            whatever the players prove.</span>
          </p>

          <dl className="tally">
            {counts.map((c) => (
              <div key={c.label} className="tally__cell">
                <dt className="label tally__label">{c.label}</dt>
                <dd className="tally__val">
                  <span className="display tally__n"><CountUp value={String(c.n)} duration={900} /></span>
                  <Tally n={c.n} className="tally__marks" />
                </dd>
              </div>
            ))}
          </dl>

          <div className="hero__ctas">
            <a href="#projects" className="btn btn--signal" onClick={scrollTo('projects')}>Open the experiments ↓</a>
            <a href={personalInfo.resume} download="Lav_Naruka_Resume.pdf" className="btn">Download CV</a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn btn--ghost">GitHub ↗</a>
          </div>

          <div className="hero__status">
            <span className="hero__status-item">
              <span className="dot dot--ok" /> Open to work · full-time / contract · {personalInfo.location}, remote-friendly
            </span>
            <span className="hero__status-item hero__spot">
              <span className="label">★ Worked on most →</span>
              <Link className="link" to={SPOTLIGHT_HREF}>Save the Cat's monetization design</Link>
            </span>
            {bench && (
              <span className="hero__status-item">
                <span className="label">On the bench now →</span>
                <Link className="link" to={`/projects/${bench.project.id}`}>{bench.project.title}</Link>
                {bench.next && <span className="hero__next">next: {bench.next.toLowerCase()}</span>}
              </span>
            )}
          </div>
        </div>

        <div className="hero__exp">
          <article className="sheet hero__card" aria-labelledby="hero-exp-q">
            <span className="tape tape--top" />
            <header className="bcard__head">
              <span className="label bcard__no">Experiment {expNo(heroExp.no)}</span>
              <Stamp tone="signal" rotate={5} className="bcard__stamp">Playable</Stamp>
            </header>
            <h2 id="hero-exp-q" className="display hero__q">
              Can you play this <em>without instructions?</em>
            </h2>
            <PathPuzzle />
            {from && (
              <p className="bcard__from hero__from">
                Pulled from <Link className="link" to={`/projects/${from.id}`}>{expNo(from.no)} · {from.title}</Link>
              </p>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
