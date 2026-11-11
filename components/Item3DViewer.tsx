"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { MinecraftItem } from "@/data/items";
import { useLanguage } from "@/context/LanguageContext";
import {
  RotateCcw,
  Sparkles,
  Sun,
  Moon,
  Layers,
  Move,
  Eye,
  Maximize2,
} from "lucide-react";

interface Item3DViewerProps {
  item: MinecraftItem;
}

// ─── Texture Loader Helper with NearestFilter ─────────────────────────────────
function usePixelTexture(url: string | undefined): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!url) {
      setTexture(null);
      return;
    }
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      url,
      (tex) => {
        tex.magFilter = THREE.NearestFilter;
        tex.minFilter = THREE.NearestFilter;
        tex.generateMipmaps = false;
        setTexture(tex);
      },
      undefined,
      () => setTexture(null)
    );
  }, [url]);

  return texture;
}

// ─── Helper: Detect if an item is a Flora / Plant (Crossed "X" Model) ──────────
export function isFloraCrossItem(item: MinecraftItem): boolean {
  const id = item.id.toLowerCase();
  const name = (item.name || "").toLowerCase();

  // Full solid block exclusions
  if (
    id.includes("grass_block") ||
    id.includes("leaves") ||
    id.includes("muddy_mangrove_roots") ||
    id.includes("dirt") ||
    id.includes("bedrock") ||
    id.includes("stone")
  ) {
    return false;
  }

  if (
    id.endsWith("_sapling") ||
    id.endsWith("_roots") ||
    id.endsWith("_sprouts") ||
    id.endsWith("_fungus") ||
    id.endsWith("_mushroom")
  ) {
    return true;
  }

  const floraKeywords = [
    "dandelion",
    "poppy",
    "blue_orchid",
    "allium",
    "azure_bluet",
    "red_tulip",
    "orange_tulip",
    "white_tulip",
    "pink_tulip",
    "oxeye_daisy",
    "cornflower",
    "lily_of_the_valley",
    "wither_rose",
    "sunflower",
    "lilac",
    "rose_bush",
    "peony",
    "torchflower",
    "pitcher_plant",
    "dead_bush",
    "fern",
    "large_fern",
    "short_grass",
    "tall_grass",
    "seagrass",
    "sugar_cane",
    "bamboo_sapling",
    "sweet_berries",
    "sweet_berry_bush",
    "wheat_seeds",
    "beetroot_seeds",
    "melon_seeds",
    "pumpkin_seeds",
    "nether_wart",
    "hanging_roots",
    "crimson_roots",
    "warped_roots",
    "weeping_vines",
    "twisting_vines",
  ];

  if (id === "grass") return true;

  return floraKeywords.some(
    (k) => id === k || id.startsWith(k + "_") || name.includes(k)
  );
}

// ─── AUTHENTIC FLORA CROSSED "X" MODEL (Saplings, Flowers, Mushrooms, Crops) ──
function FloraCrossModel({
  item,
  wireframe,
}: {
  item: MinecraftItem;
  wireframe: boolean;
}) {
  const texture = usePixelTexture(item.texture);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8) * 0.03;
  });

  const material = useMemo(() => {
    if (texture) {
      return new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.5,
        color: "white",
        roughness: 1.0,
        metalness: 0.0,
        side: THREE.DoubleSide,
        wireframe,
      });
    }
    return new THREE.MeshStandardMaterial({
      color: "#22c55e",
      roughness: 1.0,
      metalness: 0.0,
      side: THREE.DoubleSide,
      wireframe,
    });
  }, [texture, wireframe]);

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Plane 1: Rotated +45 degrees */}
      <mesh rotation={[0, Math.PI / 4, 0]} material={material} castShadow receiveShadow>
        <planeGeometry args={[1.7, 1.7]} />
      </mesh>
      {/* Plane 2: Rotated -45 degrees */}
      <mesh rotation={[0, -Math.PI / 4, 0]} material={material} castShadow receiveShadow>
        <planeGeometry args={[1.7, 1.7]} />
      </mesh>
    </group>
  );
}

