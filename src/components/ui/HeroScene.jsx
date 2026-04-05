import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingLines() {
  const group = useRef()
  useFrame((s) => {
    if (!group.current) return
    group.current.rotation.y = s.clock.elapsedTime * 0.04
    group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.025) * 0.06
  })

  const lines = useMemo(() => {
    const arr = []
    for (let i = 0; i < 18; i++) {
      const pts = []
      const steps = 40
      for (let j = 0; j < steps; j++) {
        const t = (j / steps) * Math.PI * 2
        const r = 2.8 + Math.sin(t * 3 + i * 0.7) * 0.6
        pts.push(new THREE.Vector3(
          Math.cos(t + i * 0.35) * r,
          Math.sin(t * 1.5 + i * 0.2) * 1.2,
          Math.sin(t + i * 0.35) * r
        ))
      }
      arr.push(pts)
    }
    return arr
  }, [])

  return (
    <group ref={group}>
      {lines.map((pts, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial color="#1B4FFF" transparent opacity={0.06 + (i % 3) * 0.02} />
          </line>
        )
      })}
    </group>
  )
}

function Particles() {
  const pts = useRef()
  const count = 120
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 2.5
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((s) => {
    if (pts.current) pts.current.rotation.y = s.clock.elapsedTime * 0.015
  })

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#1B4FFF" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function RotatingIcosahedron() {
  const mesh = useRef()
  useFrame((s) => {
    if (!mesh.current) return
    mesh.current.rotation.x = s.clock.elapsedTime * 0.12
    mesh.current.rotation.y = s.clock.elapsedTime * 0.08
  })
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshStandardMaterial color="#1B4FFF" wireframe transparent opacity={0.12} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#EEF2FF" />
      <FloatingLines />
      <Particles />
      <RotatingIcosahedron />
    </Canvas>
  )
}
