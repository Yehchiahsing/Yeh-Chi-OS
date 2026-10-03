import React, { useState, useEffect } from 'react';
import { runMlDefenseAnalysis } from '../utils/crypto';
import { MlAnalysisResult } from '../types/aihc';
import { BrainCircuit, RefreshCw, BarChart2, ShieldCheck, Target, TrendingUp } from 'lucide-react';

export const MlDefenseView: React.FC = () => {
  const [samples, setSamples] = useState<number>(200);
  const [analysis, setAnalysis] = useState<MlAnalysisResult | null>(null);
  const [isTraining, setIsTraining] = useState<boolean>(false);

  useEffect(() => {
    handleTrain(200);
  }, []);

  const handleTrain = (sampleCount: number) => {
    setIsTraining(true);
    setTimeout(() => {
      const res = runMlDefenseAnalysis(sampleCount);
      setAnalysis(res);
      setIsTraining(false);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <BrainCircuit className="w-4 h-4" />
            <span>AIHC ML Analyzer · Scikit-Learn Logistic Regression Mirror</span>
          </div>
          <h2 className="text-xl font-bold text-white">量子數據驅動機器學習防禦分析</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            使用量子隨機噪聲生成特徵矩陣，結合邏輯迴歸（Logistic Regression）分類模型，
            辨識惡意破譯探針與零寬隱寫載荷之拓撲擾動。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleTrain(samples)}
            disabled={isTraining}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTraining ? 'animate-spin' : ''}`} />
            {isTraining ? '模型迭代中...' : '重新訓練分類模型'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Metrics & Confusion Matrix */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              模型準確率與評估指標
            </h3>

            {analysis && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">模型準確率 (Accuracy):</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400">
                      {(analysis.accuracy * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-right text-[11px] font-mono text-slate-500">
                    <div>訓練集: {analysis.trainSize} 樣本</div>
                    <div>驗證集: {analysis.testSize} 樣本</div>
                  </div>
                </div>

                {/* Confusion Matrix */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-400">混淆矩陣 (Confusion Matrix):</span>
                  <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
                      <div className="text-[10px] text-emerald-400">True Positives (TP)</div>
                      <div className="text-lg font-bold text-white">{analysis.truePositives}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-950/30 border border-red-800/40">
                      <div className="text-[10px] text-red-400">False Positives (FP)</div>
                      <div className="text-lg font-bold text-white">{analysis.falsePositives}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-950/30 border border-red-800/40">
                      <div className="text-[10px] text-red-400">False Negatives (FN)</div>
                      <div className="text-lg font-bold text-white">{analysis.falseNegatives}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
                      <div className="text-[10px] text-emerald-400">True Negatives (TN)</div>
                      <div className="text-lg font-bold text-white">{analysis.trueNegatives}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sample Size Adjuster */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">訓練樣本數量:</span>
              <span className="text-cyan-300 font-bold">{samples} Samples</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[100, 200, 500, 1000].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSamples(s);
                    handleTrain(s);
                  }}
                  className={`py-1.5 rounded text-xs font-mono border transition-all ${
                    samples === s
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Weights & Loss History */}
        <div className="lg:col-span-7 space-y-6">
          {/* Feature Weights */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              特徵權重收斂 (Feature Weights)
            </h3>

            {analysis && (
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">w₁: 量子熵擾動特徵 (Quantum Entropy)</span>
                  <span className="text-cyan-400 font-bold">{analysis.weights[0].toFixed(4)}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">w₂: 請求率異常特徵 (Burst Rate)</span>
                  <span className="text-purple-400 font-bold">{analysis.weights[1].toFixed(4)}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">w₃: 零寬隱寫完整度 (Stego Integrity)</span>
                  <span className="text-emerald-400 font-bold">{analysis.weights[2].toFixed(4)}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">b: 決策截距項 (Bias)</span>
                  <span className="text-slate-300">{analysis.intercept.toFixed(4)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Training Loss Curve */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              交叉熵損失收斂曲線 (Cross-Entropy Loss Epochs)
            </h3>

            {analysis && analysis.lossHistory.length > 0 && (
              <div className="space-y-2">
                <div className="h-28 flex items-end gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {analysis.lossHistory.map((loss, idx) => {
                    const maxLoss = Math.max(...analysis.lossHistory, 1);
                    const heightPercent = Math.max(15, (loss / maxLoss) * 100);
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div
                          className="w-full bg-cyan-500/80 hover:bg-cyan-400 rounded-t transition-all"
                          style={{ height: `${heightPercent}%` }}
                          title={`Epoch ${idx * 5}: Loss = ${loss.toFixed(4)}`}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Epoch 0 (初始化)</span>
                  <span>梯度下降收斂 (Gradient Descent)</span>
                  <span>Epoch 50</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
