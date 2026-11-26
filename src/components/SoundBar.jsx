import React, { useState, useEffect, useRef } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const muted = toggleMute();
    setIsMuted(muted);
    if (muted) {
      setIsPlayingAmbient(false);
    } else {
      playClickSound();
    }
  };

  // Cerrar dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      stopAmbientSound();
    };
  }, []);

  const getAmbientLabel = () => {
    if (selectedAmbient === 'lluvia') return '🌧️ Lluvia';
    if (selectedAmbient === 'rio') return '🌊 Río';
    return '🔔 Cuenco';
  };

  return (
    <div className="nav-sound-settings-wrapper" ref={dropdownRef}>
      {/* Botón principal arriba en el header junto a la Línea 113 */}
      <button
        type="button"
        className={`nav-sound-btn ${isPlayingAmbient ? 'playing' : ''} ${isMuted ? 'muted' : ''}`}
        onClick={() => {
          playClickSound();
          setIsOpen(!isOpen);
        }}
        title="Ajustes de Sonido y Música de Relajación"
        aria-expanded={isOpen}
      >
        <span className="sound-btn-icon">{isMuted ? '🔇' : (isPlayingAmbient ? '🎵' : '🔊')}</span>
        <span className="sound-btn-text">
          {isMuted ? 'Silenciado' : (isPlayingAmbient ? `${getAmbientLabel()} (Sonando)` : 'Ajustes de Sonido')}
        </span>
        <span className="sound-btn-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Popover / Menú desplegable de ajustes */}
      {isOpen && (
        <div className="sound-top-popover">
          <div className="sound-popover-header">
            <span style={{ fontWeight: 800, color: 'var(--texto-principal)', fontSize: '0.9rem' }}>
              ⚙️ Ajustes de Sonido y Música
            </span>
            <button 
              type="button" 
              className="popover-close-btn"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Toggle de sonido general de la página */}
          <div className="popover-row">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--texto-secundario)' }}>
              Efectos en botones:
            </span>
            <button
              type="button"
              onClick={handleToggleMute}
              className={`popover-toggle-btn ${isMuted ? 'muted' : 'active'}`}
            >
              {isMuted ? '🔇 Silenciados' : '🔊 Activados'}
            </button>
          </div>

          {/* Selector de ambiente de relajación */}
          <div style={{ marginTop: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--texto-secundario)', display: 'block', marginBottom: '0.35rem' }}>
              Música ambiental relajante:
            </span>
            <div className="ambient-pills-row">
              <button
                type="button"
                className={`ambient-pill-btn ${selectedAmbient === 'lluvia' ? 'active' : ''}`}
                onClick={() => handleChangeAmbient('lluvia')}
                disabled={isMuted}
              >
                🌧️ Lluvia
              </button>
              <button
                type="button"
                className={`ambient-pill-btn ${selectedAmbient === 'rio' ? 'active' : ''}`}
                onClick={() => handleChangeAmbient('rio')}
                disabled={isMuted}
              >
                🌊 Río
              </button>
              <button
                type="button"
                className={`ambient-pill-btn ${selectedAmbient === 'zen' ? 'active' : ''}`}
                onClick={() => handleChangeAmbient('zen')}
                disabled={isMuted}
              >
                🔔 Cuenco
              </button>
            </div>
          </div>

          {/* Botón de reproducción y volumen */}
          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={handleToggleAmbient}
              disabled={isMuted}
              className={`ambient-main-play-btn ${isPlayingAmbient ? 'playing' : ''}`}
            >
              {isPlayingAmbient ? '⏸️ Pausar Música de Relajación' : '▶️ Reproducir Música de Relajación'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--texto-secundario)' }}>
                Volumen:
              </span>
              <input
                type="range"
                min="0.05"
                max="0.6"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                disabled={isMuted}
                style={{ width: '130px', accentColor: 'var(--rosado-vibrante)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
