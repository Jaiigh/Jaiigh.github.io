import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const SpinningOcta: React.FC = () => {
  const meshRef = useRef<THREE.Mesh | null>(null)
  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.007
    meshRef.current.rotation.x += 0.004
  })
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} scale={0.6}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#1A1A2E" wireframe transparent opacity={0.1} />
      </mesh>
    </Float>
  )
}

const SkillsAccent: React.FC = () => (
  <div className="hidden md:block absolute right-4 bottom-8 w-48 h-48 pointer-events-none">
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      frameloop="always"
    >
      <SpinningOcta />
    </Canvas>
  </div>
)

export default SkillsAccent
