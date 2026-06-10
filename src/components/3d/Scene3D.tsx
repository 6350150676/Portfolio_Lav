import { useRef, useState, useEffect, useMemo, type MutableRefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, OrbitControls, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ────────────────────────────────────────────────────────────────
 *  GAME CONTROLLER  —  bright, draggable, and actually interactive.
 *  Drag to spin. Hover the face buttons to light them. CLICK them to
 *  press them in, fire a shockwave ring, rumble the whole pad, and
 *  report the press to the on-screen HUD.
 * ──────────────────────────────────────────────────────────────── */

const BODY = '#222838'
const BODY_DARK = '#171b27'
const TRIM = '#2e3650'

type PressInfo = { label: string; color: string }

function FaceButton({
  position,
  color,
  label,
  rumble,
  onPress,
}: {
  position: [number, number, number]
  color: string
  label: string
  rumble: MutableRefObject<number>
  onPress?: (p: PressInfo) => void
}) {
  const grp = useRef<THREE.Group>(null)
  const mat = useRef<THREE.MeshStandardMaterial>(null)
  const ring = useRef<THREE.Mesh>(null)
  const ringMat = useRef<THREE.MeshBasicMaterial>(null)
  const ringT = useRef(0)
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const fire = () => {
    setPressed(true)
    rumble.current = 1
    ringT.current = 1
    onPress?.({ label, color })
  }

  useFrame(() => {
    const g = grp.current
    const m = mat.current
    if (g && m) {
      const targetZ = pressed ? -0.07 : hovered ? 0.05 : 0
      g.position.z = THREE.MathUtils.lerp(g.position.z, position[2] + targetZ, 0.3)
      m.emissiveIntensity = THREE.MathUtils.lerp(m.emissiveIntensity, hovered || pressed ? 1.8 : 0.55, 0.2)
    }
    // shockwave ring
    if (ring.current && ringMat.current) {
      ringT.current = Math.max(0, ringT.current - 0.04)
      const s = 1 + (1 - ringT.current) * 2.4
      ring.current.scale.set(s, s, s)
      ringMat.current.opacity = ringT.current * 0.8
    }
  })

  return (
    <group
      ref={grp}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => { setHovered(false); setPressed(false) }}
      onPointerDown={(e) => { e.stopPropagation(); fire() }}
      onPointerUp={() => setPressed(false)}
    >
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.135, 0.135, 0.12, 32]} />
        <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={0.55} metalness={0.3} roughness={0.25} />
      </mesh>
      {/* shockwave */}
      <mesh ref={ring} position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.02, 12, 32]} />
        <meshBasicMaterial ref={ringMat} color={color} transparent opacity={0} />
      </mesh>
    </group>
  )
}

function Stick({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (!ref.current) return
    const t = s.clock.elapsedTime
    ref.current.rotation.x = Math.sin(t * 0.8) * 0.06
    ref.current.rotation.z = Math.cos(t * 0.6) * 0.06
  })
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.08, 32]} />
        <meshStandardMaterial color={BODY_DARK} metalness={0.4} roughness={0.6} />
      </mesh>
      <group ref={ref}>
        <mesh position={[0, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.22, 24]} />
          <meshStandardMaterial color="#2b3147" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.24]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#11151f" metalness={0.3} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.022, 16, 32]} />
          <meshStandardMaterial color="#7c6cff" emissive="#7c6cff" emissiveIntensity={1.1} />
        </mesh>
      </group>
    </group>
  )
}

function DPad() {
  const c = '#2b3147'
  return (
    <group position={[-0.95, 0.12, 0.34]}>
      <mesh><boxGeometry args={[0.24, 0.72, 0.14]} /><meshStandardMaterial color={c} metalness={0.35} roughness={0.4} /></mesh>
      <mesh><boxGeometry args={[0.72, 0.24, 0.14]} /><meshStandardMaterial color={c} metalness={0.35} roughness={0.4} /></mesh>
      <mesh position={[0, 0, 0.05]}><boxGeometry args={[0.16, 0.16, 0.12]} /><meshStandardMaterial color="#5b8cff" emissive="#5b8cff" emissiveIntensity={0.7} /></mesh>
    </group>
  )
}

