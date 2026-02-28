"use client";
import { useEffect, useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import { useLang } from "./lang-context";

interface ARViewProps {
  rechargeDepth: number;
  rechargeWidth: number;
  rechargeLength: number;
}

export function ARVisualization({ rechargeDepth, rechargeWidth, rechargeLength }: ARViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [arActive, setArActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const animRef = useRef<number>(0);
  const { t } = useLang();

  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setArActive(true);
        setCameraError("");
      }
    } catch {
      setCameraError("Camera not available. Showing simulation.");
      setArActive(true);
    }
  };

  const stopAR = () => {
    setArActive(false);
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
    }
    cancelAnimationFrame(animRef.current);
  };

  useEffect(() => {
    if (!arActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure canvas has valid dimensions - use parent or fallback dimensions
    const parent = canvas.parentElement;
    canvas.width = canvas.offsetWidth || parent?.clientWidth || 400;
    canvas.height = canvas.offsetHeight || parent?.clientHeight || 224;

    let frame = 0;

    function drawAR() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H * 0.65;

      // Draw perspective ground grid
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
      ctx.lineWidth = 1;
      for (let i = -8; i <= 8; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 40, cy - 20);
        ctx.lineTo(cx + i * 120, cy + 100);
        ctx.stroke();
      }
      for (let j = 0; j <= 5; j++) {
        ctx.beginPath();
        const y = cy - 20 + j * 24;
        const spread = j * 16;
        ctx.moveTo(cx - 320 - spread, y);
        ctx.lineTo(cx + 320 + spread, y);
        ctx.stroke();
      }

      // Draw 3D recharge pit in AR
      const pitW = rechargeWidth * 40;
      const pitL = rechargeLength * 25;
      const pitD = rechargeDepth * 25;
      const pulseAlpha = 0.4 + Math.sin(frame * 0.05) * 0.2;

      // Pit outline on ground
      ctx.strokeStyle = `rgba(16, 185, 129, ${pulseAlpha + 0.4})`;
      ctx.lineWidth = 3;
      ctx.strokeRect(cx - pitW / 2, cy - pitL / 2, pitW, pitL);

      // Top face of pit
      ctx.fillStyle = `rgba(16, 185, 129, ${pulseAlpha * 0.3})`;
      ctx.fillRect(cx - pitW / 2, cy - pitL / 2, pitW, pitL);

      // Corner markers
      const corners = [
        [cx - pitW / 2, cy - pitL / 2],
        [cx + pitW / 2, cy - pitL / 2],
        [cx + pitW / 2, cy + pitL / 2],
        [cx - pitW / 2, cy + pitL / 2],
      ];
      corners.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#10b981";
        ctx.fill();
        // Depth lines
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 20, y - pitD);
        ctx.strokeStyle = "rgba(16, 185, 129, 0.7)";
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Depth face
      ctx.beginPath();
      ctx.moveTo(cx + pitW / 2, cy - pitL / 2);
      ctx.lineTo(cx + pitW / 2 + 20, cy - pitL / 2 - pitD);
      ctx.lineTo(cx - pitW / 2 + 20, cy - pitL / 2 - pitD);
      ctx.lineTo(cx - pitW / 2, cy - pitL / 2);
      ctx.fillStyle = "rgba(6, 95, 70, 0.5)";
      ctx.fill();
      ctx.strokeStyle = "#10b981";
      ctx.stroke();

      // Top label
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 13px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(`Recharge Pit: ${rechargeLength}m × ${rechargeWidth}m × ${rechargeDepth}m`, cx, cy - pitL / 2 - pitD - 12);

      // Pipe connection
      ctx.beginPath();
      ctx.moveTo(cx, cy - pitL / 2);
      ctx.lineTo(cx, cy - pitL / 2 - 60);
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = "rgba(96, 165, 250, 0.8)";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.setLineDash([]);

      // Label pipe
      ctx.fillStyle = "#60a5fa";
      ctx.font = "11px system-ui";
      ctx.fillText("Downpipe Connection", cx, cy - pitL / 2 - 70);

      // Animated water droplets entering pit
      for (let i = 0; i < 3; i++) {
        const dropY = (frame * 3 + i * 40) % 70;
        ctx.beginPath();
        ctx.arc(cx, cy - pitL / 2 - 60 + dropY, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.9)";
        ctx.fill();
      }

      // Info overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.beginPath();
      ctx.roundRect(W - 200, 10, 190, 80, 8);
      ctx.fill();
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 11px system-ui";
      ctx.textAlign = "left";
      ctx.fillText("AR Recharge Pit Placement", W - 192, 28);
      ctx.font = "10px system-ui";
      ctx.fillText(`Dimensions: ${rechargeLength}×${rechargeWidth}×${rechargeDepth}m`, W - 192, 44);
      ctx.fillText(`Volume: ${(rechargeLength * rechargeWidth * rechargeDepth).toFixed(1)} m³`, W - 192, 58);
      ctx.fillText("Tap to place in your yard", W - 192, 76);

      ctx.textAlign = "center";
      frame++;
      animRef.current = requestAnimationFrame(drawAR);
    }

    drawAR();
    return () => cancelAnimationFrame(animRef.current);
  }, [arActive, rechargeDepth, rechargeWidth, rechargeLength]);

  return (
    <div className="space-y-3">
      {!arActive ? (
        <button
          onClick={startAR}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm px-4 py-2.5 rounded-xl transition font-medium w-full justify-center"
        >
          <Camera className="w-4 h-4" />
          {t("arView")} - Place Recharge Pit in Your Yard
        </button>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-purple-500/40">
          <video
            ref={videoRef}
            className="w-full h-56 object-cover"
            style={{ display: cameraError ? "none" : "block" }}
            playsInline
            muted
          />
          {cameraError && (
            <div className="w-full h-56 bg-gradient-to-b from-gray-900 to-blue-950 flex items-center justify-center">
              <span className="text-blue-300 text-sm">{cameraError}</span>
            </div>
          )}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 10 }}
          />
          <button
            onClick={stopAR}
            className="absolute top-2 right-2 z-20 bg-red-600 hover:bg-red-500 text-white rounded-full p-1"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 z-20 bg-black/50 text-purple-200 text-xs px-2 py-1 rounded">
            AR Mode Active • Point at your yard
          </div>
        </div>
      )}
    </div>
  );
}
