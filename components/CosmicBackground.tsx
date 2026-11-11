"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── 1. KREATiV KOSMIK SAYYORA (CELESTIAL RINGED PLANET INSPIRED BY USER'S IMAGE) ───
function CelestialRingedPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  // Smooth Ring Geometries: concentric flat rings tilted at an angle
  const { ringGeo, innerRingGeo } = useMemo(() => {
    // Outer luminous ring
    const rGeo = new THREE.RingGeometry(1.5, 2.3, 64);
    // Inner delicate accent ring
    const iGeo = new THREE.RingGeometry(1.28, 1.42, 64);
    return { ringGeo: rGeo, innerRingGeo: iGeo };
  }, []);

  // Smooth orbital floating and gentle celestial rotation
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Gentle cosmic floating levitation (soothing, slow)
      groupRef.current.position.y = 1.3 + Math.sin(t * 0.6) * 0.12;
      groupRef.current.position.x = 3.8 + Math.cos(t * 0.45) * 0.08;
    }

    if (planetRef.current) {
      // Slow axial rotation of the planet body
      planetRef.current.rotation.y = t * 0.08;
    }

    if (ringRef.current) {
      // Subtle wobble of the planetary ring
      ringRef.current.rotation.z = t * 0.04;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 0.03;
    }

    if (atmosphereRef.current) {
      const s = 1.05 + Math.sin(t * 1.5) * 0.015;
      atmosphereRef.current.scale.set(s, s, s);
    }
  });

  return (
    // Elegantly positioned off-center in the upper-right (unobtrusive to UI)
    // Tilted ring angle matching user's uploaded screenshot (~35 deg tilt)
    <group ref={groupRef} position={[3.8, 1.3, -3.6]} scale={[0.88, 0.88, 0.88]}>
      {/* ── Main Celestial Planet Sphere ── */}
      <mesh ref={planetRef} castShadow>
        <sphereGeometry args={[1.0, 48, 48]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.65}
          metalness={0.2}
          emissive="#0369a1"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* ── Atmospheric Cyan/Purple Soft Glow Halo ── */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.04, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#818cf8"
          emissiveIntensity={0.4}
          transparent
          opacity={0.35}
          roughness={0.1}
          depthWrite={false}
        />
      </mesh>

      {/* ── Outer Concentric Planetary Ring (Tilted) ── */}
      <mesh
        ref={ringRef}
        geometry={ringGeo}
        rotation={[-Math.PI / 2.6, Math.PI / 7, 0]}
      >
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#67e8f9"
          emissiveIntensity={0.6}
          side={THREE.DoubleSide}
          transparent
          opacity={0.75}
          roughness={0.2}
        />
      </mesh>

      {/* ── Inner Accent Violet/Indigo Ring ── */}
      <mesh
        ref={innerRingRef}
        geometry={innerRingGeo}
        rotation={[-Math.PI / 2.6, Math.PI / 7, 0]}
      >
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.7}
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

// ─── 2. FLOATING MINI-CRYSTAL COMPANION (VOXEL ACCENT) ─────────────────────────
function FloatingCompanionCrystal() {
  const crystalRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  const edgeGeometry = useMemo(() => {
    const box = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    return new THREE.EdgesGeometry(box);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = -1.2 + Math.sin(t * 1.1) * 0.15;
      groupRef.current.position.x = -4.2 + Math.cos(t * 0.8) * 0.1;
    }
    if (crystalRef.current) {
      crystalRef.current.rotation.x = t * 0.3;
      crystalRef.current.rotation.y = t * 0.4;
    }
    if (wireframeRef.current && crystalRef.current) {
      wireframeRef.current.rotation.copy(crystalRef.current.rotation);
    }
  });

  return (
    <group ref={groupRef} position={[-4.2, -1.2, -4.0]}>
      <mesh ref={crystalRef}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
          roughness={0.2}
        />
      </mesh>
      <lineSegments ref={wireframeRef} geometry={edgeGeometry}>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

// ─── 3. DISTANT SOOTHING MICRO-STARFIELD ───────────────────────────────────────
function RealisticStarfield() {
  const { positions, colors } = useMemo(() => {
    const count = 900;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const starPalette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#f8fafc"),
      new THREE.Color("#bae6fd"),
      new THREE.Color("#e0e7ff"),
      new THREE.Color("#fbcfe8"),
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 20 + Math.random() * 30;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = starPalette[Math.floor(Math.random() * starPalette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}

// ─── 4. SUBTLE CINEMATIC DUST MOTES (FLOATING LIGHT PARTICLES) ────────────────
function CinematicDust() {
  const dustRef = useRef<THREE.Points>(null);
  const count = 60;

  const { positions, originalY } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origY = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      origY[i] = pos[i * 3 + 1];
    }
    return { positions: pos, originalY: origY };
  }, []);

  useFrame((state) => {
    if (!dustRef.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = dustRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      posAttr.setY(i, originalY[i] + Math.sin(t * 0.35 + i) * 0.18);
    }
    posAttr.needsUpdate = true;
    dustRef.current.rotation.y = t * 0.008;
  });

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#7dd3fc"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── 5. PARALLAX CAMERA CONTROLLER (GENTLE MOUSE REACTION) ───────────────────
function CameraParallaxController() {
  useFrame((state, delta) => {
    // Gentle responsive camera parallax based on mouse
    const targetX = state.pointer.x * 0.22;
    const targetY = state.pointer.y * 0.14;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2.0);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.6 + targetY, delta * 2.0);
    state.camera.lookAt(1.0, 0.4, -2.5);
  });

  return null;
}

// ─── MAIN SOOTHING & EYE-PLEASING 3D BACKGROUND COMPONENT ─────────────────────
export default function CosmicBackground() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 90% 65% at 75% 25%, #0e1a38 0%, #091124 50%, #050914 100%)
        `,
      }}
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 1.6, 8.0], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full pointer-events-none"
      >
        {/* Soft, Soothing Ambient Lighting */}
        <ambientLight intensity={0.85} color="#bae6fd" />

        {/* Key Light on the Celestial Planet */}
        <directionalLight
          position={[6, 8, 5]}
          intensity={1.6}
          color="#ffffff"
        />

        {/* Soft Lavender Rim Light */}
        <directionalLight
          position={[-5, -3, -4]}
          intensity={0.65}
          color="#c084fc"
        />

        {/* Subtle Responsive Camera Parallax */}
        <CameraParallaxController />

        {/* Distant Delicate Micro-Stars */}
        <RealisticStarfield />

        {/* Floating Cinematic Dust Motes */}
        <CinematicDust />

        {/* ── KREATiV KOSMIK SAYYORA (CELESTIAL RINGED PLANET) ── */}
        <CelestialRingedPlanet />

        {/* ── FLOATING COMPANION CRYSTAL ── */}
        <FloatingCompanionCrystal />
      </Canvas>

      {/* Gentle Soothing Atmosphere Gradient (Very Easy on the Eyes) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 75% 30%, rgba(56, 189, 248, 0.06) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(192, 132, 252, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, rgba(5, 9, 20, 0.05) 0%, rgba(5, 9, 20, 0.3) 100%)
          `,
        }}
      />
    </div>
  );
}
