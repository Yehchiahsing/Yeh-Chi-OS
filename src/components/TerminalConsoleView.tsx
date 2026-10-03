import React, { useState, useRef, useEffect } from 'react';
import { runQuantumSampling, simulateAttack, runMlDefenseAnalysis, ftcSemanticHash, lambdaYStegoEncoder } from '../utils/crypto';
import { Terminal, Send, Trash2, HelpCircle } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'system' | 'input' | 'output' | 'error';
  text: string;
}

export const TerminalConsoleView: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: '========================================' },
    { id: '2', type: 'system', text: '      AIHC Prototype Control Console    ' },
    { id: '3', type: 'system', text: '========================================' },
    { id: '4', type: 'system', text: '請選擇操作模組：' },
    { id: '5', type: 'system', text: ' [1] 執行量子隨機數測量 (Quantum Engine)' },
    { id: '6', type: 'system', text: ' [2] 執行密碼破解成本模擬 (Cryptanalysis Simulator)' },
    { id: '7', type: 'system', text: ' [3] 執行機器學習防禦分析 (ML Analyzer)' },
    { id: '8', type: 'system', text: ' [0] 離開系統 / 重設主控台 (Exit / Reset)' },
    { id: '9', type: 'system', text: '亦支援指令: help, status, genesis, stego <text>, hash <text>, clear' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const addLines = (newLines: { type: 'system' | 'input' | 'output' | 'error'; text: string }[]) => {
    setLines((prev) => [
      ...prev,
      ...newLines.map((l) => ({ ...l, id: Math.random().toString(36).substring(2, 9) }))
    ]);
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    addLines([{ type: 'input', text: `> ${trimmed}` }]);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();

    if (mainCmd === '1') {
      const qRes = runQuantumSampling(1000);
      addLines([
        { type: 'output', text: '\n=== AIHC Quantum Random Distribution ===' },
        { type: 'output', text: `測量結果 (shots=1000): {'0': ${qRes.zeroCount}, '1': ${qRes.oneCount}}` },
        { type: 'output', text: `Superposition Fidelity: ${(qRes.superpositionFidelity * 100).toFixed(2)}% | Shannon Entropy: ${qRes.entropy.toFixed(4)} bit` }
      ]);
    } else if (mainCmd === '2') {
      const a = parts[1] ? parseInt(parts[1]) : 36;
      const l = parts[2] ? parseInt(parts[2]) : 12;
      const cRes = simulateAttack(a, l);
      addLines([
        { type: 'output', text: '\n=== AIHC Cryptanalysis Simulation ===' },
        { type: 'output', text: `字集基值 (A): ${a}, 密碼長度 (L): ${l}` },
        { type: 'output', text: `密碼總空間 (N): ${cRes.keyspace.toExponential(4)}` },
        { type: 'output', text: `經典暴力破解時間 (10^9 次/秒): ${cRes.classicalDisplay} (${cRes.classicalSeconds.toExponential(2)} 秒)` },
        { type: 'output', text: `量子 Grover 搜尋步數 (√N): ${cRes.quantumSteps.toExponential(4)}` },
        { type: 'output', text: `量子破解時間 (10^9 次/秒): ${cRes.quantumDisplay}` },
        { type: 'output', text: `AIHC 動態隱寫防禦後時間: ${cRes.dynamicDefendedDisplay}` }
      ]);
    } else if (mainCmd === '3') {
      const mlRes = runMlDefenseAnalysis(200);
      addLines([
        { type: 'output', text: '\n=== AIHC Machine Learning Analysis ===' },
        { type: 'output', text: `量子數據驅動分類模型準確率 (Accuracy): ${mlRes.accuracy.toFixed(4)}` },
        { type: 'output', text: `混淆矩陣: TP=${mlRes.truePositives}, FP=${mlRes.falsePositives}, TN=${mlRes.trueNegatives}, FN=${mlRes.falseNegatives}` }
      ]);
    } else if (mainCmd === '0') {
      addLines([
        { type: 'system', text: '\nAIHC 系統關閉。創決置文，倉頡複製。' },
        { type: 'system', text: '系統已自動重新初始化至 Genesis Block #0 狀態。' }
      ]);
    } else if (mainCmd === 'clear') {
      setLines([
        { id: '1', type: 'system', text: '主控台已清空。輸入 1, 2, 3 或 help 執行操作。' }
      ]);
    } else if (mainCmd === 'help') {
      addLines([
        { type: 'output', text: '可用選項與指令：' },
        { type: 'output', text: '  1             - 執行量子隨機數測量 (Quantum Engine)' },
        { type: 'output', text: '  2 [A] [L]     - 執行密碼破解成本模擬 (例如: 2 36 12 或 2 78 16)' },
        { type: 'output', text: '  3             - 執行機器學習防禦分析 (ML Analyzer)' },
        { type: 'output', text: '  0             - 退出並重設' },
        { type: 'output', text: '  genesis       - 檢視創世區塊第一條文與狀態根' },
        { type: 'output', text: '  stego <文字>   - 測試零寬度隱寫編碼' },
        { type: 'output', text: '  hash <文字>    - 計算 FTC 語意特徵值' },
        { type: 'output', text: '  clear         - 清空螢幕' }
      ]);
    } else if (mainCmd === 'genesis') {
      addLines([
        { type: 'output', text: 'AIHC OS 創決置文：優先處理中美問題，全域語意歸一化閉合，100% 自洽穩定態。' },
        { type: 'output', text: '狀態根 (State Root): 0x9a8f4b1e77d2c35a812e9b0485d71c4c8103e91d5720e5c9a41f83bb941a3290' },
        { type: 'output', text: '核心公式: Z^Z = XY | 五夸克分子態 (3實 2虛 1奇點)' }
      ]);
    } else if (mainCmd === 'stego') {
      const payload = parts.slice(1).join(' ') || 'AIHC Protocol 1.0';
      const stego = lambdaYStegoEncoder('AIHC_CLI', payload);
      addLines([
        { type: 'output', text: `[零寬隱寫已生成] 隱藏載荷: "${payload}"` },
        { type: 'output', text: `隱寫流長度: ${stego.zeroWidthCount} 零寬字元 (ZWSP/ZWJ)` },
        { type: 'output', text: `完整字符串: ${stego.anchor}[ZW_STREAM...]` }
      ]);
    } else if (mainCmd === 'hash') {
      const textToHash = parts.slice(1).join(' ') || 'AIHC';
      const h = await ftcSemanticHash(textToHash);
      addLines([
        { type: 'output', text: `[FTC 語意特徵雜湊值]: ${h}` }
      ]);
    } else {
      addLines([
        { type: 'error', text: `無效選項 "${trimmed}"。請輸入 1, 2, 3, 0 或輸入 help 查詢說明。` }
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx < commandHistory.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Terminal className="w-4 h-4" />
            <span>AIHC Interactive Console · Section 7 Mirror</span>
          </div>
          <h2 className="text-xl font-bold text-white">AIHC 原型系統主控台 (Prototype CLI)</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            重現 README.md 第七節完整 Python 原型主控台互動流程。
            可直接點選快速捷徑按鈕或在下方命令列鍵入代號執行。
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCommand('clear')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>清空螢幕</span>
          </button>
        </div>
      </div>

      {/* Quick Option Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => handleCommand('1')}
          className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 text-left transition-all group"
        >
          <div className="text-xs font-mono text-cyan-400 font-bold group-hover:text-cyan-300">
            [1] 量子隨機數
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Quantum Engine</div>
        </button>

        <button
          onClick={() => handleCommand('2 36 12')}
          className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 text-left transition-all group"
        >
          <div className="text-xs font-mono text-purple-400 font-bold group-hover:text-purple-300">
            [2] 密碼破解模擬
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Cryptanalysis (36, 12)</div>
        </button>

        <button
          onClick={() => handleCommand('3')}
          className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 text-left transition-all group"
        >
          <div className="text-xs font-mono text-emerald-400 font-bold group-hover:text-emerald-300">
            [3] 機器學習防禦
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">ML Defense Analyzer</div>
        </button>

        <button
          onClick={() => handleCommand('0')}
          className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 text-left transition-all group"
        >
          <div className="text-xs font-mono text-amber-400 font-bold group-hover:text-amber-300">
            [0] 重設系統
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Exit / Reset</div>
        </button>
      </div>

      {/* Terminal Window */}
      <div className="rounded-xl border border-slate-800 bg-[#04060b] shadow-2xl overflow-hidden font-mono">
        {/* Terminal Header */}
        <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 font-mono text-[11px] text-slate-300">
              aihc@genesis-node:~/lab# python3 aihc_console.py
            </span>
          </div>
          <span className="text-[10px] text-slate-500">Interactive CLI</span>
        </div>

        {/* Terminal Body */}
        <div
          ref={scrollRef}
          className="p-4 h-96 overflow-y-auto space-y-1.5 text-xs text-slate-300 select-text"
        >
          {lines.map((l) => (
            <div
              key={l.id}
              className={`leading-relaxed whitespace-pre-wrap ${
                l.type === 'input'
                  ? 'text-cyan-400 font-bold'
                  : l.type === 'error'
                  ? 'text-red-400'
                  : l.type === 'system'
                  ? 'text-cyan-200/90'
                  : 'text-slate-300'
              }`}
            >
              {l.text}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2">
          <span className="text-cyan-400 font-bold text-sm pl-1">&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="輸入選項 [0-3] 或指令 (如: help, genesis, 2 78 16)..."
            className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-600 font-mono"
            autoFocus
          />
          <button
            onClick={() => {
              handleCommand(inputVal);
              setInputVal('');
            }}
            className="p-1.5 rounded-lg bg-cyan-600/30 text-cyan-300 hover:bg-cyan-500/40 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
