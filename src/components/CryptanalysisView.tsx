import React, { useState, useMemo } from 'react';
import { simulateAttack } from '../utils/crypto';
import { ShieldCheck, ShieldAlert, Cpu, Lock, Zap, Gauge, Server, CheckCircle2 } from 'lucide-react';

export const CryptanalysisView: React.FC = () => {
  const [alphabetSize, setAlphabetSize] = useState<number>(36);
  const [length, setLength] = useState<number>(12);
  const [rateExponent, setRateExponent] = useState<number>(9); // 10^9 is default
  const [enableDynamicDefense, setEnableDynamicDefense] = useState<boolean>(true);

  const rate = Math.pow(10, rateExponent);

  const result = useMemo(() => {
    return simulateAttack(alphabetSize, length, rate);
  }, [alphabetSize, length, rate]);

  const presetTableData = [
    {
      length: 6,
      keyspace: '2.17 × 10⁹',
      classical: '≈ 2.17 秒',
      groverSteps: '4.67 × 10⁴',
      groverTime: '0.000046 秒',
      defendedTime: '≈ 1.8 小時'
    },
    {
      length: 12,
      keyspace: '4.74 × 10¹⁸',
      classical: '≈ 150 年',
      groverSteps: '2.18 × 10⁹',
      groverTime: '≈ 2.18 秒',
      defendedTime: '≥ 55 天 (1000 GPU)'
    },
    {
      length: 16,
      keyspace: '7.96 × 10²⁴',
      classical: '≈ 2.52 億年',
      groverSteps: '2.82 × 10¹²',
      groverTime: '≈ 47 分鐘',
      defendedTime: '≈ 4,200 年'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title & Overview Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Lock className="w-4 h-4" />
            <span>AIHC Cryptanalysis & Dynamic Entropy Framework</span>
          </div>
          <h2 className="text-xl font-bold text-white">飽和破譯碼與量子 Grover 攻防模擬</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            比對經典暴力破解（O(N)）與量子格羅弗搜尋演算法（O(√N)）的破解耗時。
            AIHC 透過零寬隱寫疊加每秒動態隨機鹽（Session Nonce），將量子累積搜尋降維為單次極小機率猜測（P ≈ 2.1 × 10⁻¹⁰）。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setEnableDynamicDefense(!enableDynamicDefense)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all border ${
              enableDynamicDefense
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                : 'bg-red-500/20 text-red-300 border-red-500/40'
            }`}
          >
            {enableDynamicDefense ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>AIHC 動態隱寫防禦: 已啟用</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>無防禦 (暴露於 Grover 攻擊)</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-5">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            攻擊參數配置 (Attack Parameters)
          </h3>

          {/* Charset Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">字集基值 (Alphabet Size A):</span>
              <span className="text-cyan-300 font-mono font-bold">{alphabetSize} 種字元</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setAlphabetSize(36)}
                className={`py-1.5 px-2 rounded text-xs font-mono border transition-all ${
                  alphabetSize === 36
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                36 (小寫+數字)
              </button>
              <button
                onClick={() => setAlphabetSize(62)}
                className={`py-1.5 px-2 rounded text-xs font-mono border transition-all ${
                  alphabetSize === 62
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                62 (大小寫+數)
              </button>
              <button
                onClick={() => setAlphabetSize(78)}
                className={`py-1.5 px-2 rounded text-xs font-mono border transition-all ${
                  alphabetSize === 78
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                78 (AIHC 全字集)
              </button>
            </div>
          </div>

          {/* Password Length Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">密碼長度 (Length L):</span>
              <span className="text-cyan-300 font-mono font-bold">{length} 碼</span>
            </div>
            <input
              type="range"
              min={4}
              max={20}
              step={1}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>4 碼</span>
              <span>12 碼 (白皮書基準)</span>
              <span>20 碼</span>
            </div>
          </div>

          {/* Attack Speed Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">破譯嘗試速度 (Hash Rate):</span>
              <span className="text-cyan-300 font-mono font-bold">10^{rateExponent} 次/秒</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setRateExponent(9)}
                className={`py-1.5 px-2 rounded text-xs font-mono border transition-all ${
                  rateExponent === 9
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                10⁹ 次/秒 (單節點)
              </button>
              <button
                onClick={() => setRateExponent(12)}
                className={`py-1.5 px-2 rounded text-xs font-mono border transition-all ${
                  rateExponent === 12
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                10¹² 次/秒 (1000 GPU 叢集)
              </button>
            </div>
          </div>

          {/* Mathematical Model Card */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-slate-400">總密鑰空間 (Keyspace N = A^L):</div>
            <div className="text-sm font-bold text-white break-all">
              {result.keyspace < 1e12
                ? result.keyspace.toLocaleString()
                : result.keyspace.toExponential(4)}
            </div>
            <div className="text-[11px] text-slate-500">
              Grover 量子步數 (√N): {result.quantumSteps.toExponential(4)}
            </div>
          </div>
        </div>

        {/* Results Comparison Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Classical Brute Force Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">經典暴力破解 (Classical)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  O(N) 複雜度
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {result.classicalDisplay}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                在 {rate.toExponential(0)} 次/秒 速度下循序遍歷所有可能密鑰組合。
              </p>
            </div>

            {/* Quantum Grover Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">量子 Grover 搜尋</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                  O(√N) 二次加速
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-cyan-400">
                {result.quantumDisplay}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                量子疊加與相位翻轉使得 12 碼密鑰可由 150 年劇降至僅 2.18 秒！
              </p>
            </div>
          </div>

          {/* AIHC Defended Result Card */}
          <div
            className={`rounded-xl border p-5 transition-all ${
              enableDynamicDefense
                ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-950 shadow-lg shadow-emerald-950/20'
                : 'border-slate-800 bg-slate-900/40 opacity-75'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  className={`w-5 h-5 ${
                    enableDynamicDefense ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                />
                <h4 className="text-sm font-semibold text-white">
                  AIHC 動態零寬隱寫與 Session Nonce 防禦成效
                </h4>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {enableDynamicDefense ? '防禦力：100% 穩定態' : '防禦停用'}
              </span>
            </div>

            {enableDynamicDefense ? (
              <div className="space-y-3">
                <div className="text-2xl font-bold font-mono text-emerald-300">
                  {result.dynamicDefendedDisplay}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  透過每秒注入微秒級零寬時間隨機鹽（Dynamic Nonce），破壞了 Grover 演算法對靜態黑盒（Oracle）的持續振幅放大前提。攻擊者被迫退化至盲猜單次機率（P ≈ 2.1 × 10⁻¹⁰），即使動用 1000 塊頂級 GPU 叢集亦需數月甚至千年以上，成功抵禦量子優勢威脅！
                </p>
              </div>
            ) : (
              <div className="text-xs text-red-300/90 py-2">
                警告：未啟用動態防禦！目前系統 12 碼在量子電腦前僅有 2.18 秒的生存期！
              </div>
            )}
          </div>

          {/* Whitepaper Reference Benchmark Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-3">
            <div className="text-xs font-semibold text-slate-200 font-mono flex items-center justify-between">
              <span>白皮書基準攻防數據對照表 (Whitepaper Table 6.2, A=36, 10⁹/s)</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 pr-3">長度 L</th>
                    <th className="py-2 pr-3">密碼空間 N</th>
                    <th className="py-2 pr-3">經典暴力破解</th>
                    <th className="py-2 pr-3">量子 Grover 步數</th>
                    <th className="py-2 pr-3 text-cyan-400">量子破解時間</th>
                    <th className="py-2 text-emerald-400">AIHC 防禦後</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {presetTableData.map((row) => (
                    <tr key={row.length} className="hover:bg-slate-800/40">
                      <td className="py-2 pr-3 font-bold text-white">{row.length} 碼</td>
                      <td className="py-2 pr-3 text-slate-400">{row.keyspace}</td>
                      <td className="py-2 pr-3">{row.classical}</td>
                      <td className="py-2 pr-3 text-slate-400">{row.groverSteps}</td>
                      <td className="py-2 pr-3 text-cyan-300 font-semibold">{row.groverTime}</td>
                      <td className="py-2 text-emerald-400 font-semibold">{row.defendedTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
