import { personalInfo, education, certifications, capabilities } from '../../data'
import Reveal from '../ui/Reveal'
import ControllerToy from '../ui/ControllerToy'

export default function About() {
  return (
    <section id="about" className="section-pad" style={{
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', right: -200, top: '30%', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,108,255,0.05) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        {/* Intro — centered */}
        <Reveal style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>01 / About me</div>
          <h2 className="section-title">Production mobile games, end&nbsp;to&nbsp;end</h2>
          <p className="lead" style={{ margin: '1.25rem auto 0' }}>
            Don't just read my skills — <strong style={{ color: 'var(--text)' }}>play through them.</strong> Use the
            controller to run, jump, shoot open project crates, and collect everything I work with.
          </p>
        </Reveal>

        {/* The game — big, centered centerpiece */}
        <Reveal style={{ maxWidth: 880, margin: '2.5rem auto 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
              Playable demo · my skills as a game
            </span>
          </div>
          <div className="hex-border" style={{ padding: '1rem' }}>
            <ControllerToy />
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-faint)', lineHeight: 1.6, maxWidth: 620, margin: '0.9rem auto 0', textAlign: 'center' }}>
            “Skill Run” is a real game I built — game loop, physics, shooting, collision, collectibles &amp; state —
            driven by a custom 3D gamepad I coded in React Three Fiber. The same systems thinking I bring to Unity.
          </p>
        </Reveal>

        {/* The text — now UNDER the game */}
        <Reveal className="responsive-grid-2col" style={{ marginTop: '4rem', alignItems: 'start' }}>
          {/* Left: bio + what I work on */}
          <div>
            <p style={{ fontSize: '1.08rem', color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {personalInfo.bio}
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: '2rem' }}>
              {personalInfo.bio2}
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '1rem' }}>
              WHAT I WORK ON
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1.25rem' }}>
              {capabilities.map((cap) => (
                <div key={cap} style={{ display: 'flex', gap: '0.55rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', marginTop: 1, fontSize: '0.8rem' }}>▹</span>
                  <span style={{ fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: education + certs + quick facts */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '1rem' }}>
              EDUCATION
            </div>
            {education.map((e, i) => (
              <div key={i} className="hex-border" style={{ padding: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>{e.degree}</div>
                <div style={{ fontSize: '1rem', color: 'var(--accent)' }}>{e.school}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>{e.period}</div>
              </div>
            ))}

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--accent)', margin: '1.5rem 0 0.75rem' }}>
              CERTIFICATIONS
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '0.4rem 0.8rem', borderRadius: 8, background: 'var(--accent-soft)' }}>
                  {c.name}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {[
                { label: 'LOCATION', value: 'India · remote' },
                { label: 'STATUS', value: 'Open to Work' },
                { label: 'COLLEGE', value: 'NIT Hamirpur' },
                { label: 'FOCUS', value: 'Mobile Games' },
              ].map((item) => (
                <div key={item.label} className="hex-border" style={{ padding: '0.75rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-dim)', letterSpacing: '0.2em', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
