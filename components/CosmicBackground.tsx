"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── 1. 3D ROTATING MINECRAFT CUBE (CENTRAL ICONIC VOXEL BLOCK) ───────────────
function RotatingMinecraftBlock() {
  const meshRef = useRef<THREE.Mesh>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  // Load Minecraft pixel textures safely with nearest neighbor filtering
  const materials = useMemo(() => {
    if (typeof window === "undefined") return [];

    const loader = new THREE.TextureLoader();

    const loadTex = (url: string) => {
      const tex = loader.load(url, () => setTexturesLoaded(true));
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.generateMipmaps = false;
      return tex;
    };

    const sideTex = loadTex("/blocks/grass_block_side.png");
    const topTex = loadTex("/blocks/grass_block_top.png");
    const bottomTex = loadTex("/blocks/dirt.png");

    return [
      new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.85, metalness: 0.05 }), // Right (+X)
      new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.85, metalness: 0.05 }), // Left (-X)
      new THREE.MeshStandardMaterial({ map: topTex, roughness: 0.9, metalness: 0.05 }),   // Top (+Y)
      new THREE.MeshStandardMaterial({ map: bottomTex, roughness: 0.95, metalness: 0.0 }), // Bottom (-Y)
      new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.85, metalness: 0.05 }), // Front (+Z)
      new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.85, metalness: 0.05 }), // Back (-Z)
    ];
  }, []);

  // Smooth floating levitation and 3D rotation
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Gentle levitation (floating like a Minecraft dropped item)
      groupRef.current.position.y = 1.25 + Math.sin(t * 0.8) * 0.14;
      groupRef.current.position.x = 3.6 + Math.cos(t * 0.5) * 0.08;
    }

    if (meshRef.current) {
      // Smooth continuous 3D rotation
      meshRef.current.rotation.y = t * 0.45;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.12 - 0.22;
    }

    if (shadowRef.current) {
      const s = 1.0 + Math.sin(t * 0.8) * 0.08;
      shadowRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef} position={[3.6, 1.25, -3.2]} scale={[1.1, 1.1, 1.1]}>
      {/* The 3D Minecraft Cube */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1.65, 1.65, 1.65]} />
        {materials.length === 6 ? (
          materials.map((mat, i) => <primitive key={i} object={mat} attach={`material-${i}`} />)
        ) : (
          <meshStandardMaterial color="#4ade80" roughness={0.8} />
        )}
      </mesh>

      {/* Floating Floor Shadow */}
      <mesh
        ref={shadowRef}
        position={[0, -1.35, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Subtle Ambient Voxel Aura */}
      <pointLight color="#22c55e" intensity={1.2} distance={5} position={[0, 0.2, 0]} />
    </group>
  );
}

// ─── 2. FLOATING COMPANION VOXEL (DIAMOND / AMETHYST MINI-BLOCK) ─────────────
function FloatingCompanionVoxel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const diamondMaterial = useMemo(() => {
    if (typeof window === "undefined") return new THREE.MeshStandardMaterial({ color: "#38bdf8" });
    const loader = new THREE.TextureLoader();
    const tex = loader.load("/blocks/diamond_block.png");
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    return new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.3,
      metalness: 0.4,
      emissive: "#0284c7",
      emissiveIntensity: 0.35,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = 0.2 + Math.sin(t * 1.1 + 1.5) * 0.18;
      groupRef.current.position.x = 2.1 + Math.cos(t * 0.7 + 0.8) * 0.12;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = -t * 0.6;
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[2.1, 0.2, -2.8]} scale={[0.55, 0.55, 0.55]}>
      <mesh ref={meshRef} material={diamondMaterial}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      <pointLight color="#38bdf8" intensity={1.5} distance={4} />
    </group>
  );
}

// ─── 3. MINECRAFT CAVE SPORES & VOXEL PARTICLES (REPLACES SPACE STARS) ────────
function MinecraftVoxelParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 180;

  const { positions, colors, speeds, originalY } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const origY = new Float32Array(count);

    // Minecraft Spore & Ember Palette: Emerald, Soul Cyan, Gold, Amethyst
    const palette = [
      new THREE.Color("#4ade80"), // Emerald Green
      new THREE.Color("#22d3ee"), // Soul Cyan
      new THREE.Color("#fbbf24"), // Gold Ember
      new THREE.Color("#c084fc"), // Amethyst Purple
      new THREE.Color("#38bdf8"), // Diamond Blue
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      origY[i] = pos[i * 3 + 1];

      spd[i] = 0.2 + Math.random() * 0.5;

      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return { positions: pos, colors: col, speeds: spd, originalY: origY };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position;

    // Upward drifting spore motion (like lush cave spores / nether particles)
    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i) + speeds[i] * 0.012;
      if (y > 7.0) y = -6.0;
      posAttr.setY(i, y);
      posAttr.setX(i, posAttr.getX(i) + Math.sin(t * 0.4 + i) * 0.003);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── 4. PARALLAX CAMERA CONTROLLER ────────────────────────────────────────────
function CameraParallaxController() {
  useFrame((state, delta) => {
    const targetX = state.pointer.x * 0.25;
    const targetY = state.pointer.y * 0.15;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2.0);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + targetY, delta * 2.0);
    state.camera.lookAt(1.2, 0.6, -2.5);
  });
  return null;
}

// ─── MAIN 3D MINECRAFT VOXEL ATMOSPHERE (NO COSMOS, PURE MINECRAFT VIBE) ──────
export default function CosmicBackground() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 95% 70% at 75% 25%, #0f1c30 0%, #091222 45%, #040812 100%)
        `,
      }}
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 1.5, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full pointer-events-none"
      >
        {/* Natural Sun/Daylight for Minecraft Block */}
        <ambientLight intensity={0.9} color="#e0f2fe" />

        {/* Sunlight hitting top and side of block */}
        <directionalLight position={[5, 8, 4]} intensity={1.8} color="#ffffff" castShadow />

        {/* Subtle Ambient Bounce Light */}
        <directionalLight position={[-4, -3, -3]} intensity={0.5} color="#38bdf8" />

        {/* Camera Reaction to Mouse */}
        <CameraParallaxController />

        {/* ── 3D ROTATING MINECRAFT GRASS CUBE ── */}
        <RotatingMinecraftBlock />

        {/* ── FLOATING DIAMOND COMPANION VOXEL ── */}
        <FloatingCompanionVoxel />

        {/* ── MINECRAFT PARTICLES & SPORES (NO STARS!) ── */}
        <MinecraftVoxelParticles />
      </Canvas>

      {/* Subtle Deepslate Grid Lines for high-tech Minecraft vibe */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Rich Vignette Lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 75% 30%, rgba(34, 197, 94, 0.07) 0%, transparent 55%),
            radial-gradient(circle at 25% 75%, rgba(56, 189, 248, 0.06) 0%, transparent 60%),
            linear-gradient(180deg, rgba(4, 8, 18, 0.1) 0%, rgba(4, 8, 18, 0.6) 100%)
          `,
        }}
      />
    </div>
  );
}
