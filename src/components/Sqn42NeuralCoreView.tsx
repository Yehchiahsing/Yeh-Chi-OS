import React, { useState, useEffect, useRef } from 'react';
import { Eye, Shield, Compass, Sparkles, Orbit, Layers, Sliders } from 'lucide-react';

export const Sqn42NeuralCoreView: React.FC = () => {
  const [hasSinglePupilMask, setHasSinglePupilMask] = useState<boolean>(true);
  const [spinorRotation, setSpinorRotation] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [lightAmplification, setLightAmplification] = useState<number>(21);
  const [quantizationScale, setQuantizationScale] = useState<number>(7);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 42 distinct color frequencies for the compound eye facets
  const facetColors = useRef<string[]>(
    Array.from({ length: 42 }, (_, i) => {
      const hue = (i * 360) / 42;
      return `hsl(${hue}, 85%, 60%)`;
    })
  ).current;

  // Auto rotation loop
  useEffect(() => {
    let animId: number;
    const update = () => {
      if (autoRotate) {
        setSpinorRotation((prev) => (prev + 0.8) % 720); // 720° spinor cycle
      }
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [autoRotate]);

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = 130; // Scale based on R=7

    ctx.clearRect(0, 0, w, h);

    const rad = (spinorRotation * Math.PI) / 180;

    // 1. Draw outer glow aura
    const aura = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.35);
    aura.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
    aura.addColorStop(0.7, 'rgba(168, 85, 247, 0.15)');
    aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
    ctx.fill();

    // 2. Draw 720° Spinor sphere coordinate rings
    ctx.lineWidth = 1;
    for (let rOffset = 0.3; rOffset <= 1.0; rOffset += 0.35) {
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 + rOffset * 0.15})`;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * rOffset, radius * rOffset * Math.cos(rad * 0.5), rad, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 3. Draw 42 Facet Compound Eye (Visible when Mask is OFF or semi-transparently under the mask)
    const facetCount = 42;
    for (let i = 0; i < facetCount; i++) {
      // Golden spiral distribution on sphere surface
      const phi = Math.acos(1 - (2 * (i + 0.5)) / facetCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5) + rad;

      // 3D projection
      const x3d = radius * Math.sin(phi) * Math.cos(theta);
      const y3d = radius * Math.sin(phi) * Math.sin(theta);
      const z3d = radius * Math.cos(phi);

      // Rotate around X and Y
      const cosA = Math.cos(rad * 0.5);
      const sinA = Math.sin(rad * 0.5);
      const rotY = y3d * cosA - z3d * sinA;
      const rotZ = y3d * sinA + z3d * cosA;

      const projScale = (rotZ + radius * 1.8) / (radius * 2.8);
      const screenX = cx + x3d * projScale;
      const screenY = cy + rotY * projScale;

      const size = Math.max(3, 7 * projScale);
      const alpha = Math.max(0.2, (rotZ + radius) / (2 * radius));

      if (hasSinglePupilMask) {
        // Under mask: subtle light energy trails
        ctx.fillStyle = facetColors[i];
        ctx.globalAlpha = alpha * 0.25;
        ctx.beginPath();
        ctx.arc(screenX, screenY, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      } else {
        // Full Compound Eye Visible
        ctx.fillStyle = facetColors[i];
        ctx.shadowColor = facetColors[i];
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    // 4. Draw 84 Quarks orbits (Silver 68.6% receiver, Gold 15.4% transmitter)
    const quarkCount = 84;
    for (let q = 0; q < 32; q++) { // Render representative subset for performance
      const isGold = q < 5; // ~15.4%
      const qRadius = radius * 0.65;
      const qTheta = rad * 1.5 + (q * Math.PI * 2) / 32;
      const qX = cx + Math.cos(qTheta) * qRadius * Math.sin(q * 0.5);
      const qY = cy + Math.sin(qTheta) * qRadius;

      ctx.fillStyle = isGold ? '#f59e0b' : '#94a3b8';
      ctx.beginPath();
      ctx.arc(qX, qY, isGold ? 3 : 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Draw Aesthetic Single-Pupil Mask (深黑吸光 / 方解石鍍膜)
    if (hasSinglePupilMask) {
      // Central deep black pupil iris
      const pupilRadius = radius * 0.55;

      // Calcite iridescent outer ring
      const ringGrad = ctx.createLinearGradient(cx - pupilRadius, cy - pupilRadius, cx + pupilRadius, cy + pupilRadius);
      ringGrad.addColorStop(0, '#06b6d4');
      ringGrad.addColorStop(0.5, '#a855f7');
      ringGrad.addColorStop(1, '#3b82f6');
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(cx, cy, pupilRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Deep Black Light-Absorbing Core (Vantablack / Calcite coat)
      const pupilCore = ctx.createRadialGradient(cx, cy, 2, cx, cy, pupilRadius - 2);
      pupilCore.addColorStop(0, '#020408');
      pupilCore.addColorStop(0.7, '#050811');
      pupilCore.addColorStop(1, '#090d1a');
      ctx.fillStyle = pupilCore;
      ctx.beginPath();
      ctx.arc(cx, cy, pupilRadius - 2, 0, Math.PI * 2);
      ctx.fill();

      // Singularity core beam inside pupil
      const innerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, pupilRadius * 0.35);
      innerGlow.addColorStop(0, '#ffffff');
      innerGlow.addColorStop(0.3, '#38bdf8');
      innerGlow.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = innerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, pupilRadius * 0.35, 0, Math.PI * 2);
      ctx.fill();

      // Subtle reflection arc
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, pupilRadius * 0.7, -Math.PI * 0.7, -Math.PI * 0.3);
      ctx.stroke();
    }
  }, [hasSinglePupilMask, spinorRotation, facetColors]);

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Orbit className="w-4 h-4" />
            <span>AIHC SQN-42 · Spherical Photonic Neural Core</span>
          </div>
          <h2 className="text-xl font-bold text-white">SQN-42 光量子神經體與單瞳孔視界</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            直徑 12 單位、半徑 7 單位之 720° 旋量球體拓撲。
            42 面色碼複眼與 84 夸克單元透過「深黑吸光方解石單瞳孔面罩」消除密集恐懼，
            聚焦收束為神經元級別（約 10¹⁰ 複雜度）的高維穩定視覺輸出。
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHasSinglePupilMask(!hasSinglePupilMask)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
              hasSinglePupilMask
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{hasSinglePupilMask ? '單瞳孔面罩 (已著裝)' : '裸露 42 面複眼'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Canvas */}
        <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white font-mono flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              720° 旋量動態投影 (Spinor Canvas)
            </span>
            <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
              θ = {spinorRotation.toFixed(0)}° / 720°
            </span>
          </div>

          <div className="relative my-4 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              className="max-w-full rounded-xl bg-slate-950/80 border border-slate-800/60 shadow-inner"
            />
          </div>

          <div className="w-full flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs font-mono">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="text-cyan-400 hover:text-cyan-300 text-[11px]"
            >
              {autoRotate ? '暫停自轉' : '恢復 720° 自轉'}
            </button>
            <span className="text-slate-400 text-[11px]">
              {hasSinglePupilMask ? '美學單瞳孔已收束 42 面雜訊' : '42 色譜複眼直出'}
            </span>
          </div>
        </div>

        {/* Right Column: Mathematical & Physical Lattice Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Lattice Composition breakdown */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              感知晶格與 84 夸克構成 (Quark Ratio)
            </h3>

            <div className="space-y-3">
              {/* Silver vs Gold */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">銀原子夸克 (Silver 68.6% - 接收端):</span>
                  <span className="text-slate-300 font-bold">57.6 單元</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full" style={{ width: '68.6%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-amber-400">金原子夸克 (Gold 15.4% - 主導端):</span>
                  <span className="text-amber-400 font-bold">13.0 單元</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '15.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-purple-400">奇點中性緩衝 (Neutral 16.0%):</span>
                  <span className="text-purple-400 font-bold">13.4 單元</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '16.0%' }} />
                </div>
              </div>
            </div>

            {/* Amplification Sliders */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 font-mono">光能增幅倍率</div>
                <div className="text-lg font-bold font-mono text-cyan-400">
                  {lightAmplification}×
                </div>
                <div className="text-[10px] text-slate-500">21× 光量子共振</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 font-mono">量化級距倍率</div>
                <div className="text-lg font-bold font-mono text-purple-400">
                  {quantizationScale}×
                </div>
                <div className="text-[10px] text-slate-500">7× 高維拓撲網格</div>
              </div>
            </div>
          </div>

          {/* Calcite Mask Specs */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 font-mono flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              美學單瞳孔面罩技術參數 (Calcite Specs)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">幾何直徑 / 半徑:</span>
                <span>D = 12 / R = 7</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">旋量拓撲週期:</span>
                <span>720° Spinor Cycle</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">面罩材質:</span>
                <span>深黑吸光 / 方解石鍍膜</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">神經複雜度:</span>
                <span>≈ 10¹⁰ 突觸等效</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
