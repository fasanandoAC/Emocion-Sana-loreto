import React, { useState, useEffect } from 'react';
import { 
  startAmbientSound, 
  stopAmbientSound, 
  toggleMute, 
  getMuteState, 
  playClickSound 
} from '../utils/audio';

export default function SoundBar() {
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [selectedAmbient, setSelectedAmbient] = useState('lluvia'); // 'lluvia', 'rio', 'zen'
  const [volume, setVolume] = useState(0.25);
  const [isMuted, setIsMuted] = useState(getMuteState());

  const handleToggleAmbient = () => {
    playClickSound();
    if (isPlayingAmbient) {
      stopAmbientSound();
      setIsPlayingAmbient(false);
    } else {
      startAmbientSound(selectedAmbient, volume);
      setIsPlayingAmbient(true);
    }
  };

  const handleChangeAmbient = (type) => {
    playClickSound();
    setSelectedAmbient(type);
    if (isPlayingAmbient) {
      startAmbientSound(type, volume);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (isPlayingAmbient) {
      startAmbientSound(selectedAmbient, newVol);
    }
  };

  const handleToggleMute = () => {
    const muted = toggleMute();
    setIsMuted(muted);
    if (muted) {
      setIsPlayingAmbient(false);
    } else {
      playClickSound();
    }
  };

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  return (
    <aside className="sound-floating-panel" aria-label="Control de sonidos de relajación">
      <div className="sound-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>🎵</span>
          <span className="sound-panel-title">Sonidos de Relajación</span>
        </div>
        <button
          onClick={handleToggleMute}
          className={`sound-mute-btn ${isMuted ? 'muted' : ''}`}
          title={isMuted ? 'Activar todos los sonidos' : 'Silenciar todos los sonidos'}
        >
          {isMuted ? '🔇 Silenciado' : '🔊 Con Sonido'}
        </button>
      </div>

      <div className="sound-ambient-controls">
        <div className="ambient-type-buttons">
          <button
            className={`ambient-type-btn ${selectedAmbient === 'lluvia' ? 'active' : ''}`}
            onClick={() => handleChangeAmbient('lluvia')}
          >
            🌧️ Lluvia
          </button>
          <button
            className={`ambient-type-btn ${selectedAmbient === 'rio' ? 'active' : ''}`}
            onClick={() => handleChangeAmbient('rio')}
          >
            🌊 Río
          </button>
          <button
            className={`ambient-type-btn ${selectedAmbient === 'zen' ? 'active' : ''}`}
            onClick={() => handleChangeAmbient('zen')}
          >
            🔔 Cuenco Zen
          </button>
        </div>

        <div className="sound-action-row">
          <button
            onClick={handleToggleAmbient}
            className={`ambient-play-toggle ${isPlayingAmbient ? 'playing' : ''}`}
          >
            {isPlayingAmbient ? '⏸️ Pausar Ambiente' : '▶️ Reproducir Ambiente'}
          </button>

          <div className="volume-control-wrap">
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--texto-secundario)' }}>Vol:</span>
            <input
              type="range"
              min="0.05"
              max="0.6"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="sound-volume-slider"
              title="Volumen ambiental"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
