// Utilidad de Sonido Nativo con Web Audio API para Emoción Sana Loreto
let audioCtx = null;
let ambientNodes = null;
let isSoundMuted = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleMute() {
  isSoundMuted = !isSoundMuted;
  if (isSoundMuted) {
    stopAmbientSound();
  }
  return isSoundMuted;
}

export function getMuteState() {
  return isSoundMuted;
}

// 1. Sonido tierno de clic en botones (pop dulce / campanita)
export function playClickSound() {
  if (isSoundMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    
    // Tono tierno ascendente
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(820, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch {
    // Ignore audio errors if blocked
  }
}

// 2. Sonido de Pop de burbujas
export function playPopSound() {
  if (isSoundMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // Ignore
  }
}

// 3. Sonido de voltear carta o éxito
export function playCardFlipSound() {
  if (isSoundMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.06);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  } catch {
    // Ignore
  }
}

// 4. Sonido de victoria / estrella recogida
export function playSuccessSound() {
  if (isSoundMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do agudo

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0.12, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.35);
    });
  } catch {
    // Ignore
  }
}

// 5. Sonido de recolectar en el juego
export function playCatchSound() {
  if (isSoundMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.1);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch {
    // Ignore
  }
}

// 6. Campanillas zen para la respiración guiada
export function playZenBell(phase = 'inhale') {
  if (isSoundMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (phase === 'inhale') {
      // Inhala: tono suave que asciende en paz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(396, now);
      osc.frequency.exponentialRampToValueAtTime(528, now + 2.5);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 3.8);
    } else if (phase === 'hold') {
      // Sostén: cuenco tibetano resonando
      [432, 864].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 3.6);
      });
    } else if (phase === 'exhale') {
      // Exhala: tono suave que desciende relajando el pecho
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 3.5);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 3.8);
    } else {
      // Pausa / descanso
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.5);
    }
  } catch {
    // Ignore
  }
}

// 7. Generador de Sonidos Ambientales Sintetizados (Lluvia, Río, Brisa, Cuenco Zen)
export function startAmbientSound(type = 'lluvia', volume = 0.3) {
  if (isSoundMuted) return;
  stopAmbientSound();

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    if (type === 'lluvia' || type === 'rio' || type === 'selva') {
      // Generar ruido blanco/rosa para agua o lluvia
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Filtro browniano para sonido de agua suave
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filtro pasa-bajos
      const filter = ctx.createBiquadFilter();
      filter.type = type === 'rio' ? 'bandpass' : 'lowpass';
      filter.frequency.setValueAtTime(type === 'rio' ? 500 : 750, ctx.currentTime);
      filter.Q.setValueAtTime(type === 'rio' ? 2 : 1, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      ambientNodes = { source: whiteNoise, gain: masterGain };
    } else {
      // Cuenco Zen armónico continuo
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(216, ctx.currentTime);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(432, ctx.currentTime);

      gain1.gain.setValueAtTime(0.2, ctx.currentTime);

      osc1.connect(gain1);
      osc2.connect(gain1);
      gain1.connect(masterGain);

      osc1.start();
      osc2.start();

      ambientNodes = { source: osc1, secondSource: osc2, gain: masterGain };
    }
  } catch {
    // Ignore
  }
}

export function stopAmbientSound() {
  if (ambientNodes) {
    try {
      if (ambientNodes.source && ambientNodes.source.stop) {
        ambientNodes.source.stop();
      }
      if (ambientNodes.secondSource && ambientNodes.secondSource.stop) {
        ambientNodes.secondSource.stop();
      }
    } catch {
      // Ignore
    }
    ambientNodes = null;
  }
}
