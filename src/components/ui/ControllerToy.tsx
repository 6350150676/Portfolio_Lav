import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene3D from '../3d/Scene3D'
import SkillGame, { type SkillGameHandle } from './SkillGame'

// Big inline game on top, driven by the 3D controller below it.
// A = Jump · B = Shoot · X = Dash · Y = Codex.
export default function ControllerToy() {
  const game = useRef<SkillGameHandle>(null)
  const [lowPower, setLowPower] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )

  useEffect(() => {
    const onResize = () => setLowPower(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div style={{ width: '100%' }}>
      {/* the game screen — big */}
      <SkillGame ref={game} height={lowPower ? 280 : 360} />

      {/* the 3D controller that drives it */}
      <div style={{ position: 'relative', height: lowPower ? 320 : 400, marginTop: '0.5rem' }}>
        <div
          style={{
            position: 'absolute',
            inset: '16%',
            background: 'radial-gradient(circle at 50% 45%, var(--glow), transparent 65%)',
            filter: 'blur(22px)',
            pointerEvents: 'none',
          }}
        />
        <Canvas camera={{ position: [0, 0.4, 7], fov: 42 }} dpr={[1, lowPower ? 1.5 : 2]} style={{ background: 'transparent' }}>
          <Scene3D onPress={(p) => game.current?.press(p.label)} lowPower={lowPower} hologram={false} />
        </Canvas>
      </div>

      <div
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.64rem',
          letterSpacing: '0.06em',
          color: 'var(--text-faint)',
          marginTop: '0.25rem',
        }}
      >
        the controller is the input — <b style={{ color: 'var(--text-dim)' }}>A</b> jump ·{' '}
        <b style={{ color: 'var(--text-dim)' }}>B</b> shoot · <b style={{ color: 'var(--text-dim)' }}>X</b> dash ·{' '}
        <b style={{ color: 'var(--text-dim)' }}>Y</b> codex · drag to rotate
      </div>
    </div>
  )
}
