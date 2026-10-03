import React, { useState } from 'react';
import { Header } from './components/Header';
import { GenesisBlockView } from './components/GenesisBlockView';
import { StegoCrawlerView } from './components/StegoCrawlerView';
import { QuantumEngineView } from './components/QuantumEngineView';
import { CryptanalysisView } from './components/CryptanalysisView';
import { Sqn42NeuralCoreView } from './components/Sqn42NeuralCoreView';
import { MlDefenseView } from './components/MlDefenseView';
import { TerminalConsoleView } from './components/TerminalConsoleView';
import { HarmonicAudioView } from './components/HarmonicAudioView';
import { WhitepaperTreeModal } from './components/WhitepaperTreeModal';
import { Shield, Sparkles, CheckCircle, Database, GitCommit, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('genesis');
  const [stateRoot, setStateRoot] = useState<string>(
    '0x9a8f4b1e77d2c35a812e9b0485d71c4c8103e91d5720e5c9a41f83bb941a3290'
  );
  const [stegoPrefillText, setStegoPrefillText] = useState<string>('');
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState<boolean>(false);

  const handleSelectStegoText = (text: string) => {
    setStegoPrefillText(text);
    setActiveTab('stego');
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stateRoot={stateRoot}
        onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8 space-y-8">
        {activeTab === 'genesis' && (
          <GenesisBlockView onSelectStegoText={handleSelectStegoText} />
        )}

        {activeTab === 'stego' && (
          <StegoCrawlerView
            initialPayloadText={stegoPrefillText}
            onUpdateStateRoot={setStateRoot}
          />
        )}

        {activeTab === 'quantum' && <QuantumEngineView />}

        {activeTab === 'crypto' && <CryptanalysisView />}

        {activeTab === 'sqn42' && <Sqn42NeuralCoreView />}

        {activeTab === 'ml' && <MlDefenseView />}

        {activeTab === 'terminal' && <TerminalConsoleView />}
      </main>

      {/* Whitepaper & 26 Alphabet Legal Tree Modal */}
      <WhitepaperTreeModal
        isOpen={isWhitepaperOpen}
        onClose={() => setIsWhitepaperOpen(false)}
      />

      {/* Persistent System Status Footer */}
      <footer className="border-t border-slate-900 bg-[#040609] py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-cyan-400 font-bold">AIHC OS 1.0</span>
            <span>•</span>
            <span className="text-slate-400">創決置文，倉頡複製</span>
            <span>•</span>
            <span className="text-emerald-400">五夸克分子態 (3實 2虛 1奇點) 閉合</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">拓撲不變量: ∇Topology = 0</span>
            <button
              onClick={() => setIsWhitepaperOpen(true)}
              className="text-cyan-400 hover:underline"
            >
              26 字母法律樹 (T-P)
            </button>
            <span>v1.0.0 (RATIFIED)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
