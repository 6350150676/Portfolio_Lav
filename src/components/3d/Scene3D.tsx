import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Box, Torus, Octahedron } from '@react-three/drei'
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

function CentralSphere() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.2
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  return (
    <Sphere ref={ref} args={[1.2, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#00e5ff"
        emissive="#003344"
        emissiveIntensity={0.5}
        distort={0.3}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.7}
      />
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
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} color="#00e5ff" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#7c3aed" intensity={1.5} />
      <pointLight position={[0, 8, 0]} color="#ff6b35" intensity={1} />

      <GridPlatform />
      <CentralSphere />

      <TorusRing y={0} color="#00e5ff" radius={2.2} speed={0.3} />
      <TorusRing y={0} color="#7c3aed" radius={3} speed={-0.2} />
      <TorusRing y={0} color="#ff6b35" radius={4} speed={0.15} />

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
