import React, { useState } from 'react';

export default function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      title: '¿Cómo ha sido tu calidad de sueño y descanso estos últimos días?',
      options: [
        { text: 'Duermo tranquilo/a y me despierto con energía renovada.', points: 3 },
        { text: 'Me cuesta dormir o me despierto con la mente acelerada a veces.', points: 2 },
        { text: 'Casi no duermo, tengo insomnio constante o pesadillas por estrés.', points: 1 }
      ]
    },
    {
      id: 2,
      title: 'Cuando las cosas no salen como esperabas, ¿cómo te hablas a ti mismo/a?',
      options: [
        { text: 'Con paciencia y comprensión; entiendo que equivocarme es humano.', points: 3 },
        { text: 'A veces me frustro y me recrimino, pero intento calmarme después.', points: 2 },
        { text: 'Con mucha dureza, culpa y autocrítica severa; siento que no valgo nada.', points: 1 }
      ]
    },
    {
      id: 3,
      title: '¿Te permites momentos para descansar y relajarte sin sentir culpa?',
      options: [
        { text: 'Sí, disfruto de mis pausas y cuido mi tiempo libre sin remordimientos.', points: 3 },
        { text: 'Me cuesta; cuando descanso siento que debería estar produciendo algo.', points: 2 },
        { text: 'Nunca; parar me genera una ansiedad inmensa y me siento improductivo/a.', points: 1 }
      ]
    },
    {
      id: 4,
      title: '¿Cómo sientes tu cuerpo físicamente en este momento de tu vida?',
      options: [
        { text: 'Liviano y relajado; mi respiración fluye sin dificultad.', points: 3 },
        { text: 'Con nudos en el cuello, mandíbula apretada o pesadez en hombros a ratos.', points: 2 },
        { text: 'Agotamiento crónico, dolores frecuentes de cabeza o estómago por tensión.', points: 1 }
      ]
    },
    {
      id: 5,
      title: 'Si hoy estuvieras viviendo un día muy difícil, ¿qué harías?',
      options: [
        { text: 'Hablaría con un amigo, familiar o profesional sin miedo a pedir apoyo.', points: 3 },
        { text: 'Dudaría mucho, pero si me siento al límite buscaría a alguien de confianza.', points: 2 },
        { text: 'Me guardaría todo y sufriría en soledad para no preocupar a nadie.', points: 1 }
      ]
    }
  ];

  const handleSelectOption = (points) => {
    const updatedAnswers = [...answers, points];
    setAnswers(updatedAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);

  const getResultData = () => {
    if (totalScore >= 13) {
      return {
        badge: 'Nivel Verde · Armonía',
        badgeColor: 'badge-green',
        title: '🌿 Tu batería emocional está en equilibrio',
        summary: 'Estás cuidando de ti, escuchando tus ritmos y cultivando autocompasión. ¡Felicitaciones! Este es el fruto de tu amor propio.',
        tips: [
          'Sigue manteniendo tus límites saludables sin disculparte.',
          'Comparte tu calma con quienes te rodean en tu escuela, trabajo o familia.',
          'Recuerda que los días difíciles pueden venir, pero tienes herramientas para afrontarlos.'
        ]
      };
    } else if (totalScore >= 9) {
      return {
        badge: 'Nivel Lila · Señal de Alerta',
        badgeColor: 'badge-lila',
        title: '🌸 Tu mente y cuerpo están pidiendo un respiro',
        summary: 'Has estado cargando más peso del necesario y la autoexigencia está empezando a pasar factura. Es momento de bajar la velocidad.',
        tips: [
          'Regálate hoy una pausa de 30 minutos sin pantallas ni obligaciones.',
          'Practica el ejercicio de respiración y el método de anclaje de nuestra página.',
          'Elige una tarea de tu lista que no sea urgente y posponla sin remordimientos.'
        ]
      };
    } else {
      return {
        badge: 'Nivel Rosado · Cuidado Prioritario',
        badgeColor: 'badge-pink',
        title: '💜 Tu corazón necesita un abrazo y apoyo ahora mismo',
        summary: 'Estás sosteniendo demasiado tú solo/a y tu energía está al límite. No tienes por qué luchar en silencio. Pedir ayuda es tu derecho y tu mayor acto de valentía.',
        tips: [
          'Comunícate hoy mismo con la Línea gratuita 113 opción 5 (MINSA Perú).',
          'Habla con una persona segura y dile: "No estoy bien hoy, solo necesito que me escuches".',
          'Recuerda que no eres una carga para nadie y tu vida tiene un valor incalculable.'
        ]
      };
    }
  };

  const result = showResult ? getResultData() : null;

  return (
    <section id="cuestionario" className="content-section">
      <div className="section-header">
        <span className="section-tag">Autoevaluación Consciente</span>
        <h2 className="section-title">Cuestionario de Bienestar Emocional</h2>
        <p className="section-description">
          Un espacio seguro y confidencial para mirar dentro de ti. No hay respuestas buenas ni malas; 
          solo un chequeo amoroso de tu estado actual.
        </p>
      </div>

      <div className="quiz-container-card">
        {!showResult ? (
          <div>
            {/* Barra de progreso */}
            <div className="quiz-progress-header">
              <span style={{ fontWeight: 800, color: 'var(--rosado-fucsia)' }}>
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--texto-secundario)', fontWeight: 600 }}>
                {Math.round(((currentQuestion) / questions.length) * 100)}% completado
              </span>
            </div>

            <div className="quiz-progress-bar-wrap">
              <div 
                className="quiz-progress-bar-fill" 
                style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
              />
            </div>

            <h3 className="quiz-question-title">
              {questions[currentQuestion].title}
            </h3>

            <div className="quiz-options-list">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  className="quiz-option-btn"
                  onClick={() => handleSelectOption(option.points)}
                >
                  <span className="option-indicator">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-result-box">
            <span className={`quiz-result-badge ${result.badgeColor}`}>
              {result.badge}
            </span>
            <h3 className="quiz-result-title">{result.title}</h3>
            <p className="quiz-result-summary">{result.summary}</p>

            <div className="quiz-tips-box">
              <h4 style={{ color: 'var(--rosado-fucsia)', marginBottom: '0.8rem', fontSize: '1.15rem' }}>
                🐰 Pasos recomendados para ti:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {result.tips.map((tip, idx) => (
                  <li key={idx} style={{ marginBottom: '0.65rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--texto-secundario)' }}>
                    <span>✨</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleReset} className="btn-secondary">
                🔄 Repetir Cuestionario
              </button>
              <a href="#ayuda" className="btn-primary">
                💬 Hablar con una Red de Apoyo
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
