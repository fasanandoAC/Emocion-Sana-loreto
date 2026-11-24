import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  // Estado para el semáforo / selector de emociones
  const [selectedMood, setSelectedMood] = useState(null);

  // Estado para el ejercicio de respiración guiada
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale', 'rest'
  const [countdown, setCountdown] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // Estado para frases de aliento dinámicas
  const [affirmationIndex, setAffirmationIndex] = useState(0);

  const affirmations = [
    "No tienes que tenerlo todo resuelto hoy. Respirar ya es un gran paso.",
    "Tus sentimientos no son una carga ni una molestia; son una señal de que estás vivo y mereces cuidarte.",
    "Pedir ayuda no significa que fracasaste; demuestra que tienes el valor inmenso de sanar.",
    "Eres mucho más fuerte de lo que tu mente te dice en los días difíciles.",
    "El descanso también es productivo. Date permiso para pausar y recuperar tu paz."
  ];

  // Control del temporizador de respiración
  useEffect(() => {
    let interval = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount > 1) {
            return prevCount - 1;
          } else {
            // Cambio de fase
            if (breathPhase === 'inhale') {
              setBreathPhase('hold');
              return 4;
            } else if (breathPhase === 'hold') {
              setBreathPhase('exhale');
              return 4;
            } else if (breathPhase === 'exhale') {
              setBreathPhase('rest');
              return 4;
            } else {
              setBreathPhase('inhale');
              setCyclesCompleted((c) => c + 1);
              return 4;
            }
          }
        });
      }, 1000);
    } else {
      setCountdown(4);
      setBreathPhase('inhale');
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, breathPhase]);

  const moods = [
    {
      id: 'ansiedad',
      emoji: '⚡',
      title: 'Ansiedad o Miedo',
      description: 'Sientes opresión, pensamientos acelerados o inquietud.',
      color: 'var(--amarillo-sol)',
      advice: 'Tu sistema nervioso está en alerta, pero estás a salvo aquí y ahora. No creas todo lo que tu mente sobreanaliza en este instante.',
      tips: [
        { title: 'Técnica 5-4-3-2-1', text: 'Observa 5 cosas que veas, 4 que toques, 3 que oigas, 2 que huelas y 1 que saborees.' },
        { title: 'Exhala más largo', text: 'Haz que la exhalación sea el doble de lenta que la inhalación para calmar el ritmo cardíaco.' },
        { title: 'Pon los pies en la tierra', text: 'Camina descalzo unos minutos y siente el suelo firme sosteniéndote.' }
      ]
    },
    {
      id: 'tristeza',
      emoji: '🌧️',
      title: 'Tristeza o Vacío',
      description: 'Sientes ganas de llorar, desgano o pesadez.',
      color: 'var(--violeta-suave)',
      advice: 'La tristeza no es tu enemiga: es el corazón pidiendo suavidad, ternura y descanso. No te forces a fingir que todo está bien.',
      tips: [
        { title: 'Permítete sentir', text: 'Llorar libera hormonas del estrés; no reprimas tus lágrimas ni te juzgues.' },
        { title: 'Una pequeña acción', text: 'Toma un vaso de agua fresca, abrigate y haz solo una cosa a la vez.' },
        { title: 'Háblale a un amigo', text: 'Escribe un mensaje sencillo: "Hoy ha sido un día difícil, solo necesitaba recordarlo".' }
      ]
    },
    {
      id: 'abrumado',
      emoji: '🌪️',
      title: 'Abrumado / Agotado',
      description: 'Demasiadas responsabilidades o problemas acumulados.',
      color: 'var(--rosado-neon)',
      advice: 'Tu mente está sobrecargada porque has estado intentando sostener el mundo entero tú solo/a. Mereces soltar un poco de control.',
      tips: [
        { title: 'La regla del 10%', text: '¿Qué es lo único del día que realmente no puede esperar? Haz solo eso y aplaza el resto.' },
        { title: 'Pausa digital', text: 'Apaga las notificaciones durante los próximos 45 minutos.' },
        { title: 'Aprende a decir No', text: 'Poner límites no es egoísmo, es supervivencia y respeto por tu salud mental.' }
      ]
    },
    {
      id: 'soledad',
      emoji: '🕯️',
      title: 'Soledad o Incomprendido',
      description: 'Sientes que nadie te entiende o estás aislado.',
      color: 'var(--amarillo-luminoso)',
      advice: 'A veces estar rodeado de gente no calma el vacío, pero recuerda: somos miles en Loreto buscando conexiones reales y auténticas como tú.',
      tips: [
        { title: 'Conecta con la naturaleza', text: 'Mira el cielo, los árboles de nuestra hermosa Amazonía y respira el aire verde.' },
        { title: 'Escribe lo que sientes', text: 'Vierte en un papel todo sin filtro para que tu mente no cargue sola con el peso.' },
        { title: 'Línea de escucha', text: 'Nuestra red y la línea 113 opción 5 están disponibles para escucharte con empatía.' }
      ]
    },
    {
      id: 'esperanza',
      emoji: '🌱',
      title: 'Buscando Sanar',
      description: 'Deseas recuperar tu paz y construir hábitos sanos.',
      color: 'var(--blanco)',
      advice: '¡Qué gran paso! Reconocer que quieres sentirte mejor es la semilla más poderosa de la transformación. Vamos paso a paso.',
      tips: [
        { title: 'Celebra tus victorias', text: 'Incluso levantarte de la cama en un mal día es un logro que merece orgullo.' },
        { title: 'Crea tu ritual de calma', text: '5 minutos de silencio, música suave o una infusión caliente al anochecer.' },
        { title: 'Sé paciente contigo', text: 'Sanar no es una línea recta: habrá días buenos y días lentos, y ambos están bien.' }
      ]
    }
  ];

  const nextAffirmation = () => {
    setAffirmationIndex((prev) => (prev + 1) % affirmations.length);
  };

  return (
    <div className="app-container">
      {/* Luces difusas de fondo */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      <div className="bg-glow-orb orb-3"></div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-brand">
          <div className="brand-icon-box">🧠</div>
          <span className="brand-text">Emoción Sana Loreto</span>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#como-te-sientes">¿Cómo te sientes?</a></li>
            <li><a href="#respiracion">Calma</a></li>
            <li><a href="#etapas">Etapas de Vida</a></li>
            <li><a href="#mitos">Mitos</a></li>
            <li><a href="#ayuda">Ayuda Gratuita</a></li>
          </ul>
        </nav>
        <a href="tel:113" className="nav-emergency-btn">
          <span>🚨</span> Línea 113 (Opción 5)
        </a>
      </header>

      {/* HERO SECTION */}
      <main id="inicio" className="hero-section">
        <div className="hero-pill-badge">
          <span className="sparkle-icon">✨</span>
          <span>Espacio Seguro · Loreto Unido por tu Bienestar</span>
        </div>

        {/* TITULO REQUERIDO */}
        <h1 className="hero-title">
          emocion sana loreto
        </h1>

        {/* SUBTITULO REQUERIDO */}
        <p className="hero-subtitle">
          salud mental y emocional entre los jovenes , aolescentes y adultos
        </p>

        {/* FRASE MOTIVADORA DESTACADA */}
        <section className="motivational-card">
          <div className="quote-badge">
            <span>💛</span> Mensaje para tu corazón
          </div>
          <blockquote className="motivational-quote">
            «No tienes que luchar en silencio ni cargar con todo a solas. 
            <mark>Tu dolor es real, pero tu historia no termina aquí.</mark> 
            Cuidar de tu mente y abrazar tus emociones es el acto de valentía más hermoso que existe: 
            <strong> sanar sí es posible y jamás estarás solo/a en este camino.</strong>»
          </blockquote>
          <div className="motivational-author">
            <span>🌿</span>
            <span>Un abrazo cálido desde Loreto para tu bienestar emocional</span>
          </div>
        </section>

        {/* BOTONES DE LLAMADO A LA ACCIÓN */}
        <div className="hero-cta-group">
          <a href="#como-te-sientes" className="btn-primary">
            <span>💬</span> ¿Cómo te sientes hoy?
          </a>
          <a href="#respiracion" className="btn-secondary">
            <span>🧘</span> Ejercicio de Respiración
          </a>
          <a href="#ayuda" className="btn-pink">
            <span>🤝</span> Encontrar Ayuda Ahora
          </a>
        </div>
      </main>

      {/* SECCIÓN INTERACTIVA: ¿CÓMO TE SIENTES HOY? */}
      <section id="como-te-sientes" className="content-section">
        <div className="section-header">
          <span className="section-tag">Semáforo Emocional</span>
          <h2 className="section-title">¿Qué emoción estás sintiendo en este momento?</h2>
          <p className="section-description">
            Toca una de las tarjetas para recibir un mensaje de aliento y herramientas inmediatas para calmar tu mente.
          </p>
        </div>

        <div className="mood-grid">
          {moods.map((m) => (
            <button
              key={m.id}
              className={`mood-card ${selectedMood?.id === m.id ? 'active' : ''}`}
              onClick={() => setSelectedMood(m)}
            >
              <span className="mood-emoji">{m.emoji}</span>
              <h3 className="mood-title">{m.title}</h3>
              <p className="mood-desc">{m.description}</p>
            </button>
          ))}
        </div>

        {/* RESPUESTA PERSONALIZADA DE APOYO */}
        {selectedMood && (
          <div className="mood-response-box">
            <div className="mood-response-header">
              <span className="mood-response-badge">Apoyo Inmediato</span>
              <h3 className="mood-response-title">
                {selectedMood.emoji} {selectedMood.title}: Estamos contigo
              </h3>
            </div>
            <p className="mood-response-message">{selectedMood.advice}</p>

            <h4 style={{ color: 'var(--amarillo-sol)', fontSize: '1.15rem', marginBottom: '0.75rem' }}>
              💡 3 pequeños pasos que puedes dar ahora mismo:
            </h4>
            <div className="mood-tips-list">
              {selectedMood.tips.map((tip, idx) => (
                <div key={idx} className="mood-tip-item">
                  <strong>{tip.title}</strong>
                  <span>{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SECCIÓN DE RESPIRACIÓN Y CALMA */}
      <section id="respiracion" className="content-section">
        <div className="section-header">
          <span className="section-tag">Pausa Activa</span>
          <h2 className="section-title">Espacio de Calma y Respiración</h2>
          <p className="section-description">
            Si sientes que tu pecho está apretado o tu mente no para, sigue el ritmo de la esfera. 
            Inhala, sostén y exhala profundamente.
          </p>
        </div>

        <div className="breathing-container">
          <div className={`breathing-visual-wrap breathe-${breathPhase}`}>
            <div className="breathing-circle-outer"></div>
            <div className="breathing-circle-glow"></div>
            <div className="breathing-circle-core">
              <span className="breathing-phase-text">
                {breathPhase === 'inhale' && 'Inhala'}
                {breathPhase === 'hold' && 'Sostén'}
                {breathPhase === 'exhale' && 'Exhala'}
                {breathPhase === 'rest' && 'Pausa'}
              </span>
              <span className="breathing-countdown">{countdown}s</span>
            </div>
          </div>

          <p style={{ color: 'var(--texto-secundario)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            {isBreathingActive 
              ? `Ciclos completados: ${cyclesCompleted} · Sigue sintiendo el aire entrar y salir.` 
              : 'Presiona Iniciar para comenzar 1 minuto de respiración consciente.'}
          </p>

          <div className="breathing-controls">
            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className="btn-primary"
            >
              {isBreathingActive ? '⏸️ Pausar Ejercicio' : '▶️ Iniciar Respiración'}
            </button>
            {isBreathingActive && (
              <button
                onClick={() => {
                  setIsBreathingActive(false);
                  setCyclesCompleted(0);
                }}
                className="btn-secondary"
              >
                🔄 Reiniciar
              </button>
            )}
          </div>
        </div>
      </section>

      {/* PILARES POR ETAPAS: JOVENES, ADOLESCENTES Y ADULTOS */}
      <section id="etapas" className="content-section">
        <div className="section-header">
          <span className="section-tag">Acompañamiento por Etapas</span>
          <h2 className="section-title">Apoyo para Cada Momento de tu Vida</h2>
          <p className="section-description">
            En Loreto comprendemos que los desafíos emocionales se viven distinto a cualquier edad. 
            Aquí encuentras empatía adaptada a tu realidad.
          </p>
        </div>

        <div className="pillars-grid">
          {/* ADOLESCENTES */}
          <article className="pillar-card">
            <div className="pillar-icon-header">
              <div className="pillar-icon">🎒</div>
              <span className="pillar-age-badge">12 a 17 años</span>
            </div>
            <h3 className="pillar-title">Adolescentes</h3>
            <p className="pillar-subtitle">Descubriendo tu propia voz y valor</p>
            <ul className="pillar-list">
              <li>Manejo de la presión escolar y expectativas de otros.</li>
              <li>Autoestima, imagen corporal y el impacto de redes sociales.</li>
              <li>Sentimientos intensos, cambios de humor y soledad.</li>
              <li>Acoso escolar (bullying) y comunicación con la familia.</li>
            </ul>
            <div className="pillar-quote-box">
              «No eres "demasiado dramático/a". Lo que sientes es importante, real y merece ser escuchado.»
            </div>
          </article>

          {/* JÓVENES */}
          <article className="pillar-card">
            <div className="pillar-icon-header">
              <div className="pillar-icon">🎓</div>
              <span className="pillar-age-badge">18 a 29 años</span>
            </div>
            <h3 className="pillar-title">Jóvenes</h3>
            <p className="pillar-subtitle">Navegando el futuro sin perder tu paz</p>
            <ul className="pillar-list">
              <li>Incertidumbre laboral, universitaria y vocacional.</li>
              <li>Síndrome del impostor y compararse con los demás.</li>
              <li>Relaciones de pareja, rupturas y duelos afectivos.</li>
              <li>Emancipación, independencia y manejo del estrés financiero.</li>
            </ul>
            <div className="pillar-quote-box">
              «Tu valor como persona no depende de la velocidad con la que alcances tus metas. Respira.»
            </div>
          </article>

          {/* ADULTOS */}
          <article className="pillar-card">
            <div className="pillar-icon-header">
              <div className="pillar-icon">💼</div>
              <span className="pillar-age-badge">30+ años</span>
            </div>
            <h3 className="pillar-title">Adultos</h3>
            <p className="pillar-subtitle">Cuidando de ti mientras sostienes tu hogar</p>
            <ul className="pillar-list">
              <li>Sobrecarga mental, laboral y agotamiento crónico (burnout).</li>
              <li>Crianza consciente y acompañamiento emocional familiar.</li>
              <li>Duelos acumulados, pérdidas y transiciones de vida.</li>
              <li>Reencontrarse consigo mismo más allá de las obligaciones.</li>
            </ul>
            <div className="pillar-quote-box">
              «No puedes servir de un vaso vacío. Cuidar de tu salud mental es el mayor acto de amor para los tuyos.»
            </div>
          </article>
        </div>
      </section>

      {/* MITOS VS REALIDADES */}
      <section id="mitos" className="content-section">
        <div className="section-header">
          <span className="section-tag">Derribando Tabúes</span>
          <h2 className="section-title">Hablemos de Salud Mental sin Miedos</h2>
          <p className="section-description">
            En muchas familias de nuestra región aún existe vergüenza de hablar sobre emociones. 
            Rompamos los mitos juntos.
          </p>
        </div>

        <div className="myths-grid">
          <div className="myth-card">
            <span className="myth-tag">❌ MITO POPULAR</span>
            <p className="myth-text">"Ir al psicólogo o pedir ayuda es solo para locos o débiles."</p>
            <span className="reality-tag">✅ LA REALIDAD</span>
            <p className="reality-text">
              Buscar ayuda es para las personas más valientes: aquellas que deciden no rendirse y aprender herramientas para ser felices.
            </p>
          </div>

          <div className="myth-card">
            <span className="myth-tag">❌ MITO POPULAR</span>
            <p className="myth-text">"Si le pones ganas y fuerza de voluntad, la depresión se pasa sola."</p>
            <span className="reality-tag">✅ LA REALIDAD</span>
            <p className="reality-text">
              Así como no le pedirías a alguien con fractura que corra, la salud mental requiere empatía, tiempo y acompañamiento profesional.
            </p>
          </div>

          <div className="myth-card">
            <span className="myth-tag">❌ MITO POPULAR</span>
            <p className="myth-text">"Los adolescentes solo quieren llamar la atención cuando dicen que están tristes."</p>
            <span className="reality-tag">✅ LA REALIDAD</span>
            <p className="reality-text">
              Toda señal de dolor es un llamado genuino a la conexión. Escuchar a tiempo salva vidas y fortalece la confianza familiar.
            </p>
          </div>
        </div>
      </section>

      {/* PÍLDORA DE AFIRMACIÓN DIARIA */}
      <section className="content-section" style={{ textAlign: 'center', paddingTop: '1rem' }}>
        <div className="motivational-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="quote-badge">☀️ Afirmación de Fuerza</span>
          <p className="motivational-quote" style={{ fontSize: '1.4rem' }}>
            "{affirmations[affirmationIndex]}"
          </p>
          <button onClick={nextAffirmation} className="btn-primary" style={{ marginTop: '1rem' }}>
            🔄 Leer otra frase motivadora
          </button>
        </div>
      </section>

      {/* SECCIÓN DE AYUDA Y LINEAS DE APOYO */}
      <section id="ayuda" className="content-section">
        <div className="help-section-card">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--blanco)' }}>
            Líneas de Atención Gratuita
          </span>
          <h2 className="section-title" style={{ color: 'var(--blanco)' }}>
            Nunca estás solo/a en Loreto: Estamos para ayudarte
          </h2>
          <p className="section-description" style={{ color: 'var(--amarillo-luminoso)' }}>
            Si tú o alguien que conoces está atravesando una crisis emocional, comunícate de manera gratuita, confidencial y sin costo alguno.
          </p>

          <div className="help-channels-grid">
            <div className="help-channel-box">
              <span className="help-channel-icon">📞</span>
              <span className="help-channel-number">113 (Opción 5)</span>
              <span className="help-channel-name">MINSA - Salud Mental Perú</span>
              <span className="help-channel-desc">
                Orientación psicológica gratuita disponible las 24 horas, los 365 días del año desde cualquier celular o teléfono fijo.
              </span>
            </div>

            <div className="help-channel-box">
              <span className="help-channel-icon">🏥</span>
              <span className="help-channel-number">CSMC Loreto</span>
              <span className="help-channel-name">Centros de Salud Mental Comunitarios</span>
              <span className="help-channel-desc">
                Atención presencial especializada en Iquitos, Punchana, Belén, San Juan Bautista y provincias de la región Loreto.
              </span>
            </div>

            <div className="help-channel-box">
              <span className="help-channel-icon">💜</span>
              <span className="help-channel-number">Línea 100</span>
              <span className="help-channel-name">Atención en Crisis y Violencia</span>
              <span className="help-channel-desc">
                Servicio telefónico confidencial del Ministerio de la Mujer y Poblaciones Vulnerables para apoyo emocional y contención urgente.
              </span>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <a 
              href="https://api.whatsapp.com/send?text=Hola,%20necesito%20orientaci%C3%B3n%20y%20apoyo%20emocional%20con%20Emoci%C3%B3n%20Sana%20Loreto" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              <span>💬</span> Escribir por WhatsApp a una Red de Apoyo
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="nav-brand" style={{ justifyContent: 'center' }}>
            <div className="brand-icon-box">🌿</div>
            <span className="brand-text">Emoción Sana Loreto</span>
          </div>
          <p className="footer-quote">
            «Como los ríos de nuestra Amazonía que siempre encuentran su curso hacia el mar, 
            tu vida también encontrará calma y luz. Florecer a tu ritmo es el camino.»
          </p>
          <p className="footer-copy">
            © {new Date().getFullYear()} Emoción Sana Loreto · Promoviendo la salud mental y emocional entre jóvenes, adolescentes y adultos.
          </p>
        </div>
      </footer>
    </div>
  );
}
