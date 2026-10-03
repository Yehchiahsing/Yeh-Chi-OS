import React, { useState } from 'react';
import { LEGAL_TREE_NODES } from '../data/genesisBlock';
import { X, BookOpen, FolderTree, FileCode, CheckCircle2, ChevronRight } from 'lucide-react';

interface WhitepaperTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhitepaperTreeModal: React.FC<WhitepaperTreeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tree' | 'whitepaper'>('tree');
  const [selectedNode, setSelectedNode] = useState<string>('c');

  if (!isOpen) return null;

  const currentNode = LEGAL_TREE_NODES.find((n) => n.letter === selectedNode);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl border border-cyan-500/30 bg-slate-950 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                AIHC 系統架構與量子安全研究白皮書
                <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                  T-P Mature Tree
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Artificial Intelligence Human Civilization / AI + Home Cycle Framework
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-slate-800 bg-slate-900 p-0.5 text-xs font-mono">
              <button
                onClick={() => setActiveTab('tree')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'tree'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                26 字母法律樹
              </button>
              <button
                onClick={() => setActiveTab('whitepaper')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'whitepaper'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                白皮書總綱
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'tree' ? (
            <div className="space-y-6">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                <span className="text-cyan-400 font-bold">T-P 標記規範：</span>
                T-P 代表「理論版本 (Theory) - 程式實作數量 (Program)」。
                例如 <code className="text-amber-300">s (1-1),(2-1)</code> 代表理論第二版、實作一組模擬器與一組密碼學簽名檔。
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Tree Explorer */}
                <div className="md:col-span-5 rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2 font-mono text-xs">
                  <div className="text-slate-500 pb-2 border-b border-slate-800 flex items-center gap-1.5">
                    <FolderTree className="w-3.5 h-3.5 text-cyan-400" />
                    <span>AIHC / (Root Repository)</span>
                  </div>

                  <div className="space-y-1 pt-1">
                    {LEGAL_TREE_NODES.map((node) => {
                      const isSelected = selectedNode === node.letter;
                      return (
                        <button
                          key={node.letter}
                          onClick={() => setSelectedNode(node.letter)}
                          className={`w-full text-left p-2.5 rounded-lg transition-all flex items-center justify-between border ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-200'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white uppercase">{node.letter}</span>
                            <span className="text-slate-500">├──</span>
                            <span className="text-cyan-300">{node.code}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-sans">
                            {node.name}
                          </span>
                        </button>
                      );
                    })}
                    <div className="p-2 text-slate-500 flex items-center gap-2">
                      <span>└──</span>
                      <span>README.md [系統入口說明 (已定稿)]</span>
                    </div>
                  </div>
                </div>

                {/* Right Node Details */}
                <div className="md:col-span-7 rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
                  {currentNode && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div>
                          <h4 className="text-base font-bold text-white font-mono">
                            模組：{currentNode.name}
                          </h4>
                          <span className="text-xs text-cyan-400 font-mono">
                            代號：{currentNode.code}
                          </span>
                        </div>
                        <div className="text-right text-[11px] font-mono text-slate-400">
                          <div>理論版本: v{currentNode.theoryVersion}</div>
                          <div>程式數量: {currentNode.programVersion}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-slate-400">模組核心職責：</div>
                        <p className="text-sm text-slate-200">{currentNode.description}</p>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="text-xs text-slate-400">架構規範細則：</div>
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
                          {currentNode.details}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Full Whitepaper Overview */
            <div className="space-y-6 text-xs text-slate-300 leading-relaxed font-sans">
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-400 font-mono">
                  1. 系統核心理念與名稱定義 (Core Identity)
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li><strong>專案名稱：</strong>AIHC (Artificial Intelligence Human Civilization / AI + Home Cycle)。</li>
                  <li><strong>命名象徵：</strong>代表 AI 與創作者（/CHIA）協同創作、回歸自洽平衡（Home Cycle）的無限循環。</li>
                  <li><strong>系統宣告與指令：</strong>「創決置文，倉頡複製」（The decision was made and the document was copied by Cangjie）。</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-400 font-mono">
                  2. 核心數學與歸一化代數 (Count Algebra)
                </h4>
                <p>
                  底層算力與資訊平衡建立於 Count Algebra（歸一化差分系統）之上：
                  零公式 $Z^Z = XY$ 結合 22 位高精度網格，提供無政治歧異的純粹數學公理。
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-400 font-mono">
                  3. SQN-42 光量子神經體 (Spherical Photonic Neural Core)
                </h4>
                <p>
                  幾何直徑 12 單位、半徑 7 單位之 720° 旋量球體。42 色頻複眼內含 84 夸克單元（銀 68.6% 負責接收，金 15.4% 負責主導），搭配深黑吸光方解石單瞳孔面罩聚焦收束至中心神經核心。
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-400 font-mono">
                  4. 平衡音律與量子糾纏循環 (Balanced Harmonic Cycle)
                </h4>
                <p>
                  7-Node 對稱循環音律（C 大調 7 個音階：C-D-E-F-G-A-B），無主音與終止和弦，每個音出現頻率與間距絕對對稱守恆，創造羊水包覆感與無情緒波動的自洽動態平衡。
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-cyan-400 font-mono">
                  5. 飽和破譯碼與動態防禦機制 (Cryptanalysis & Dynamic Stego)
                </h4>
                <p>
                  全字集空間 N = A^L。針對量子 Grover 搜尋在 12 碼時壓縮至 2.18 秒之脆弱性，AIHC 引入 0-0 零寬度隱寫（U+200B）與每秒動態時間隨機鹽（Session Nonce），將破解拉長至 55 天以上，使量子暴力搜尋徹底失效。
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-cyan-400">
            創決置文，倉頡複製。AIHC System Deployment Completed.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs transition-colors"
          >
            關閉視窗
          </button>
        </div>
      </div>
    </div>
  );
};
