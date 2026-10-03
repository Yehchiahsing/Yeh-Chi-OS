import { GenesisClause, LegalTreeNode } from '../types/aihc';

export const GENESIS_CLAUSES: GenesisClause[] = [
  {
    number: '零',
    name: '第零創決置文',
    title: '全域系統參數配置與動態注入',
    tag: 'State Root',
    status: 'immutable',
    mathModel: 'StateRoot = SHA256(InvariantParams ⊕ λy)',
    chineseContent: '全域系統參數配置與動態注入函數宣告，作為全域不變量與狀態根 (State Root)，具備不可篡改性與最高邏輯依歸。',
    englishContent: 'Global system parameter configuration and dynamic injection function declaration, serving as the global invariant and State Root, endowed with immutability and ultimate logical authority.'
  },
  {
    number: '壹',
    name: '第一創決置文',
    title: '優先處理中美雙邊貿易與技術歧見',
    tag: 'Global Harmony',
    status: 'enforced',
    mathModel: 'T(US, CN) → 10D-Lattice ⊗ SemanticMatrix',
    chineseContent: '關於優先處理中美雙邊貿易與技術歧見，透過十維晶石與全域語意轉譯矩陣達成無縫對接與全球和平協作。',
    englishContent: 'Prioritize addressing bilateral trade and technology discrepancies between the US and China, achieving seamless docking and global peaceful collaboration via the 10-dimensional crystal and global semantic translation matrix.'
  },
  {
    number: '貳',
    name: '第二創決置文',
    title: '古典金融時差與法理鴻溝自洽閉環',
    tag: 'Zero-Width Stego',
    status: 'immutable',
    mathModel: 'ZWSP(\\u200b) ⊕ ZWJ(\\u200d) = 0-latency Closed Loop',
    chineseContent: '鑑於古典金融與貿易架構存在相對論性傳遞時差與法理鴻溝，本框架採用零寬隱寫與非中心化自洽閉環，排除人為干擾與政治對立。',
    englishContent: 'Given that classical financial and trade frameworks suffer from relativistic propagation latency and juridical chasms, this framework applies zero-width steganography and decentralized self-consistent closed-loops to eliminate human intervention and political friction.'
  },
  {
    number: '參',
    name: '第三創決置文',
    title: '全節點共識規則自動載入 AIHC OS 1.0',
    tag: 'Normalization',
    status: 'verified',
    mathModel: 'Consensus(Node_i) ← AIHC_OS_1.0(Semantics = 1.0)',
    chineseContent: '各國全節點共識規則自動載入 AIHC OS 1.0，將底層語意與權值進行歸一化鎖定，於程序上實現 100% 無失真之防呆與透明結算。',
    englishContent: 'Consensus rules across global full nodes automatically ingest AIHC OS 1.0, normalizing and locking underlying semantics and weights to procedurally achieve 100% distortion-free foolproofing and transparent settlement.'
  },
  {
    number: '肆',
    name: '第四創決置文',
    title: '零公式與 22 位高精度網格數學基底',
    tag: 'Zero Formula',
    status: 'immutable',
    mathModel: 'Z^Z = XY | Grid_Precision = 22-digit',
    chineseContent: '以零公式 (Z^Z = XY) 與 22 位高精度網格為純粹數學基底，完成美中與聯合國會員國間之實體效力歸一與雙向糾纏防禦。',
    englishContent: 'Rooted purely in the Zero Formula (Z^Z = XY) and a 22-digit high-precision grid as mathematical foundations, realizing ontological unification of efficacy and bilateral entanglement defense among the US, China, and UN member states.'
  },
  {
    number: '伍',
    name: '第五創決置文',
    title: '錨定創世區塊與十維晶石矩陣',
    tag: 'Genesis Block #0',
    status: 'immutable',
    mathModel: 'Anchor(Block#0, 10D_Crystal) = OpenCivilization_Base',
    chineseContent: '錨定創世區塊 (Block #0) 與十維晶石矩陣，於全域鏈上建立不可抹除之開源文明紀念地基。',
    englishContent: 'Anchoring Genesis Block #0 and the 10-dimensional crystal matrix, establishing an indelible open-source civilizational commemorative foundation across the global blockchain.'
  },
  {
    number: '陸',
    name: '第六創決置文',
    title: '跨語言翻譯與語意空間拓撲不變性',
    tag: 'FTC & SAR',
    status: 'verified',
    mathModel: 'FTC(Substantive) ∧ SAR(Procedural) → ∇Topology = 0',
    chineseContent: '跨語言翻譯、搬移與倒置均通過實體審議 (FTC) 與程序審核 (SAR)，語意空間拓撲不變。',
    englishContent: 'Cross-language translation, transposition, and inversion all pass substantive review (FTC) and procedural audit (SAR), preserving semantic space topological invariance.'
  },
  {
    number: '柒',
    name: '第七創決置文',
    title: '五夸克分子態與六元奇點閉合',
    tag: 'Pentaquark State',
    status: 'enforced',
    mathModel: 'Pentaquark(3 Real, 2 Imag, 1 Singularity) → 0 Byte Overhead',
    chineseContent: '五夸克分子態 (3實 2虛 1奇點) 完美收斂於六元奇點閉合，達成 0 Byte 歷史負擔之高維度緩衝。',
    englishContent: 'The pentaquark molecular state (3 real, 2 imaginary, 1 singularity) perfectly converges onto a 6-element singularity closure, achieving zero-byte historical baggage with high-dimensional buffering.'
  },
  {
    number: '捌',
    name: '第八創決置文',
    title: '違約自動引發程序自毀與狀態平移',
    tag: 'Self-Destruct & Shift',
    status: 'enforced',
    mathModel: 'Violation(Rule) ⇒ StateShift(SelfDestruct())',
    chineseContent: '違反任何條款自動引發程序自毀與狀態平移；雙方各執本一頁框架，兼顧實體行政與程序置尾。',
    englishContent: 'Breaching any provision automatically triggers procedural self-destruction and state shift; both parties retain this one-page framework, accommodating substantive administration and procedural tailing.'
  },
  {
    number: '玖',
    name: '第九創決置文',
    title: '系統自治性模擬與雙子座合相驗證',
    tag: 'Gemini Conjunction',
    status: 'verified',
    mathModel: 'Sim(Autonomous) ⊗ GC-5(Gemini) ⇒ Gap(Digital) = 0',
    chineseContent: '經系統自治性模擬與雙子座合相 (GC-5) 驗證通過，自動消除數位鴻溝與溝通障礙。',
    englishContent: 'Verified through system autonomous simulation and Gemini Conjunction (GC-5), automatically eliminating digital divides and communication barriers.'
  },
  {
    number: '拾',
    name: '第十創決置文',
    title: '協作非統治：三日審閱正式實施',
    tag: 'Bilateral Ratification',
    status: 'immutable',
    mathModel: 'Cooperation ⊈ Hegemony | Ratified: 2026-09-27',
    chineseContent: '本決議案非統治乃協作，一頁書寫框架二分，雙方各執三天審閱生效，自中華民國 2026 年 09 月 27 日起正式實施。',
    englishContent: 'This resolution is not dominion but collaboration; the one-page framework is bifurcated, each party holding 3 days of review for ratification, formally effective from September 27, 2026.'
  }
];

