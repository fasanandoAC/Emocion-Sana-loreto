import React, { useState, useEffect, useRef } from 'react';
import { 
  playClickSound, 
  playPopSound, 
  playCardFlipSound, 
  playSuccessSound, 
  playCatchSound 
} from '../utils/audio';

export default function CuteGame() {
  const [activeGame, setActiveGame] = useState('memory'); // 'memory', 'bubbles', 'bunny', 'wheel'

  // ================= 1. JUEGO DE MEMORIA =================
  const cardIcons = [
    { id: 1, icon: '🐰', label: 'Conejito Zen' },
    { id: 2, icon: '🧠✨', label: 'Cerebrito Feliz' },
    { id: 3, icon: '💖', label: 'Corazón en Paz' },
    { id: 4, icon: '🌸', label: 'Flor Amazónica' },
    { id: 5, icon: '🦋', label: 'Mariposa Libre' },
    { id: 6, icon: '⭐', label: 'Estrella de Esperanza' },
  ];

  const initializeCards = () => {
    const duplicated = [...cardIcons, ...cardIcons].map((item, index) => ({
      uniqueId: index,
      iconId: item.id,
      icon: item.icon,
      label: item.label,
      isFlipped: false,
      isMatched: false,
    }));
    return duplicated.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(initializeCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    playCardFlipSound();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newFlipped;

      if (cards[firstIdx].iconId === cards[secondIdx].iconId) {
        // Coincidencia exitosa
        playSuccessSound();
        setTimeout(() => {
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards(newCards);
          setFlippedIndices([]);
          setMatchedPairs(prev => {
            const updated = prev + 1;
            if (updated === cardIcons.length) {
              setHasWon(true);
            }
            return updated;
          });
        }, 400);
      } else {
        // No coinciden
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards(newCards);
          setFlippedIndices([]);
        }, 850);
      }
    }
  };

  const resetMemoryGame = () => {
    playClickSound();
    setCards(initializeCards());
    setFlippedIndices([]);
    setMoves(0);
    setMatchedPairs(0);
    setHasWon(false);
  };

  // ================= 2. POP DE BURBUJAS ANTIESTRÉS =================
  const initialBubbles = [
    { id: 1, stress: 'Insomnio', relief: 'Sueño reparador 😴', popped: false, color: 'bubble-lila' },
    { id: 2, stress: 'Culpa', relief: 'Amor propio 💖', popped: false, color: 'bubble-rosa' },
    { id: 3, stress: 'Prisa', relief: 'Pausa consciente 🍃', popped: false, color: 'bubble-lavanda' },
    { id: 4, stress: 'Miedo al fracaso', relief: 'Aprendizaje valioso 🌱', popped: false, color: 'bubble-lila' },
    { id: 5, stress: 'Autoexigencia', relief: 'Soy suficiente ✨', popped: false, color: 'bubble-rosa' },
    { id: 6, stress: 'Comparación', relief: 'Mi camino es único 🌸', popped: false, color: 'bubble-lavanda' },
    { id: 7, stress: 'Opiniones ajenas', relief: 'Mi paz interior 🕊️', popped: false, color: 'bubble-rosa' },
    { id: 8, stress: 'Sobrecarga', relief: 'Suelto y descanso 💆', popped: false, color: 'bubble-lila' }
  ];

  const [bubbles, setBubbles] = useState(initialBubbles);
  const [poppedCount, setPoppedCount] = useState(0);

  const popBubble = (id) => {
    playPopSound();
    setBubbles(bubbles.map(b => {
      if (b.id === id && !b.popped) {
        setPoppedCount(c => c + 1);
        return { ...b, popped: true };
      }
      return b;
    }));
  };

  const resetBubbles = () => {
    playClickSound();
    setBubbles(initialBubbles);
    setPoppedCount(0);
  };

  // ================= 3. ATRAPA LA CALMA CON BUNNY (ARCADE CUTE) =================
  const [bunnyPos, setBunnyPos] = useState(50); // % horizontal
  const [score, setScore] = useState(0);
  const [isBunnyPlaying, setIsBunnyPlaying] = useState(false);
  const [fallingItems, setFallingItems] = useState([]);
  const gameLoopRef = useRef(null);

  const startBunnyGame = () => {
    playClickSound();
    setIsBunnyPlaying(true);
    setScore(0);
    setFallingItems([]);
    setBunnyPos(50);
  };

  const stopBunnyGame = () => {
    playClickSound();
    setIsBunnyPlaying(false);
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
  };

  // Mover a Bunny a la izquierda / derecha
  const moveBunny = (direction) => {
    playClickSound();
    setBunnyPos(prev => {
      if (direction === 'left') return Math.max(10, prev - 15);
      return Math.min(90, prev + 15);
    });
  };

  // Ciclo del juego Bunny
  useEffect(() => {
    if (!isBunnyPlaying) return;

    const interval = setInterval(() => {
      // Spawn new item
      const types = [
        { icon: '⭐', points: 10, type: 'good' },
        { icon: '💖', points: 15, type: 'good' },
        { icon: '🌸', points: 20, type: 'good' },
        { icon: '🌪️', points: -5, type: 'bad' }
      ];
      const randomItem = types[Math.floor(Math.random() * types.length)];
      const newItem = {
        id: Math.random(),
        icon: randomItem.icon,
        points: randomItem.points,
        type: randomItem.type,
        x: Math.floor(Math.random() * 80) + 10,
        y: 0
      };

      setFallingItems(prev => [...prev.slice(-15), newItem]);
    }, 700);

    const fallInterval = setInterval(() => {
      setFallingItems(prev => {
        return prev
          .map(item => ({ ...item, y: item.y + 7 }))
          .filter(item => {
            // Colisión con Bunny en el fondo (y > 75)
            if (item.y >= 75 && item.y <= 92 && Math.abs(item.x - bunnyPos) < 18) {
              if (item.type === 'good') {
                playCatchSound();
                setScore(s => s + item.points);
              } else {
                setScore(s => Math.max(0, s + item.points));
              }
              return false; // capturado
            }
            return item.y < 100;
          });
      });
    }, 80);

    return () => {
      clearInterval(interval);
      clearInterval(fallInterval);
    };
  }, [isBunnyPlaying, bunnyPos]);

  // ================= 4. RULETA MÁGICA DE AMOR PROPIO =================
  const wheelChallenges = [
    { title: 'Taza de Calma ☕', desc: 'Disfruta de tu próxima bebida despacio, sintiendo el calor y agradeciendo a tu cuerpo.' },
    { title: 'Elogio al Espejo 💖', desc: 'Mírate a los ojos y dite: "Estoy orgulloso/a de cómo sigues intentándolo cada día".' },
    { title: 'Desconexión de 10 min 🌿', desc: 'Pon el celular en silencio durante 10 minutos y mira el cielo de Loreto respirando suave.' },
    { title: 'Mensajito de Luz 💌', desc: 'Escribe a un amigo o ser querido: "Solo quería agradecerte por ser parte de mi vida".' },
    { title: 'Soltar la Culpa 🕊️', desc: 'Escribe en un papel algo que te recriminas, perdónate de corazón y luego rómpelo.' },
    { title: 'Abrazo de Mariposa 🦋', desc: 'Cruza tus brazos sobre el pecho y date 20 toquecitos rítmicos mientras sonríes.' }
  ];

  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [wheelRotation, setWheelRotation] = useState(0);

  const spinWheel = () => {
    if (isSpinning) return;
    playClickSound();
    setIsSpinning(true);
    setSelectedChallenge(null);

    const randomRot = 1440 + Math.floor(Math.random() * 360);
    setWheelRotation(prev => prev + randomRot);

    setTimeout(() => {
      playSuccessSound();
      setIsSpinning(false);
      const chosen = wheelChallenges[Math.floor(Math.random() * wheelChallenges.length)];
      setSelectedChallenge(chosen);
    }, 2800);
  };

  return (
    <section id="juegos" className="content-section">
      <div className="section-header">
        <span className="section-tag">Juegos Antiestrés y Diversión</span>
        <h2 className="section-title">Rincón de Juegos Relajantes</h2>
        <p className="section-description">
          ¡Cuidar tu salud mental también es jugar, reír y desconectar! 
          Elige tu juego favorito con sonidos tiernos y animaciones relajantes.
        </p>

        {/* NAVEGADOR DE JUEGOS */}
        <div className="creative-tabs-nav" style={{ marginTop: '1.8rem' }}>
          <button 
            className={`creative-tab-btn ${activeGame === 'memory' ? 'active' : ''}`}
            onClick={() => { playClickSound(); setActiveGame('memory'); }}
          >
            🐰 1. Memoria de la Calma
          </button>
          <button 
            className={`creative-tab-btn ${activeGame === 'bubbles' ? 'active' : ''}`}
            onClick={() => { playClickSound(); setActiveGame('bubbles'); }}
          >
            🫧 2. Pop de Burbujas
          </button>
          <button 
            className={`creative-tab-btn ${activeGame === 'bunny' ? 'active' : ''}`}
            onClick={() => { playClickSound(); setActiveGame('bunny'); }}
          >
            🐇 3. Atrapa la Paz con Bunny
          </button>
          <button 
            className={`creative-tab-btn ${activeGame === 'wheel' ? 'active' : ''}`}
            onClick={() => { playClickSound(); setActiveGame('wheel'); }}
          >
            🎡 4. Ruleta de Amor Propio
          </button>
        </div>
      </div>

      {/* 1. JUEGO DE MEMORIA */}
      {activeGame === 'memory' && (
        <div className="cute-game-container">
          <div className="game-stats-bar">
            <span>Intentos: <strong>{moves}</strong></span>
            <span>Pares encontrados: <strong>{matchedPairs} / {cardIcons.length}</strong></span>
            <button onClick={resetMemoryGame} className="btn-secondary" style={{ padding: '0.4rem 1.1rem', fontSize: '0.85rem' }}>
              🔄 Reiniciar
            </button>
          </div>

          {hasWon && (
            <div className="game-win-banner">
              <span style={{ fontSize: '2.5rem' }}>🎉🐰✨</span>
              <h3 style={{ color: 'var(--rosado-fucsia)', margin: '0.4rem 0' }}>¡Misión Cumplida!</h3>
              <p style={{ color: 'var(--texto-principal)', fontWeight: 600 }}>
                Has completado el juego en {moves} intentos. Entrenaste tu atención plena con una sonrisa. 
                ¡Eres increíble!
              </p>
            </div>
          )}

          <div className="memory-cards-grid">
            {cards.map((card, index) => (
              <button
                key={card.uniqueId}
                type="button"
                className={`memory-card-box ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                onClick={() => handleCardClick(index)}
                aria-label={card.isFlipped || card.isMatched ? card.label : 'Carta oculta'}
              >
                <div className="memory-card-inner">
                  <div className="memory-card-front">
                    <span className="card-mystery-icon">🐰</span>
                  </div>
                  <div className="memory-card-back">
                    <span className="card-revealed-icon">{card.icon}</span>
                    <span className="card-revealed-label">{card.label}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. POP DE BURBUJAS */}
      {activeGame === 'bubbles' && (
        <div className="cute-game-container">
          <div className="game-stats-bar">
            <span>Burbujas reventadas: <strong>{poppedCount} de {bubbles.length}</strong></span>
            <button onClick={resetBubbles} className="btn-secondary" style={{ padding: '0.4rem 1.1rem', fontSize: '0.85rem' }}>
              🫧 Nuevas Burbujas
            </button>
          </div>

          <p style={{ textAlign: 'center', color: 'var(--texto-secundario)', marginBottom: '1.5rem', fontWeight: 600 }}>
            Toca o haz clic sobre cada burbuja estresante para reventarla con sonido pop y revelar su mensaje de alivio:
          </p>

          <div className="bubbles-interactive-field">
            {bubbles.map((b) => (
              <button
                key={b.id}
                className={`stress-bubble-btn ${b.color} ${b.popped ? 'popped' : ''}`}
                onClick={() => popBubble(b.id)}
              >
                {b.popped ? (
                  <span className="bubble-relief-text">✨ {b.relief}</span>
                ) : (
                  <span className="bubble-stress-text">💥 {b.stress}</span>
                )}
              </button>
            ))}
          </div>

          {poppedCount === bubbles.length && (
            <div className="game-win-banner" style={{ marginTop: '2rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🕊️💖</span>
              <h3 style={{ color: 'var(--rosado-fucsia)' }}>¡Todas las cargas reventadas!</h3>
              <p style={{ color: 'var(--texto-principal)', fontWeight: 600 }}>
                Has transformado el estrés en afirmaciones de calma. Tu mente merece ligereza.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. ATRAPA LA CALMA CON BUNNY */}
      {activeGame === 'bunny' && (
        <div className="cute-game-container">
          <div className="game-stats-bar">
            <span>Puntos de Paz: <strong>{score}</strong></span>
            <div>
              {!isBunnyPlaying ? (
                <button onClick={startBunnyGame} className="btn-primary" style={{ padding: '0.4rem 1.2rem', fontSize: '0.85rem' }}>
                  ▶️ Jugar con Bunny
                </button>
              ) : (
                <button onClick={stopBunnyGame} className="btn-secondary" style={{ padding: '0.4rem 1.1rem', fontSize: '0.85rem' }}>
                  ⏸️ Pausar
                </button>
              )}
            </div>
          </div>

          <div className="bunny-arcade-arena">
            {/* Elementos cayendo */}
            {fallingItems.map((item) => (
              <div
                key={item.id}
                className="falling-game-item"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                {item.icon}
              </div>
            ))}

            {/* Bunny en el suelo */}
            <div 
              className="bunny-player-sprite"
              style={{ left: `${bunnyPos}%` }}
            >
              🐰
            </div>
          </div>

          {/* Controles para móvil y teclado */}
          <div className="bunny-controls-bar">
            <button 
              type="button"
              className="btn-secondary" 
              onClick={() => moveBunny('left')}
              disabled={!isBunnyPlaying}
            >
              ⬅️ Mover Izquierda
            </button>
            <span style={{ color: 'var(--texto-secundario)', fontWeight: 700, fontSize: '0.9rem' }}>
              Usa los botones o teclas para atrapar estrellas ⭐, flores 🌸 y corazones 💖
            </span>
            <button 
              type="button"
              className="btn-secondary" 
              onClick={() => moveBunny('right')}
              disabled={!isBunnyPlaying}
            >
              Mover Derecha ➡️
            </button>
          </div>
        </div>
      )}

      {/* 4. RULETA MÁGICA DE AMOR PROPIO */}
      {activeGame === 'wheel' && (
        <div className="cute-game-container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--texto-secundario)', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 600 }}>
            Gira la ruleta mágica para recibir una misión tierna de amor propio para hoy:
          </p>

          <div className="wheel-spin-wrapper">
            <div 
              className="wheel-disc-visual"
              style={{ transform: `rotate(${wheelRotation}deg)`, transition: isSpinning ? 'transform 2.8s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none' }}
            >
              <div className="wheel-segment seg-1">🌸</div>
              <div className="wheel-segment seg-2">💖</div>
              <div className="wheel-segment seg-3">🐰</div>
              <div className="wheel-segment seg-4">⭐</div>
              <div className="wheel-segment seg-5">🦋</div>
              <div className="wheel-segment seg-6">☕</div>
            </div>
            <div className="wheel-pointer-arrow">🔻</div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className="btn-primary"
              style={{ padding: '0.9rem 2.2rem', fontSize: '1.1rem' }}
            >
              {isSpinning ? '🌀 Girando con magia...' : '🎡 ¡Girar la Ruleta!'}
            </button>
          </div>

          {selectedChallenge && (
            <div className="wheel-result-card">
              <span style={{ fontSize: '2.5rem' }}>🎁✨</span>
              <h3 style={{ color: 'var(--rosado-fucsia)', margin: '0.5rem 0' }}>
                Tu Desafío de Hoy: {selectedChallenge.title}
              </h3>
              <p style={{ color: 'var(--texto-principal)', fontSize: '1.1rem', fontWeight: 600, lineHeight: '1.5' }}>
                {selectedChallenge.desc}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
