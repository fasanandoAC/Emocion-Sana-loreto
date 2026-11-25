import React, { useState } from 'react';

export default function EmotionalTools() {
  const [activeTool, setActiveTool] = useState('stop');

  // Estado para la herramienta de reencuadre de pensamientos
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);
  const reframeExamples = [
    {
      toxic: '«No sirvo para esto, todo me sale mal y siempre cometo errores.»',
      realistic: '«Estoy aprendiendo y cometer errores es parte de ser humano. He superado cosas difíciles antes y puedo avanzar paso a paso.»',
      category: 'Autoexigencia'
    },
    {
      toxic: '«Seguro están hablando mal de mí o ya no me quieren como amigo/a.»',
      realistic: '«No puedo leer la mente de los demás. La mayoría de veces las personas están ocupadas con sus propias batallas. Me enfoco en mi paz.»',
      category: 'Relaciones'
    },
    {
      toxic: '«Si no logro terminar todo hoy, seré un fracaso total.»',
      realistic: '«Mi valor no depende de cuántas tareas taché en mi lista. Descansar es indispensable para seguir con claridad mañana.»',
      category: 'Estudios / Trabajo'
    }
  ];

  return (
    <section id="herramientas-emocionales" className="content-section">
      <div className="section-header">
        <span className="section-tag">Aprender a Gestionar lo que Sientes</span>
        <h2 className="section-title">Herramientas Prácticas de Manejo Emocional</h2>
        <p className="section-description">
          Las emociones son como olas del río Amazonas: no podemos evitar que vengan, 
          pero sí podemos aprender a navegar sobre ellas sin ahogarnos.
        </p>

        {/* Pestañas de herramientas */}
        <div className="creative-tabs-nav" style={{ marginTop: '1.5rem' }}>
          <button 
            className={`creative-tab-btn ${activeTool === 'stop' ? 'active' : ''}`}
            onClick={() => setActiveTool('stop')}
          >
            🛑 Técnica STOP
          </button>
          <button 
            className={`creative-tab-btn ${activeTool === 'mariposa' ? 'active' : ''}`}
            onClick={() => setActiveTool('mariposa')}
          >
            🦋 Abrazo de la Mariposa
          </button>
          <button 
            className={`creative-tab-btn ${activeTool === 'reframe' ? 'active' : ''}`}
            onClick={() => setActiveTool('reframe')}
          >
            🔄 Reencuadre de Pensamientos
          </button>
          <button 
            className={`creative-tab-btn ${activeTool === '90seg' ? 'active' : ''}`}
            onClick={() => setActiveTool('90seg')}
          >
            ⏳ Regla de los 90 Segundos
          </button>
        </div>
      </div>

      <div className="tool-card-display">
        {/* HERRAMIENTA 1: STOP */}
        {activeTool === 'stop' && (
          <div className="tool-content-box">
            <h3 className="tool-content-title">🛑 El Método S.T.O.P. ante la impulsividad o el pánico</h3>
            <p style={{ color: 'var(--texto-secundario)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              Cuando sientas que la ira o la ansiedad nublan tu mente, aplica estos 4 pasos antes de reaccionar:
            </p>

            <div className="stop-steps-grid">
              <div className="stop-step-card">
                <span className="stop-letter">S</span>
                <span className="stop-name">Stop (Detente)</span>
                <p>Haz una pausa inmediata. Suelta el teléfono, no hables y congela tu movimiento unos segundos.</p>
              </div>
              <div className="stop-step-card">
                <span className="stop-letter">T</span>
                <span className="stop-name">Take a breath (Respira)</span>
                <p>Haz una inhalación lenta por la nariz y exhala soltando el aire por la boca como un suspiro.</p>
              </div>
              <div className="stop-step-card">
                <span className="stop-letter">O</span>
                <span className="stop-name">Observe (Observa)</span>
                <p>¿Qué siento en mi cuerpo? ¿Qué pensamiento automático apareció? ¿Es un hecho o una interpretación?</p>
              </div>
              <div className="stop-step-card">
                <span className="stop-letter">P</span>
                <span className="stop-name">Proceed (Procede)</span>
                <p>Actúa con calma desde lo que te cuida a ti y a los demás, no desde la reactividad del momento.</p>
              </div>
            </div>
          </div>
        )}

        {/* HERRAMIENTA 2: ABRAZO DE LA MARIPOSA */}
        {activeTool === 'mariposa' && (
          <div className="tool-content-box">
            <h3 className="tool-content-title">🦋 El Abrazo de la Mariposa (Técnica Somática EMDR)</h3>
            <p style={{ color: 'var(--texto-secundario)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              Desarrollada por psicólogos para calmar traumas y ataques de ansiedad mediante estimulación bilateral:
            </p>

            <div className="mariposa-steps-wrap">
              <div className="mariposa-visual-box">
                <span style={{ fontSize: '4.5rem' }}>🦋</span>
                <p style={{ fontWeight: 800, color: 'var(--rosado-fucsia)' }}>Un abrazo cálido a tu sistema nervioso</p>
              </div>
              <div className="mariposa-instructions-box">
                <ol style={{ paddingLeft: '1.2rem', lineHeight: '1.8', color: 'var(--texto-principal)', fontWeight: 500 }}>
                  <li><strong>Cruza tus brazos</strong> sobre tu pecho, de modo que la punta de tus dedos toque la zona debajo de tus clavículas u hombros.</li>
                  <li><strong>Tus pulgares</strong> se entrelazan formando el cuerpo de la mariposa; los otros dedos son las alas.</li>
                  <li><strong>Comienza a dar toquecitos suaves y rítmicos</strong>: primero izquierda, luego derecha, como el aleteo suave de una mariposa (izq, der, izq, der).</li>
                  <li><strong>Respira despacio y profundo</strong> mientras continúas los toquecitos durante 1 a 2 minutos.</li>
                  <li>Observa cómo tu frecuencia cardíaca disminuye y tu pecho se libera de la presión.</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* HERRAMIENTA 3: REENCUADRE */}
        {activeTool === 'reframe' && (
          <div className="tool-content-box">
            <h3 className="tool-content-title">🔄 Desafía a tu Crítico Interno (Reestructuración Cognitiva)</h3>
            <p style={{ color: 'var(--texto-secundario)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              Nuestra mente a menudo miente cuando está cansada. Aprende a convertir pensamientos autodestructivos en verdades compasivas:
            </p>

            <div className="reframe-interactive-card">
              <span className="section-tag" style={{ marginBottom: '1rem' }}>
                Categoría: {reframeExamples[currentThoughtIndex].category}
              </span>

              <div className="reframe-comparison-row">
                <div className="thought-toxic-box">
                  <span className="thought-label">❌ Pensamiento Catastrófico / Tóxico</span>
                  <p>{reframeExamples[currentThoughtIndex].toxic}</p>
                </div>
                <div className="thought-arrow">➡️</div>
                <div className="thought-realistic-box">
                  <span className="thought-label">✅ Pensamiento Realista y Compasivo</span>
                  <p>{reframeExamples[currentThoughtIndex].realistic}</p>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button 
                  onClick={() => setCurrentThoughtIndex((prev) => (prev + 1) % reframeExamples.length)}
                  className="btn-primary"
                >
                  🔄 Ver otro ejemplo de reencuadre
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HERRAMIENTA 4: 90 SEGUNDOS */}
        {activeTool === '90seg' && (
          <div className="tool-content-box">
            <h3 className="tool-content-title">⏳ La Regla de los 90 Segundos de la Neurociencia</h3>
            <p style={{ color: 'var(--texto-secundario)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              Descubrimiento de la neuroanatomista Dra. Jill Bolte Taylor:
            </p>

            <div className="rule-90-card">
              <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🧠🌊</div>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.6', color: 'var(--texto-principal)', fontWeight: 600 }}>
                «Cuando surge una emoción intensa (furia, miedo o dolor), los químicos cerebrales tardan exactamente 
                <strong> 90 segundos</strong> en circular por tu torrente sanguíneo y disiparse de manera natural.»
              </p>
              <div style={{ background: 'var(--lila-muy-claro)', padding: '1.25rem', borderRadius: '18px', margin: '1.5rem auto 0', maxWidth: '650px', border: '1px solid var(--lila-medio)' }}>
                <strong style={{ color: 'var(--rosado-fucsia)', display: 'block', marginBottom: '0.4rem' }}>
                  ¿Por qué seguimos enojados o ansiosos por horas?
                </strong>
                <span>
                  Porque nuestros pensamientos siguen re-encendiendo el circuito. Si logras <strong>no alimentar la historia</strong> en tu cabeza durante 90 segundos y solo sientes la sensación en tu cuerpo, la ola emocional pasará por sí sola.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
