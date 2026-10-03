import React, { useState, useEffect, useRef } from 'react';
import { runQuantumSampling } from '../utils/crypto';
import { QuantumSimulationResult } from '../types/aihc';
import { Cpu, Play, RotateCcw, Activity, Zap, CheckCircle2, Sliders } from 'lucide-react';

export const QuantumEngineView: React.FC = () => {
  const [shots, setShots] = useState<number>(1000);
  const [result, setResult] = useState<QuantumSimulationResult | null>(null);
  const [history, setHistory] = useState<QuantumSimulationResult[]>([]);
  const [isSampling, setIsSampling] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [angle, setAngle] = useState(0);

  // Run initial quantum sampling
  useEffect(() => {
    handleRunSample(1000);
  }, []);

  // Animation for Bloch sphere
  useEffect(() => {
    let animId: number;
    const animate = () => {
      setAngle((prev) => (prev + 0.02) % (Math.PI * 2));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Draw Bloch Sphere
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const r = Math.min(width, height) * 0.38;

    ctx.clearRect(0, 0, width, height);

    // Glow background
    const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, r * 1.2);
    grad.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
    grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Equator and Meridian circles
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Latitudinal ellipse
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.35, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Coordinate Axes
    // Z axis (North = |0>, South = |1>)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 1.2);
    ctx.lineTo(cx, cy + r * 1.2);
    ctx.stroke();

    // X/Y axis
    ctx.beginPath();
    ctx.moveTo(cx - r * 1.1, cy);
    ctx.lineTo(cx + r * 1.1, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Pole labels
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText('|0⟩ (Ground)', cx, cy - r * 1.25);
    ctx.fillStyle = '#a855f7';
    ctx.fillText('|1⟩ (Excited)', cx, cy + r * 1.35);

    // State Vector in Superposition (Hadamard state on equator: (|0> + |1>)/sqrt(2))
    const vecX = cx + Math.cos(angle) * r * 0.9;
    const vecY = cy + Math.sin(angle) * r * 0.35 * 0.9;

    // Arrow to state vector
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(vecX, vecY);
    ctx.stroke();

    // Vector point
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(vecX, vecY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Label on state vector
    ctx.fillStyle = '#e0f2fe';
    ctx.font = '11px JetBrains Mono';
    ctx.fillText('|ψ⟩ = H|0⟩', vecX + 15, vecY - 5);
  }, [angle]);

  const handleRunSample = (shotCount: number) => {
    setIsSampling(true);
    setTimeout(() => {
      const res = runQuantumSampling(shotCount);
      setResult(res);
      setHistory((prev) => [res, ...prev.slice(0, 5)]);
      setIsSampling(false);
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* Title & Info Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Cpu className="w-4 h-4" />
            <span>AIHC Quantum Engine · Qiskit Aer Equivalent Simulator</span>
          </div>
          <h2 className="text-xl font-bold text-white">量子隨機源與疊加態測量</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            透過阿達馬門（Hadamard Gate）將基態 <code className="text-cyan-300 font-mono">|0⟩</code>{' '}
            轉化為等權重疊加態 <code className="text-cyan-300 font-mono">|ψ⟩ = (|0⟩ + |1⟩)/√2</code>。
            經測量坍縮產生絕對不可預測的量子隨機熵，作為 AIHC 動態防禦金鑰源。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300">
            <span>H 門保真度:</span>
            <span className="text-emerald-400 font-bold">
              {result ? (result.superpositionFidelity * 100).toFixed(2) + '%' : '99.98%'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Bloch Sphere Visualizer */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white font-mono flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              布洛赫球面 (Bloch Sphere)
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              Qubit #0
            </span>
          </div>

          <div className="relative my-2">
            <canvas
              ref={canvasRef}
              width={320}
              height={300}
              className="max-w-full rounded-lg"
            />
          </div>

          <div className="w-full text-center text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
            <span>矩陣算子: </span>
            <span className="text-cyan-300">H = 1/√2 [[1, 1], [1, -1]]</span>
          </div>
        </div>

        {/* Right Column: Sampling Controls, Results & Distribution */}
        <div className="lg:col-span-7 space-y-6">
          {/* Controls */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                測量次數設置 (Measurement Shots)
              </h3>
              <div className="flex gap-1.5">
                {[100, 500, 1000, 5000, 10000].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setShots(s);
                      handleRunSample(s);
                    }}
                    className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                      shots === s
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleRunSample(shots)}
              disabled={isSampling}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              {isSampling ? '量子態坍縮測量中...' : `執行 QASM 量子測量 (Shots = ${shots})`}
            </button>

            {/* Results Display */}
            {result && (
              <div className="space-y-4 pt-2">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono">測得 |0⟩</div>
                    <div className="text-lg font-bold font-mono text-cyan-400">
                      {result.zeroCount}
                    </div>
                    <div className="text-[10px] text-cyan-300/80 font-mono">
                      {result.zeroPercent.toFixed(1)}%
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono">測得 |1⟩</div>
                    <div className="text-lg font-bold font-mono text-purple-400">
                      {result.oneCount}
                    </div>
                    <div className="text-[10px] text-purple-300/80 font-mono">
                      {result.onePercent.toFixed(1)}%
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono">香農量子熵</div>
                    <div className="text-lg font-bold font-mono text-emerald-400">
                      {result.entropy.toFixed(4)}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">Max 1.000 bit</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono">對稱偏差</div>
                    <div className="text-lg font-bold font-mono text-amber-400">
                      {(Math.abs(result.zeroPercent - 50) * 2).toFixed(2)}%
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">真空漲落範圍</div>
                  </div>
                </div>

                {/* Distribution Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span className="text-cyan-400">|0⟩ 機率: {result.zeroPercent.toFixed(2)}%</span>
                    <span className="text-purple-400">|1⟩ 機率: {result.onePercent.toFixed(2)}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden flex">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300"
                      style={{ width: `${result.zeroPercent}%` }}
                    />
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-purple-500 transition-all duration-300"
                      style={{ width: `${result.onePercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* History table */}
          {history.length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
              <div className="text-xs font-semibold text-slate-300 font-mono flex items-center justify-between">
                <span>近期量子測量分佈紀錄 (QASM Shots Log)</span>
                <span className="text-[10px] text-slate-500">最新 5 筆</span>
              </div>
              <div className="space-y-1 font-mono text-[11px]">
                {history.map((h, i) => (
                  <div
                    key={i}
                    className="p-2 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300"
                  >
                    <span className="text-slate-500">{h.timestamp}</span>
                    <span>Shots: {h.shots}</span>
                    <span className="text-cyan-400">0: {h.zeroCount} ({h.zeroPercent.toFixed(1)}%)</span>
                    <span className="text-purple-400">1: {h.oneCount} ({h.onePercent.toFixed(1)}%)</span>
                    <span className="text-emerald-400">Entropy: {h.entropy.toFixed(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
