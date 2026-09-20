// Sound Effects Engine using Web Audio API for guaranteed cross-browser romance & celebration sounds

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.bgmInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sweet chime / harp harp arpeggio for magical moments
  playChime() {
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 1.2);
        } catch (e) {
          console.error(e);
        }
      }, idx * 90);
    });
  }

  // Pop / heart tap sound
  playPop() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      console.error(e);
    }
  }

  // Candle blow wind + celebratory shimmer
  playBlowCandle() {
    this.init();
    if (!this.ctx) return;
    try {
      // Wind puff noise
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();

      // Followed by celebration chime
      setTimeout(() => this.playChime(), 350);
    } catch (e) {
      console.error(e);
    }
  }

  // Romantic gentle background piano / celesta chord progression generator
  startRomanticBGM() {
    this.init();
    if (!this.ctx || this.bgmPlaying) return;
    this.bgmPlaying = true;

    // Romantic dreamy progression (Db Major, Ab Major, Bbm7, Gbmaj7)
    const chords = [
      [277.18, 349.23, 415.30, 554.37], // Db
      [207.65, 311.13, 415.30, 523.25], // Ab
      [233.08, 277.18, 349.23, 466.16], // Bbm
      [185.00, 277.18, 349.23, 440.00]  // Gb
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!this.bgmPlaying) return;
      const currentChord = chords[chordIndex % chords.length];
      chordIndex++;

      currentChord.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.bgmPlaying || !this.ctx) return;
          try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            const now = this.ctx.currentTime;
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.045, now + 0.4);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 4.0);
          } catch (e) {}
        }, idx * 180);
      });
    };

    playChord();
    this.bgmInterval = setInterval(playChord, 3600);
  }

  stopRomanticBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleRomanticBGM() {
    if (this.bgmPlaying) {
      this.stopRomanticBGM();
      return false;
    } else {
      this.startRomanticBGM();
      return true;
    }
  }
}

export const soundFX = new SoundEffects();
