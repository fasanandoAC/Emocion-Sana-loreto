import React from 'react';

export default function TipsSection() {
  const tips = [
    {
      icon: '🌙',
      title: 'Higiene del Sueño Consciente',
      desc: 'El cerebro limpia toxinas emocionales mientras duermes. Apaga pantallas 45 minutos antes de dormir y opta por luz tenue o una lectura suave.'
    },
    {
      icon: '📱',
      title: 'Desintoxicación Digital',
      desc: 'No compares tu vida cotidiana con los momentos seleccionados y filtrados que otros suben a redes. Silenciar cuentas que te generan ansiedad es salud.'
    },
    {
      icon: '🛡️',
      title: 'Aprender a Decir "NO"',
      desc: 'Decir que no a lo que te sobrecarga es decirte "SÍ" a ti mismo. Poner límites amables a amigos, compañeros o familiares no te hace egoísta.'
    },
    {
      icon: '💧',
      title: 'Hidratación y Selva de Loreto',
      desc: 'El agua y el contacto con la naturaleza amazónica regulan el sistema nervioso. Camina 15 minutos sintiendo el viento y mirando el verdor de nuestra región.'
    },
    {
      icon: '🫂',
      title: 'El Lenguaje de la Autocompasión',
      desc: 'Cuando cometas un error, háblate con la misma calidez y perdón con la que abrazarías a un niño pequeño o a tu mejor amigo.'
    },
    {
      icon: '🎨',
      title: 'Desahogo a través de la Creatividad',
      desc: 'Pintar, escribir, bailar o escuchar música permite que las emociones atrapadas en el cuerpo encuentren una salida sin dañarte.'
    }
  ];

  return (
    <section id="consejos" className="content-section">
      <div className="section-header">
        <span className="section-tag">Guía Diaria</span>
        <h2 className="section-title">Consejos de Oro para tu Salud Emocional</h2>
        <p className="section-description">
          Pequeños hábitos diarios que previenen el colapso mental y construyen una fortaleza interior sólida y duradera.
        </p>
      </div>

      <div className="tips-grid-layout">
        {tips.map((tip, idx) => (
          <div key={idx} className="tip-card-item">
            <div className="tip-icon-bubble">{tip.icon}</div>
            <h3 className="tip-title">{tip.title}</h3>
            <p className="tip-description">{tip.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
