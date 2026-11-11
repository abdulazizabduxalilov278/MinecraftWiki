"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    if (typeof window !== "undefined") {
      const isTouch = window.matchMedia("(pointer: coarse)").matches || !window.matchMedia("(pointer: fine)").matches;
      if (isTouch) {
        setIsTouchDevice(true);
        return;
      }
    }

    // Add cursor-none class to body on desktop
    document.body.classList.add("custom-cursor-active");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let trailX = -100;
    let trailY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        // Initialize position on first move to prevent jumping from (-100,-100)
        ringX = mouseX;
        ringY = mouseY;
        trailX = mouseX;
        trailY = mouseY;
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("button, a, input, select, textarea, [role='button'], .cursor-pointer");
        setIsHovered(Boolean(interactive));
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // High performance animation loop using Lerp
    const render = () => {
      // Direct placement for center dot (instant zero-latency tracking)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Smooth fluid follow for outer ring (lerp factor ~0.2)
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // Smooth delayed trailing particle (lerp factor ~0.08, creates the satellite trailing dot seen in the screenshot)
      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* ── 1. Secondary Trailing Dot (Satellite follower exactly as in user image) ── */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 -ml-[4px] -mt-[4px] w-[8px] h-[8px] rounded-full bg-cyan-400 pointer-events-none will-change-transform"
        style={{
          boxShadow: "0 0 10px rgba(34, 211, 238, 0.95), 0 0 18px rgba(6, 182, 212, 0.65)",
        }}
      />

      {/* ── 2. Outer Glowing Cyan Ring (Thin cyan border with neon aura) ── */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-[18px] -mt-[18px] w-9 h-9 rounded-full border border-cyan-400 pointer-events-none will-change-transform flex items-center justify-center transition-[transform,background-color,border-color,box-shadow] duration-150 ease-out ${
          isHovered
            ? "scale-130 bg-cyan-400/10 border-cyan-300"
            : isClicked
            ? "scale-85 bg-cyan-400/20 border-cyan-300"
            : "border-cyan-400"
        }`}
        style={{
          boxShadow: isHovered
            ? "0 0 22px rgba(34, 211, 238, 0.7), inset 0 0 8px rgba(34, 211, 238, 0.3)"
            : "0 0 14px rgba(34, 211, 238, 0.5), inset 0 0 6px rgba(34, 211, 238, 0.2)",
        }}
      />

      {/* ── 3. Central Solid Bright Neon Cyan Dot ── */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-[3.5px] -mt-[3.5px] w-[7px] h-[7px] rounded-full bg-cyan-300 pointer-events-none will-change-transform transition-[transform,background-color] duration-75 ${
          isClicked ? "scale-75 bg-white" : isHovered ? "scale-125 bg-cyan-200" : ""
        }`}
        style={{
          boxShadow: "0 0 8px #22d3ee, 0 0 16px rgba(34, 211, 238, 1)",
        }}
      />
    </div>
  );
}
