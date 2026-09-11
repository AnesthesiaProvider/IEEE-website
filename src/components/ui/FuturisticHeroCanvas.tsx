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

export function FuturisticHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const colors = ["#8B5CF6", "#06B6D4", "#EC4899", "#A78BFA", "#38BDF8"];
    const nodeCount = Math.min(Math.floor((width * height) / 12000), 55);
    const maxDistance = 140;

    let mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
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
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

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
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.07)");
      gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.03)");
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
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
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
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] flex items-center justify-center">
      {/* Glow backing */}
      <div className="absolute inset-0 bg-radial from-violet-600/15 via-cyan-500/5 to-transparent blur-2xl pointer-events-none" />

      {/* Decorative IEEE WIE central emblem ring */}
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-violet-500/20 animate-[spin_40s_linear_infinite] pointer-events-none flex items-center justify-center">
        <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-dashed border-cyan-500/30 animate-[spin_25s_linear_infinite_reverse]" />
      </div>

      {/* Interactive canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair relative z-10"
        aria-label="Interactive Technological Network Simulation"
      />
    </div>
  );
}
