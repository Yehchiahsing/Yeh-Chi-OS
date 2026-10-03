// 7-Node Balanced Harmonic Cycle Synthesizer (AIHC Section 4)
// C Major 7 notes: C4 (261.63), D4 (293.66), E4 (329.63), F4 (349.23), G4 (392.00), A4 (440.00), B4 (493.88)
// Designed for balanced equilibrium with dynamic symmetry and no emotional resolution chord

const NOTE_FREQS: Record<string, number> = {
  '1 (C)': 261.63,
  '2 (D)': 293.66,
  '3 (E)': 329.63,
  '4 (F)': 349.23,
  '5 (G)': 392.00,
  '6 (A)': 440.00,
  '7 (B)': 493.88,
};

// 7-Node symmetric permutation sequence
export const HARMONIC_SEQUENCE = [
  '1 (C)', '3 (E)', '5 (G)', '7 (B)', '2 (D)', '4 (F)', '6 (A)',
  '7 (B)', '5 (G)', '3 (E)', '1 (C)', '6 (A)', '4 (F)', '2 (D)'
];

class HarmonicSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private stepIndex: number = 0;
  private masterGain: GainNode | null = null;
  private onStepCallback: ((step: number, note: string) => void) | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public setCallback(cb: (step: number, note: string) => void) {
    this.onStepCallback = cb;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.stepIndex = 0;
    this.scheduleNextNote();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private playTone(freq: number, duration: number = 1.6) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Dual-oscillator for warmth (sine + soft triangle)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 0.5, now); // Sub-octave resonance

    // Soft amniotic envelope: slow attack, warm sustain, gentle release
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.08, now + 0.3);
    noteGain.gain.exponentialRampToValueAtTime(0.05, now + duration * 0.6);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;

    const note = HARMONIC_SEQUENCE[this.stepIndex % HARMONIC_SEQUENCE.length];
    const freq = NOTE_FREQS[note] || 261.63;

    this.playTone(freq, 1.4);

    if (this.onStepCallback) {
      this.onStepCallback(this.stepIndex % HARMONIC_SEQUENCE.length, note);
    }

    this.stepIndex++;
    this.timer = window.setTimeout(() => {
      this.scheduleNextNote();
    }, 750); // Balanced tempo
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const harmonicSynth = new HarmonicSynthesizer();
