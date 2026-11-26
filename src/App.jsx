import React, { useState, useEffect } from 'react';
import './App.css';
import Decorations from './components/Decorations';
import EmotionalCompass from './components/EmotionalCompass';
import CreativeSpace from './components/CreativeSpace';
import MuralDeDibujos from './components/MuralDeDibujos';
import InteractiveQuiz from './components/InteractiveQuiz';
import CuteGame from './components/CuteGame';
import EmotionalTools from './components/EmotionalTools';
import PersonalReflection from './components/PersonalReflection';
import TipsSection from './components/TipsSection';
import MentalHealthConsequences from './components/MentalHealthConsequences';
import SoundBar from './components/SoundBar';
import { playZenBell, playClickSound } from './utils/audio';
import imgCieloEstrellado from './assets/cielo-estrellado.jpg';
import imgAtardecerRioAmazonas from './assets/atardecer-rio-amazonas.jpg';

export default function App() {
  // Estado para el semáforo / selector de emociones
  const [selectedMood, setSelectedMood] = useState(null);

  // Estado para el ejercicio de respiración guiada
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale', 'rest'
  const [countdown, setCountdown] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // Estado para el Espacio Emocional: Ambientes de calma
  const [activeAmbiance, setActiveAmbiance] = useState('selva');

  // Estado para la Caja de Liberación Emocional
  const [thoughtInput, setThoughtInput] = useState('');
  const [releasedMessage, setReleasedMessage] = useState(null);

  // Estado para la Técnica 5-4-3-2-1 Grounding Interactiva
  const [groundingState, setGroundingState] = useState({
    step5: false,
    step4: false,
    step3: false,
    step2: false,
    step1: false,
  });

  // Estado para la Biblioteca Emocional
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Efecto de sonido global en botones y elementos interactivos
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const isInteractive = e.target.closest('button, a, .tool-mode-btn, .color-dot, .sticker-option, .sticker-tool-btn, .sticky-note-card, .emotion-compass-card, .quiz-option-btn, .ambient-type-btn');
      if (isInteractive) {
        playClickSound();
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Control del temporizador de respiración con campanillas zen
  useEffect(() => {
    let interval = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount > 1) {
            return prevCount - 1;
          } else {
            if (breathPhase === 'inhale') {
              setBreathPhase('hold');
              playZenBell('hold');
              return 4;
            } else if (breathPhase === 'hold') {
              setBreathPhase('exhale');
              playZenBell('exhale');
              return 4;
            } else if (breathPhase === 'exhale') {
              setBreathPhase('rest');
              playZenBell('rest');
              return 4;
            } else {
              setBreathPhase('inhale');
              playZenBell('inhale');
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

  // Ambientes del Espacio Emocional
  const ambiances = {
    selva: {
      title: 'Selva Viva de Loreto',
      desc: 'Siente la energía verde, la brisa amazónica y la sabiduría de la naturaleza que siempre renueva la vida tras cada tormenta.',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
      affirmation: '«Como los grandes árboles de nuestra selva, tus raíces son más profundas y fuertes de lo que imaginas.»'
    },
    lluvia: {
      title: 'Lluvia Sanadora en la Amazonía',
      desc: 'El sonido y frescor del agua limpiando el follaje. Cierra tus ojos y permite que el cansancio se vaya con la corriente.',
      image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
      affirmation: '«La lluvia no destruye el paisaje, lo nutre. Tus lágrimas también limpian tu corazón para volver a florecer.»'
    },
    rio: {
      title: 'Atardecer Río Amazonas',
      desc: 'El calor y la serenidad del atardecer reflejados en las aguas doradas de nuestro gran río. Cierra los ojos y siente cómo el día se despide en calma.',
      image: imgAtardecerRioAmazonas,
      affirmation: '«Como el sol que se oculta sobre el Amazonas tras un día de vida, permítete descansar; mañana la luz volverá a renacer en ti.»'
    },
    noche: {
      title: 'Cielo Estrellado y Silencio',
      desc: 'La inmensidad y quietud del firmamento nocturno estrellado. Un manto protector de luz y paz donde tus pensamientos encuentran descanso.',
      image: imgCieloEstrellado,
      affirmation: '«Por más oscura que parezca la noche, las estrellas brillan con más fuerza. Tu calma y tu claridad están en ti.»'
    }
  };

  // Artículos de la Biblioteca Emocional
  const libraryArticles = [
    {
      id: 1,
      category: 'Crisis',
      title: 'Primeros auxilios ante una crisis de pánico o ansiedad',
      desc: 'Aprende qué hacer cuando el corazón se acelera y sientes que pierdes el control. Una guía clara y compasiva.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      content: `Un ataque de pánico es una respuesta de alarma de tu cuerpo, pero NO es peligroso ni causará daño a tu salud. 
      
Pasos clave para atravesarlo:
1. Recuerda: "Esto pasará. Mi cuerpo está asustado pero no estoy en peligro real."
2. Siéntate y apoya los dos pies firmes sobre el suelo.
3. Coloca una mano sobre tu pecho y otra sobre tu vientre. Inhala lentamente en 4 segundos y exhala en 6 segundos.
4. Moja tus muñecas o el rostro con agua fría: activa el reflejo de relajación del nervio vago.
5. No luches contra la sensación; déjala estar mientras sigues respirando. En pocos minutos la adrenalina descenderá por sí sola.`
    },
    {
      id: 2,
      category: 'Familia y Relaciones',
      title: 'Cómo hablar con tus padres o amigos sobre lo que sientes',
      desc: 'Guiones prácticos y consejos empáticos para romper el silencio y pedir apoyo sin sentir culpa ni vergüenza.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      content: `A veces el miedo más grande de los adolescentes y jóvenes es: "¿Qué dirán si les digo que me siento mal?".

Consejos para iniciar la conversación:
• Elige un momento tranquilo, no en medio de una discusión o apuro.
• Puedes empezar diciendo: "Mamá/Papá/Amigo, últimamente he estado cargando cosas difíciles en mi mente y no quiero seguir haciéndolo solo/a. Necesito que me escuches sin juzgarme".
• Si te cuesta hablar en voz alta, escribe una carta breve o un mensaje de WhatsApp: "No sé cómo explicarlo bien, pero necesito apoyo psicológico y me gustaría contar contigo".
• Pedir ayuda es una muestra de madurez y valentía que inspira respeto.`
    },
    {
      id: 3,
      category: 'Autoestima',
      title: 'Superar el Síndrome del Impostor y la Autoexigencia',
      desc: 'Deja de sentir que nunca eres "suficiente". Herramientas para abrazar tus virtudes y soltar la comparación en redes.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
      content: `Vivimos en una época donde comparamos nuestro detrás de escena con los momentos perfectos que otros muestran en redes sociales.

Verdades para sanar tu autoestima:
1. Tu valor humano es intrínseco: no depende de tus calificaciones, tu sueldo ni de cuántos seguidores tengas.
2. Cometer errores o sentirse perdido es parte natural de la juventud y la adultez.
3. Haz una lista de 3 cosas sencillas que lograste este año: levantarte tras un mal día cuenta como una gran victoria.
4. Silencia cuentas o personas que te hagan dudar de tu valor.`
    },
    {
      id: 4,
      category: 'Familia y Relaciones',
      title: 'Sanando un Corazón Roto: Duelo, Pérdida y Tristeza',
      desc: 'Cómo transitar el dolor de una ruptura, la pérdida de un ser querido o una etapa que llega a su fin.',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
      content: `El dolor emocional duele físicamente en el cuerpo. El duelo no tiene un calendario fijo ni reglas obligatorias.

Pasos para acompañarte en el dolor:
• Llorar es medicina natural: tus lágrimas eliminan toxinas y relajan el pecho.
• No te obligues a "estar feliz": date permiso de sentir tristeza sin quedarte estancado en la culpa.
• Rodéate de personas seguras que puedan estar en silencio a tu lado sin dar consejos vacíos.
• Confía en que el tiempo y el amor propio poco a poco reconstruirán tu alegría.`
    },
    {
      id: 5,
      category: 'Ansiedad y Estrés',
      title: 'Autocuidado Real para el Estrés Cotidiano y Burnout',
      desc: 'Estrategias de descanso auténtico para jóvenes trabajadores, estudiantes y adultos con sobrecarga familiar.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
      content: `El autocuidado no es solo mascarillas o compras; es aprender a poner límites firmes a lo que te roba la paz.

Prácticas de autocuidado profundo:
• Aprende a decir: "Hoy no puedo con esto, lo revisaré mañana".
• Haz una pausa de 10 minutos sin pantallas al mediodía para sentir tu respiración.
• Aliméntate e hidrátate con cariño: tu cuerpo es el hogar de tus emociones.
• Delegar tareas en el trabajo o el hogar no te hace débil, te hace sabio.`
    },
    {
      id: 6,
      category: 'Autoestima',
      title: 'Salud Emocional en la Adolescencia: Identidad y Presión',
      desc: 'Descubre cómo transitar los cambios, el acoso escolar y la búsqueda de tu propio camino con seguridad.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
      content: `La adolescencia es una montaña rusa de emociones y descubrimientos. 

Claves para cuidarte:
• No tienes que encajar con todo el mundo: los amigos verdaderos valoran quién eres sin fingir.
• Si sufres acoso o bullying escolar, busca de inmediato a un adulto de confianza. No guardes silencio, mereces respeto.
• Reconoce que las emociones intensas son temporales: lo que hoy parece el fin del mundo, mañana será una lección superada.`
    }
  ];

  // Filtro de biblioteca
  const filteredArticles = activeFilter === 'Todos'
    ? libraryArticles
    : libraryArticles.filter((art) => art.category === activeFilter);

  // Manejar liberación de pensamientos
  const handleReleaseThought = (e) => {
    e.preventDefault();
    if (!thoughtInput.trim()) return;

    setReleasedMessage({
      thought: thoughtInput,
      message: '🕊️ Tu pensamiento ha sido liberado de tu mente. No tienes que cargarlo más. Respira profundo: este instante es nuevo y mereces serenidad.'
    });
    setThoughtInput('');
  };

  // Cálculo de progreso para técnica 5-4-3-2-1
  const completedGroundingSteps = Object.values(groundingState).filter(Boolean).length;
  const groundingPercentage = (completedGroundingSteps / 5) * 100;

  const toggleGroundingStep = (step) => {
    setGroundingState((prev) => ({
      ...prev,
      [step]: !prev[step]
    }));
  };

  // Semáforo de emociones
  const moods = [
    {
      id: 'ansiedad',
      emoji: '⚡',
      title: 'Ansiedad o Inquietud',
      description: 'Sientes opresión, pensamientos acelerados o miedo.',
      advice: 'Tu sistema nervioso está sobreactivado, pero estás a salvo aquí y ahora. No creas todo lo que tu mente imagina en este momento.',
      tips: [
        { title: 'Técnica 5-4-3-2-1', text: 'Usa nuestra actividad interactiva más abajo para anclar tus sentidos.' },
        { title: 'Exhala largo', text: 'Haz que la exhalación sea el doble de lenta que la inhalación para regular tu ritmo cardíaco.' },
        { title: 'Siente tus pies', text: 'Apoya los pies descalzos sobre el suelo y siente el sostén de la tierra.' }
      ]
    },
    {
      id: 'tristeza',
      emoji: '🌧️',
      title: 'Tristeza o Vacío',
      description: 'Sientes desgano, ganas de llorar o pesadez en el pecho.',
      advice: 'La tristeza no es tu enemiga: es el corazón pidiendo suavidad, ternura y descanso. No te forces a sonreír si no lo sientes.',
      tips: [
        { title: 'Permítete sentir', text: 'Llorar libera endorfinas que alivian el dolor; no reprimas tus lágrimas.' },
        { title: 'Un vaso de agua fresca', text: 'Toma agua despacio, abrígate y dale un respiro a tus hombros.' },
        { title: 'Conexión humana', text: 'Escribe a un amigo o llama a la línea 113 opción 5 para conversar.' }
      ]
    },
    {
      id: 'abrumado',
      emoji: '🌪️',
      title: 'Sobrecarga y Agotamiento',
      description: 'Demasiadas responsabilidades o problemas acumulados.',
      advice: 'Tu mente está cansada porque has intentado sostenerlo todo a solas. Mereces soltar un poco de control.',
      tips: [
        { title: 'Elige solo 1 cosa', text: '¿Qué es lo único del día que de verdad importa? Hazlo y posterga el resto.' },
        { title: 'Pausa de desconexión', text: 'Apaga pantallas 30 minutos y camina o escucha los sonidos de la naturaleza.' },
        { title: 'Decir No es cuidarte', text: 'Poner límites saludables es un acto sagrado de amor propio.' }
      ]
    },
    {
      id: 'soledad',
      emoji: '🕯️',
      title: 'Soledad o Incomprensión',
      description: 'Sientes que nadie te entiende o que estás en aislamiento.',
      advice: 'Estar entre personas a veces no quita la soledad, pero recuerda: en Loreto somos miles buscando conexiones cálidas y honestas.',
      tips: [
        { title: 'Escribe sin censura', text: 'Descarga en la caja de pensamientos todo lo que no te atreves a decir en voz alta.' },
        { title: 'Mira el cielo', text: 'Recuerda que todos compartimos el mismo cielo loretano y nunca estamos completamente solos.' },
        { title: 'Espacio Seguro', text: 'Nuestra comunidad y las líneas de ayuda siempre tienen oídos abiertos para ti.' }
      ]
    },
    {
      id: 'esperanza',
      emoji: '🌱',
      title: 'Buscando Sanar',
      description: 'Deseas cultivar tu bienestar y hábitos saludables.',
      advice: '¡Qué gran paso! Reconocer que quieres sentirte mejor es la semilla más hermosa de tu transformación.',
      tips: [
        { title: 'Celebra tus avances', text: 'Cada día que decides levantarte y seguir adelante es un logro enorme.' },
        { title: 'Explora la biblioteca', text: 'Lee nuestras guías de autocuidado para fortalecer tu mente.' },
        { title: 'Sé compasivo contigo', text: 'Sanar tiene días altos y bajos; ambos son parte del viaje.' }
      ]
    }
  ];

  return (
    <div className="app-container">
      {/* Decoraciones flotantes cute (conejitos, cerebritos, mariposas, flores) */}
      <Decorations />

      {/* Luces de fondo difusas en lila bajo, rosado y violeta */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      <div className="bg-glow-orb orb-3"></div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-top-row">
          <div className="nav-brand">
            <div className="brand-icon-box">🧠</div>
            <div className="brand-text-group">
              <span className="brand-text">Emoción Sana Loreto</span>
              <span className="brand-tagline">Salud Mental & Emocional · Loreto</span>
            </div>
          </div>

          <div className="nav-top-actions">
            {/* Ajustes de Sonido en la parte superior junto a Línea 113 */}
            <SoundBar />

            {/* Botón de Emergencia Línea 113 */}
            <a href="tel:113" className="nav-emergency-btn" title="Llamar gratis a Línea 113 opción 5">
              <span>🚨</span>
              <span className="emergency-label">Línea 113 (Opción 5)</span>
            </a>
          </div>
        </div>

        {/* Barra de navegación pequeña y compacta para alcanzar todo el espacio */}
        <nav className="nav-compact-bar" aria-label="Navegación principal del sitio">
          <ul className="nav-links-compact">
            <li><a href="#inicio">🏠 Inicio</a></li>
            <li><a href="#brujula-emocional">🧭 Emociones</a></li>
            <li><a href="#espacio-creativo">🎨 Creatividad</a></li>
            <li><a href="#muro-de-dibujos">🖌️ Muro</a></li>
            <li><a href="#cuestionario">📝 Test</a></li>
            <li><a href="#juegos">🎮 Juegos</a></li>
            <li><a href="#herramientas-emocionales">🛠️ Herramientas</a></li>
            <li><a href="#espacio-emocional">🌿 Calma</a></li>
            <li><a href="#reflexion-personal">💭 Reflexión</a></li>
            <li><a href="#consejos">💡 Consejos</a></li>
            <li><a href="#consecuencias">⚠️ Consciencia</a></li>
            <li><a href="#biblioteca">📚 Biblioteca</a></li>
            <li><a href="#creadoras">👭 Creadoras</a></li>
            <li><a href="#ayuda">🆘 Ayuda</a></li>
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <main id="inicio" className="hero-section">
        <div className="hero-pill-badge">
          <span className="sparkle-icon">✨</span>
          <span>Espacio Seguro · Loreto Unido por tu Bienestar Emocional</span>
        </div>

        <div>
          <span className="creators-pill-badge">
            💖 Iniciativa creada con amor por <strong>Crhistel y Alexia</strong>
          </span>
        </div>

        {/* TITULO REQUERIDO */}
        <h1 className="hero-title">
          emocion sana loreto
        </h1>

        {/* SUBTITULO REQUERIDO */}
        <p className="hero-subtitle">
          salud mental y emocional entre los jovenes , aolescentes y adultos
        </p>

        {/* BANNER VISUAL CON IMAGEN TEMATICA Y FRASE MOTIVADORA */}
        <div className="hero-banner-visual">
          <div className="hero-img-wrap">
            <img 
              src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80" 
              alt="Luz y naturaleza serena en la Amazonía de Loreto" 
            />
            <div className="hero-img-badge">
              🌿 Paz y resiliencia en el corazón de Loreto
            </div>
          </div>

          {/* TARJETA DE FRASE MOTIVADORA */}
          <section className="motivational-card">
            <div className="quote-badge">
              <span>💜</span> Mensaje para tu corazón
            </div>
            <blockquote className="motivational-quote">
              «No tienes que luchar en silencio ni cargar con todo a solas. 
              <mark>Tu dolor es real, pero tu historia no termina aquí.</mark> 
              Cuidar de tu mente y abrazar tus emociones es el acto de valentía más hermoso que existe: 
              <strong> sanar sí es posible y jamás estarás solo/a en este camino.</strong>»
            </blockquote>
            <div className="motivational-author">
              <span>🌸</span>
              <span>Un abrazo cálido desde Loreto para tu bienestar emocional</span>
            </div>
          </section>
        </div>

        {/* BOTONES DE LLAMADO A LA ACCIÓN */}
        <div className="hero-cta-group">
          <a href="#brujula-emocional" className="btn-primary">
            <span>🧭</span> Identificar mis Emociones
          </a>
          <a href="#muro-de-dibujos" className="btn-pink">
            <span>🖼️</span> Muro de Dibujos
          </a>
          <a href="#espacio-creativo" className="btn-secondary">
            <span>🎨</span> Espacio Creativo
          </a>
          <a href="#juegos" className="btn-secondary">
            <span>🐰</span> Juegos Antiestrés
          </a>
        </div>
      </main>

      {/* COMPONENTES INTERACTIVOS PRINCIPALES */}
      <EmotionalCompass />
      <CreativeSpace />
      <MuralDeDibujos />
      <InteractiveQuiz />
      <CuteGame />
      <EmotionalTools />

      {/* SECCIÓN 1: ESPACIO EMOCIONAL (AMBIENTES Y DESCARGA) */}
      <section id="espacio-emocional" className="content-section">
        <div className="section-header">
          <span className="section-tag">Rincón de Paz y Conexión</span>
          <h2 className="section-title">Tu Espacio Emocional</h2>
          <p className="section-description">
            Un refugio visual y consciente donde puedes detenerte, contemplar la belleza de nuestra tierra 
            y soltar las cargas que no te pertenecen.
          </p>
        </div>

        {/* SELECTOR DE AMBIENTES DE CALMA */}
        <div className="emotional-space-card">
          <div className="ambiance-selector">
            <button 
              className={`ambiance-btn ${activeAmbiance === 'selva' ? 'active' : ''}`}
              onClick={() => setActiveAmbiance('selva')}
            >
              🌿 Selva Viva
            </button>
            <button 
              className={`ambiance-btn ${activeAmbiance === 'lluvia' ? 'active' : ''}`}
              onClick={() => setActiveAmbiance('lluvia')}
            >
              🌧️ Lluvia Sanadora
            </button>
            <button 
              className={`ambiance-btn ${activeAmbiance === 'rio' ? 'active' : ''}`}
              onClick={() => setActiveAmbiance('rio')}
            >
              🌅 Atardecer Río Amazonas
            </button>
            <button 
              className={`ambiance-btn ${activeAmbiance === 'noche' ? 'active' : ''}`}
              onClick={() => setActiveAmbiance('noche')}
            >
              🌌 Cielo Estrellado
            </button>
          </div>

          <div className="ambiance-display">
            <div className="ambiance-image-box">
              <img 
                src={ambiances[activeAmbiance].image} 
                alt={ambiances[activeAmbiance].title} 
              />
            </div>
            <div className="ambiance-text-box">
              <h3 className="ambiance-title">{ambiances[activeAmbiance].title}</h3>
              <p className="ambiance-desc">{ambiances[activeAmbiance].desc}</p>
              <div className="ambiance-affirmation">
                {ambiances[activeAmbiance].affirmation}
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVIDAD INTERACTIVA: CAJA DE LIBERACIÓN DE PENSAMIENTOS */}
        <div className="thought-release-section">
          <span className="section-tag">Actividad de Desahogo</span>
          <h3 className="section-title" style={{ fontSize: '2.1rem' }}>
            Caja de Liberación Emocional
          </h3>
          <p className="section-description" style={{ color: 'var(--texto-secundario)' }}>
            Escribe aquí el pensamiento intrusivo, la culpa, el miedo o el dolor que te está pesando hoy. 
            Al presionar el botón, lo dejarás ir.
          </p>

          <form onSubmit={handleReleaseThought}>
            <textarea
              className="thought-textarea"
              placeholder="Ejemplo: 'Siento mucha presión con mis estudios/trabajo y tengo miedo de defraudar a mi familia...'"
              value={thoughtInput}
              onChange={(e) => setThoughtInput(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              <span>🕊️</span> Soltar y Liberar este Pensamiento
            </button>
          </form>

          {releasedMessage && (
            <div className="thought-released-box">
              <p style={{ color: 'var(--rosado-fucsia)', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                «{releasedMessage.thought}»
              </p>
              <p style={{ color: 'var(--texto-principal)', fontSize: '1.15rem', fontWeight: 700 }}>
                {releasedMessage.message}
              </p>
              <button 
                onClick={() => setReleasedMessage(null)} 
                className="btn-secondary" 
                style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
              >
                Cerrar y continuar
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN 2: ACTIVIDADES INTERACTIVAS */}
      <section id="actividades" className="content-section">
        <div className="section-header">
          <span className="section-tag">Herramientas Prácticas</span>
          <h2 className="section-title">Actividades Interactivas para tu Bienestar</h2>
          <p className="section-description">
            Dinámicas guiadas paso a paso para ayudarte a regular la ansiedad, calmar la mente y conectar con el presente.
          </p>
        </div>

        {/* ACTIVIDAD 1: CONEXIÓN A TIERRA 5-4-3-2-1 */}
        <div className="grounding-activity-card">
          <div style={{ textAlign: 'center' }}>
            <span className="section-tag">Técnica Sensorial Antiansiedad</span>
            <h3 className="section-title" style={{ fontSize: '2.2rem' }}>
              Método de Anclaje 5-4-3-2-1
            </h3>
            <p className="section-description">
              Toca cada casilla a medida que encuentres los elementos a tu alrededor. 
              Esto desactiva la alarma de tu cerebro y te trae de vuelta a la calma.
            </p>
          </div>

          {/* Barra de progreso */}
          <div className="grounding-progress-wrap">
            <div 
              className="grounding-progress-bar" 
              style={{ width: `${groundingPercentage}%` }}
            ></div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--rosado-fucsia)', fontWeight: 800, marginBottom: '2rem' }}>
            Progreso: {completedGroundingSteps} de 5 pasos completados {completedGroundingSteps === 5 && '🎉 ¡Excelente! Siente la calma en tu cuerpo.'}
          </p>

          <div className="grounding-steps-grid">
            <div 
              className={`grounding-step-box ${groundingState.step5 ? 'checked' : ''}`}
              onClick={() => toggleGroundingStep('step5')}
            >
              <span className="grounding-step-num">5</span>
              <span className="grounding-step-title">👀 Mira</span>
              <span className="grounding-step-desc">5 cosas que puedas ver a tu alrededor</span>
              <span style={{ fontSize: '1.2rem', marginTop: '0.4rem' }}>{groundingState.step5 ? '✅ Hecho' : '⚪ Tocar aquí'}</span>
            </div>

            <div 
              className={`grounding-step-box ${groundingState.step4 ? 'checked' : ''}`}
              onClick={() => toggleGroundingStep('step4')}
            >
              <span className="grounding-step-num">4</span>
              <span className="grounding-step-title">✋ Toca</span>
              <span className="grounding-step-desc">4 texturas o cosas que puedas sentir</span>
              <span style={{ fontSize: '1.2rem', marginTop: '0.4rem' }}>{groundingState.step4 ? '✅ Hecho' : '⚪ Tocar aquí'}</span>
            </div>

            <div 
              className={`grounding-step-box ${groundingState.step3 ? 'checked' : ''}`}
              onClick={() => toggleGroundingStep('step3')}
            >
              <span className="grounding-step-num">3</span>
              <span className="grounding-step-title">👂 Escucha</span>
              <span className="grounding-step-desc">3 sonidos distintos en tu entorno</span>
              <span style={{ fontSize: '1.2rem', marginTop: '0.4rem' }}>{groundingState.step3 ? '✅ Hecho' : '⚪ Tocar aquí'}</span>
            </div>

            <div 
              className={`grounding-step-box ${groundingState.step2 ? 'checked' : ''}`}
              onClick={() => toggleGroundingStep('step2')}
            >
              <span className="grounding-step-num">2</span>
              <span className="grounding-step-title">👃 Huele</span>
              <span className="grounding-step-desc">2 olores que puedas percibir</span>
              <span style={{ fontSize: '1.2rem', marginTop: '0.4rem' }}>{groundingState.step2 ? '✅ Hecho' : '⚪ Tocar aquí'}</span>
            </div>

            <div 
              className={`grounding-step-box ${groundingState.step1 ? 'checked' : ''}`}
              onClick={() => toggleGroundingStep('step1')}
            >
              <span className="grounding-step-num">1</span>
              <span className="grounding-step-title">👅 Saborea</span>
              <span className="grounding-step-desc">1 sabor o bebe un sorbo de agua fresca</span>
              <span style={{ fontSize: '1.2rem', marginTop: '0.4rem' }}>{groundingState.step1 ? '✅ Hecho' : '⚪ Tocar aquí'}</span>
            </div>
          </div>
        </div>

        {/* ACTIVIDAD 2: RESPIRACIÓN GUIADA */}
        <div className="breathing-container">
          <span className="section-tag">Respiración Cuadrada 4-4-4</span>
          <h3 className="section-title" style={{ fontSize: '2.2rem' }}>
            Respiración Guiada Consciente
          </h3>
          <p className="section-description">
            Sigue la expansión de la esfera. Inhala, sostén y exhala para enviar una señal biológica de seguridad a tu corazón.
          </p>

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
              ? `Ciclos completados: ${cyclesCompleted} · Sigue sintiendo el aire entrar y salir suavemente.` 
              : 'Presiona Iniciar para sincronizar tu respiración.'}
          </p>

          <div className="breathing-controls">
            <button
              onClick={() => {
                if (!isBreathingActive) {
                  playZenBell('inhale');
                }
                setIsBreathingActive(!isBreathingActive);
              }}
              className="btn-primary"
            >
              {isBreathingActive ? '⏸️ Pausar Ejercicio' : '▶️ Iniciar Respiración con Sonido Zen 🔔'}
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
            <button
              type="button"
              onClick={() => playZenBell(breathPhase)}
              className="btn-secondary"
              title="Escuchar campanilla de meditación"
            >
              🔔 Probar Campana Zen
            </button>
          </div>
        </div>

        {/* ACTIVIDAD 3: SEMÁFORO EMOCIONAL */}
        <div style={{ marginTop: '4rem' }}>
          <div className="section-header">
            <span className="section-tag">Autochequeo Diario</span>
            <h3 className="section-title" style={{ fontSize: '2.2rem' }}>
              ¿Qué emoción predomina en ti hoy?
            </h3>
            <p className="section-description">
              Reconocer lo que sientes es el primer acto de amor propio. Selecciona una tarjeta para recibir orientación inmediata.
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
                <h4 className="mood-title">{m.title}</h4>
                <p className="mood-desc">{m.description}</p>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="mood-response-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="mood-response-badge">Orientación Inmediata</span>
                <h4 className="mood-response-title">
                  {selectedMood.emoji} {selectedMood.title}: Estamos contigo
                </h4>
              </div>
              <p className="mood-response-message">{selectedMood.advice}</p>

              <h5 style={{ color: 'var(--rosado-fucsia)', fontSize: '1.15rem', marginBottom: '0.75rem', fontWeight: 800 }}>
                💡 3 pequeños pasos para reconfortarte ahora:
              </h5>
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
        </div>
      </section>

      {/* DIARIO DE REFLEXIÓN PERSONAL */}
      <PersonalReflection />

      {/* CONSEJOS DE ORO PARA EL DÍA A DÍA */}
      <TipsSection />

      {/* CONSECUENCIAS DE NO CUIDAR LA SALUD MENTAL Y EMOCIONAL */}
      <MentalHealthConsequences />

      {/* SECCIÓN 3: BIBLIOTECA EMOCIONAL */}
      <section id="biblioteca" className="content-section">
        <div className="section-header">
          <span className="section-tag">Conocimiento para Sanar</span>
          <h2 className="section-title">Biblioteca Emocional</h2>
          <p className="section-description">
            Guías, artículos prácticos y lecturas comprensivas redactadas para jóvenes, adolescentes y adultos. 
            Información que acompaña, alivia y da herramientas para la vida diaria.
          </p>
        </div>

        {/* Filtros de la biblioteca */}
        <div className="library-filter-tabs">
          {['Todos', 'Crisis', 'Ansiedad y Estrés', 'Autoestima', 'Familia y Relaciones'].map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cuadrícula de artículos con imágenes */}
        <div className="library-grid">
          {filteredArticles.map((article) => (
            <article key={article.id} className="library-card">
              <div className="library-card-img-wrap">
                <img src={article.image} alt={article.title} />
                <span className="library-category-tag">{article.category}</span>
              </div>
              <div className="library-card-body">
                <h3 className="library-card-title">{article.title}</h3>
                <p className="library-card-desc">{article.desc}</p>
                <button 
                  onClick={() => setSelectedArticle(article)} 
                  className="library-read-btn"
                >
                  <span>📖</span> Leer Guía Completa
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MODAL DE LECTURA DE ARTÍCULO */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedArticle(null)}
              aria-label="Cerrar lectura"
            >
              ✕
            </button>
            <span className="section-tag">{selectedArticle.category}</span>
            <h2 style={{ fontSize: '1.9rem', color: 'var(--texto-principal)', margin: '0.8rem 0 1.25rem' }}>
              {selectedArticle.title}
            </h2>
            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.title} 
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '18px', marginBottom: '1.5rem' }}
            />
            <div style={{ whiteSpace: 'pre-line', fontSize: '1.08rem', lineHeight: '1.7', color: 'var(--texto-secundario)' }}>
              {selectedArticle.content}
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button onClick={() => setSelectedArticle(null)} className="btn-primary">
                Entendido y Guardar en mi Corazón 💜
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 4: ETAPAS DE VIDA (JOVENES, ADOLESCENTES Y ADULTOS) */}
      <section id="etapas" className="content-section">
        <div className="section-header">
          <span className="section-tag">Acompañamiento a tu Medida</span>
          <h2 className="section-title">Apoyo para Cada Etapa de tu Vida</h2>
          <p className="section-description">
            En Loreto comprendemos que cada edad enfrenta sus propios desafíos. Aquí encuentras empatía adaptada a tu realidad.
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
              «No eres "demasiado dramático/a". Lo que sientes es importante, real y merece ser escuchado con respeto.»
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
              <li>Emancipación, independencia y manejo del estrés económico.</li>
            </ul>
            <div className="pillar-quote-box">
              «Tu valor como persona no depende de la velocidad con la que alcances tus metas. Date permiso de respirar.»
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
              «No puedes servir de un vaso vacío. Cuidar de tu propia mente es el mayor regalo de amor para los tuyos.»
            </div>
          </article>
        </div>
      </section>

      {/* SECCIÓN 5: LÍNEAS DE AYUDA Y CONTACTO */}
      <section id="ayuda" className="content-section">
        <div className="help-section-card">
          <span className="section-tag">
            Líneas de Atención Gratuita y Confidencial
          </span>
          <h2 className="section-title">
            Nunca estás solo/a en Loreto: Estamos para ayudarte
          </h2>
          <p className="section-description">
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
                Servicio telefónico confidencial del Ministerio de la Mujer y Poblaciones Vulnerables para contención emocional urgente.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: CREADORAS */}
      <section id="creadoras" className="content-section">
        <div className="creators-card">
          <span className="section-tag">Nuestra Misión y Corazón</span>
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>
            Conoce a las Creadoras
          </h2>
          <p className="section-description">
            Esta plataforma nació de la empatía, el compromiso y el amor por nuestra comunidad en Loreto. 
            Queremos que cada joven, adolescente y adulto sepa que su bienestar emocional es lo más valioso.
          </p>

          <div className="creators-avatar-row">
            <div className="creator-profile">
              <div className="creator-avatar-icon">🌸</div>
              <h3 className="creator-name">Crhistel</h3>
              <span className="creator-role">Co-creadora e Impulsora</span>
              <p style={{ fontSize: '0.92rem', color: 'var(--texto-secundario)', textAlign: 'center', marginTop: '0.35rem' }}>
                «Deseo que este rincón sea un abrazo sincero para cuando sientas que no puedes más.»
              </p>
            </div>

            <div className="creator-profile">
              <div className="creator-avatar-icon">🌷</div>
              <h3 className="creator-name">Alexia</h3>
              <span className="creator-role">Co-creadora e Impulsora</span>
              <p style={{ fontSize: '0.92rem', color: 'var(--texto-secundario)', textAlign: 'center', marginTop: '0.35rem' }}>
                «Cuidar de tu mente no es debilidad, es el mayor acto de amor y valentía que harás por ti.»
              </p>
            </div>
          </div>

          <div style={{ background: 'var(--lila-muy-claro)', padding: '1.4rem 1.8rem', borderRadius: '20px', border: '1.5px solid var(--lila-medio)', maxWidth: '680px', margin: '0 auto' }}>
            <p style={{ color: 'var(--texto-principal)', fontStyle: 'italic', fontWeight: 600, fontSize: '1.05rem', lineHeight: '1.6' }}>
              «Juntas creamos Emoción Sana Loreto para recordar que en nuestra región nadie camina solo/a. 
              Sanar es posible y estamos aquí para acompañarte en cada paso.»
            </p>
            <span style={{ display: 'block', marginTop: '0.6rem', color: 'var(--rosado-fucsia)', fontWeight: 800 }}>
              — Crhistel & Alexia 💜
            </span>
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
            tu vida también encontrará calma y luz. Florecer a tu propio ritmo es el camino.»
          </p>
          <p className="footer-creators">
            🌸 Una iniciativa creada con el corazón por <strong>Crhistel y Alexia</strong> para Loreto.
          </p>
          <p className="footer-copy">
            © {new Date().getFullYear()} Emoción Sana Loreto · Desarrollado por Crhistel & Alexia · Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
