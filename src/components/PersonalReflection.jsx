import React, { useState, useEffect } from 'react';

export default function PersonalReflection() {
  const reflectionPrompts = [
    '¿Qué carga o preocupación que hoy no puedo controlar necesito entregarle a la calma?',
    '¿Qué pequeño logro o esfuerzo mío pasó desapercibido hoy, pero del cual me siento orgulloso/a?',
    'Si mi mejor amigo/a se sintiera como yo me siento hoy, ¿qué palabras de amor y apoyo le diría?',
    '¿Qué límite saludable necesito poner esta semana para proteger mi tranquilidad mental?',
    '¿Qué momento sencillo (un aroma, una risa, un rayo de sol) me trajo un instante de gratitud hoy?',
    '¿Qué necesito perdonarme a mí mismo/a por cosas que ocurrieron en el pasado?'
  ];

  const [promptIndex, setPromptIndex] = useState(0);
  const [reflectionText, setReflectionText] = useState('');
  const [moodFeeling, setMoodFeeling] = useState('aliviado');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Cargar si había algo guardado
  useEffect(() => {
    const saved = localStorage.getItem('emocion_sana_reflexion');
    if (saved) {
      setReflectionText(saved);
    }
  }, []);

  const handleNextPrompt = () => {
    setPromptIndex((prev) => (prev + 1) % reflectionPrompts.length);
  };

  const handleSaveReflection = (e) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;

    localStorage.setItem('emocion_sana_reflexion', reflectionText.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4500);
  };

  return (
    <section id="reflexion-personal" className="content-section">
      <div className="section-header">
        <span className="section-tag">Diario Consciente</span>
        <h2 className="section-title">Reflexión Personal del Día</h2>
        <p className="section-description">
          Darte 3 minutos para responder con sinceridad transforma la mente. 
          Escribe tus respuestas y guárdalas como un regalo para tu bienestar.
        </p>
      </div>

      <div className="reflection-card-container">
        <div className="reflection-prompt-header">
          <span className="reflection-icon">📖✨</span>
          <h3 className="reflection-prompt-question">
            "{reflectionPrompts[promptIndex]}"
          </h3>
          <button 
            type="button"
            onClick={handleNextPrompt} 
            className="btn-secondary"
            style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem', marginTop: '0.5rem' }}
          >
            🎲 Cambiar Pregunta de Reflexión
          </button>
        </div>

        <form onSubmit={handleSaveReflection}>
          <textarea
            className="reflection-textarea"
            placeholder="Escribe con total libertad y honestidad aquí... Nadie más que tú leerá esto."
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
          />

          <div className="reflection-mood-choice">
            <span style={{ fontWeight: 800, color: 'var(--texto-secundario)', fontSize: '0.9rem' }}>
              ¿Cómo te sientes después de escribir?
            </span>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {[
                { id: 'aliviado', label: '🌸 Más aliviado/a' },
                { id: 'pensativo', label: '🧠 Reflexivo/a' },
                { id: 'esperanza', label: '🌱 Con esperanza' },
                { id: 'calma', label: '🕊️ En paz' }
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  className={`reflection-feeling-pill ${moodFeeling === m.id ? 'active' : ''}`}
                  onClick={() => setMoodFeeling(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button type="submit" className="btn-primary">
              💾 Guardar mi Reflexión en este dispositivo
            </button>
          </div>
        </form>

        {savedSuccess && (
          <div className="reflection-saved-alert">
            <span style={{ fontSize: '2rem' }}>🐰💖</span>
            <div>
              <h4 style={{ color: 'var(--rosado-fucsia)', margin: '0 0 0.3rem' }}>¡Reflexión guardada con cariño!</h4>
              <p style={{ margin: 0, color: 'var(--texto-principal)', fontSize: '0.95rem' }}>
                Cuidar de tu mundo interior es un gran paso. El conejito de la calma te acompaña en tu proceso.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
