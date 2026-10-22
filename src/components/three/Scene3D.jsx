import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function Particles({ count = 4500 }) {
  const ref = useRef();
  const { pointer } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 28;

      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);

      const accent = Math.random() > 0.8;
      col[i3] = accent ? 200 / 255 : 0.85 + Math.random() * 0.15;
      col[i3 + 1] = accent ? 245 / 255 : 0.85 + Math.random() * 0.15;
      col[i3 + 2] = accent ? 74 / 255 : 0.85 + Math.random() * 0.15;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.01;
    ref.current.rotation.x = pointer.y * 0.06;
    ref.current.rotation.z = pointer.x * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' count={count} array={positions} itemSize={3} />
        <bufferAttribute attach='attributes-color' count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function AnimatedRing({ radius, thickness = 0.008, color, speed, tilt }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, thickness, 16, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function GlowOrb() {
  const ref = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      const s = 1 + Math.sin(t * 0.7) * 0.2;
      ref.current.scale.set(s, s, s);
      ref.current.material.opacity = 0.12 + Math.sin(t * 1.3) * 0.06;
    }
    if (glowRef.current) {
      const gs = 1 + Math.sin(t * 0.5) * 0.3;
      glowRef.current.scale.set(gs, gs, gs);
      glowRef.current.material.opacity = 0.03 + Math.sin(t * 0.9) * 0.02;
    }
  });

  return (
    <group position={[0, 0, -8]}>
      <mesh ref={ref}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color='#c8f54a' transparent opacity={0.1} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color='#c8f54a' transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

function Shape({ position, color, speed, distort, scale, children }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.08 * speed;
    ref.current.rotation.y = t * 0.12 * speed;
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        {children}
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.95}
          distort={distort}
          speed={1.2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function Shapes() {
  return (
    <group>
      <Shape position={[5, 2, -4]} color='#c8f54a' speed={0.5} distort={0.2} scale={1}>
        <torusKnotGeometry args={[0.7, 0.22, 100, 16]} />
      </Shape>
      <Shape position={[-5, -1.5, -3]} color='#e8ff8a' speed={0.65} distort={0.3} scale={0.9}>
        <icosahedronGeometry args={[0.65, 1]} />
      </Shape>
      <Shape position={[6, -3.5, -5]} color='#9af54a' speed={0.55} distort={0.2} scale={0.6}>
        <octahedronGeometry args={[0.5]} />
      </Shape>
      <Shape position={[-6, 3.5, -6]} color='#c8f54a' speed={0.35} distort={0.35} scale={0.45}>
        <dodecahedronGeometry args={[0.5]} />
      </Shape>
      <Shape position={[-3, 5, -7]} color='#b4ff40' speed={0.3} distort={0.25} scale={0.5}>
        <torusGeometry args={[0.4, 0.15, 16, 32]} />
      </Shape>
    </group>
  );
}

function WireGrid() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.opacity = 0.04 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
      <planeGeometry args={[80, 80, 40, 40]} />
      <meshBasicMaterial color='#c8f54a' wireframe transparent opacity={0.04} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 65 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.12} />
      <pointLight position={[10, 10, 10]} intensity={0.7} color='#c8f54a' />
      <pointLight position={[-10, -5, -10]} intensity={0.35} color='#f4ffb0' />
      <pointLight position={[0, -10, 5]} intensity={0.2} color='#ffffff' />
      <Particles />
      <Shapes />
      <GlowOrb />
      <AnimatedRing radius={4.5} color='#c8f54a' speed={0.12} tilt={[Math.PI / 3, 0.2, 0]} />
      <AnimatedRing radius={6.5} color='#e8ff8a' speed={-0.08} tilt={[Math.PI / 4, -0.3, 0.5]} />
      <AnimatedRing radius={9} color='#9af54a' speed={0.06} tilt={[Math.PI / 6, 0.5, -0.2]} />
      <WireGrid />
    </Canvas>
  );
}
