"use client";
import { useRef, useEffect } from "react";
import { AquiferData } from "@/lib/groundwater-data";

interface GeologicalTwinProps {
  aquifer: AquiferData;
}

export function GeologicalTwin({ aquifer }: GeologicalTwinProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width;
    const H = canvas.height;

    // Animate
    let frame = 0;
    let animId: number;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);

      // Sky / surface gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.12);
      skyGrad.addColorStop(0, "#0f172a");
      skyGrad.addColorStop(1, "#1e40af20");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H * 0.12);

      // Surface layer
      const surfaceGrad = ctx.createLinearGradient(0, H * 0.12, 0, H * 0.25);
      surfaceGrad.addColorStop(0, "#92400e");
      surfaceGrad.addColorStop(1, "#78350f");
      ctx.fillStyle = surfaceGrad;
      ctx.fillRect(0, H * 0.12, W, H * 0.13);

      // Unsaturated zone
      const unsat = ctx.createLinearGradient(0, H * 0.25, 0, H * 0.55);
      unsat.addColorStop(0, "#1c1917");
      unsat.addColorStop(1, "#292524");
      ctx.fillStyle = unsat;
      ctx.fillRect(0, H * 0.25, W, H * 0.3);

      // Water table line animation
      const waterTableY = H * 0.55 + Math.sin(frame * 0.03) * 3;

      // Saturated zone (aquifer)
      const satGrad = ctx.createLinearGradient(0, waterTableY, 0, H * 0.85);
      satGrad.addColorStop(0, "#1e3a5f");
      satGrad.addColorStop(0.3, "#1e40af");
      satGrad.addColorStop(1, "#1d4ed8");
      ctx.fillStyle = satGrad;
      ctx.fillRect(0, waterTableY, W, H * 0.85 - waterTableY);

      // Bedrock
      const bedGrad = ctx.createLinearGradient(0, H * 0.85, 0, H);
      bedGrad.addColorStop(0, "#1c1917");
      bedGrad.addColorStop(1, "#0c0a09");
      ctx.fillStyle = bedGrad;
      ctx.fillRect(0, H * 0.85, W, H * 0.15);

      // Animated water particles in aquifer
      for (let i = 0; i < 20; i++) {
        const px = ((i * 73 + frame * 0.8) % W);
        const py = waterTableY + 10 + (i * 37 % (H * 0.28));
        const alpha = 0.4 + Math.sin(frame * 0.05 + i) * 0.2;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
        ctx.fill();
      }

      // Animated recharge water falling from surface
      for (let i = 0; i < 5; i++) {
        const dropX = W * 0.3 + i * W * 0.1;
        const dropY = H * 0.12 + ((frame * 2 + i * 50) % (H * 0.45));
        ctx.beginPath();
        ctx.arc(dropX, dropY, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.8)";
        ctx.fill();
        // Trail
        ctx.beginPath();
        ctx.moveTo(dropX, dropY - 10);
        ctx.lineTo(dropX, dropY);
        ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Labels
      ctx.font = "bold 11px system-ui";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Ground Surface", 8, H * 0.12 - 4);
      ctx.fillStyle = "#d97706";
      ctx.fillText("Topsoil Layer", 8, H * 0.2);
      ctx.fillStyle = "#78716c";
      ctx.fillText(`Unsaturated Zone (${aquifer.depthToWater.toFixed(0)}m depth)`, 8, H * 0.42);

      // Water table line
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(0, waterTableY);
      ctx.lineTo(W, waterTableY);
      ctx.strokeStyle = "rgba(96, 165, 250, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#60a5fa";
      ctx.fillText(`▶ Water Table (${aquifer.depthToWater.toFixed(1)}m BGL)`, 8, waterTableY - 4);

      ctx.fillStyle = "#93c5fd";
      ctx.fillText(`${aquifer.aquiferType}`, 8, waterTableY + 22);
      ctx.font = "10px system-ui";
      ctx.fillText(`Thickness: ${aquifer.aquiferThickness}m | Quality: ${aquifer.waterQuality}`, 8, waterTableY + 36);

      ctx.font = "bold 11px system-ui";
      ctx.fillStyle = "#374151";
      ctx.fillText("Bedrock", 8, H * 0.92);

      // Status badge
      const catColor = aquifer.category === "Safe" ? "#22c55e"
        : aquifer.category === "Semi-Critical" ? "#eab308"
          : aquifer.category === "Critical" ? "#f97316"
            : "#ef4444";
      ctx.fillStyle = catColor + "33";
      ctx.beginPath();
      ctx.roundRect(W - 130, 8, 122, 28, 6);
      ctx.fill();
      ctx.fillStyle = catColor;
      ctx.font = "bold 11px system-ui";
      ctx.fillText(`Status: ${aquifer.category}`, W - 124, 27);

      // Recharge potential meter
      ctx.fillStyle = "#1e3a5f";
      ctx.fillRect(W - 130, 44, 122, 14);
      const potColor = aquifer.rechargePotential === "High" ? "#22c55e"
        : aquifer.rechargePotential === "Medium" ? "#eab308" : "#ef4444";
      const potWidth = aquifer.rechargePotential === "High" ? 122
        : aquifer.rechargePotential === "Medium" ? 80 : 40;
      ctx.fillStyle = potColor;
      ctx.fillRect(W - 130, 44, potWidth, 14);
      ctx.fillStyle = "#fff";
      ctx.font = "9px system-ui";
      ctx.fillText(`Recharge: ${aquifer.rechargePotential}`, W - 127, 55);

      frame++;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, [aquifer]);

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="w-full h-48 rounded-xl border border-blue-500/30 bg-gray-950"
        style={{ display: "block" }}
      />
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="text-center bg-blue-900/20 border border-blue-600/20 rounded-lg p-2">
          <div className="text-lg font-bold text-blue-300">{aquifer.depthToWater.toFixed(1)}m</div>
          <div className="text-xs text-blue-400">Depth to Water</div>
        </div>
        <div className="text-center bg-blue-900/20 border border-blue-600/20 rounded-lg p-2">
          <div className="text-lg font-bold text-cyan-300">{aquifer.aquiferThickness}m</div>
          <div className="text-xs text-blue-400">Aquifer Thickness</div>
        </div>
        <div className="text-center bg-blue-900/20 border border-blue-600/20 rounded-lg p-2">
          <div className="text-lg font-bold text-purple-300">{aquifer.stageOfExtraction}%</div>
          <div className="text-xs text-blue-400">Extraction Stage</div>
        </div>
      </div>
    </div>
  );
}
