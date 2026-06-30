import { Link } from 'react-router-dom'
import { projects, projectCategories } from '../../data'
import { getMedia } from '../../lib/projectMedia'
import Reveal from '../ui/Reveal'
import TechIcon from '../ui/TechIcon'

export default function Projects() {
  return (
    <section id="projects" className="section-pad" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">03 / Selected work</div>
          <h2 className="section-title">Projects</h2>
          <p className="lead">
            Split by what they actually are — VR/XR, games, and hardware. Click any card to open its
            full case study: deep write-up, screenshots, and a demo video.
          </p>
        </Reveal>

        {projectCategories.map((cat) => {
          const items = projects.filter((p) => p.category === cat.key)
          if (items.length === 0) return null
          return (
            <div key={cat.key} style={{ marginTop: '3.5rem' }}>
              {/* category header */}
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--text)' }}>
                    {cat.key}
                  </h3>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.92rem' }}>{cat.blurb}</span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-faint)' }}>
                    {items.length} {items.length === 1 ? 'project' : 'projects'}
                  </span>
                </div>
              </Reveal>

              {/* cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {items.map((p, ci) => {
                  const cover = getMedia(p.id).cover
                  return (
                  <Reveal key={p.id} delay={ci * 80} style={{ display: 'flex' }}>
                  <Link
                    to={`/projects/${p.id}`}
                    className="card"
                    style={{ textDecoration: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column', width: '100%' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)'
                      e.currentTarget.style.boxShadow = `0 22px 45px ${p.color}26`
                      e.currentTarget.style.borderColor = `${p.color}66`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }}
                  >
                    {/* cover */}
                    <div style={{ position: 'relative' }}>
                      {cover ? (
                        <img
                          src={cover}
                          alt={p.title}
                          loading="lazy"
                          style={{ width: '100%', display: 'block', aspectRatio: '16/10', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ width: '100%', aspectRatio: '16/10', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${p.color}2e, var(--surface))` }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', opacity: 0.75, padding: '0 1rem', textAlign: 'center' }}>{p.title}</span>
                        </div>
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 35%, rgba(9,12,20,0.55) 85%), linear-gradient(120deg, ${p.color}33, transparent 60%)` }} />
                      <span style={{
                        position: 'absolute', top: 12, left: 12,
                        fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em',
                        textTransform: 'uppercase', color: '#fff',
                        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, padding: '0.22rem 0.6rem',
                      }}>
                        {p.status}
                      </span>
                    </div>

                    {/* body */}
                    <div style={{ padding: '1.25rem 1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--text)' }}>
                        {p.title}
                      </h4>
                      <div style={{ fontSize: '0.85rem', color: p.color, marginBottom: '0.7rem', fontWeight: 500 }}>
                        {p.subtitle}
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '1rem' }}>
                        {p.tagline}
                      </p>

                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.1rem' }}>
                        {p.tech.slice(0, 3).map((t) => (
                          <span key={t} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.32rem',
                            fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)',
                            background: 'var(--chip-bg)', border: '1px solid var(--border)',
                            borderRadius: 6, padding: '0.2rem 0.48rem',
                          }}>
                            <TechIcon name={t} size={11} />
                            {t}
                          </span>
                        ))}
                      </div>

                      <span style={{
                        marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: p.color,
                      }}>
                        View project →
                      </span>
                    </div>
                  </Link>
                  </Reveal>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
