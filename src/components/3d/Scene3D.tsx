import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Box, Torus, Octahedron, Edges } from '@react-three/drei'
import * as THREE from 'three'

function FloatingCube({ position, color, speed = 1, size = 0.3 }: {
  position: [number, number, number]
  color: string
  speed?: number
  size?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.y = position[1] + Math.sin(t) * 0.3
    ref.current.rotation.x = t * 0.5
    ref.current.rotation.y = t * 0.3
  })

  return (
    <Box ref={ref} position={position} args={[size, size, size]}>
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.5}
      />
    </Box>
  )
}

function FloatingOcta({ position, color, speed = 0.8 }: {
  position: [number, number, number]
  color: string
  speed?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.y = position[1] + Math.cos(t) * 0.4
    ref.current.rotation.x = t * 0.4
    ref.current.rotation.z = t * 0.2
  })

  return (
    <Octahedron ref={ref} position={position} args={[0.25, 0]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={0.7}
      />
    </Octahedron>
  )
}

function GridPlatform() {
  const count = 30
  const lines = useMemo(() => {
    const pts: THREE.Vector3[][] = []
    for (let i = -count / 2; i <= count / 2; i++) {
      pts.push([new THREE.Vector3(i, 0, -count / 2), new THREE.Vector3(i, 0, count / 2)])
      pts.push([new THREE.Vector3(-count / 2, 0, i), new THREE.Vector3(count / 2, 0, i)])
    }
    return pts
  }, [count])

  return (
    <group position={[0, -3, 0]}>
      {lines.map((pts, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        return (
          <primitive key={i} object={new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: '#1a3a50', transparent: true, opacity: 0.4 }))} />
        )
      })}
    </group>
  )
}

// Game-themed centerpiece: 3x3x3 puzzle cube (Rubik's-style) representing
// the level-design / puzzle-architect work (PathLock grids etc.)
function PuzzleCube() {
  const groupRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)

  const cubes = useMemo(() => {
    const arr: { pos: [number, number, number]; color: string }[] = []
    const colors = ['#00e5ff', '#7c3aed', '#ff6b35']
    const gap = 0.62
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // Pick a color based on which face is most exposed
          let color = colors[0]
          if (Math.abs(x) === 1 && Math.abs(x) >= Math.abs(y) && Math.abs(x) >= Math.abs(z)) color = colors[0]
          else if (Math.abs(y) === 1 && Math.abs(y) >= Math.abs(z)) color = colors[1]
          else if (Math.abs(z) === 1) color = colors[2]
          arr.push({ pos: [x * gap, y * gap, z * gap], color })
        }
      }
    }
    return arr
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.3
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.15
    }
    if (innerRef.current) {
      innerRef.current.rotation.z = Math.sin(t * 0.4) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        {cubes.map((c, i) => (
          <Box key={i} position={c.pos} args={[0.55, 0.55, 0.55]}>
            <meshStandardMaterial
              color={c.color}
              emissive={c.color}
              emissiveIntensity={0.35}
              metalness={0.6}
              roughness={0.25}
              transparent
              opacity={0.92}
            />
            <Edges color={c.color} threshold={15} />
          </Box>
        ))}
      </group>
    </group>
  )
}

// PathLock-inspired direction arrows orbiting the puzzle cube
function DirectionArrow({ angle, radius, y, color, speed }: {
  angle: number
  radius: number
  y: number
  color: string
  speed: number
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + angle
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = y + Math.sin(t * 2) * 0.15
    // Point arrow tangent to the orbit
    ref.current.rotation.y = -t + Math.PI / 2
  })

  // Triangular arrow shape (a flat pyramid)
  return (
    <group ref={ref}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.18, 0.45, 4]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh position={[-0.22, 0, 0]}>
        <boxGeometry args={[0.25, 0.06, 0.06]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
    </group>
  )
}

// Faint ambient "level tile" sphere behind everything
function CoreGlow() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.15
  })
  return (
    <Sphere ref={ref} args={[0.9, 32, 32]} position={[0, 0, 0]}>
      <meshBasicMaterial color="#00e5ff" transparent opacity={0.06} />
    </Sphere>
  )
}

function TorusRing({ y, color, radius, speed }: {
  y: number
  color: string
  radius: number
  speed: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * speed
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.5
  })

  return (
    <Torus ref={ref} position={[0, y, 0]} args={[radius, 0.02, 16, 100]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </Torus>
  )
}

export default function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} color="#00e5ff" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#7c3aed" intensity={1.5} />
      <pointLight position={[0, 8, 0]} color="#ff6b35" intensity={1} />

      <GridPlatform />

      {/* Centerpiece — puzzle cube + glow */}
      <CoreGlow />
      <PuzzleCube />

      {/* PathLock-style direction arrows orbiting the cube */}
      <DirectionArrow angle={0} radius={2.6} y={0.2} color="#00e5ff" speed={0.6} />
      <DirectionArrow angle={Math.PI / 2} radius={2.6} y={-0.3} color="#ff6b35" speed={0.6} />
      <DirectionArrow angle={Math.PI} radius={2.6} y={0.4} color="#7c3aed" speed={0.6} />
      <DirectionArrow angle={(3 * Math.PI) / 2} radius={2.6} y={-0.1} color="#00e5ff" speed={0.6} />

      <TorusRing y={0} color="#00e5ff" radius={3.4} speed={0.3} />
      <TorusRing y={0} color="#7c3aed" radius={4.2} speed={-0.2} />

      <FloatingCube position={[-4, 1, -2]} color="#00e5ff" speed={0.7} size={0.4} />
      <FloatingCube position={[4, 2, -1]} color="#ff6b35" speed={0.9} size={0.3} />
      <FloatingCube position={[-3, -1, 1]} color="#7c3aed" speed={0.6} size={0.5} />
      <FloatingCube position={[3, -2, 2]} color="#00e5ff" speed={1.1} size={0.25} />
      <FloatingCube position={[0, 3, -3]} color="#ff6b35" speed={0.8} size={0.35} />

      <FloatingOcta position={[2, 2.5, -1]} color="#00e5ff" speed={0.7} />
      <FloatingOcta position={[-2.5, -1.5, 0.5]} color="#ff6b35" speed={1} />
      <FloatingOcta position={[0, -2.5, -2]} color="#7c3aed" speed={0.6} />
    </>
  )
}
