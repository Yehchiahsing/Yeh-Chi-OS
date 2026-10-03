export interface GenesisClause {
  number: string;
  name: string;
  title: string;
  tag: string;
  chineseContent: string;
  englishContent: string;
  mathModel?: string;
  status: 'immutable' | 'enforced' | 'verified';
}

export interface StegoPayload {
  anchor: string;
  payload: string;
  stegoStream: string;
  fullEncoded: string;
  zeroWidthCount: number;
}

export interface CrawlerNode {
  id: string;
  name: string;
  url: string;
  status: 'idle' | 'broadcasting' | 'deployed' | 'stego_stored';
  statusCode?: number;
  responseNote?: string;
  timestamp?: string;
}

export interface QuantumSimulationResult {
  shots: number;
  zeroCount: number;
  oneCount: number;
  zeroPercent: number;
  onePercent: number;
  superpositionFidelity: number;
  entropy: number;
  timestamp: string;
}

export interface CryptanalysisResult {
  alphabetSize: number;
  length: number;
  rate: number;
  keyspace: number;
  classicalSeconds: number;
  classicalDisplay: string;
  quantumSteps: number;
  quantumSeconds: number;
  quantumDisplay: string;
  dynamicDefendedSeconds: number;
  dynamicDefendedDisplay: string;
}

export interface MlAnalysisResult {
  samples: number;
  accuracy: number;
  trainSize: number;
  testSize: number;
  truePositives: number;
  falsePositives: number;
  trueNegatives: number;
  falseNegatives: number;
  weights: number[];
  intercept: number;
  lossHistory: number[];
}

export interface LegalTreeNode {
  letter: string;
  code: string;
  name: string;
  theoryVersion: number;
  programVersion: number;
  description: string;
  details: string;
}
