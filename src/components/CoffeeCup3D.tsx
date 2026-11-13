"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// 3D Coffee Cup & Saucer Model
function CupModel() {
  const groupRef = useRef<THREE.Group>(null);
  const startTime = useRef<number>(Date.now());

  useFrame(() => {
    if (groupRef.current) {
      const elapsed = (Date.now() - startTime.current) * 0.001;
      groupRef.current.rotation.y = elapsed * 0.25;
      groupRef.current.position.y = Math.sin(elapsed * 0.8) * 0.08;
    }
  });

  return (
    <group ref={groupRef} dispose={null} position={[0, -0.2, 0]}>
      {/* Ceramic Saucer */}
      <mesh position={[0, -0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.55, 1.1, 0.12, 48]} />
        <meshStandardMaterial
          color="#FFF9F2"
          roughness={0.25}
          metalness={0.08}
        />
      </mesh>

      {/* Saucer Rim Ring */}
      <mesh position={[0, -0.58, 0]}>
        <torusGeometry args={[1.45, 0.04, 16, 48]} />
        <meshStandardMaterial color="#D7BDA5" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Ceramic Cup Body */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 0.72, 1.15, 48]} />
        <meshStandardMaterial
          color="#FFF9F2"
          roughness={0.22}
          metalness={0.05}
        />
      </mesh>

      {/* Terracotta Accent Ring around Cup rim */}
      <mesh position={[0, 0.52, 0]}>
        <torusGeometry args={[0.99, 0.035, 16, 48]} />
        <meshStandardMaterial color="#A65F38" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Coffee Surface */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.06, 48]} />
        <meshStandardMaterial
          color="#2A1712"
          roughness={0.15}
          metalness={0.1}
        />
      </mesh>

      {/* Delicate Latte Art Spiral */}
      <mesh position={[0, 0.46, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.55, 32]} />
        <meshStandardMaterial
          color="#D7BDA5"
          roughness={0.3}
          metalness={0.05}
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh position={[0, 0.465, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.18, 32]} />
        <meshStandardMaterial
          color="#FFF9F2"
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Cup Handle */}
      <mesh position={[1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.38, 0.09, 16, 32, Math.PI * 1.1]} />
        <meshStandardMaterial
          color="#FFF9F2"
          roughness={0.22}
          metalness={0.05}
        />
      </mesh>

      {/* Floating Coffee Beans */}
      <FloatingBean position={[-1.6, 0.8, 0.4]} scale={0.7} speed={1.2} />
      <FloatingBean position={[1.7, 0.9, -0.3]} scale={0.65} speed={0.9} />
      <FloatingBean position={[-1.2, -0.3, 1.2]} scale={0.55} speed={1.4} />
    </group>
  );
}

function FloatingBean({
  position,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const beanRef = useRef<THREE.Mesh>(null);
  const startTime = useRef<number>(Date.now());

  useFrame(() => {
    if (beanRef.current) {
      const elapsed = (Date.now() - startTime.current) * 0.001;
      beanRef.current.rotation.x = elapsed * 0.6 * speed;
      beanRef.current.rotation.y = elapsed * 0.8 * speed;
      beanRef.current.position.y =
        position[1] + Math.sin(elapsed * speed) * 0.12;
    }
  });

  return (
    <mesh
      ref={beanRef}
      position={position}
      scale={[0.22 * scale, 0.32 * scale, 0.18 * scale]}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#2A1712" roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

export default function CoffeeCup3D() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-terracotta border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div
          className="relative w-64 h-64 rounded-full overflow-hidden shadow-deep border-4 border-vanilla"
          style={{ position: "relative" }}
        >
          <img
            src="/images/latte-art.jpg"
            alt="Handcrafted Coffee"
            className="w-full h-full object-cover animate-pulse"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] relative pointer-events-auto" style={{ position: "relative" }}>
      <Canvas
        shadows={false}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <PerspectiveCamera makeDefault position={[0, 1.4, 4.2]} fov={45} />

        {/* Warm Ambient & Directional Lighting */}
        <ambientLight intensity={1.4} color="#FFF9F2" />
        <directionalLight
          position={[5, 8, 4]}
          intensity={2.0}
          color="#FFF2E5"
        />
        <pointLight position={[-4, 2, -3]} intensity={0.9} color="#A65F38" />
        <pointLight position={[3, -2, 2]} intensity={0.7} color="#D7BDA5" />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
          <CupModel />
        </Float>

        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.45}
          scale={5.5}
          blur={2.4}
          far={3.5}
          color="#2A1712"
        />
      </Canvas>

      {/* 3D Interactive subtle hint badge */}
      <div className="absolute bottom-2 right-4 px-3 py-1 rounded-full glass-cream text-[11px] font-sans tracking-wider uppercase text-espresso/70 flex items-center gap-1.5 shadow-sm pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
        Interactive 3D Craft
      </div>
    </div>
  );
}
