import React, { useState, useRef, useEffect } from 'react';

export default function CreativeSpace() {
  const [activeTab, setActiveTab] = useState('mural'); // 'mural' o 'dibujo'

  // Estado para el Muro de Notas Creativas
  const [notes, setNotes] = useState([
    {
      id: 1,
      author: 'Crhistel 🌸',
      text: 'Respira hondo... Todo lo que hoy parece una tormenta, mañana será el abono para tus flores más hermosas.',
      color: 'note-rosa',
      sticker: '🐰',
      likes: 24
    },
    {
      id: 2,
      author: 'Alexia 🌷',
      text: 'Tu mente es un jardín sagrado. No dejes que la prisa del mundo marchite tu paz interior.',
      color: 'note-lila',
      sticker: '🧠✨',
      likes: 31
    },
    {
      id: 3,
      author: 'Un amigo de Loreto',
      text: 'Está bien sentirse cansado. Descansar no es rendirse, es recargar tu luz propia.',
      color: 'note-lavanda',
      sticker: '💖',
      likes: 18
    }
  ]);

  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteAuthor, setNewNoteAuthor] = useState('');
  const [selectedColor, setSelectedColor] = useState('note-rosa');
  const [selectedSticker, setSelectedSticker] = useState('🐰');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote = {
      id: Date.now(),
      author: newNoteAuthor.trim() || 'Persona Valiente 🌸',
      text: newNoteText.trim(),
      color: selectedColor,
      sticker: selectedSticker,
      likes: 1
    };

    setNotes([newNote, ...notes]);
    setNewNoteText('');
    setNewNoteAuthor('');
  };

  const handleLike = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, likes: n.likes + 1 } : n));
  };

  // Estado para la Pizarra Zen Canvas
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#ec4899'); // Rosado por defecto
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    if (activeTab === 'dibujo' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [activeTab]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <section id="espacio-creativo" className="content-section">
      <div className="section-header">
        <span className="section-tag">Expresión y Desahogo</span>
        <h2 className="section-title">Espacio Creativo Antiestrés</h2>
        <p className="section-description">
          El arte y la palabra tienen el poder de sanar. Diseñado para adolescentes, jóvenes y adultos 
          que buscan desahogar emociones, dibujar en libertad o compartir reflexiones con cariño.
        </p>

        {/* Selector de pestañas creativas */}
        <div className="creative-tabs-nav">
          <button 
            className={`creative-tab-btn ${activeTab === 'mural' ? 'active' : ''}`}
            onClick={() => setActiveTab('mural')}
          >
            💌 Muro de Expresión y Notas
          </button>
          <button 
            className={`creative-tab-btn ${activeTab === 'dibujo' ? 'active' : ''}`}
            onClick={() => setActiveTab('dibujo')}
          >
            🎨 Lienzo de Garabatos Zen
          </button>
        </div>
      </div>

      {activeTab === 'mural' ? (
        <div className="creative-mural-wrap">
          {/* Formulario para publicar una nota */}
          <div className="add-note-card">
            <h3 style={{ fontSize: '1.35rem', color: 'var(--texto-principal)', marginBottom: '0.8rem' }}>
              ✍️ Deja tu mensaje en el Muro Positivo
            </h3>
            <form onSubmit={handleAddNote}>
              <textarea 
                className="note-textarea"
                placeholder="Escribe una frase bonita, un poema, un desahogo o palabras de fuerza para ti o para los demás..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                maxLength={240}
              />
              <div className="note-controls-row">
                <input 
                  type="text" 
                  className="note-author-input"
                  placeholder="Tu nombre o apodo (opcional)"
                  value={newNoteAuthor}
                  onChange={(e) => setNewNoteAuthor(e.target.value)}
                  maxLength={30}
                />

                {/* Selector de color */}
                <div className="color-picker-group">
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--texto-secundario)' }}>Color:</span>
                  {['note-rosa', 'note-lila', 'note-lavanda', 'note-fucsia'].map((c) => (
                    <button
                      type="button"
                      key={c}
                      className={`color-dot ${c} ${selectedColor === c ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(c)}
                    />
                  ))}
                </div>

                {/* Selector de sticker cute */}
                <div className="sticker-picker-group">
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--texto-secundario)' }}>Sticker:</span>
                  {['🐰', '🧠✨', '💖', '🌸', '🦋', '⭐'].map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`sticker-option ${selectedSticker === s ? 'selected' : ''}`}
                      onClick={() => setSelectedSticker(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '0.7rem 1.6rem' }}>
                  📌 Pegar Nota
                </button>
              </div>
            </form>
          </div>

          {/* Grilla de notas adhesivas */}
          <div className="notes-board-grid">
            {notes.map((note) => (
              <div key={note.id} className={`sticky-note-card ${note.color}`}>
                <div className="note-pin">📌</div>
                <div className="note-sticker-top">{note.sticker}</div>
                <p className="note-text-body">"{note.text}"</p>
                <div className="note-footer-row">
                  <span className="note-author-tag">— {note.author}</span>
                  <button 
                    type="button"
                    onClick={() => handleLike(note.id)} 
                    className="note-like-btn"
                    title="Dar amor a esta nota"
                  >
                    💖 {note.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Pizarra de Dibujo Zen */
        <div className="zen-canvas-container">
          <div className="canvas-toolbar">
            <div className="toolbar-item">
              <span style={{ fontWeight: 800, color: 'var(--texto-secundario)', fontSize: '0.9rem' }}>Color del trazo:</span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {[
                  { name: 'Rosado', hex: '#ec4899' },
                  { name: 'Lila', hex: '#a855f7' },
                  { name: 'Violeta', hex: '#7c3aed' },
                  { name: 'Fucsia', hex: '#db2777' },
                  { name: 'Blanco', hex: '#ffffff' }
                ].map((color) => (
                  <button
                    key={color.hex}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: color.hex,
                      border: drawColor === color.hex ? '3px solid var(--texto-principal)' : '1px solid rgba(0,0,0,0.15)',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                    onClick={() => setDrawColor(color.hex)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="toolbar-item">
              <span style={{ fontWeight: 800, color: 'var(--texto-secundario)', fontSize: '0.9rem' }}>Grosor:</span>
              <input 
                type="range" 
                min="2" 
                max="25" 
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                style={{ width: '100px', accentColor: 'var(--rosado-vibrante)' }}
              />
            </div>

            <button 
              type="button" 
              onClick={clearCanvas} 
              className="btn-secondary"
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.88rem' }}
            >
              🧹 Limpiar Lienzo
            </button>
          </div>

          <div className="canvas-wrapper">
            <canvas
              ref={canvasRef}
              width={780}
              height={440}
              className="drawing-canvas-board"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
          <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--texto-secundario)', fontSize: '0.95rem' }}>
            🐰 Dibuja conejitos, flores, garabatos o lo que sientas para liberar la tensión de tus manos y mente.
          </p>
        </div>
      )}
    </section>
  );
}