// ─── AUTHENTIC 6-SIDED BLOCK VIEWER (Exact 1x1x1 Dimensions & Pure Colors) ────
function BlockInspectionModel({
  item,
  wireframe,
}: {
  item: MinecraftItem;
  wireframe: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cleanId = item.id;

  // Determine top, side, and bottom texture URLs
  const { topUrl, sideUrl, bottomUrl } = useMemo(() => {
    const base = "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block";

    if (cleanId === "mycelium") {
      return {
        topUrl: `${base}/mycelium_top.png`,
        sideUrl: `${base}/mycelium_side.png`,
        bottomUrl: `${base}/dirt.png`,
      };
    }
    if (cleanId === "grass_block") {
      return {
        topUrl: `${base}/grass_block_top.png`,
        sideUrl: `${base}/grass_block_side.png`,
        bottomUrl: `${base}/dirt.png`,
      };
    }
    if (cleanId === "podzol") {
      return {
        topUrl: `${base}/podzol_top.png`,
        sideUrl: `${base}/podzol_side.png`,
        bottomUrl: `${base}/dirt.png`,
      };
    }
    if (cleanId === "sculk_shrieker") {
      return {
        topUrl: `${base}/sculk_shrieker_top.png`,
        sideUrl: `${base}/sculk_shrieker_side.png`,
        bottomUrl: `${base}/sculk.png`,
      };
    }
    if (cleanId === "sculk_catalyst") {
      return {
        topUrl: `${base}/sculk_catalyst_top.png`,
        sideUrl: `${base}/sculk_catalyst_side.png`,
        bottomUrl: `${base}/sculk.png`,
      };
    }
    if (cleanId === "crafting_table") {
      return {
        topUrl: `${base}/crafting_table_top.png`,
        sideUrl: `${base}/crafting_table_side.png`,
        bottomUrl: `${base}/oak_planks.png`,
      };
    }
    if (cleanId === "furnace" || cleanId === "blast_furnace" || cleanId === "smoker") {
      return {
        topUrl: `${base}/${cleanId}_top.png`,
        sideUrl: `${base}/${cleanId}_side.png`,
        bottomUrl: `${base}/${cleanId}_top.png`,
      };
    }
    if (cleanId === "tnt") {
      return {
        topUrl: `${base}/tnt_top.png`,
        sideUrl: `${base}/tnt_side.png`,
        bottomUrl: `${base}/tnt_bottom.png`,
      };
    }
    if (cleanId.endsWith("_log") || cleanId.endsWith("_wood") || cleanId.endsWith("_stem")) {
      const woodName = cleanId.replace(/_wood$/, "_log").replace(/_hyphae$/, "_stem");
      return {
        topUrl: `${base}/${woodName}_top.png`,
        sideUrl: `${base}/${woodName}.png`,
        bottomUrl: `${base}/${woodName}_top.png`,
      };
    }

    return {
      topUrl: item.texture,
      sideUrl: item.texture,
      bottomUrl: item.texture,
    };
  }, [cleanId, item.texture]);

  const topTexture = usePixelTexture(topUrl);
  const sideTexture = usePixelTexture(sideUrl);
  const bottomTexture = usePixelTexture(bottomUrl);

  const materials = useMemo(() => {
    // CRITICAL: roughness=1.0 and metalness=0.0 with color="white" eliminates all glare and washed-out overexposure!
    const makeMat = (tex: THREE.Texture | null) =>
      tex
        ? new THREE.MeshStandardMaterial({
            map: tex,
            color: "white",
            roughness: 1.0,
            metalness: 0.0,
            wireframe,
          })
        : new THREE.MeshStandardMaterial({
            color: "#94a3b8",
            roughness: 1.0,
            metalness: 0.0,
            wireframe,
          });

    // Box faces: [right(+x), left(-x), top(+y), bottom(-y), front(+z), back(-z)]
    return [
      makeMat(sideTexture),
      makeMat(sideTexture),
      makeMat(topTexture),
      makeMat(bottomTexture),
      makeMat(sideTexture),
      makeMat(sideTexture),
    ];
  }, [sideTexture, topTexture, bottomTexture, wireframe]);

  return (
    <group position={[0, 0, 0]}>
      {/* Exact 1x1x1 Cube */}
      <mesh ref={meshRef} material={materials} castShadow receiveShadow>
        <boxGeometry args={[1.7, 1.7, 1.7]} />
      </mesh>
    </group>
  );
}

// ─── AUTHENTIC 2D ITEM / WEAPON / TOOL / POTION SPRITE MODEL ─────────────────
function ItemInspectionModel({
  item,
  wireframe,
}: {
  item: MinecraftItem;
  wireframe: boolean;
}) {
  const texture = usePixelTexture(item.texture);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.0) * 0.04;
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {texture ? (
        <group>
          {/* Main Front Facing Plane with roughness=1.0 & metalness=0.0 */}
          <mesh castShadow receiveShadow position={[0, 0, 0.01]}>
            <planeGeometry args={[1.75, 1.75]} />
            <meshStandardMaterial
              map={texture}
              transparent
              alphaTest={0.5}
              color="white"
              roughness={1.0}
              metalness={0.0}
              side={THREE.DoubleSide}
              wireframe={wireframe}
            />
          </mesh>
          {/* Back Offset Plane to give tangible 3D depth */}
          <mesh castShadow receiveShadow position={[0, 0, -0.01]}>
            <planeGeometry args={[1.75, 1.75]} />
            <meshStandardMaterial
              map={texture}
              transparent
              alphaTest={0.5}
              color="white"
              roughness={1.0}
              metalness={0.0}
              side={THREE.DoubleSide}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      ) : (
        <mesh castShadow receiveShadow>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial
            color={item.themeColor || "#38bdf8"}
            roughness={1.0}
            metalness={0.0}
            side={THREE.DoubleSide}
            wireframe={wireframe}
          />
        </mesh>
      )}
    </group>
  );
}

