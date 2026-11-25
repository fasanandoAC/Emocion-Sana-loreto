import React, { useState, useEffect } from 'react';

export default function CuteGame() {
  const [activeGame, setActiveGame] = useState('memory'); // 'memory' o 'bubbles'

  // ================= MEMORY MATCH GAME =================
  const cardIcons = [
    { id: 1, icon: '🐰', label: 'Conejito Zen' },
    { id: 2, icon: '🧠✨', label: 'Cerebrito Feliz' },
    { id: 3, icon: '💖', label: 'Corazón en Paz' },
    { id: 4, icon: '🌸', label: 'Flor Amazónica' },
    { id: 5, icon: '🦋', label: 'Mariposa Libre' },
    { id: 6, icon: '⭐', label: 'Estrella de Esperanza' },
  ];

  // Crear 12 cartas duplicadas y mezcladas
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
    // Evitar voltear si ya hay 2 volteadas o si ya está volteada/emparejada
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [firstIdx, secondIdx] = newFlipped;

      if (cards[firstIdx].iconId === cards[secondIdx].iconId) {
        // Coincidencia!
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
        }, 900);
      }
    }
  };

  const resetMemoryGame = () => {
    setCards(initializeCards());
    setFlippedIndices([]);
    setMoves(0);
    setMatchedPairs(0);
    setHasWon(false);
  };

  // ================= BUBBLE POP GAME =================
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
    setBubbles(bubbles.map(b => {
      if (b.id === id && !b.popped) {
        setPoppedCount(c => c + 1);
        return { ...b, popped: true };
      }
      return b;
    }));
  };

  const resetBubbles = () => {
    setBubbles(initialBubbles);
    setPoppedCount(0);
  };

  return (
    <section id="juegos" className="content-section">
      <div className="section-header">
        <span className="section-tag">Diversión y Calma</span>
        <h2 className="section-title">Rincón de Juegos Relajantes</h2>
        <p className="section-description">
          ¡Porque cuidar de tu mente también puede ser divertido y muy tierno! 
          Elige un juego para entrenar tu concentración o reventar pensamientos estresantes.
        </p>

        <div className="creative-tabs-nav" style={{ marginTop: '1.5rem' }}>
          <button 
            className={`creative-tab-btn ${activeGame === 'memory' ? 'active' : ''}`}
            onClick={() => setActiveGame('memory')}
          >
            🐰 Memoria de la Calma (Pares)
          </button>
          <button 
            className={`creative-tab-btn ${activeGame === 'bubbles' ? 'active' : ''}`}
            onClick={() => setActiveGame('bubbles')}
          >
            🫧 Pop Antiestrés de Burbujas
          </button>
        </div>
      </div>

      {activeGame === 'memory' ? (
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
      ) : (
        /* BUBBLE POP GAME */
        <div className="cute-game-container">
          <div className="game-stats-bar">
            <span>Burbujas reventadas: <strong>{poppedCount} de {bubbles.length}</strong></span>
            <button onClick={resetBubbles} className="btn-secondary" style={{ padding: '0.4rem 1.1rem', fontSize: '0.85rem' }}>
              🫧 Nuevas Burbujas
            </button>
          </div>

          <p style={{ textAlign: 'center', color: 'var(--texto-secundario)', marginBottom: '1.5rem', fontWeight: 600 }}>
            Toca o haz clic sobre cada burbuja estresante para destruirla y revelar su mensaje de alivio:
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
    </section>
  );
}