function Controller({ rumble, onPress }: { rumble: MutableRefObject<number>; onPress?: (p: PressInfo) => void }) {
  const ref = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  useFrame((s) => {
    if (!ref.current) return
    const g = ref.current
    // idle float + gentle auto-sway so it's alive without the mouse
    const baseY = Math.sin(s.clock.elapsedTime * 0.6) * 0.12
    const sway = Math.sin(s.clock.elapsedTime * 0.4) * 0.12
    // rumble shake decays toward 0
    rumble.current = Math.max(0, rumble.current - 0.06)
    const r = rumble.current
    const shakeX = (Math.random() - 0.5) * 0.12 * r
    const shakeY = (Math.random() - 0.5) * 0.12 * r
    // tilt toward the cursor (smoothed) — responsive feel
    const targetRotX = 0.18 + pointer.y * -0.28
    const targetRotY = -0.12 + sway + pointer.x * 0.5
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRotX, 0.08)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRotY, 0.08)
    g.rotation.z = (Math.random() - 0.5) * 0.05 * r
    g.position.x = shakeX
    g.position.y = baseY + shakeY
  })

  return (
    <group ref={ref} rotation={[0.2, -0.15, 0]} scale={1.25}>
      <RoundedBox args={[3.0, 1.45, 0.62]} radius={0.32} smoothness={6}>
        <meshStandardMaterial color={BODY} metalness={0.45} roughness={0.45} />
      </RoundedBox>

      <group position={[-1.25, -0.55, 0]} rotation={[0, 0, 0.55]}>
        <RoundedBox args={[0.85, 1.35, 0.62]} radius={0.3} smoothness={5}>
          <meshStandardMaterial color={BODY} metalness={0.45} roughness={0.5} />
        </RoundedBox>
      </group>
      <group position={[1.25, -0.55, 0]} rotation={[0, 0, -0.55]}>
        <RoundedBox args={[0.85, 1.35, 0.62]} radius={0.3} smoothness={5}>
          <meshStandardMaterial color={BODY} metalness={0.45} roughness={0.5} />
        </RoundedBox>
      </group>

      <mesh position={[0, 0.62, 0.2]}>
        <boxGeometry args={[1.1, 0.06, 0.2]} />
        <meshStandardMaterial color="#7c6cff" emissive="#7c6cff" emissiveIntensity={1.2} />
      </mesh>

      <mesh position={[-1.0, 0.74, 0.05]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.6, 0.18, 0.4]} /><meshStandardMaterial color={TRIM} metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[1.0, 0.74, 0.05]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.6, 0.18, 0.4]} /><meshStandardMaterial color={TRIM} metalness={0.4} roughness={0.4} />
      </mesh>

      <DPad />

      <group position={[0.95, 0.12, 0]}>
        <FaceButton position={[0, 0.34, 0.34]} color="#a78bfa" label="Y" rumble={rumble} onPress={onPress} />
        <FaceButton position={[0.34, 0, 0.34]} color="#5b8cff" label="B" rumble={rumble} onPress={onPress} />
        <FaceButton position={[0, -0.34, 0.34]} color="#7c6cff" label="A" rumble={rumble} onPress={onPress} />
        <FaceButton position={[-0.34, 0, 0.34]} color="#38bdf8" label="X" rumble={rumble} onPress={onPress} />
      </group>

      <Stick position={[-0.42, -0.5, 0.3]} />
      <Stick position={[0.42, -0.5, 0.3]} />

      <mesh position={[0, 0.12, 0.34]}>
        <circleGeometry args={[0.08, 24]} />
        <meshStandardMaterial color="#7c6cff" emissive="#7c6cff" emissiveIntensity={1.4} />
      </mesh>
    </group>
  )
}

