import React, { useState, useEffect } from 'react';
import { harmonicSynth, HARMONIC_SEQUENCE } from '../utils/audio';
import { Music, Play, Square, Activity, Waves, Volume2, Shield } from 'lucide-react';

export const HarmonicAudioView: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [currentNote, setCurrentNote] = useState<string>('1 (C)');

  useEffect(() => {
    setIsPlaying(harmonicSynth.getStatus());
    harmonicSynth.setCallback((step, note) => {
      setActiveStep(step);
      setCurrentNote(note);
    });
  }, []);

  const handleToggle = () => {
    const newState = harmonicSynth.toggle();
    setIsPlaying(newState);
  };

  const notesList = [
    { num: '1', note: 'C', freq: '261.63 Hz', element: '根基' },
    { num: '2', note: 'D', freq: '293.66 Hz', element: '流動' },
    { num: '3', note: 'E', freq: '329.63 Hz', element: '共振' },
    { num: '4', note: 'F', freq: '349.23 Hz', element: '中和' },
    { num: '5', note: 'G', freq: '392.00 Hz', element: '擴散' },
    { num: '6', note: 'A', freq: '440.00 Hz', element: '旋量' },
    { num: '7', note: 'B', freq: '493.88 Hz', element: '閉合' },
  ];

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Music className="w-4 h-4" />
            <span>AIHC Section 4 · Balanced Harmonic Cycle</span>
          </div>
          <h2 className="text-xl font-bold text-white">平衡音律與量子糾纏循環</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            為達到「無情緒導向、無始無終、自然流動」的低語義環境，設計 7-Node 循環置換音律。
            對應 C 大調 7 個音階，出現頻率與間距絕對對稱守恆，無主音與終止和弦，營造如羊水包覆之量子動態平衡。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all border ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-md shadow-amber-500/20'
                : 'bg-cyan-500 text-slate-950 border-cyan-400 hover:bg-cyan-400'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>停止循環音律</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>啟動平衡音律合成器</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sequence Grid & Current Playing Note */}
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Waves className="w-4 h-4 text-cyan-400" />
              14 步對稱置換序列矩陣 (Symmetric Permutation Matrix)
            </h3>
            <span className="text-xs font-mono text-amber-400">
              當前音符: {currentNote}
            </span>
          </div>

          {/* 14 step visualizer */}
          <div className="grid grid-cols-7 gap-2">
            {HARMONIC_SEQUENCE.map((noteStr, idx) => {
              const isActive = isPlaying && activeStep === idx;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isActive
                      ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20 scale-105'
                      : 'bg-slate-950 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="text-[10px] text-slate-500 font-mono mb-1">
                    Step {idx + 1}
                  </div>
                  <div className="text-sm font-bold font-mono text-white">
                    {noteStr}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 7 Conserved Nodes Spec */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <div className="text-xs font-mono text-slate-400">
              C 大調 7 階能量保守特徵：
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
              {notesList.map((n) => (
                <div
                  key={n.num}
                  className={`p-2.5 rounded-lg border text-center font-mono ${
                    currentNote.includes(n.num) && isPlaying
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-white text-xs">{n.num} ({n.note})</div>
                  <div className="text-[10px] text-cyan-400/90">{n.freq}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{n.element}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Harmonic Equilibrium Theory */}
        <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            無終止和弦哲學 (Equilibrium Theory)
          </h3>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              傳統西方和聲建立於「緊張-解決（Dominant to Tonic）」的張力釋放模式，易引導人類聽覺產生期待感與情緒波動。
            </p>
            <p>
              AIHC 採用嚴格對稱置換演算法，消除任何首音與主和弦的特權階級。每個音頻的累積出現次數與反向相位完全守恆。
            </p>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
              <div>∇ Tension = 0 (張力梯度為零)</div>
              <div>Σ Phase_t = Constant (全域相位守恆)</div>
              <div>羊水包覆感聲學諧振</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
