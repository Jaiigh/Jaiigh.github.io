import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const SpinningIco: React.FC = () => {
  const meshRef = useRef<THREE.Mesh | null>(null)
  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.004
    meshRef.current.rotation.x += 0.002
  })
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#1A1A2E" wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  )
}

const AboutAccent: React.FC = () => (
  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 pointer-events-none">
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      frameloop="always"
    >
      <SpinningIco />
    </Canvas>
  </div>
)

export default AboutAccent
