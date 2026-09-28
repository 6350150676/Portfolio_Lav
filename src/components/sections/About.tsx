import { personalInfo, education, capabilities, stats } from '../../data'
import SectionHead from '../ui/SectionHead'
import Reveal from '../ui/Reveal'
import CountUp from '../ui/CountUp'

// A tiny deterministic barcode for the ID badge
function Barcode({ text }: { text: string }) {
  const bars: number[] = []
  for (const ch of text) {
    const c = ch.charCodeAt(0)
    bars.push((c % 3) + 1, ((c >> 2) % 2) + 1)
  }
  let x = 0
  return (
    <svg className="badge__barcode" viewBox={`0 0 ${bars.reduce((a, b) => a + b + 1, 0)} 20`} preserveAspectRatio="none" aria-hidden>
      {bars.map((w, i) => {
        const r = i % 2 === 0 ? <rect key={i} x={x} y="0" width={w} height="20" /> : null
        x += w + 1
        return r
      })}
    </svg>
  )
}

export default function About() {
  const edu = education[0]
  return (
    <section id="about" className="section-pad about">
      <div className="container">
        <SectionHead
          no="04"
          kicker="The inventor"
          title={<>Who runs <em>this lab.</em></>}
        />

        <div className="about__grid">
          <Reveal className="badge-wrap">
            <div className="badge sheet">
              <span className="badge__slot" aria-hidden />
              <div className="badge__band">
                <span>Lab access</span>
                <span>Nº 001</span>
              </div>
              <div className="badge__main">
                <div className="badge__photo" aria-hidden>
                  <span className="display">LN</span>
                </div>
                <div>
                  <p className="display badge__name">{personalInfo.name}</p>
                  <p className="badge__role">Game designer &amp; Unity developer</p>
                </div>
              </div>
              <dl className="badge__fields">
                <div><dt className="label">Trained at</dt><dd>{edu.school} · {edu.degree.replace('B.Tech – ', 'B.Tech, ')} ({edu.period})</dd></div>
                <div><dt className="label">Based in</dt><dd>{personalInfo.location} · remote-friendly</dd></div>
                <div><dt className="label">Clearance</dt><dd>Games · XR · hardware</dd></div>
                <div><dt className="label">Status</dt><dd className="badge__status"><span className="dot dot--ok" /> Open to work</dd></div>
              </dl>
              <Barcode text={personalInfo.name + personalInfo.githubHandle} />
            </div>
          </Reveal>

          <Reveal delay={100} className="about__text">
            <p className="about__bio">{personalInfo.bio}</p>
            <p className="about__bio about__bio--2">{personalInfo.bio2}</p>

            <div className="about__readings">
              <p className="label">Field measurements</p>
              <dl>
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="label">{s.label}</dt>
                    <dd className="display"><CountUp value={s.value} /></dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="label about__does-label">What this lab does</p>
            <ul className="checklist">
              {capabilities.map((c) => (
                <li key={c}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M2.5 8.5 L6.5 12 L13.5 3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
