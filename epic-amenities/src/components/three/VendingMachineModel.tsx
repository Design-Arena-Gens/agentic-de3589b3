'use client';

import { MeshDistortMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ReactNode, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color } from 'three';
import type { Group, Mesh, MeshStandardMaterial } from 'three';
import { useRef } from 'react';

type Palette = {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
};

type MachineModelProps = {
  palette: Palette;
  animate?: boolean;
  showStand?: boolean;
};

function MachineCore({ palette, animate = true, showStand = true }: MachineModelProps) {
  const machineRef = useRef<Group>(null);
  const doorRef = useRef<Mesh>(null);
  const screenRef = useRef<Mesh>(null);

  const [primary, secondary, accent] = useMemo(
    () => [new Color(palette.primary), new Color(palette.secondary), new Color(palette.accent)],
    [palette.primary, palette.secondary, palette.accent]
  );

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    if (machineRef.current) {
      machineRef.current.rotation.y = Math.sin(t * 0.4) * 0.25;
      machineRef.current.position.y = Math.sin(t * 0.6) * 0.08;
    }
    if (doorRef.current) {
      doorRef.current.rotation.y = Math.sin(t * 0.8) * 0.1;
    }
    if (screenRef.current) {
      const emissiveIntensity = 0.7 + Math.sin(t * 2) * 0.2;
      (screenRef.current.material as MeshStandardMaterial).emissiveIntensity = emissiveIntensity;
    }
  });

  return (
    <group ref={machineRef}>
      <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.8, 1.1]} />
        <meshStandardMaterial color={primary} roughness={0.18} metalness={0.6} />
      </mesh>

      <mesh position={[0, 1.3, 0.56]} ref={doorRef} castShadow>
        <boxGeometry args={[1.54, 2.7, 0.08]} />
        <meshPhysicalMaterial color={secondary} roughness={0.12} metalness={0.5} transmission={0.35} opacity={0.9} />
      </mesh>

      <mesh position={[0, 1.65, 0.61]} ref={screenRef}>
        <boxGeometry args={[1.2, 0.9, 0.02]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} metalness={0.3} />
      </mesh>

      <mesh position={[-0.55, 0.6, 0.58]}>
        <boxGeometry args={[0.3, 1.1, 0.05]} />
        <meshStandardMaterial color={primary.clone().offsetHSL(0.05, 0.1, 0.1)} metalness={0.6} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.15, 0.6]}>
        <boxGeometry args={[0.8, 0.4, 0.05]} />
        <meshStandardMaterial color={secondary.clone().offsetHSL(-0.02, 0, 0.1)} metalness={0.5} roughness={0.25} />
      </mesh>

      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[1.45, 0.2, 1]} />
        <meshStandardMaterial color={primary.clone().offsetHSL(-0.05, -0.1, -0.02)} metalness={0.6} />
      </mesh>

      {showStand && (
        <mesh position={[0, -0.35, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.4, 1.6, 0.3, 64]} />
          <meshStandardMaterial color={secondary.clone().offsetHSL(0.05, -0.1, -0.15)} metalness={0.55} />
        </mesh>
      )}

      <group position={[0, 2.1, 0]}>
        <mesh>
          <torusGeometry args={[0.5, 0.04, 32, 94]} />
          <meshStandardMaterial
            color={accent.clone().offsetHSL(0.08, 0, 0.1)}
            emissive={accent}
            emissiveIntensity={0.6}
            metalness={0.25}
          />
        </mesh>
      </group>
    </group>
  );
}

type MachineCanvasProps = {
  palette: Palette;
  className?: string;
  animate?: boolean;
  showStand?: boolean;
  cameraPosition?: [number, number, number];
  children?: ReactNode;
};

export function VendingMachineCanvas({
  palette,
  className,
  animate = true,
  showStand = true,
  cameraPosition = [3.4, 2.6, 4.2],
  children
}: MachineCanvasProps) {
  return (
    <Canvas
      className={className}
      gl={{ antialias: true, alpha: true }}
      shadows
      dpr={[1, 2]}
      camera={{ position: cameraPosition, fov: 42 }}
    >
      <color attach="background" args={[0, 0, 0]} />
      <PerspectiveCamera makeDefault position={cameraPosition} />
      <ambientLight intensity={0.65} />
      <spotLight
        position={[2, 5, 5]}
        angle={0.9}
        penumbra={0.6}
        intensity={2.4}
        color={palette.glow}
        castShadow
      />
      <directionalLight position={[-5, 6, -2]} intensity={0.6} color={palette.secondary} />
      <pointLight position={[0, 3, 1.4]} intensity={0.8} color={palette.primary} />
      <pointLight position={[0, 1.2, -2]} intensity={0.4} color={palette.accent} />
      <MachineCore palette={palette} animate={animate} showStand={showStand} />
      <mesh position={[0, -0.52, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3, 64]} />
        <MeshDistortMaterial
          color={palette.glow}
          transparent
          opacity={0.24}
          distort={0.3}
          speed={2.1}
        />
      </mesh>
      {children}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        autoRotate={!animate}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}
