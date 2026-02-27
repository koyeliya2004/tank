"use client";

import { useEffect, useRef } from "react";

/**
 * AnimatedBackground — Stunning animated background for rainwater harvesting / groundwater recharge.
 *
 * Visual layers (bottom → top):
 *  1. Deep gradient sky (dark navy → teal)
 *  2. Subtle cloud / lightning flashes
 *  3. Continuous rainfall
 *  4. Rooftop silhouette collecting rain
 *  5. Pipe system carrying water down
 *  6. Underground cross-section with soil layers
 *  7. Recharge pit / borewell filling
 *  8. Floating water particle effects
 *  9. Glow + wave motion at bottom
 *
 * Pure CSS animations — no heavy libraries. Fully responsive.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ---- Canvas-based rain for smooth performance ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;

    interface Drop {
      x: number;
      y: number;
      l: number;
      speed: number;
      opacity: number;
    }

    const drops: Drop[] = [];
    const DROPS = 120;

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    }

    function initDrops() {
      drops.length = 0;
      for (let i = 0; i < DROPS; i++) {
        drops.push({
          x: Math.random() * w,
          y: Math.random() * h,
          l: 12 + Math.random() * 18,
          speed: 4 + Math.random() * 6,
          opacity: 0.15 + Math.random() * 0.25,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const d of drops) {
        ctx!.beginPath();
        ctx!.moveTo(d.x, d.y);
        ctx!.lineTo(d.x + 0.5, d.y + d.l);
        ctx!.strokeStyle = `rgba(150, 210, 255, ${d.opacity})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();

        d.y += d.speed;
        if (d.y > h) {
          d.y = -d.l;
          d.x = Math.random() * w;
        }
      }
      animId = requestAnimationFrame(draw);
    }

    resize();
    initDrops();
    draw();

    const onResize = () => {
      resize();
      initDrops();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* ===== 1. SKY GRADIENT ===== */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #020a1a 0%, #041a33 25%, #072540 50%, #0a3055 70%, #0d1f30 100%)",
        }}
      />

      {/* ===== 2. CLOUD / LIGHTNING LAYER ===== */}
      <div className="absolute inset-x-0 top-0 h-[35%]">
        {/* Cloudy haze */}
        <div
          className="absolute inset-0 animate-cloud-drift"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 30% 20%, rgba(100,140,180,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 animate-cloud-drift-reverse"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 70% 30%, rgba(80,120,170,0.10) 0%, transparent 60%)",
          }}
        />
        {/* Lightning flash */}
        <div className="absolute inset-0 animate-lightning" />
      </div>

      {/* ===== 3. RAIN (Canvas) ===== */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* ===== 4. ROOFTOP SILHOUETTE ===== */}
      <svg
        className="absolute w-full"
        style={{ top: "18%", height: "20%" }}
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Roof shape */}
        <path
          d="M500,280 L500,180 L600,120 L700,180 L700,280"
          fill="rgba(15,30,55,0.85)"
          stroke="rgba(80,160,220,0.3)"
          strokeWidth="1.5"
        />
        {/* Roof ridge line glow */}
        <path
          d="M500,180 L600,120 L700,180"
          fill="none"
          stroke="rgba(80,200,255,0.5)"
          strokeWidth="2"
          className="animate-glow-pulse"
        />
        {/* Gutter */}
        <rect
          x="490"
          y="275"
          width="220"
          height="6"
          rx="3"
          fill="rgba(40,80,120,0.7)"
          stroke="rgba(80,180,240,0.3)"
          strokeWidth="1"
        />
        {/* Water collecting in gutter — animated */}
        <rect
          x="495"
          y="276"
          width="0"
          height="4"
          rx="2"
          fill="rgba(56,189,248,0.5)"
          className="animate-gutter-fill"
        />
      </svg>

      {/* ===== 5. PIPE SYSTEM ===== */}
      <svg
        className="absolute w-full"
        style={{ top: "33%", height: "30%" }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vertical pipe from gutter */}
        <rect
          x="705"
          y="0"
          width="8"
          height="200"
          rx="4"
          fill="rgba(30,60,100,0.7)"
          stroke="rgba(80,160,220,0.25)"
          strokeWidth="1"
        />
        {/* Horizontal pipe to recharge pit */}
        <rect
          x="709"
          y="195"
          width="120"
          height="8"
          rx="4"
          fill="rgba(30,60,100,0.7)"
          stroke="rgba(80,160,220,0.25)"
          strokeWidth="1"
        />
        {/* Vertical pipe down to underground */}
        <rect
          x="825"
          y="195"
          width="8"
          height="205"
          rx="4"
          fill="rgba(30,60,100,0.7)"
          stroke="rgba(80,160,220,0.25)"
          strokeWidth="1"
        />
        {/* Animated water flowing through pipes */}
        <circle cx="709" cy="0" r="3" fill="rgba(56,189,248,0.8)" className="animate-pipe-flow-v" />
        <circle cx="709" cy="0" r="3" fill="rgba(56,189,248,0.6)" className="animate-pipe-flow-v" style={{ animationDelay: "0.7s" }} />
        <circle cx="709" cy="0" r="3" fill="rgba(56,189,248,0.7)" className="animate-pipe-flow-v" style={{ animationDelay: "1.4s" }} />
      </svg>

      {/* ===== 6. UNDERGROUND CROSS-SECTION ===== */}
      <div className="absolute inset-x-0 bottom-0" style={{ height: "40%" }}>
        {/* Surface line */}
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent 10%, rgba(80,160,220,0.3) 30%, rgba(56,189,248,0.5) 50%, rgba(80,160,220,0.3) 70%, transparent 90%)",
          }}
        />

        {/* Soil layers */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg,
                rgba(60,40,20,0.6) 0%,
                rgba(50,35,18,0.5) 15%,
                rgba(40,30,15,0.4) 30%,
                rgba(25,50,70,0.5) 50%,
                rgba(15,40,65,0.6) 70%,
                rgba(10,30,55,0.8) 100%
              )
            `,
          }}
        />

        {/* Gravel/pebble dots layer */}
        <div className="absolute inset-x-0" style={{ top: "15%", height: "15%" }}>
          {[...Array(30)].map((_, i) => (
            <div
              key={`pebble-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${3 + (i % 4) * 2}px`,
                height: `${2 + (i % 3) * 2}px`,
                left: `${(i * 3.3 + 1) % 100}%`,
                top: `${(i * 17) % 100}%`,
                background: `rgba(${100 + (i % 3) * 20}, ${80 + (i % 4) * 15}, ${50 + (i % 2) * 20}, 0.3)`,
              }}
            />
          ))}
        </div>

        {/* Aquifer / groundwater glow */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "50%",
            background:
              "radial-gradient(ellipse 90% 80% at 50% 100%, rgba(20,100,160,0.35) 0%, rgba(10,60,110,0.15) 50%, transparent 100%)",
          }}
        />

        {/* Animated groundwater fill */}
        <div
          className="absolute inset-x-0 bottom-0 animate-groundwater-fill"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(30,120,200,0.15) 40%, rgba(20,100,180,0.25))",
          }}
        />

        {/* ===== 7. RECHARGE PIT ===== */}
        <svg
          className="absolute"
          style={{ left: "55%", top: "-5%", width: "80px", height: "110%" }}
          viewBox="0 0 80 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pit walls */}
          <rect
            x="15"
            y="20"
            width="50"
            height="350"
            rx="6"
            fill="rgba(20,40,70,0.7)"
            stroke="rgba(80,160,220,0.3)"
            strokeWidth="1.5"
          />
          {/* Gravel fill inside pit */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={`gravel-${i}`}
              cx={25 + (i % 4) * 10}
              cy={60 + Math.floor(i / 4) * 30}
              r={3 + (i % 3)}
              fill={`rgba(${80 + i * 5}, ${100 + i * 3}, ${120 + i * 2}, 0.3)`}
            />
          ))}
          {/* Animated water level rising in pit */}
          <rect
            x="17"
            y="350"
            width="46"
            height="0"
            rx="4"
            fill="rgba(56,189,248,0.3)"
            className="animate-pit-fill"
          />
          {/* Glow at water surface */}
          <rect
            x="17"
            y="350"
            width="46"
            height="2"
            rx="1"
            fill="rgba(56,189,248,0.6)"
            className="animate-pit-fill-glow"
          />
        </svg>

        {/* ===== 9. WAVE MOTION AT BOTTOM ===== */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          style={{ height: "60px" }}
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,30 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 L0,60 Z"
            fill="rgba(20,80,140,0.3)"
            className="animate-wave-1"
          />
          <path
            d="M0,40 C360,15 720,55 1080,35 C1260,25 1350,45 1440,40 L1440,60 L0,60 Z"
            fill="rgba(15,60,110,0.25)"
            className="animate-wave-2"
          />
        </svg>
      </div>

      {/* ===== 8. FLOATING PARTICLE EFFECTS ===== */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full animate-float-particle"
          style={{
            width: `${3 + (i % 4) * 2}px`,
            height: `${3 + (i % 4) * 2}px`,
            left: `${(i * 7 + 3) % 95}%`,
            top: `${30 + (i * 11) % 60}%`,
            background: `radial-gradient(circle, rgba(56,189,248,${0.3 + (i % 3) * 0.15}) 0%, transparent 70%)`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${5 + (i % 4) * 2}s`,
          }}
        />
      ))}

      {/* ===== RIPPLE EFFECTS where rain hits surface ===== */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`ripple-${i}`}
          className="absolute animate-surface-ripple"
          style={{
            left: `${15 + i * 13}%`,
            top: "59%",
            width: "20px",
            height: "6px",
            borderRadius: "50%",
            border: "1px solid rgba(56,189,248,0.3)",
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${2 + (i % 3) * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
