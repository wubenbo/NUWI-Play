import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  baseAlpha: number;
  waveOffset: number;
}

export const EcoCyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Palette: Nuwi brand purple, turquoise, mint, soft violet
    const colors = [
      'rgba(130, 60, 235,',  // Brand Nuwi Purple (#823CEB)
      'rgba(170, 228, 235,', // Nuwi Cyan/Turquoise (#AAE4EB)
      'rgba(145, 215, 181,', // Nuwi Andean Mint (#91D7B5)
      'rgba(168, 85, 247,',  // Soft Violet
      'rgba(56, 189, 248,'   // Sky Light
    ];

    const particleCount = Math.min(52, Math.floor((width * height) / 22000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = 0.3 + Math.random() * 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.55,
        vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.55,
        radius: 1.8 + Math.random() * 2.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        baseAlpha,
        waveOffset: Math.random() * Math.PI * 2
      });
    }

    // Mouse interaction for subtle cursor parallax
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const maxDistance = 150;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        if (!prefersReducedMotion) {
          // Flowing sinusoidal motion
          p1.x += p1.vx + Math.sin(time + p1.waveOffset) * 0.25;
          p1.y += p1.vy + Math.cos(time + p1.waveOffset) * 0.25;

          // Gentle mouse evasion/aura
          const mdx = p1.x - mouseX;
          const mdy = p1.y - mouseY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 120 && mDist > 0) {
            const force = (120 - mDist) / 120;
            p1.x += (mdx / mDist) * force * 1.5;
            p1.y += (mdy / mDist) * force * 1.5;
          }

          // Screen wrapping
          if (p1.x < -30) p1.x = width + 30;
          if (p1.x > width + 30) p1.x = -30;
          if (p1.y < -30) p1.y = height + 30;
          if (p1.y > height + 30) p1.y = -30;

          // Breathing alpha
          p1.alpha = p1.baseAlpha + Math.sin(time * 2.5 + i) * 0.18;
        }

        // Draw particle node with soft outer glow
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color} ${Math.max(0.1, Math.min(1, p1.alpha))})`;
        ctx.fill();

        // Connect with nearby particles with gradient cyber threads
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(130, 60, 235, ${lineAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Draw subtle Andean geometric chakana/diamond glyphs in background corners
      ctx.save();
      ctx.strokeStyle = 'rgba(130, 60, 235, 0.09)';
      ctx.lineWidth = 1.5;
      
      const diamondSize = 65;
      // Top Right Diamond
      ctx.beginPath();
      ctx.moveTo(width - 130, 90);
      ctx.lineTo(width - 130 + diamondSize, 90 + diamondSize);
      ctx.lineTo(width - 130, 90 + diamondSize * 2);
      ctx.lineTo(width - 130 - diamondSize, 90 + diamondSize);
      ctx.closePath();
      ctx.stroke();

      // Bottom Left Diamond
      ctx.beginPath();
      ctx.moveTo(110, height - 170);
      ctx.lineTo(110 + diamondSize, height - 170 + diamondSize);
      ctx.lineTo(110, height - 170 + diamondSize * 2);
      ctx.lineTo(110 - diamondSize, height - 170 + diamondSize);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dynamic Animated Ambient Mesh Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FAF5FF] via-[#F0FBFD] to-[#F2FAF6] opacity-95" />

      {/* Animated Floating Gradient Orbs (Smooth keyframe float and pulse) */}
      <div 
        className="absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full bg-[#823CEB]/18 blur-3xl animate-float-slow"
      />
      <div 
        className="absolute top-1/4 -right-28 w-[34rem] h-[34rem] rounded-full bg-[#AAE4EB]/35 blur-3xl animate-float-reverse"
      />
      <div 
        className="absolute top-1/2 left-1/3 w-[28rem] h-[28rem] rounded-full bg-[#91D7B5]/25 blur-3xl animate-pulse-glow"
      />
      <div 
        className="absolute bottom-1/4 -left-20 w-[30rem] h-[30rem] rounded-full bg-[#823CEB]/14 blur-3xl animate-float-slow"
      />
      <div 
        className="absolute bottom-10 right-1/4 w-[32rem] h-[32rem] rounded-full bg-[#AAE4EB]/30 blur-3xl animate-float-reverse"
      />

      {/* Cyber-Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
