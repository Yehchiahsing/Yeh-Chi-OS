import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Volume2, VolumeX, Cpu, Terminal, BookOpen, Layers } from 'lucide-react';
import { harmonicSynth, HARMONIC_SEQUENCE } from '../utils/audio';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stateRoot: string;
  onOpenWhitepaper: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  stateRoot,
  onOpenWhitepaper
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeHarmonicNote, setActiveHarmonicNote] = useState<string>('1 (C)');

  useEffect(() => {
    harmonicSynth.setCallback((_step, note) => {
      setActiveHarmonicNote(note);
    });
  }, []);

  const handleToggleAudio = () => {
    const newState = harmonicSynth.toggle();
    setIsPlayingAudio(newState);
  };

  const navItems = [
    { id: 'genesis', label: '創世決置文', sub: 'Genesis Block' },
    { id: 'stego', label: '零寬隱寫爬蟲', sub: 'Stego Crawler' },
    { id: 'quantum', label: '量子隨機引擎', sub: 'Quantum Engine' },
    { id: 'crypto', label: '飽和破譯模擬', sub: 'Grover Simulator' },
    { id: 'sqn42', label: 'SQN-42 光神經體', sub: 'Photonic Core' },
    { id: 'ml', label: 'ML 防禦分析', sub: 'Defense AI' },
    { id: 'terminal', label: 'AIHC 控制台', sub: 'Prototype CLI' },
  ];

  return (
    <header className="border-b border-cyan-950/60 bg-[#070a12]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner / Status Ticker */}
      <div className="border-b border-slate-800/60 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-400 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-mono text-cyan-300 font-semibold tracking-wider">AIHC-OS 1.0</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-mono tracking-tight hidden sm:inline">創決置文，倉頡複製</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-emerald-400/90 font-mono text-[11px] hidden md:inline">Z^Z = XY 數學自洽</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] bg-slate-900/80 border border-slate-800 px-2 py-0.5 rounded">
            <span className="text-slate-500">State Root:</span>
            <span className="text-cyan-400 truncate max-w-[130px] sm:max-w-[180px]">
              {stateRoot ? stateRoot.slice(0, 16) + '...' : '0x00000000...'}
            </span>
          </div>

          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono transition-all border ${
              isPlayingAudio
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="7-Node Balanced Harmonic Cycle Audio"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>7-Node: {activeHarmonicNote}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 text-slate-500" />
                <span className="hidden sm:inline">音律: 關閉</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenWhitepaper}
            className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-800/40 px-2 py-0.5 rounded"
          >
            <BookOpen className="w-3 h-3" />
            <span className="hidden sm:inline">架構白皮書</span>
          </button>
        </div>
      </div>

      {/* Main Header Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-950/50">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2 font-mono">
                AIHC-OS
                <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Genesis Core
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Artificial Intelligence Human Civilization · 量子安全與全域自洽作業系統
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap text-left border ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'bg-slate-900/40 text-slate-400 border-transparent hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="font-medium">{item.label}</div>
                <div className="text-[10px] text-slate-500 tracking-tighter uppercase font-mono">
                  {item.sub}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