// Floating particle field for depth + life
function Particles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const COUNT = count
  const geo = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)
    const palette = [new THREE.Color('#7c6cff'), new THREE.Color('#5b8cff'), new THREE.Color('#a78bfa'), new THREE.Color('#38bdf8')]
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
      const c = palette[i % palette.length]
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return g
  }, [])
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.04
      ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.3) * 0.2
    }
  })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

// What each button projects as a holographic UI
const HOLO: Record<string, { title: string; lines: string[] }> = {
  A: { title: 'ABOUT', lines: ['Unity Game Developer', 'NIT Hamirpur · Physics', 'Open to work'] },
  Y: { title: 'PROJECTS', lines: ['Online Checkers', 'Zip Puzzle', 'VR Acrophobia', 'FPV Drone · Racing'] },
  B: { title: 'SKILLS', lines: ['Unity · C# · OOP', 'Firebase · SDKs', 'Unity Ads · ironSource', 'Optimization · Pooling'] },
  X: { title: 'CONTACT', lines: ['lovenaruka514', '@gmail.com', '+91-6350150676'] },
}

// Holographic panel projected above the controller (drei <Html> in 3D)
function Hologram({ info }: { info: { label: string; color: string; key: number } }) {
  const data = HOLO[info.label] ?? { title: info.label, lines: [] }
  const c = info.color
  const beam = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (beam.current) {
      const mat = beam.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.1 + Math.sin(s.clock.elapsedTime * 8) * 0.04
    }
  })
  return (
    <group position={[0, 1.7, 0]}>
      {/* projector beam from the pad up to the panel */}
      <mesh ref={beam} position={[0, -0.85, 0]}>
        <coneGeometry args={[0.7, 1.7, 4, 1, true]} />
        <meshBasicMaterial color={c} transparent opacity={0.12} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* emitter glow disc on the controller */}
      <mesh position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 24]} />
        <meshBasicMaterial color={c} transparent opacity={0.5} />
      </mesh>

      <Html center transform distanceFactor={5} pointerEvents="none" style={{ pointerEvents: 'none' }}>
        <div key={info.key} className="holo-card" style={{ ['--holo' as string]: c }}>
          <div className="holo-title" style={{ color: c }}>
            <span style={{ background: c }} /> {data.title}
          </div>
          {data.lines.map((l, i) => (
            <div key={i} className="holo-line">{l}</div>
          ))}
        </div>
      </Html>
    </group>
  )
}

export default function Scene3D({ onPress, lowPower = false, hologram = true }: { onPress?: (p: PressInfo) => void; lowPower?: boolean; hologram?: boolean }) {
  const rumble = useRef(0)
  const [holo, setHolo] = useState<{ label: string; color: string; key: number } | null>(null)

  const press = (p: PressInfo) => {
    if (hologram) setHolo({ ...p, key: (Math.random() * 1e9) | 0 })
    onPress?.(p)
  }

  // auto-dismiss the hologram after a few seconds
  useEffect(() => {
    if (!holo) return
    const t = setTimeout(() => setHolo(null), 4200)
    return () => clearTimeout(t)
  }, [holo])

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 6]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-5, 2, 4]} intensity={1.6} color="#7c6cff" />
      <pointLight position={[5, -2, 4]} intensity={1.2} color="#5b8cff" />
      <pointLight position={[0, 4, -4]} intensity={1} color="#a78bfa" />

      <Particles count={lowPower ? 70 : 220} />
      <Controller rumble={rumble} onPress={press} />
      {hologram && holo && <Hologram info={holo} />}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.6}
        rotateSpeed={0.6}
      />

      {/* bloom is GPU-heavy — skip it on low-power / mobile */}
      {!lowPower && (
        <EffectComposer>
          <Bloom intensity={0.9} luminanceThreshold={0.25} luminanceSmoothing={0.5} mipmapBlur />
        </EffectComposer>
      )}
    </>
  )
}
