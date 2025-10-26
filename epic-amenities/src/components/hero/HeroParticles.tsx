'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending } from 'three';
import type { Points } from 'three';

function Particles() {
  const ref = useRef<Points>(null);
  const count = 1200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 6 + Math.random() * 8;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      arr[i * 3] = radius * Math.cos(phi) * Math.sin(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = radius * Math.cos(theta);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        color="#93c5fd"
        sizeAttenuation
        transparent
        opacity={0.72}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

export default function HeroParticles() {
  return (
    <Canvas
      className="absolute inset-0 -z-10 opacity-80"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 14], fov: 45 }}
    >
      <color attach="background" args={['#040712']} />
      <Particles />
    </Canvas>
  );
}
