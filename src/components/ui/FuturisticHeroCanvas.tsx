"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseX: number;
  baseY: number;
}

interface FuturisticHeroCanvasProps {
  className?: string;
}

export function FuturisticHeroCanvas({ className = "" }: FuturisticHeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const colors = ["#712EB7", "#8A38D4", "#664BA3", "#9D4EDD", "#A855F7", "#FAF8FD"];
    const nodeCount = Math.min(Math.floor((width * height) / 14000), 75);
    const maxDistance = 140;

    let mouse = {
      x: -1000,
      y: -1000,
      radius: 130,
    };

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background ambient pulse
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        10,
        width * 0.5,
        height * 0.5,
        width * 0.45
      );
      gradient.addColorStop(0, "rgba(113, 46, 183, 0.12)");
      gradient.addColorStop(0.5, "rgba(52, 34, 78, 0.05)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw connecting circuit/network lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.35;
            ctx.strokeStyle = `rgba(138, 56, 212, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move nodes naturally
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Subtle mouse interaction
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < mouse.radius) {
          const force = (1 - mDist / mouse.radius) * 2;
          node.x += (mdx / (mDist || 1)) * force;
          node.y += (mdy / (mDist || 1)) * force;
        }

        // Draw node with glowing halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}22`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center pointer-events-none ${className}`}>
      {/* Glow backing */}
      <div className="absolute inset-0 bg-radial from-[#712EB7]/20 via-[#4C1D95]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Decorative IEEE WIE central emblem ring */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#664BA3]/25 animate-[spin_45s_linear_infinite] pointer-events-none flex items-center justify-center opacity-50">
        <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-dashed border-[#8A38D4]/30 animate-[spin_30s_linear_infinite_reverse]" />
      </div>

      {/* Interactive canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none relative z-0"
        aria-label="Interactive Technological Network Simulation"
      />
    </div>
  );
}
