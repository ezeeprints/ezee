'use client';

class CozyAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;

  // Noise sources
  private rainNode: AudioBufferSourceNode | null = null;
  private rainFilter: BiquadFilterNode | null = null;
  private fireplaceNode: AudioBufferSourceNode | null = null;
  private fireplaceFilter: BiquadFilterNode | null = null;
  
  // Master control nodes
  private mainGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private fireplaceGain: GainNode | null = null;
  private lofiGain: GainNode | null = null;

  // Lofi scheduling
  private lofiInterval: any = null;
  private chordIndex = 0;
  private activeOscillators: OscillatorNode[] = [];

  // Jazz progression in Hz:
  // Chord 0: Fmaj7 (F2: 87.31, A3: 220.00, C4: 261.63, E4: 329.63)
  // Chord 1: Em7   (E2: 82.41, G3: 196.00, B3: 246.94, D4: 293.66)
  // Chord 2: Dm7   (D2: 73.42, F3: 174.61, A3: 220.00, C4: 261.63)
  // Chord 3: Cmaj7 (C2: 65.41, E3: 164.81, G3: 196.00, B3: 246.94)
  private chords = [
    [87.31, 220.00, 261.63, 329.63],
    [82.41, 196.00, 246.94, 293.66],
    [73.42, 174.61, 220.00, 261.63],
    [65.41, 164.81, 196.00, 246.94]
  ];

  constructor() {}

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContextClass();

    // Setup Main Gain
    this.mainGain = this.ctx.createGain();
    this.mainGain.gain.setValueAtTime(0.4, this.ctx.currentTime); // moderate master volume
    this.mainGain.connect(this.ctx.destination);

    // Create noise buffers
    const bufferSize = this.ctx.sampleRate * 4; // 4 seconds buffer
    const whiteBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = whiteBuffer.getChannelData(0);
    let lastOut = 0.0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Simple brown noise filter approximation
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Compensate volume
    }

    // 1. Rain Synthesizer Node
    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
    this.rainGain.connect(this.mainGain);

    this.rainFilter = this.ctx.createBiquadFilter();
    this.rainFilter.type = 'lowpass';
    this.rainFilter.frequency.setValueAtTime(600, this.ctx.currentTime); // Cozy muffled rain
    this.rainFilter.Q.setValueAtTime(1, this.ctx.currentTime);
    this.rainFilter.connect(this.rainGain);

    this.rainNode = this.ctx.createBufferSource();
    this.rainNode.buffer = whiteBuffer;
    this.rainNode.loop = true;
    this.rainNode.connect(this.rainFilter);
    this.rainNode.start(0);

    // 2. Fireplace Crackle Synthesizer
    this.fireplaceGain = this.ctx.createGain();
    this.fireplaceGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    this.fireplaceGain.connect(this.mainGain);

    this.fireplaceFilter = this.ctx.createBiquadFilter();
    this.fireplaceFilter.type = 'bandpass';
    this.fireplaceFilter.frequency.setValueAtTime(800, this.ctx.currentTime);
    this.fireplaceFilter.Q.setValueAtTime(0.5, this.ctx.currentTime);
    this.fireplaceFilter.connect(this.fireplaceGain);

    this.fireplaceNode = this.ctx.createBufferSource();
    this.fireplaceNode.buffer = whiteBuffer;
    this.fireplaceNode.loop = true;
    this.fireplaceNode.connect(this.fireplaceFilter);
    this.fireplaceNode.start(0);

    // Trigger fireplace crackle "pops" randomly
    this.startFireplacePops();

    // 3. Lofi Chords Synthesizer
    this.lofiGain = this.ctx.createGain();
    this.lofiGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.lofiGain.connect(this.mainGain);
  }

  private startFireplacePops() {
    const triggerPop = () => {
      if (!this.isPlaying || !this.ctx || this.ctx.state === 'suspended') {
        setTimeout(triggerPop, 500);
        return;
      }

      // Generate a tiny wood snap sound
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2500 + Math.random() * 2000, this.ctx.currentTime);

      osc.type = Math.random() > 0.6 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(100 + Math.random() * 400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.15, this.ctx.currentTime + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.02 + Math.random() * 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.mainGain!);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);

      // Schedule next pop
      setTimeout(triggerPop, 100 + Math.random() * 900);
    };

    setTimeout(triggerPop, 500);
  }

  private playLofiChord() {
    if (!this.ctx || !this.isPlaying || this.ctx.state === 'suspended') return;

    const now = this.ctx.currentTime;
    const chordNotes = this.chords[this.chordIndex];

    // Fade out previous oscillators
    const oldOscs = [...this.activeOscillators];
    this.activeOscillators = [];
    oldOscs.forEach(osc => {
      try {
        osc.stop(now + 1.0);
      } catch (e) {}
    });

    // Spawn new oscillators for each note in chord
    chordNotes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const lowpass = this.ctx.createBiquadFilter();

      // Soft triangle waves
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Lowpass to make it muffled and warm
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(350 + Math.sin(now) * 50, now); // subtle filter sweeps

      // Slow attack (2s) and long release (4.5s)
      gainNode.gain.setValueAtTime(0, now);
      // Give bass notes a little more volume and higher notes softer
      const targetVolume = idx === 0 ? 0.22 : 0.12;
      gainNode.gain.linearRampToValueAtTime(targetVolume, now + 1.8 + Math.random() * 0.4);
      // Let it fade out slowly
      gainNode.gain.setValueAtTime(targetVolume, now + 3.8);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

      osc.connect(lowpass);
      lowpass.connect(gainNode);
      gainNode.connect(this.lofiGain!);

      osc.start(now);
      this.activeOscillators.push(osc);
    });

    // Advance to next chord
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;
  }

  playFeedbackClick() {
    if (!this.ctx || !this.isPlaying || this.ctx.state === 'suspended') return;
    
    // Play a tiny cozy mechanical keystroke/paper sound
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const bandpass = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(600, now);
    bandpass.Q.setValueAtTime(2, now);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(this.mainGain!);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  playWeatherCycleSound() {
    if (!this.ctx || !this.isPlaying || this.ctx.state === 'suspended') return;
    
    // Play a nice warm chime sound
    const now = this.ctx.currentTime;
    const frequencies = [440, 554.37, 659.25, 880]; // A maj arpeggio
    
    frequencies.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);
      
      osc.connect(gain);
      gain.connect(this.mainGain!);
      
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.0);
    });
  }

  setWeatherState(weather: 'day' | 'sunset' | 'rain') {
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    if (weather === 'rain') {
      // Unmuffle and turn up rain
      this.rainFilter?.frequency.linearRampToValueAtTime(900, now + 2);
      this.rainGain?.gain.linearRampToValueAtTime(0.6, now + 2);
      this.fireplaceGain?.gain.linearRampToValueAtTime(0.4, now + 2);
    } else if (weather === 'sunset') {
      // Moderated rain/room hum
      this.rainFilter?.frequency.linearRampToValueAtTime(450, now + 2);
      this.rainGain?.gain.linearRampToValueAtTime(0.2, now + 2);
      this.fireplaceGain?.gain.linearRampToValueAtTime(0.15, now + 2);
    } else {
      // Day - soft rain (outdoor mist) and low fire
      this.rainFilter?.frequency.linearRampToValueAtTime(300, now + 2);
      this.rainGain?.gain.linearRampToValueAtTime(0.1, now + 2);
      this.fireplaceGain?.gain.linearRampToValueAtTime(0.05, now + 2);
    }
  }

  toggle(play: boolean) {
    this.isPlaying = play;
    
    if (play) {
      this.init();
      if (this.ctx?.state === 'suspended') {
        this.ctx.resume();
      }
      
      // Start chord loop immediately and schedule chord changes
      this.playLofiChord();
      this.lofiInterval = setInterval(() => this.playLofiChord(), 6000);
    } else {
      if (this.lofiInterval) {
        clearInterval(this.lofiInterval);
        this.lofiInterval = null;
      }
      // Stop active note oscillators
      this.activeOscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
      });
      this.activeOscillators = [];
    }
  }

  setVolume(val: number) {
    if (!this.mainGain || !this.ctx) return;
    this.mainGain.gain.linearRampToValueAtTime(val, this.ctx.currentTime + 0.1);
  }
}

export const audio = new CozyAudioEngine();