// ─── STUDIO DISPLAY PEDESTAL (Cyber Neon Style) ───────────────────────────────
function StudioPedestal() {
  return (
    <group position={[0, -1.05, 0]}>
      {/* Dark Circular Pedestal Base */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2.0, 2.2, 0.18, 36]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Cyber Cyan Pedestal Glowing Rim */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.85, 1.95, 36]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Subtle Ground Shadow Plane */}
      <mesh position={[0, -0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial color="#020617" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// ─── MAIN PURE 3D HIGH-FIDELITY VIEWER COMPONENT ─────────────────────────────
export default function Item3DViewer({ item }: Item3DViewerProps) {
  const { language } = useLanguage();
  const controlsRef = useRef<any>(null);

  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [lightingPreset, setLightingPreset] = useState<"day" | "cave" | "studio">("studio");

  const isFlora = isFloraCrossItem(item);
  const isBlock = item.category === "blocks" && !isFlora;

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl glass-panel border border-cyan-500/30 overflow-hidden bg-slate-950/90 shadow-[0_0_40px_rgba(6,182,212,0.15)] select-none font-sans">
      {/* ── 3D Canvas with Precise Balanced Studio Lighting ── */}
      <Canvas
        camera={{ position: [0, 1.2, 3.8], fov: 48 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Controlled Ambient Light: intensity=0.9 eliminates washed-out overexposure! */}
        {lightingPreset === "studio" && (
          <>
            <ambientLight intensity={0.9} color="#ffffff" />
            <directionalLight position={[5, 7, 5]} intensity={0.35} color="#ffffff" />
            <directionalLight position={[-4, 3, -4]} intensity={0.15} color="#ffffff" />
          </>
        )}
        {lightingPreset === "day" && (
          <>
            <ambientLight intensity={0.95} color="#ffffff" />
            <directionalLight position={[6, 8, 6]} intensity={0.4} color="#ffffff" />
          </>
        )}
        {lightingPreset === "cave" && (
          <>
            <ambientLight intensity={0.65} color="#ffffff" />
            <pointLight position={[0, 2, 2]} intensity={0.8} color="#06b6d4" />
            <pointLight position={[0, -1, -2]} intensity={0.6} color="#a855f7" />
          </>
        )}

        {/* Orbit Controls with Damping & Smooth Spin */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          enableRotate
          enableZoom
          enablePan
          minDistance={1.6}
          maxDistance={8.0}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
        />

        {/* Cyber Studio Pedestal Base */}
        <StudioPedestal />

        {/* Pure 3D Models (No Mobs: Mobs are rendered 2D only) */}
        {isFlora ? (
          <FloraCrossModel item={item} wireframe={wireframe} />
        ) : isBlock ? (
          <BlockInspectionModel item={item} wireframe={wireframe} />
        ) : (
          <ItemInspectionModel item={item} wireframe={wireframe} />
        )}
      </Canvas>

      {/* ── Top Left: Mode & Dimension Badge ── */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md flex items-center gap-2 text-xs font-bold text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Eye size={14} className="text-cyan-400" />
          <span>
            {isFlora
              ? language === "ru"
                ? "3D Растение (Модель «X» · Без бликов)"
                : "3D Flora ('X' Model · Matte)"
              : isBlock
              ? language === "ru"
                ? "3D Блок (1x1x1 м · Насыщенный цвет)"
                : "3D Block Inspection (1x1x1m · Saturated Colors)"
              : language === "ru"
              ? "3D Предмет (360° Осмотр)"
              : "3D Item Model (360° Orbit)"}
          </span>
        </div>
      </div>

      {/* ── Top Right: Orbit Controls Utility Bar ── */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 pointer-events-auto">
        {/* Toggle Auto-Rotate */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all cursor-pointer shadow-md ${
            autoRotate
              ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-white/10"
          }`}
          title="Toggle Auto-Rotation"
        >
          <RotateCcw size={13} className={autoRotate ? "animate-spin" : ""} />
          <span className="hidden sm:inline">
            {language === "ru" ? "Вращение" : "Auto-Spin"}
          </span>
        </button>

        {/* Toggle Wireframe */}
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`p-2 rounded-xl text-xs backdrop-blur-md border transition-all cursor-pointer ${
            wireframe
              ? "bg-purple-500/25 text-purple-300 border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-white/10"
          }`}
          title="Toggle Wireframe Geometry"
        >
          <Layers size={14} />
        </button>

        {/* Cycle Studio Lighting */}
        <button
          onClick={() =>
            setLightingPreset((prev) =>
              prev === "studio" ? "day" : prev === "day" ? "cave" : "studio"
            )
          }
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/10 backdrop-blur-md cursor-pointer transition-colors"
          title={`Lighting: ${lightingPreset}`}
        >
          {lightingPreset === "studio" ? (
            <Sparkles size={14} className="text-cyan-400" />
          ) : lightingPreset === "day" ? (
            <Sun size={14} className="text-amber-400" />
          ) : (
            <Moon size={14} className="text-purple-400" />
          )}
        </button>

        {/* Reset Camera View */}
        <button
          onClick={resetCamera}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/10 backdrop-blur-md cursor-pointer transition-colors"
          title="Reset Camera Angle"
        >
          <Maximize2 size={14} />
        </button>
      </div>

      {/* ── Bottom HUD: Mouse / Touch Navigation Hint ── */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none text-xs text-slate-400 flex-wrap gap-2">
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md flex items-center gap-2">
          <Move size={13} className="text-cyan-400" />
          <span>
            {language === "ru"
              ? "ЛКМ: Вращение 360° · ПКМ: Смещение · Колёсико: Масштаб"
              : "Left Click: 360° Orbit · Right Click: Pan · Scroll: Zoom"}
          </span>
        </div>

        <div className="px-2.5 py-1 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-[11px] text-cyan-300 hidden sm:block">
          16×16 Nearest-Neighbor Pixel UV · Zero-Glare
        </div>
      </div>
    </div>
  );
}
