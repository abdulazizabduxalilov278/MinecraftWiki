"use client";

import React, { useState } from "react";

export type BlockType = "grass" | "diamond" | "command" | "crying_obsidian" | "crafting_table";

interface Minecraft3DCubeProps {
  size?: number; // size in pixels, e.g. 36, 48, 80, 160
  blockType?: BlockType;
  speedSec?: number; // rotation speed in seconds (default 12s)
  interactive?: boolean; // can click to change block or hover tilt
  glow?: boolean;
  className?: string;
  shadow?: boolean;
}

export default function Minecraft3DCube({
  size = 48,
  blockType = "grass",
  speedSec = 14,
  interactive = true,
  glow = true,
  className = "",
  shadow = true,
}: Minecraft3DCubeProps) {
  const [currentBlock, setCurrentBlock] = useState<BlockType>(blockType);
  const [isHovered, setIsHovered] = useState(false);

  // Block texture mapping
  const getFaceTextures = (type: BlockType) => {
    switch (type) {
      case "diamond":
        return {
          top: "/blocks/diamond_block.png",
          bottom: "/blocks/diamond_block.png",
          side: "/blocks/diamond_block.png",
          glowColor: "rgba(56, 189, 248, 0.6)",
        };
      case "command":
        return {
          top: "/blocks/command_block_front.png",
          bottom: "/blocks/command_block_front.png",
          side: "/blocks/command_block_front.png",
          glowColor: "rgba(249, 115, 22, 0.6)",
        };
      case "crying_obsidian":
        return {
          top: "/blocks/crying_obsidian.png",
          bottom: "/blocks/crying_obsidian.png",
          side: "/blocks/crying_obsidian.png",
          glowColor: "rgba(168, 85, 247, 0.7)",
        };
      case "crafting_table":
        return {
          top: "/blocks/crafting_table_top.png",
          bottom: "/blocks/dirt.png",
          side: "/blocks/crafting_table_side.png",
          glowColor: "rgba(217, 119, 6, 0.5)",
        };
      case "grass":
      default:
        return {
          top: "/blocks/grass_block_top.png",
          bottom: "/blocks/dirt.png",
          side: "/blocks/grass_block_side.png",
          glowColor: "rgba(34, 197, 94, 0.5)",
        };
    }
  };

  const textures = getFaceTextures(currentBlock);
  const half = size / 2;

  // Cycle blocks on click if interactive
  const handleCycleBlock = () => {
    if (!interactive) return;
    const blocks: BlockType[] = ["grass", "diamond", "crying_obsidian", "command", "crafting_table"];
    const nextIdx = (blocks.indexOf(currentBlock) + 1) % blocks.length;
    setCurrentBlock(blocks[nextIdx]);
  };

  return (
    <div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{
        width: size * 1.5,
        height: size * 1.5,
        perspective: size * 8,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCycleBlock}
      title={interactive ? "Minecraft 3D Blok (bosib blokni o'zgartiring)" : undefined}
    >
      {/* Ambient Floor Shadow under the cube */}
      {shadow && (
        <div
          className="absolute rounded-full pointer-events-none transition-all duration-300"
          style={{
            bottom: size * 0.1,
            width: size * 1.1,
            height: size * 0.35,
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)",
            transform: isHovered ? "scale(1.15)" : "scale(1)",
          }}
        />
      )}

      {/* Atmospheric Voxel Glow Aura */}
      {glow && (
        <div
          className="absolute rounded-full pointer-events-none blur-xl transition-all duration-500"
          style={{
            width: size * 1.4,
            height: size * 1.4,
            background: textures.glowColor,
            opacity: isHovered ? 0.8 : 0.45,
          }}
        />
      )}

      {/* 3D CUBE CONTAINER */}
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          animation: `mcCubeRotate ${isHovered ? speedSec * 0.6 : speedSec}s linear infinite`,
        }}
      >
        {/* Top Face */}
        <div
          className="absolute inset-0 [image-rendering:pixelated]"
          style={{
            backgroundImage: `url('${textures.top}')`,
            backgroundSize: "cover",
            transform: `rotateX(90deg) translateZ(${half}px)`,
            filter: "brightness(1.15)",
          }}
        />

        {/* Bottom Face */}
        <div
          className="absolute inset-0 [image-rendering:pixelated]"
          style={{
            backgroundImage: `url('${textures.bottom}')`,
            backgroundSize: "cover",
            transform: `rotateX(-90deg) translateZ(${half}px)`,
            filter: "brightness(0.45)",
          }}
        />

        {/* Front Face */}
        <div
          className="absolute inset-0 [image-rendering:pixelated]"
          style={{
            backgroundImage: `url('${textures.side}')`,
            backgroundSize: "cover",
            transform: `rotateY(0deg) translateZ(${half}px)`,
            filter: "brightness(0.95)",
          }}
        />

        {/* Back Face */}
        <div
          className="absolute inset-0 [image-rendering:pixelated]"
          style={{
            backgroundImage: `url('${textures.side}')`,
            backgroundSize: "cover",
            transform: `rotateY(180deg) translateZ(${half}px)`,
            filter: "brightness(0.65)",
          }}
        />

        {/* Right Face */}
        <div
          className="absolute inset-0 [image-rendering:pixelated]"
          style={{
            backgroundImage: `url('${textures.side}')`,
            backgroundSize: "cover",
            transform: `rotateY(90deg) translateZ(${half}px)`,
            filter: "brightness(0.85)",
          }}
        />

        {/* Left Face */}
        <div
          className="absolute inset-0 [image-rendering:pixelated]"
          style={{
            backgroundImage: `url('${textures.side}')`,
            backgroundSize: "cover",
            transform: `rotateY(-90deg) translateZ(${half}px)`,
            filter: "brightness(0.75)",
          }}
        />
      </div>

      {/* Global CSS animation for continuous 3D rotation */}
      <style jsx global>{`
        @keyframes mcCubeRotate {
          0% {
            transform: rotateX(-22deg) rotateY(0deg);
          }
          50% {
            transform: rotateX(-18deg) rotateY(180deg);
          }
          100% {
            transform: rotateX(-22deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}
