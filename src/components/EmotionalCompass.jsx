import React, { useState } from 'react';

export default function EmotionalCompass() {
  const [activeEmotion, setActiveEmotion] = useState(null);

  const emotionsList = [
    {
      id: 'ansiedad',
      emoji: '⚡',
      name: 'Ansiedad / Inquietud',
      tag: 'Cuerpo en alerta',
      meaning: 'Sientes que algo malo puede pasar, tu corazón late deprisa o no puedes parar de sobrepensar.',
      reason: 'Tu cerebro primitivo cree que hay un peligro y está intentando protegerte, aunque no haya una amenaza real.',
      bodyMessage: '«Respira lento. Estoy asustado/a, pero en este instante estoy a salvo.»',
      microAction: 'Coloca una mano en tu pecho y di en voz alta 3 cosas reales que ves ahora mismo. Tu cuerpo volverá al presente.'
    },
    {
      id: 'tristeza',
      emoji: '🌧️',
      name: 'Tristeza / Desgano',
      tag: 'El corazón pide ternura',
      meaning: 'Sientes pesadez, ganas de llorar, falta de energía o una sensación de vacío.',
      reason: 'Has perdido algo valioso (energía, una ilusión, una persona) o has aguantado demasiado peso sin descanso.',
      bodyMessage: '«Permíteme llorar y soltar. No me obligues a fingir alegría cuando necesito sanar.»',
      microAction: 'Abrígate, toma un vaso con agua tibia y descansa sin juzgarte. Llorar limpia la química de tu mente.'
    },
    {
      id: 'ira',
      emoji: '🌋',
      name: 'Frustración / Enojo',
      tag: 'Límites vulnerados',
      meaning: 'Sientes calor en el pecho, tensión en mandíbula y ganas de gritar o confrontar.',
      reason: 'Sientes que algo es injusto, que cruzaron tus límites o que tus planes no salieron como esperabas.',
      bodyMessage: '«Hay un límite mío que fue roto. Necesito defenderme con respeto y sin hacerme daño.»',
      microAction: 'Aplica la regla de los 90 segundos: no envíes mensajes ni tomes decisiones hasta que tu respiración baje.'
    },
    {
      id: 'vacio',
      emoji: '🌫️',
      name: 'Vacío / Apatía',
      tag: 'Sobrecarga de estímulos',
      meaning: 'No sientes tristeza ni alegría, solo desconexión y falta de sentido en lo que haces.',
      reason: 'Tu sistema nervioso se desconectó como mecanismo de defensa tras semanas de estrés continuo o rutina agotadora.',
      bodyMessage: '«Estoy agotado/a de tanta exigencia. Necesito simplicidad, naturaleza y silencio.»',
      microAction: 'Sal 10 minutos a mirar los árboles o el río de nuestra Amazonía. Deja el celular en otra habitación.'
    },
    {
      id: 'culpa',
      emoji: '🍂',
      name: 'Culpa / Autoexigencia',
      tag: 'Juez interno severo',
      meaning: 'Sientes que no eres suficiente, que defraudaste a los tuyos o que no haces lo que deberías.',
      reason: 'Adoptaste estándares irreales y voces de crítica que no te corresponden. Eres humano, no una máquina.',
      bodyMessage: '«Hice lo mejor que pude con los recursos y la madurez que tenía en ese momento.»',
      microAction: 'Escríbete una carta como si le hablaras a tu conejito o a tu mejor amigo. ¿Le dirías las mismas palabras duras?'
    },
    {
      id: 'miedo',
      emoji: '🌪️',
      name: 'Miedo al Futuro',
      tag: 'Vértigo ante lo incierto',
      meaning: 'Incertidumbre sobre qué pasará con tus estudios, tu trabajo, tu familia o tus decisiones.',
      reason: 'El cerebro odia los vacíos de información y llena el futuro con los peores escenarios posibles.',
      bodyMessage: '«El futuro aún no existe. Solo puedo construir lo que tengo enfrente hoy.»',
      microAction: 'Escribe: "¿Qué es lo peor que podría pasar y qué haría si pasara?". Nombrar el miedo le quita el 80% de su fuerza.'
    },
    {
      id: 'nostalgia',
      emoji: '🌅',
      name: 'Nostalgia / Melancolía',
      tag: 'El valor de lo vivido',
      meaning: 'Un dulce dolor por etapas pasadas, seres queridos lejanos o tiempos que no volverán.',
      reason: 'Tu corazón recuerda el amor y los momentos significativos con gratitud y anhelo.',
      bodyMessage: '«Dolió porque fue hermoso. Honro lo vivido pero abro espacio a nuevas memorias.»',
      microAction: 'Pon una canción suave o envía un mensaje sincero a quien extrañes diciendo simplemente: "Me acordé de ti con cariño".'
    },
    {
      id: 'calma',
      emoji: '🌱',
      name: 'Calma / Alivio',
      tag: 'El hogar interior',
      meaning: 'Respiración tranquila, hombros sueltos y una sensación de que todo estará bien.',
      reason: 'Tu sistema parasimpático ha tomado el control. Estás en sintonía con tu propio ritmo.',
      bodyMessage: '«Aquí estoy seguro/a. La vida puede ser amable cuando me trato con amor.»',
      microAction: 'Disfruta de este momento. Haz una inhalación profunda y ancla esta sensación en tu memoria.'
    },
    {
      id: 'gratitud',
      emoji: '🌸',
      name: 'Gratitud / Conexión',
      tag: 'Abundancia en lo simple',
      meaning: 'Reconocer los pequeños regalos del día: una taza caliente, una sonrisa, el aire fresco.',
      reason: 'Entrenas a tu cerebro a notar lo que sí funciona en tu vida en lugar de obsesionarte con lo que falta.',
      bodyMessage: '«Hay belleza a mi alrededor, incluso en medio de las pruebas difíciles.»',
      microAction: 'Agradece en silencio 3 cosas que diste por sentadas hoy (tu cama, tu capacidad de respirar, una persona linda).'
    },
    {
      id: 'motivacion',
      emoji: '☀️',
      name: 'Alegría / Motivación',
      tag: 'Energía expansiva',
      meaning: 'Ganas de crear, salir adelante, apoyar a otros y disfrutar de tus proyectos.',
      reason: 'Tus niveles de dopamina y serotonina están balanceados. Sientes propósito y entusiasmo.',
      bodyMessage: '«Aprovechemos este impulso para sembrar hábitos que nos cuiden en los días difíciles.»',
      microAction: 'Usa esta energía para avanzar en ese proyecto personal que dejaste de lado o envía un abrazo a alguien que lo necesite.'
    }
  ];

  return (
    <section id="brujula-emocional" className="content-section">
      <div className="section-header">
        <span className="section-tag">Identifica lo que sientes</span>
        <h2 className="section-title">Brújula de Emociones</h2>
        <p className="section-description">
          A veces decimos "no sé qué me pasa". Toca una emoción para entender qué te está diciendo tu mente, 
          por qué surgió y cómo acompañarte con amor propio.
        </p>
      </div>

      {/* Cuadrícula de opciones emocionales */}
      <div className="emotions-compass-grid">
        {emotionsList.map((emo) => (
          <button
            key={emo.id}
            className={`emotion-compass-card ${activeEmotion?.id === emo.id ? 'active' : ''}`}
            onClick={() => setActiveEmotion(emo)}
          >
            <span className="compass-emoji">{emo.emoji}</span>
            <span className="compass-name">{emo.name}</span>
            <span className="compass-tag">{emo.tag}</span>
          </button>
        ))}
      </div>

      {/* Detalle interactivo de la emoción seleccionada */}
      {activeEmotion ? (
        <div className="emotion-detail-card">
          <div className="detail-header-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <span style={{ fontSize: '2.8rem' }}>{activeEmotion.emoji}</span>
              <div>
                <h3 style={{ fontSize: '1.7rem', color: 'var(--texto-principal)', margin: 0 }}>
                  {activeEmotion.name}
                </h3>
                <span className="section-tag" style={{ marginTop: '0.3rem', fontSize: '0.8rem', padding: '0.2rem 0.8rem' }}>
                  {activeEmotion.tag}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setActiveEmotion(null)} 
              className="btn-secondary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              ✕ Cerrar
            </button>
          </div>

          <div className="detail-body-grid">
            <div className="detail-item-box">
              <h4>🔍 ¿Qué significa?</h4>
              <p>{activeEmotion.meaning}</p>
            </div>

            <div className="detail-item-box">
              <h4>🧠 ¿Por qué la sientes?</h4>
              <p>{activeEmotion.reason}</p>
            </div>

            <div className="detail-item-box highlight-box">
              <h4>💌 Mensaje de tu ser interior:</h4>
              <p style={{ fontStyle: 'italic', fontWeight: 600 }}>{activeEmotion.bodyMessage}</p>
            </div>

            <div className="detail-item-box action-box">
              <h4>🐰 Micro-acción inmediata para regularte:</h4>
              <p>{activeEmotion.microAction}</p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--rosado-fucsia)', fontWeight: 700 }}>
          👆 Selecciona una de las 10 emociones para ver su explicación y guía práctica.
        </div>
      )}
    </section>
  );
}
