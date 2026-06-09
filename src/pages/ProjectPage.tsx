import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects } from '../data'

function toYouTubeEmbed(input: string): string {
  if (!input) return ''
  if (input.includes('/embed/')) return input
  const m =
    input.match(/[?&]v=([\w-]{11})/) ||
    input.match(/youtu\.be\/([\w-]{11})/) ||
    input.match(/^([\w-]{11})$/)
  return m ? `https://www.youtube.com/embed/${m[1]}` : ''
}

export default function ProjectPage() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <main className="container" style={{ paddingTop: '10rem', paddingBottom: '8rem', textAlign: 'center' }}>
        <h1 className="section-title" style={{ marginBottom: '1rem' }}>Project not found</h1>
        <p className="lead" style={{ margin: '0 auto 2rem' }}>That project doesn't exist (yet).</p>
        <Link to="/#projects" className="btn btn-primary">← Back to projects</Link>
      </main>
    )
  }

  const c = project.color
  const embed = toYouTubeEmbed(project.video)
  const related = projects
    .filter((p) => p.id !== project.id)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, 3)

  return (
    <main style={{ paddingTop: 68 }}>
      {/* ── Hero band ─────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          borderBottom: '1px solid var(--border)',
          background: `linear-gradient(180deg, ${c}14, transparent 70%)`,
        }}
      >
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <Link
            to="/#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              textDecoration: 'none',
              marginBottom: '2rem',
            }}
          >
            ← All projects
          </Link>

          <div className="responsive-grid-2col" style={{ alignItems: 'center' }}>
            {/* left: text */}
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: c, border: `1px solid ${c}55`,
                  borderRadius: 999, padding: '0.25rem 0.7rem',
                }}>
                  {project.category}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: project.status === 'Shipped' ? '#22c55e' : c,
                  border: `1px solid ${project.status === 'Shipped' ? '#22c55e55' : c + '55'}`,
                  borderRadius: 999, padding: '0.25rem 0.7rem',
                }}>
                  {project.status}
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--text)',
              }}>
                {project.title}
              </h1>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: c, marginTop: '0.35rem' }}>
                {project.subtitle}
              </p>
              <p className="lead" style={{ marginTop: '1rem' }}>{project.tagline}</p>

              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
                {project.tech.map((t) => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)',
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 8, padding: '0.25rem 0.6rem',
                  }}>{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className="btn btn-primary">View live →</a>
                )}
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
                )}
              </div>
            </div>

            {/* right: cover */}
            <div style={{
              borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)',
              boxShadow: `0 30px 60px ${c}22`,
            }}>
              <img src={project.cover} alt={project.title} style={{ width: '100%', display: 'block', aspectRatio: '16/10', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────── */}
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem', maxWidth: 920 }}>
        {/* Overview */}
        <div className="modal-section-label">Overview</div>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', lineHeight: 1.85 }}>{project.overview}</p>

        {/* Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginTop: '2rem' }}>
          {project.highlights.map((h) => (
            <div key={h} className="card" style={{ padding: '0.9rem 1.1rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
              <span style={{ color: c, marginTop: 2 }}>◆</span>
              <span style={{ fontSize: '0.92rem', color: 'var(--text)' }}>{h}</span>
            </div>
          ))}
        </div>

        {/* Video */}
        {embed && (
          <>
            <div className="modal-section-label">Demo video</div>
            <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <iframe
                src={embed}
                title={`${project.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: '0.5rem' }}>
              ✦ placeholder video — swap for your real gameplay clip
            </p>
          </>
        )}

        {/* Gallery */}
        {project.images.length > 0 && (
          <>
            <div className="modal-section-label">Screens</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {project.images.map((im, i) => (
                <figure key={i} style={{ margin: 0, borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--card)' }}>
                  <img src={im.src} alt={im.caption} loading="lazy" style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }} />
                  <figcaption style={{ padding: '0.65rem 0.8rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>{im.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: '0.5rem' }}>
              ✦ placeholder images — drop your real screenshots in /public/projects
            </p>
          </>
        )}

        {/* Process */}
        {project.process.length > 0 && (
          <>
            <div className="modal-section-label">How it was built</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {project.process.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', color: c,
                    minWidth: 30, height: 30, borderRadius: 8, border: `1px solid ${c}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{i + 1}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)' }}>{step.title}</div>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Roadmap */}
        {project.roadmap.length > 0 && (
          <>
            <div className="modal-section-label">Done & next</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {project.roadmap.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                  <span style={{ color: r.done ? '#22c55e' : 'var(--text-faint)' }}>{r.done ? '✓' : '○'}</span>
                  <span style={{ color: r.done ? 'var(--text)' : 'var(--text-dim)', fontSize: '0.95rem' }}>{r.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Related projects ──────────────────────── */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
          <div className="eyebrow">More work</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '2rem' }}>
            Related projects
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="card"
                style={{ textDecoration: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ position: 'relative' }}>
                  <img src={p.cover} alt={p.title} loading="lazy" style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, ${p.color}33)` }} />
                </div>
                <div style={{ padding: '1.1rem 1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: p.color, marginBottom: '0.4rem' }}>
                    {p.category}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem' }}>{p.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{p.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
