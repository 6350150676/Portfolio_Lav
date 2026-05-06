import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Scene3D from '../3d/Scene3D'
import { personalInfo, stats } from '../../data'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Typing effect for subtitle
    const texts = ['Level Designer', 'XR Engineer', 'Puzzle Architect', 'Game Systems Dev']
    let textIndex = 0
    let charIndex = 0
    let deleting = false
    const el = document.getElementById('hero-subtitle')
    if (!el) return

    const type = () => {
      const current = texts[textIndex]
      if (!deleting) {
        el.textContent = current.slice(0, charIndex + 1)
        charIndex++
        if (charIndex === current.length) {
          deleting = true
          setTimeout(type, 1500)
          return
        }
      } else {
        el.textContent = current.slice(0, charIndex - 1)
        charIndex--
        if (charIndex === 0) {
          deleting = false
          textIndex = (textIndex + 1) % texts.length
        }
      }
      setTimeout(type, deleting ? 50 : 80)
    }
    type()
  }, [])

  return (
    <section id="home" style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
        >
          <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={1} />
          <Scene3D />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, var(--bg) 80%)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '8rem 4rem 4rem',
        maxWidth: 800,
      }}>
        <div className="section-tag" style={{ marginBottom: '1rem', animation: 'fadeIn 0.8s ease' }}>
          ⚡ AVAILABLE FOR HIRE
        </div>

        <h1
          ref={titleRef}
          className="glitch"
          data-text={personalInfo.name}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900,
            color: 'var(--text)',
            lineHeight: 1,
            marginBottom: '0.5rem',
            textShadow: '0 0 60px rgba(0,229,255,0.3)',
          }}
        >
          {personalInfo.name}
        </h1>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          color: 'var(--accent)',
          marginBottom: '0.5rem',
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          Unity Game Developer &amp;{' '}
          <span id="hero-subtitle" style={{ color: 'var(--accent2)', minWidth: 200 }}></span>
          <span style={{ animation: 'pulse 1s infinite', color: 'var(--accent)' }}>|</span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.2rem',
          color: 'var(--text-dim)',
          maxWidth: 500,
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}>
          {personalInfo.tagline}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <a
            href="#projects"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'var(--bg)',
              background: 'var(--accent)',
              padding: '0.9rem 2rem',
              textDecoration: 'none',
              clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
              boxShadow: '0 0 30px var(--glow-strong)',
              transition: 'all 0.2s',
            }}
          >
            VIEW WORK
          </a>
          <a
            href="mailto:lovenaruka514@gmail.com"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'var(--accent)',
              background: 'transparent',
              border: '1px solid var(--accent)',
              padding: '0.9rem 2rem',
              textDecoration: 'none',
              clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
              transition: 'all 0.2s',
            }}
          >
            GET IN TOUCH
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 900,
                color: 'var(--accent)',
                textShadow: '0 0 20px var(--accent)',
              }}>
                {s.icon} {s.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'var(--text-dim)',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        right: '2rem',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-dim)', letterSpacing: '0.3em', writingMode: 'vertical-rl' }}>SCROLL</span>
        <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </div>
    </section>
  )
}
