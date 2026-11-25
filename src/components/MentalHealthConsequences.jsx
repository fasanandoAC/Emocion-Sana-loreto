import React from 'react';

export default function MentalHealthConsequences() {
  const consequences = [
    {
      icon: '🩺',
      area: 'En el Cuerpo Físico',
      items: [
        'Insomnio crónico y fatiga constante que no desaparece al dormir.',
        'Dolores musculares, tensión severa en cuello, espalda y mandíbula (bruxismo).',
        'Gastritis nerviosa, colon irritable y problemas digestivos frecuentes.',
        'Baja del sistema inmune: mayor vulnerabilidad a gripes e infecciones.'
      ],
      quote: '«El cuerpo grita lo que la mente y las emociones callan por meses.»'
    },
    {
      icon: '👥',
      area: 'En tus Relaciones Personales',
      items: [
        'Irritabilidad constante y discusiones con familiares o amigos por cosas pequeñas.',
        'Aislamiento social: cancelar planes y preferir quedarse solo/a por falta de energía.',
        'Desconfianza e inseguridad en los vínculos afectivos y de pareja.',
        'Sentimiento de que nadie te entiende o de ser una molestia para los demás.'
      ],
      quote: '«El aislamiento no cura el dolor, solo amplifica el eco de las preocupaciones.»'
    },
    {
      icon: '🎓💼',
      area: 'En los Estudios y el Trabajo',
      items: [
        'Dificultad severa para concentrarse, retener información y tomar decisiones.',
        'Procrastinación por miedo paralizante al fracaso o perfeccionismo extremo.',
        'Síndrome de burnout (agotamiento laboral/estudiantil) y apatía total.',
        'Riesgo de deserción escolar, universitaria o abandono de proyectos de vida.'
      ],
      quote: '«No eres flojo/a; tu cerebro está saturado de cortisol y necesita auxilio.»'
    },
    {
      icon: '🧠🌪️',
      area: 'En el Mundo Emocional',
      items: [
        'Aparición de ataques de pánico repentinos y sensación de pérdida de control.',
        'Depresión silenciosa: sonreír por fuera mientras por dentro sientes un vacío total.',
        'Pérdida de placer por las actividades y pasatiempos que antes amabas (anhedonia).',
        'Pensamientos intrusivos de desesperanza sobre el futuro y el valor de tu vida.'
      ],
      quote: '«Ninguna emoción dolorosa es eterna si aprendes a nombrarla y buscar ayuda.»'
    }
  ];

  return (
    <section id="consecuencias" className="content-section">
      <div className="section-header">
        <span className="section-tag">Prevención y Consciencia</span>
        <h2 className="section-title">¿Qué ocurre si no cuidamos nuestra salud mental?</h2>
        <p className="section-description">
          Ignorar el dolor emocional no lo hace desaparecer; solo hace que se acumule en el cuerpo 
          y en nuestra vida diaria. Conocer estas señales a tiempo puede salvarte o salvar a alguien que amas.
        </p>
      </div>

      <div className="consequences-grid">
        {consequences.map((c, idx) => (
          <div key={idx} className="consequence-card">
            <div className="consequence-header">
              <span className="consequence-icon">{c.icon}</span>
              <h3 className="consequence-area-title">{c.area}</h3>
            </div>
            <ul className="consequence-list">
              {c.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="consequence-quote">
              {c.quote}
            </div>
          </div>
        ))}
      </div>

      {/* Banner de Esperanza */}
      <div className="consequence-hope-banner">
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌱✨🐰</div>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--texto-principal)', marginBottom: '0.8rem' }}>
          La Gran Noticia: Todo esto se puede prevenir y sanar
        </h3>
        <p style={{ maxWidth: '780px', margin: '0 auto 1.5rem', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--texto-secundario)' }}>
          Así como un brazo quebrado necesita un yeso para soldar, una mente agotada necesita comprensión, 
          descanso y acompañamiento. No tienes que esperar a tocar fondo para darte permiso de sanar. 
          Aquí en Loreto hay caminos y personas dispuestas a escucharte.
        </p>
        <a href="#ayuda" className="btn-primary">
          <span>💜</span> Conoce las Líneas Gratuitas de Apoyo
        </a>
      </div>
    </section>
  );
}
