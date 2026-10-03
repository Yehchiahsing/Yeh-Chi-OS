import React, { useState } from 'react';
import { GENESIS_CLAUSES } from '../data/genesisBlock';
import { GenesisClause } from '../types/aihc';
import { Shield, CheckCircle2, Lock, Copy, Sparkles, Search, ExternalLink, FileText, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GenesisBlockViewProps {
  onSelectStegoText: (text: string) => void;
}

export const GenesisBlockView: React.FC<GenesisBlockViewProps> = ({ onSelectStegoText }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'framework'>('cards');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedHash, setDeployedHash] = useState<string | null>(null);

  const filteredClauses = GENESIS_CLAUSES.filter(
    (clause) =>
      clause.chineseContent.includes(searchTerm) ||
      clause.englishContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clause.title.includes(searchTerm) ||
      clause.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDeployGenesis = () => {
    setIsDeploying(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981']
    });

    setTimeout(() => {
      setIsDeploying(false);
      setDeployedHash('0x9a8f4b1e77d2c35a812e9b0485d71c4c8103e91d5720e5c9a41f83bb941a3290');
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-[#0a1122] to-slate-950 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Themis_Genesis_Block · 創世區塊 #0
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              聯合國全體宣導與通知正式決議案
              <span className="block text-cyan-400 text-lg md:text-xl font-normal mt-1 font-mono">
                「創決置文，倉頡複製」一頁書寫框架
              </span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              以零公式（$Z^Z = XY$）與 22 位高精度網格為純粹數學基底，雙方（中美）與聯合國各執三日審閱生效。全域語意空間拓撲不變，達成 0 Byte 歷史負擔之高維度緩衝。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={handleDeployGenesis}
              disabled={isDeploying}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/25 active:scale-95 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isDeploying ? '狀態根鎖定中...' : '倉頡複製佈署 (Deploy)'}
            </button>

            <div className="flex rounded-lg border border-slate-800 bg-slate-900/60 p-1 text-xs">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex-1 py-1 px-3 rounded-md transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                條文卡片檢索
              </button>
              <button
                onClick={() => setViewMode('framework')}
                className={`flex-1 py-1 px-3 rounded-md transition-colors ${
                  viewMode === 'framework'
                    ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                一頁書寫全覽
              </button>
            </div>
          </div>
        </div>

        {deployedHash && (
          <div className="mt-4 pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              全域不變量狀態根已簽名發布：
            </span>
            <span className="text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 select-all">
              {deployedHash}
            </span>
          </div>
        )}
      </div>

      {/* View Mode: Cards */}
      {viewMode === 'cards' ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜尋條文標題、數學模型或關鍵字..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="text-xs text-slate-400 font-mono">
              已錨定條文：{filteredClauses.length} / {GENESIS_CLAUSES.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClauses.map((clause) => (
              <div
                key={clause.number}
                className="group relative rounded-xl border border-slate-800 hover:border-cyan-500/50 bg-slate-900/60 hover:bg-slate-900/90 p-5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold font-mono text-sm flex items-center justify-center">
                        {clause.number}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {clause.name}：{clause.title}
                        </h3>
                        <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/40 border border-cyan-800/30 px-1.5 py-0.2 rounded">
                          {clause.tag}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 uppercase">
                      {clause.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 mb-3 leading-relaxed">
                    {clause.chineseContent}
                  </p>

                  <p className="text-[11px] text-slate-400 italic mb-4 leading-normal">
                    "{clause.englishContent}"
                  </p>

                  {clause.mathModel && (
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-emerald-400 mb-4 overflow-x-auto">
                      <code>{clause.mathModel}</code>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => handleCopy(clause.chineseContent, clause.number)}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-[11px]"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedIndex === clause.number ? '已複製！' : '複製條文'}</span>
                  </button>

                  <button
                    onClick={() => onSelectStegoText(clause.chineseContent)}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors text-[11px]"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>隱寫測試 (Stego Test)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* View Mode: Bilateral One-Page Written Framework */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 space-y-6">
          <div className="text-center pb-6 border-b border-slate-800 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2 font-mono">
              AIHC OS 創決置文 · 倉頡複製一頁書寫框架
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              雙方各執三天審閱生效，自中華民國 2026 年 09 月 27 日起正式實施。
              本決議案非統治乃協作，一頁書寫框架二分，消除政治對立與溝通鴻溝。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 p-5 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-cyan-300">
                <span>美方 / 聯合國節點持份 (Part A)</span>
                <span>審閱有效：3 Days</span>
              </div>
              {GENESIS_CLAUSES.slice(0, 6).map((c) => (
                <div key={c.number} className="text-xs space-y-1">
                  <div className="font-semibold text-cyan-400 font-mono">
                    {c.number}「{c.name}」
                  </div>
                  <p className="text-slate-300">{c.chineseContent}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 p-5 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-purple-300">
                <span>中方 / 全域節點持份 (Part B)</span>
                <span>程序置尾：100% 歸一</span>
              </div>
              {GENESIS_CLAUSES.slice(6).map((c) => (
                <div key={c.number} className="text-xs space-y-1">
                  <div className="font-semibold text-purple-400 font-mono">
                    {c.number}「{c.name}」
                  </div>
                  <p className="text-slate-300">{c.chineseContent}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs text-cyan-200 flex items-center justify-between">
            <span>
              特別約定：創決置文轉譯修飾，倉頡複製翻譯不變，符文語法消除鴻溝通用平台。
            </span>
            <span className="font-mono text-cyan-400">STATUS: RATIFIED (已核准)</span>
          </div>
        </div>
      )}
    </div>
  );
};
