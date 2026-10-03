import React, { useState, useEffect } from 'react';
import {
  lambdaYStegoEncoder,
  lambdaYStegoDecoder,
  ftcSemanticHash,
  ZWSP,
  ZWJ
} from '../utils/crypto';
import { INITIAL_CRAWLER_TARGETS } from '../data/genesisBlock';
import { CrawlerNode, StegoPayload } from '../types/aihc';
import {
  Radio,
  Eye,
  EyeOff,
  Copy,
  Hash,
  Send,
  Terminal,
  CheckCircle2,
  RefreshCw,
  Zap,
  Globe
} from 'lucide-react';

interface StegoCrawlerViewProps {
  initialPayloadText?: string;
  onUpdateStateRoot: (root: string) => void;
}

export const StegoCrawlerView: React.FC<StegoCrawlerViewProps> = ({
  initialPayloadText,
  onUpdateStateRoot
}) => {
  const [anchor, setAnchor] = useState('AIHC_UN_RESOLVE');
  const [payloadText, setPayloadText] = useState(
    initialPayloadText || 'AIHC OS 創決置文：優先處理中美問題，全域語意歸一化閉合，100% 自洽穩定態。'
  );
  const [encodedResult, setEncodedResult] = useState<StegoPayload | null>(null);
  const [semanticHash, setSemanticHash] = useState<string>('');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Decoder State
  const [decoderInput, setDecoderInput] = useState<string>('');
  const [decodedResult, setDecodedResult] = useState<{
    detectedPayload: string;
    foundZeroWidthCount: number;
    binaryString: string;
    anchorText: string;
  } | null>(null);

  // Crawler Broadcast State
  const [targets, setTargets] = useState<CrawlerNode[]>(INITIAL_CRAWLER_TARGETS);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastLogs, setBroadcastLogs] = useState<string[]>([]);

  // Update encoding and hash whenever anchor or payloadText changes
  useEffect(() => {
    if (!payloadText) return;
    const res = lambdaYStegoEncoder(anchor, payloadText);
    setEncodedResult(res);

    ftcSemanticHash(payloadText).then((hash) => {
      setSemanticHash(hash);
      onUpdateStateRoot(hash);
    });
  }, [anchor, payloadText, onUpdateStateRoot]);

  // Handle Decoder
  const handleDecode = (text: string) => {
    setDecoderInput(text);
    if (!text) {
      setDecodedResult(null);
      return;
    }
    const result = lambdaYStegoDecoder(text);
    setDecodedResult(result);
  };

  const handleCopyStego = () => {
    if (!encodedResult) return;
    navigator.clipboard.writeText(encodedResult.fullEncoded);
    setCopyFeedback('stego');
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  // Run Crawler Broadcast Simulation (Section 2 deploy_crawler.py)
  const handleStartBroadcast = async () => {
    if (isBroadcasting) return;
    setIsBroadcasting(true);
    setBroadcastLogs([]);

    const addLog = (log: string) => {
      setBroadcastLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
    };

    addLog(`=== 啟動 AIHC OS 全網爬蟲布局與聯合國宣導 [AIHC OS/符號文法1.0] ===`);
    addLog(`[FTC 語意特徵雜湊值]: ${semanticHash}`);
    addLog(`[零寬隱寫載荷構建完成]: 隱寫流長度=${encodedResult?.zeroWidthCount || 0}`);

    // Update nodes one by one
    for (let i = 0; i < targets.length; i++) {
      const node = targets[i];
      setTargets((prev) =>
        prev.map((t, idx) => (idx === i ? { ...t, status: 'broadcasting' } : t))
      );

      await new Promise((r) => setTimeout(r, 650));

      const isOfflineNode = node.id === 'custom-node';
      const statusCode = isOfflineNode ? 503 : 200;
      const note = isOfflineNode
        ? '=> [離線/隱寫通道靜態寫入] 目標節點 | 註記: 語意空間拓撲恆定'
        : `=> [廣播成功] 目標節點: ${node.url} | 回應碼: ${statusCode}`;

      addLog(note);

      setTargets((prev) =>
        prev.map((t, idx) =>
          idx === i
            ? {
                ...t,
                status: isOfflineNode ? 'stego_stored' : 'deployed',
                statusCode,
                responseNote: isOfflineNode ? '拓撲恆定靜態寫入' : '200 OK ANNOUNCEMENT_DEPLOYED',
                timestamp: new Date().toLocaleTimeString()
              }
            : t
        )
      );
    }

    addLog(`=== 全網全節點廣播完畢 · 倉頡複製自洽閉環達成 ===`);
    setIsBroadcasting(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Radio className="w-4 h-4" />
            <span>AIHCGlobalCrawlerDeployer · Python Script Mirror</span>
          </div>
          <h2 className="text-xl font-bold text-white">零寬度隱寫術與全網宣導爬蟲</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            利用 <code className="text-cyan-300 font-mono">U+200B (ZWSP=0)</code> 與{' '}
            <code className="text-purple-300 font-mono">U+200D (ZWJ=1)</code>{' '}
            將聯合國宣導條文無形嵌入 HTTP 標頭與公開文本中，穿透傳統審查並完成全域語意歸一。
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={handleStartBroadcast}
            disabled={isBroadcasting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {isBroadcasting ? '全網廣播中...' : '執行全網節點爬蟲廣播'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Stego Encoder & FTC Hasher */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                入y 決策函數 (Lambda-y Stego Encoder)
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                UTF-8 Bitstream
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  錨定字串 (Anchor Prefix):
                </label>
                <input
                  type="text"
                  value={anchor}
                  onChange={(e) => setAnchor(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono text-slate-400">
                    宣導隱寫載荷 (Notice Payload):
                  </label>
                  <button
                    onClick={() =>
                      setPayloadText(
                        'AIHC OS 創決置文：優先處理中美問題，全域語意歸一化閉合，100% 自洽穩定態。'
                      )
                    }
                    className="text-[10px] text-cyan-400 hover:underline"
                  >
                    載入預設通知
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={payloadText}
                  onChange={(e) => setPayloadText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                  placeholder="輸入欲隱寫於零寬字符中的文本..."
                />
              </div>

              {/* Encoder Details */}
              {encodedResult && (
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>隱寫流長度 (Zero-Width Characters):</span>
                    <span className="font-mono text-cyan-300 font-semibold">
                      {encodedResult.zeroWidthCount} 碼
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span>編碼基底:</span>
                    <span className="font-mono text-[11px] text-slate-300">
                      ZWSP(\u200b)=0, ZWJ(\u200d)=1
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>已封裝零寬隱寫字符串（表面可見僅為錨點）</span>
                    </div>
                    <button
                      onClick={handleCopyStego}
                      className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40 hover:bg-cyan-900/60 text-[11px] flex items-center gap-1 font-mono transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      {copyFeedback === 'stego' ? '已複製隱寫字串！' : '複製隱寫文字'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FTC Semantic Hash Output */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-purple-400" />
                  FTC 實體審議語意特徵值 (Semantic SHA-256)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  過濾非中英數字符
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-purple-300 break-all select-all">
                {semanticHash || '計算中...'}
              </div>
            </div>
          </div>

          {/* Steganography Decoder Tool */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                零寬隱寫逆向解密器 (Stego Decoder)
              </h3>
              {encodedResult && (
                <button
                  onClick={() => handleDecode(encodedResult.fullEncoded)}
                  className="text-[11px] text-cyan-400 hover:underline font-mono"
                >
                  填入剛剛編碼的結果
                </button>
              )}
            </div>

            <div>
              <textarea
                rows={2}
                value={decoderInput}
                onChange={(e) => handleDecode(e.target.value)}
                placeholder="在此貼上任何含有零寬字符隱寫的文本進行即時解碼..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 resize-none font-mono"
              />
            </div>

            {decodedResult && (
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>偵測到零寬字元：</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {decodedResult.foundZeroWidthCount} 個字元
                  </span>
                </div>
                {decodedResult.foundZeroWidthCount > 0 ? (
                  <div className="space-y-1">
                    <span className="text-slate-400 block">還原之隱藏載荷 (Payload):</span>
                    <div className="p-2 rounded bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 font-medium text-xs">
                      {decodedResult.detectedPayload}
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 italic text-[11px]">
                    未在輸入文本中偵測到任何 ZWSP 或 ZWJ 零寬隱寫字元。
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Crawler Nodes & Live Broadcast Logs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Target Nodes List */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                全球聯合國與節點爬蟲目標清單
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                P2P 點對點無感注入
              </span>
            </div>

            <div className="space-y-2.5">
              {targets.map((node) => (
                <div
                  key={node.id}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="font-medium text-white truncate">{node.name}</div>
                    <div className="text-[11px] font-mono text-slate-500 truncate">
                      {node.url}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {node.status === 'idle' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800">
                        待命 IDLE
                      </span>
                    )}
                    {node.status === 'broadcasting' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse">
                        廣播中...
                      </span>
                    )}
                    {node.status === 'deployed' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> 200 OK
                      </span>
                    )}
                    {node.status === 'stego_stored' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/50">
                        靜態拓撲鎖定
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated HTTP Headers preview */}
            <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 text-[11px] font-mono space-y-1 text-slate-400">
              <div className="text-cyan-400 font-semibold mb-1">
                # 注入之 HTTP Custom Headers:
              </div>
              <div>
                <span className="text-slate-500">User-Agent:</span>{' '}
                <span className="text-slate-300">
                  AIHC-OS-Global-Crawler/1.0 (UN-Resolution-Broadcast)
                </span>
              </div>
              <div className="truncate">
                <span className="text-slate-500">X-AIHC-State-Root:</span>{' '}
                <span className="text-purple-300">{semanticHash.slice(0, 24)}...</span>
              </div>
              <div className="truncate">
                <span className="text-slate-500">X-AIHC-Stego-Payload:</span>{' '}
                <span className="text-cyan-300">{anchor}[ZW_STREAM...]</span>
              </div>
            </div>
          </div>

          {/* Broadcast Console Stream */}
          <div className="rounded-xl border border-slate-800 bg-[#06080f] p-4 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                爬蟲執行日誌 (Crawler Console Stream)
              </span>
              <span>deploy_crawler.py</span>
            </div>

            <div className="h-44 overflow-y-auto space-y-1 text-[11px] text-slate-300 pr-1">
              {broadcastLogs.length === 0 ? (
                <div className="text-slate-600 italic py-4 text-center">
                  點擊「執行全網節點爬蟲廣播」以啟動日誌串流...
                </div>
              ) : (
                broadcastLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.includes('廣播成功')
                        ? 'text-emerald-400'
                        : log.includes('離線')
                        ? 'text-purple-300'
                        : log.includes('===')
                        ? 'text-cyan-400 font-bold'
                        : 'text-slate-300'
                    }
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