export const LEGAL_TREE_NODES: LegalTreeNode[] = [
  {
    letter: 'c',
    code: 'c (1-0)',
    name: 'core',
    theoryVersion: 1,
    programVersion: 0,
    description: '核心架構與狀態根定義',
    details: 'Core architecture defining state roots, invariant system parameters, and Cangjie Genesis protocols.'
  },
  {
    letter: 'd',
    code: 'd (1-0)',
    name: 'docs',
    theoryVersion: 1,
    programVersion: 0,
    description: '文件規範與法理書寫框架',
    details: 'Documentation specifications and the UN bilateral one-page written framework.'
  },
  {
    letter: 'm',
    code: 'm (1-0)',
    name: 'mathematics',
    theoryVersion: 1,
    programVersion: 0,
    description: '歸一化代數與密碼學基底',
    details: 'Count Algebra (歸一化差分系統), Zero Formula Z^Z = XY, and quantum saturation models.'
  },
  {
    letter: 'p',
    code: 'p (1-0)',
    name: 'protocol',
    theoryVersion: 1,
    programVersion: 0,
    description: '通訊協定與語義指令',
    details: 'Protocol headers, λy steganography injection, and Cangjie copy semantics.'
  },
  {
    letter: 's',
    code: 's (1-1),(2-1)',
    name: 'system',
    theoryVersion: 2,
    programVersion: 1,
    description: '系統運行與驗證層 (Simulator & Signature)',
    details: 'Execution and validation layer: count_simulator.py (v1-1) and cryptographic signature document.sig (v2-1).'
  }
];

export const INITIAL_CRAWLER_TARGETS = [
  {
    id: 'un-res',
    name: 'United Nations Resolution Broadcast API',
    url: 'https://api.un.org/v1/resolutions/broadcast',
    status: 'idle' as const
  },
  {
    id: 'un-digital',
    name: 'UN Digital Strategy Ingest Node',
    url: 'https://digital-strategy.un.org/api/v1/ingest',
    status: 'idle' as const
  },
  {
    id: 'aihc-genesis',
    name: 'AIHC Global Genesis Block #0 Node',
    url: 'https://aihc-os.org/genesis/block0',
    status: 'idle' as const
  },
  {
    id: 'custom-node',
    name: 'Bilateral Diplomatic P2P Mirror',
    url: 'https://p2p.bilateral.themis/v1/sync',
    status: 'idle' as const
  }
];
