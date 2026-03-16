import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constants ────────────────────────────────────────────────────────────────
const NODE_COUNT = 90;
const EDGE_THRESHOLD = 4.5;
const SPREAD = { x: 12, y: 7, z: 6 };
const ORBIT_RADIUS = 14;
const ORBIT_SPEED = 0.06;
const CRIMSON = new THREE.Color("#E63946");

// ─── Seeded pseudo-random (LCG) — deterministic across HMR ───────────────────
function seededRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(s, 1664525) + 1013904223;
    return (s >>> 0) / 0xffffffff;
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface MouseRef {
  x: number;
  y: number;
}

interface DriftPhase {
  px: number;
  py: number;
  pz: number;
  fx: number;
  fy: number;
  fz: number;
  amp: number;
}

interface NeuralNetworkProps {
  mouse: React.RefObject<MouseRef>;
}

// ─── Inner R3F component ──────────────────────────────────────────────────────
const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ mouse }) => {
  const { camera } = useThree();

  // Seeded node positions + radii — same every render
  const { basePositions, nodeRadii } = useMemo(() => {
    const rng = seededRandom(42);
    const positions = Array.from(
      { length: NODE_COUNT },
      () =>
        new THREE.Vector3(
          (rng() * 2 - 1) * SPREAD.x,
          (rng() * 2 - 1) * SPREAD.y,
          (rng() * 2 - 1) * SPREAD.z,
        ),
    );
    const radii = Array.from({ length: NODE_COUNT }, () => 0.04 + rng() * 0.05);
    return { basePositions: positions, nodeRadii: radii };
  }, []);

  // Per-node drift phases — seeded, unique per node
  const driftPhases = useMemo<DriftPhase[]>(() => {
    const rng = seededRandom(99);
    return Array.from({ length: NODE_COUNT }, () => ({
      px: rng() * Math.PI * 2,
      py: rng() * Math.PI * 2,
      pz: rng() * Math.PI * 2,
      fx: 0.2 + rng() * 0.3,
      fy: 0.2 + rng() * 0.3,
      fz: 0.15 + rng() * 0.2,
      amp: 0.15 + rng() * 0.25,
    }));
  }, []);

  // Precomputed edge pairs from base positions
  const edgePairs = useMemo<[number, number][]>(() => {
    const pairs: [number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (basePositions[i].distanceTo(basePositions[j]) < EDGE_THRESHOLD) {
          pairs.push([i, j]);
        }
      }
    }
    return pairs;
  }, [basePositions]);

  // Edge geometry — single draw call, updated each frame
  const edgeGeometry = useMemo<THREE.BufferGeometry>(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(edgePairs.length * 6);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [edgePairs]);

  // Current animated positions (live, no React state)
  const currentPositions = useRef<THREE.Vector3[]>(
    basePositions.map((p) => p.clone()),
  );

  // InstancedMesh — one draw call for all 90 nodes
  const instancedRef = useRef<THREE.InstancedMesh | null>(null);

  // Reusable scratch objects to avoid per-frame allocation
  const _matrix = useMemo(() => new THREE.Matrix4(), []);
  const _scale = useMemo(() => new THREE.Vector3(), []);
  const _quat = useMemo(() => new THREE.Quaternion(), []);

  // Smooth camera target (lerped)
  const camTarget = useRef(new THREE.Vector3(0, 0, ORBIT_RADIUS));

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;

    // 1. Camera orbit on Y + mouse parallax
    const orbitX = Math.sin(t * ORBIT_SPEED) * ORBIT_RADIUS + mx * 1.5;
    const orbitY = Math.sin(t * 0.04) * 2 + my * 1.0;
    const orbitZ = Math.cos(t * ORBIT_SPEED) * ORBIT_RADIUS + my * 0.5;
    camTarget.current.set(orbitX, orbitY, orbitZ);
    camera.position.lerp(camTarget.current, 0.04);
    camera.lookAt(0, 0, 0);

    // 2. Per-node ambient drift + update instanced mesh
    const inst = instancedRef.current;
    for (let i = 0; i < NODE_COUNT; i++) {
      const base = basePositions[i];
      const phase = driftPhases[i];
      const cur = currentPositions.current[i];

      cur.set(
        base.x + Math.sin(t * phase.fx + phase.px) * phase.amp,
        base.y + Math.cos(t * phase.fy + phase.py) * phase.amp,
        base.z + Math.sin(t * phase.fz + phase.pz) * phase.amp,
      );

      if (inst) {
        _scale.setScalar(nodeRadii[i]);
        _matrix.compose(cur, _quat, _scale);
        inst.setMatrixAt(i, _matrix);
      }
    }
    if (inst) inst.instanceMatrix.needsUpdate = true;

    // 3. Update edge buffer
    const posAttr = edgeGeometry.attributes.position as THREE.BufferAttribute;
    for (let e = 0; e < edgePairs.length; e++) {
      const [i, j] = edgePairs[e];
      const a = currentPositions.current[i];
      const b = currentPositions.current[j];
      posAttr.setXYZ(e * 2, a.x, a.y, a.z);
      posAttr.setXYZ(e * 2 + 1, b.x, b.y, b.z);
    }
    posAttr.needsUpdate = true;
    edgeGeometry.computeBoundingSphere();
  });

  return (
    <group>
      {/* Edges — single draw call */}
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color={CRIMSON} transparent opacity={0.45} />
      </lineSegments>

      {/* Nodes — instanced, single draw call */}
      <instancedMesh
        ref={instancedRef}
        args={[undefined, undefined, NODE_COUNT]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color={CRIMSON}
          emissive={CRIMSON}
          emissiveIntensity={0.5}
          roughness={0.5}
          metalness={0.3}
        />
      </instancedMesh>
    </group>
  );
};

// ─── Exported component ───────────────────────────────────────────────────────
const HeroScene: React.FC = () => {
  const mouse = useRef<MouseRef>({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <Canvas
      frameloop="always"
      camera={{ position: [0, 0, ORBIT_RADIUS], fov: 55 }}
      style={{ background: "#0a0a0a", pointerEvents: "none" }}
      gl={{ alpha: false, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[8, 8, 8]} intensity={1.5} color="#E63946" />
      <pointLight position={[-8, -6, -4]} intensity={0.4} color="#ffffff" />
      <NeuralNetwork mouse={mouse} />
    </Canvas>
  );
};

export default HeroScene;
