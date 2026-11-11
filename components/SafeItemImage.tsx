"use client";

import React, { useState, useEffect } from "react";

interface SafeItemImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string;
  itemId?: string;
  category?: string;
  itemName?: string;
}

const KNOWN_EXACT_MAP: Record<string, string> = {
  mycelium: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/mycelium_side.png",
  sculk_shrieker: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/sculk_shrieker_top.png",
  sculk_catalyst: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/sculk_catalyst_top.png",
  sculk_sensor: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/sculk_sensor_top.png",
  lily_pad: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/lily_pad.png",
  grass_block: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/grass_block_side.png",
  podzol: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/podzol_side.png",
  dirt_path: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/dirt_path_side.png",
  snow_block: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/snow.png",
  magma_block: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/magma.png",
  compass: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/compass_00.png",
  recovery_compass: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/recovery_compass_00.png",
  clock: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/clock_00.png",
  crossbow: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/crossbow_standby.png",
  scute: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/turtle_scute.png",
  chain: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/chain.png",
  grass: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/short_grass.png",
  moss_carpet: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/moss_block.png",
  decorated_pot: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/decorated_pot_side.png",
  dried_kelp_block: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/dried_kelp_side.png",
  ancient_debris: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/ancient_debris_side.png",
  mangrove_roots: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/mangrove_roots_side.png",
  muddy_mangrove_roots: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/muddy_mangrove_roots_side.png",
  suspicious_sand: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/suspicious_sand_0.png",
  suspicious_gravel: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/suspicious_gravel_0.png",
  crimson_nylium: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/crimson_nylium_side.png",
  warped_nylium: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/warped_nylium_side.png",
  crying_obsidian: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/crying_obsidian.png",
  sculk: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/sculk.png",
  creeper: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/creeper_spawn_egg.png",
  zombie: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/zombie_spawn_egg.png",
  skeleton: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/skeleton_spawn_egg.png",
  enderman: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/enderman_spawn_egg.png",
  warden: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/warden_spawn_egg.png",
  cow: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/cow_spawn_egg.png",
  pig: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/pig_spawn_egg.png",
  sheep: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/sheep_spawn_egg.png",
};

export default function SafeItemImage({
  src,
  alt = "",
  className = "",
  itemId,
  category,
  itemName,
  ...props
}: SafeItemImageProps) {
  const cleanId = (itemId || alt.toLowerCase().replace(/\s+/g, "_")).replace(/^minecraft:/, "");
  const initialSource = KNOWN_EXACT_MAP[cleanId] || src;

  const [currentSrc, setCurrentSrc] = useState<string | undefined>(initialSource);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setCurrentSrc(KNOWN_EXACT_MAP[cleanId] || src);
    setStage(0);
  }, [src, cleanId]);

  const handleError = () => {
    if (stage === 0) {
      if (KNOWN_EXACT_MAP[cleanId]) {
        setCurrentSrc(KNOWN_EXACT_MAP[cleanId]);
        setStage(1);
        return;
      }
      if (category === "mobs" || cleanId.includes("zombie") || cleanId.includes("cow") || cleanId.includes("creeper")) {
        setCurrentSrc(`https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/${cleanId}_spawn_egg.png`);
        setStage(1);
        return;
      }
      // Try side / top suffixes
      if (currentSrc?.includes("/textures/block/")) {
        setCurrentSrc(currentSrc.replace(".png", "_side.png"));
        setStage(1);
        return;
      } else {
        setCurrentSrc(`https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/${cleanId}.png`);
        setStage(1);
        return;
      }
    } else if (stage === 1) {
      if (currentSrc?.includes("_side.png")) {
        setCurrentSrc(currentSrc.replace("_side.png", "_top.png"));
        setStage(2);
        return;
      }
      if (currentSrc?.includes("/item/")) {
        setCurrentSrc(currentSrc.replace("/item/", "/block/"));
        setStage(2);
        return;
      }
      if (currentSrc?.includes("/block/")) {
        setCurrentSrc(currentSrc.replace("/block/", "/item/"));
        setStage(2);
        return;
      }
      setStage(2);
      return;
    } else if (stage === 2) {
      if (category === "mobs") {
        setCurrentSrc("https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/creeper_spawn_egg.png");
        setStage(3);
        return;
      }
      setCurrentSrc("https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/stone.png");
      setStage(3);
      return;
    }
    setStage(4);
  };

  if (stage === 4 || !currentSrc) {
    const initial = (itemName || alt || "M").charAt(0).toUpperCase();
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-900/40 to-slate-900 border border-cyan-400/30 select-none shadow-inner ${className}`}
        title={itemName || alt}
      >
        <span className="font-extrabold text-xs text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
          {initial}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`pixelated ${className}`}
      onError={handleError}
      loading="lazy"
      style={{
        imageRendering: "pixelated",
        ...props.style,
      }}
      {...props}
    />
  );
}
