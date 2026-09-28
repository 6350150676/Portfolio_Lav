import { experience } from '../../data'
import SectionHead from '../ui/SectionHead'
import Reveal from '../ui/Reveal'
import Stamp from '../ui/Stamp'

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <div className="container">
        <SectionHead
          no="03"
          kicker="Lab log"
          title={<>Where the experiments <em>ran for real.</em></>}
          lead="From intern to shipping real-time multiplayer games to live players — the production work behind the notebook."
        />

        <div className="log sheet">
          <span className="log__margin" aria-hidden />
          {experience.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 100} className="log__entry">
              <div className="log__date">
                <span className="hand">{exp.period.replace('–', '→')}</span>
                <span className="label">entry {String(i + 1).padStart(2, '0')}</span>
              </div>

              <div className="log__body">
                <div className="log__top">
                  <div>
                    <h3 className="display log__role">{exp.role}</h3>
                    <p className="log__company">{exp.company}</p>
                  </div>
                  <Stamp tone={exp.type === 'Full-Time' ? 'ok' : 'blue'} rotate={-5}>{exp.type}</Stamp>
                </div>

                <div className="log__kit">
                  <span className="label">equipment</span>
                  {exp.stack.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>

                <ol className="log__obs">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>
                      <span className="log__obs-n">obs. {j + 1}</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ol>

                {exp.challenge && (
                  <div className="incident">
                    <svg className="incident__clip" width="22" height="54" viewBox="0 0 22 54" fill="none" aria-hidden>
                      <path d="M6 40 V10 a5 5 0 0 1 10 0 V44 a8 8 0 0 1 -16 0 V16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                    <p className="label incident__label">Incident report — the hard part</p>
                    <p className="incident__row"><b>Problem</b>{exp.challenge.problem}</p>
                    <p className="incident__row"><b>Fix</b>{exp.challenge.solution}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
