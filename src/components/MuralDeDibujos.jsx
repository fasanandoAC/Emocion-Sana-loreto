import React, { useState, useRef, useEffect } from 'react';
import { playClickSound, playSuccessSound } from '../utils/audio';

export default function MuralDeDibujos() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#ec4899');
  const [brushSize, setBrushSize] = useState(6);
  const [toolMode, setToolMode] = useState('brush'); // 'brush', 'eraser', 'sticker'
  const [selectedSticker, setSelectedSticker] = useState('🐰');

  const [artistName, setArtistName] = useState('');
  const [artworkTitle, setArtworkTitle] = useState('');
  const [artworkFeeling, setArtworkFeeling] = useState('En paz y libre 🌸');

  // Galería de obras expuestas en el muro
  const [artworks, setArtworks] = useState([
    {
      id: 1,
      artist: 'Crhistel 🌸',
      title: 'Conejito en el Río Amazonas',
      feeling: 'Esperanzada y con calma',
      likes: 42,
      date: 'Hoy',
      dataUrl: null, // Si es nulo se renderiza ilustración por defecto
      placeholderIcon: '🐰🌸'
    },
    {
      id: 2,
      artist: 'Alexia 🌷',
      title: 'Cerebrito que Florece',
      feeling: 'Amor propio y bienestar',
      likes: 38,
      date: 'Hoy',
      dataUrl: null,
      placeholderIcon: '🧠✨'
    }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e) => {
    const { x, y } = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (toolMode === 'sticker') {
      playClickSound();
      ctx.font = `${brushSize * 5 + 24}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedSticker, x, y);
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || toolMode === 'sticker') return;
    const { x, y } = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = toolMode === 'eraser' ? '#ffffff' : brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClearCanvas = () => {
    playClickSound();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handlePublishArtwork = (e) => {
    e.preventDefault();
    playSuccessSound();

    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');

    const newArtwork = {
      id: Date.now(),
      artist: artistName.trim() || 'Artista Valiente 🎨',
      title: artworkTitle.trim() || 'Dibujo de mis Sentimientos',
      feeling: artworkFeeling,
      likes: 1,
      date: 'Reciente',
      dataUrl: dataUrl
    };

    setArtworks([newArtwork, ...artworks]);
    setArtworkTitle('');
    handleClearCanvas();
  };

  const handleLikeArtwork = (id) => {
    playClickSound();
    setArtworks(artworks.map(art => art.id === id ? { ...art, likes: art.likes + 1 } : art));
  };

  const colors = [
    { name: 'Rosado', hex: '#ec4899' },
    { name: 'Fucsia', hex: '#db2777' },
    { name: 'Lila Claro', hex: '#c084fc' },
    { name: 'Violeta', hex: '#7c3aed' },
    { name: 'Morado Noche', hex: '#3b0764' },
    { name: 'Celeste Río', hex: '#38bdf8' },
    { name: 'Verde Selva', hex: '#10b981' },
    { name: 'Blanco', hex: '#ffffff' }
  ];

  const stickers = ['🐰', '🧠✨', '💖', '🌸', '⭐', '🦋', '🌈', '🕊️'];

  return (
    <section id="muro-de-dibujos" className="content-section">
      <div className="section-header">
        <span className="section-tag">Galería y Arte Emocional</span>
        <h2 className="section-title">Muro de Dibujos: Dibuja lo que Sientes</h2>
        <p className="section-description">
          ¡Un lienzo libre y creativo para adolescentes, jóvenes y adultos! 
          Dibuja algo que te guste, plasma cómo te sientes o estampa conejitos y flores, y publícalo en nuestro muro comunitario.
        </p>
      </div>

      <div className="mural-workbench-container">
        {/* ZONA DE DIBUJO */}
        <div className="drawing-pad-card">
          <div className="canvas-header-bar">
            <span style={{ fontWeight: 800, color: 'var(--texto-principal)', fontSize: '1.1rem' }}>
              🎨 Tu Lienzo Creativo
            </span>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button 
                type="button"
                className={`tool-mode-btn ${toolMode === 'brush' ? 'active' : ''}`}
                onClick={() => { playClickSound(); setToolMode('brush'); }}
              >
                ✏️ Pincel
              </button>
              <button 
                type="button"
                className={`tool-mode-btn ${toolMode === 'eraser' ? 'active' : ''}`}
                onClick={() => { playClickSound(); setToolMode('eraser'); }}
              >
                🧹 Borrador
              </button>
              <button 
                type="button"
                className={`tool-mode-btn ${toolMode === 'sticker' ? 'active' : ''}`}
                onClick={() => { playClickSound(); setToolMode('sticker'); }}
              >
                🐰 Estampa
              </button>
              <button 
                type="button"
                onClick={handleClearCanvas} 
                className="btn-secondary" 
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
              >
                🗑️ Limpiar
              </button>
            </div>
          </div>

          {/* PALETA DE HERRAMIENTAS */}
          <div className="canvas-tools-palette">
            {toolMode === 'sticker' ? (
              <div className="stickers-select-row">
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--texto-secundario)' }}>
                  Toca una estampa y luego haz clic en el lienzo:
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {stickers.map((stk) => (
                    <button
                      key={stk}
                      type="button"
                      className={`sticker-tool-btn ${selectedSticker === stk ? 'active' : ''}`}
                      onClick={() => { playClickSound(); setSelectedSticker(stk); }}
                    >
                      {stk}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="brush-controls-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--texto-secundario)' }}>Color:</span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {colors.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: c.hex,
                          border: brushColor === c.hex ? '3px solid var(--texto-principal)' : '1px solid #cbd5e1',
                          cursor: 'pointer'
                        }}
                        onClick={() => { playClickSound(); setBrushColor(c.hex); }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--texto-secundario)' }}>Grosor:</span>
                  <input
                    type="range"
                    min="3"
                    max="30"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    style={{ width: '90px', accentColor: 'var(--rosado-vibrante)' }}
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--rosado-fucsia)' }}>{brushSize}px</span>
                </div>
              </div>
            )}
          </div>

          {/* ÁREA DEL CANVAS */}
          <div className="canvas-frame">
            <canvas
              ref={canvasRef}
              width={700}
              height={420}
              className="art-drawing-board"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
            />
          </div>

          {/* FORMULARIO DE PUBLICACIÓN EN EL MURO */}
          <form onSubmit={handlePublishArtwork} className="publish-artwork-form">
            <div className="publish-inputs-row">
              <input
                type="text"
                className="note-author-input"
                placeholder="Título de tu dibujo (ej. Mi jardín de paz)"
                value={artworkTitle}
                onChange={(e) => setArtworkTitle(e.target.value)}
                maxLength={45}
                required
              />
              <input
                type="text"
                className="note-author-input"
                placeholder="Tu nombre o apodo (opcional)"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                maxLength={30}
              />
              <select
                className="feeling-select"
                value={artworkFeeling}
                onChange={(e) => setArtworkFeeling(e.target.value)}
              >
                <option value="En paz y libre 🌸">En paz y libre 🌸</option>
                <option value="Desahogándome con amor 💜">Desahogándome con amor 💜</option>
                <option value="Agradecido/a con la vida 🌱">Agradecido/a con la vida 🌱</option>
                <option value="Buscando luz y calma ☀️">Buscando luz y calma ☀️</option>
                <option value="Con ganas de sonreír 🐰">Con ganas de sonreír 🐰</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              🖼️ Publicar mi Dibujo en el Muro Comunitario
            </button>
          </form>
        </div>
      </div>

      {/* GALERÍA DE OBRAS EXPUESTAS EN EL MURO */}
      <div style={{ marginTop: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-tag">Obras de Nuestra Comunidad</span>
          <h3 className="section-title" style={{ fontSize: '2.1rem' }}>
            Mural de Dibujos de Loreto
          </h3>
          <p className="section-description">
            Mira lo que otros jóvenes, adolescentes y adultos han plasmado. ¡Dale amor 💖 a tus obras favoritas!
          </p>
        </div>

        <div className="artworks-gallery-grid">
          {artworks.map((art) => (
            <div key={art.id} className="artwork-gallery-card">
              <div className="artwork-image-container">
                {art.dataUrl ? (
                  <img src={art.dataUrl} alt={art.title} className="artwork-rendered-img" />
                ) : (
                  <div className="artwork-placeholder-box">
                    <span style={{ fontSize: '4rem' }}>{art.placeholderIcon}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--rosado-fucsia)', fontWeight: 800, marginTop: '0.5rem' }}>
                      Obra destacada de bienvenida
                    </span>
                  </div>
                )}
              </div>

              <div className="artwork-card-info">
                <h4 className="artwork-card-title">{art.title}</h4>
                <span className="artwork-feeling-badge">{art.feeling}</span>
                <div className="artwork-footer-row">
                  <span className="artwork-artist-tag">Por: {art.artist}</span>
                  <button
                    type="button"
                    onClick={() => handleLikeArtwork(art.id)}
                    className="artwork-love-btn"
                    title="Dar amor a este dibujo"
                  >
                    💖 {art.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
