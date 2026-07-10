"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
}

export function ParticleGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0.002, targetY: 0.002, currentX: 0.002, currentY: 0.002 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const particles: Particle[] = [];
    const particleCount = 280;
    const radius = Math.min(width, height) * 0.32;
    const focalLength = 400;

    // A list of purple, indigo, and blue tech colors matching the theme
    const colors = [
      "rgba(110, 86, 207, 0.85)", // Theme violet
      "rgba(124, 104, 232, 0.85)", // Light violet
      "rgba(91, 158, 232, 0.85)",  // Tech blue
      "rgba(59, 130, 246, 0.85)",  // Deep blue
    ];

    // Generate random 3D points on a sphere
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.acos(Math.random() * 2 - 1);
      const phi = Math.random() * Math.PI * 2;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        color: colors[Math.floor(Math.random() * colors.length)] || colors[0]!,
        size: Math.random() * 1.5 + 0.8,
      });
    }

    // Capture mouse moves to influence rotation speed
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      
      mouseRef.current.targetX = mouseX * 0.00003;
      mouseRef.current.targetY = mouseY * 0.00003;
    };

    // Auto resize
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 650;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const rotateX = (particle: Particle, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = particle.y * cos - particle.z * sin;
      const z1 = particle.z * cos + particle.y * sin;
      particle.y = y1;
      particle.z = z1;
    };

    const rotateY = (particle: Particle, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = particle.x * cos - particle.z * sin;
      const z1 = particle.z * cos + particle.x * sin;
      particle.x = x1;
      particle.z = z1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth inertia update of mouse velocity
      const mouse = mouseRef.current;
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.05;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;

      // Sort by Z coordinate (draw back-to-front for proper depth perception)
      particles.sort((a, b) => (b?.z ?? 0) - (a?.z ?? 0));

      // Draw connections first
      ctx.lineWidth = 0.45;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (!p1) continue;
        
        // Project 3D point to 2D screen
        const scale1 = focalLength / (focalLength + p1.z);
        const x1 = centerX + p1.x * scale1;
        const y1 = centerY + p1.y * scale1;

        if (x1 < 0 || x1 > width || y1 < 0 || y1 > height) continue;

        // Connect each particle to its nearest neighbors
        let connectionCount = 0;
        for (let j = i + 1; j < particles.length; j++) {
          if (connectionCount > 2) break; // Limit lines per node to keep it clean

          const p2 = particles[j];
          if (!p2) continue;
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);

          // Connect if points are close in 3D space
          if (dist < radius * 0.38) {
            const scale2 = focalLength / (focalLength + p2.z);
            const x2 = centerX + p2.x * scale2;
            const y2 = centerY + p2.y * scale2;

            const alpha = (1 - dist / (radius * 0.38)) * 0.09 * scale1;
            ctx.strokeStyle = `rgba(110, 86, 207, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            connectionCount++;
          }
        }
      }

      // Draw the particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;
        
        // Rotate globe slowly
        rotateY(p, mouse.currentX + 0.0012);
        rotateX(p, mouse.currentY + 0.0006);

        const scale = focalLength / (focalLength + p.z);
        const x2d = centerX + p.x * scale;
        const y2d = centerY + p.y * scale;

        if (x2d < 0 || x2d > width || y2d < 0 || y2d > height) continue;

        const alpha = Math.max(0.1, scale * 0.8);
        ctx.fillStyle = p.color.replace("0.85", alpha.toFixed(2));
        
        // Draw soft glowing dots
        ctx.beginPath();
        ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2);
        ctx.fill();

        // High brightness glow overlay on larger front particles
        if (p.z < 0 && p.size > 1.8) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = "#6E56CF";
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.beginPath();
          ctx.arc(x2d, y2d, p.size * 0.5 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
