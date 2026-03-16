import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 60
const EDGE_THRESHOLD = 3.8
const AMBER = new THREE.Color('#F5A623')
const WHITE = new THREE.Color('#ffffff')

function NeuralNetwork({ mouse }) {
  const { camera } = useThree()

  // Generate fixed base positions once
  const basePositions = useMemo(() => {
    // Seeded-ish: use fixed offsets to prevent re-randomising on HMR
    return Array.from({ length: NODE_COUNT }, (_, i) => {
      const t = i / NODE_COUNT
      return new THREE.Vector3(
        (Math.sin(t * 137.5 * (Math.PI / 180)) * 2 - 1) * 8,
        (Math.cos(t * 97.3 * (Math.PI / 180)) * 2 - 1) * 5,
        (Math.sin(t * 61.8 * (Math.PI / 180)) * 2 - 1) * 4
      )
    })
  }, [])

  // Current (animated) positions stored in refs — never cause React re-renders
  const currentPositions = useRef(basePositions.map((p) => p.clone()))

  // Precompute edge pairs
  const edgePairs = useMemo(() => {
    const pairs = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (basePositions[i].distanceTo(basePositions[j]) < EDGE_THRESHOLD) {
          pairs.push([i, j])
        }
      }
    }
    return pairs
  }, [basePositions])

  // Edge geometry — single draw call
  const edgeGeoRef = useRef(null)
  const edgeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(edgePairs.length * 6) // 2 verts * 3 floats
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [edgePairs])

  // Node mesh refs
  const nodeRefs = useRef([])
  if (nodeRefs.current.length !== NODE_COUNT) {
    nodeRefs.current = Array.from({ length: NODE_COUNT }, () => ({ current: null }))
  }

  // Camera drift targets
  const cameraTarget = useRef({ x: 0, y: 0 })

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    // 1. Camera drift
    cameraTarget.current.x = Math.sin(t * 0.15) * 1.2
    cameraTarget.current.y = Math.cos(t * 0.1) * 0.7
    camera.position.x += (cameraTarget.current.x - camera.position.x) * 0.02
    camera.position.y += (cameraTarget.current.y - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)

    // 2. Node displacement toward mouse (world direction from NDC)
    const mouseWorld = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5)
      .unproject(camera)
      .sub(camera.position)
      .normalize()

    for (let i = 0; i < NODE_COUNT; i++) {
      const base = basePositions[i]
      const cur = currentPositions.current[i]

      // Slight drift toward mouse ray direction
      const pull = mouseWorld.clone().multiplyScalar(0.4)
      const target = base.clone().add(pull)

      cur.lerp(target, 0.03)

      if (nodeRefs.current[i]?.current) {
        nodeRefs.current[i].current.position.copy(cur)
      }
    }

    // 3. Update edge buffer
    const posAttr = edgeGeometry.attributes.position
    for (let e = 0; e < edgePairs.length; e++) {
      const [i, j] = edgePairs[e]
      const a = currentPositions.current[i]
      const b = currentPositions.current[j]
      posAttr.setXYZ(e * 2, a.x, a.y, a.z)
      posAttr.setXYZ(e * 2 + 1, b.x, b.y, b.z)
    }
    posAttr.needsUpdate = true
    edgeGeometry.computeBoundingSphere()
  })

  return (
    <group>
      {/* Edges */}
      <lineSegments ref={edgeGeoRef} geometry={edgeGeometry}>
        <lineBasicMaterial color={AMBER} transparent opacity={0.25} />
      </lineSegments>

      {/* Nodes */}
      {basePositions.map((pos, i) => (
        <mesh
          key={i}
          ref={nodeRefs.current[i]}
          position={[pos.x, pos.y, pos.z]}
        >
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial
            color={i % 5 === 0 ? AMBER : WHITE}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <Canvas
      frameloop="always"
      camera={{ position: [0, 0, 12], fov: 60 }}
      style={{ background: 'transparent', pointerEvents: 'none' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={2} color="#F5A623" />
      <pointLight position={[-6, -4, -4]} intensity={0.6} color="#ffffff" />
      <NeuralNetwork mouse={mouse} />
    </Canvas>
  )
}
