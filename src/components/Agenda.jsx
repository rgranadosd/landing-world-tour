import content from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import './Agenda.css';

const TICKER = [
  'Retail', 'Banca', 'Sector público', 'IA aplicada',
  'Tooling WSO2', 'Agentic workflows', 'Automatización', 'Integración real',
];

const CARDS = [
  { id: '02', title: 'Debate técnico de alto voltaje', text: 'Un panel abierto para discutir el futuro de la arquitectura: microservicios o APIs.', chip: 'Panel en vivo' },
  { id: '03', title: 'Innovación y seguridad', text: 'Seguridad e integración para escenarios críticos en retail, banca y sector público.', chip: 'Arquitectura crítica' },
  { id: '04', title: 'Tooling e inteligencia artificial', text: 'Cómo WSO2 y la IA están cambiando los flujos reales de desarrollo e integración.', chip: 'IA aplicada' },
];

export default function Agenda() {
  const { agenda } = content;
  const [hRef, hVis] = useScrollReveal();
  const [pRef, pStyle] = useParallax(0.12, 'up');
  const [layoutRef, layoutVis] = useScrollReveal(0.12);

  return (
    <section id="technotardeo" className="ag">
      <div className="ag__wrap">
        {/* ── HEADER ── */}
        <header
          ref={(n) => { hRef.current = n; pRef.current = n; }}
          className={`ag__header reveal ${hVis ? 'visible' : ''}`}
          style={pStyle}
        >
          <div className="ag__header-left">
            <h2 className="ag__title">{agenda.sectionTitle}</h2>
            <p className="ag__subtitle">Casos reales y locales como eje del evento técnico WSO2.</p>
          </div>
          <span className="ag__badge">{agenda.sectionSubtitle}</span>
        </header>

        {/* ── TWO-COLUMN GRID ── */}
        <div
          ref={layoutRef}
          className={`ag__grid ${layoutVis ? 'ag__grid--vis' : ''}`}
        >
          {/* LEFT — hero card */}
          <article className="ag__hero">
            <div className="ag__hero-content">
              <p className="ag__eyebrow">Bloque principal</p>
              <p className="ag__idx">01 · Casos reales</p>
              <h3 className="ag__hero-title">
                Casos de<br />uso reales<br />y locales
              </h3>
              <p className="ag__hero-body">
                Clientes reales de tu misma zona explicarán cómo usan WSO2,
                qué decisiones tomaron y qué impacto tuvo en sus arquitecturas.
              </p>
            </div>

            <div className="ag__ticker">
              <div className="ag__ticker-rail">
                <div className="ag__ticker-track">
                  {[...TICKER, ...TICKER].map((t, i) => (
                    <span key={`${t}-${i}`} className="ag__ticker-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="ag__stats">
              <div className="ag__stat">
                <p className="ag__stat-num">CLIENTES CERCANOS</p>
                <p className="ag__stat-txt">Voces locales, no discurso genérico</p>
              </div>
              <div className="ag__stat">
                <p className="ag__stat-num">CASOS CONCRETOS</p>
                <p className="ag__stat-txt">Decisiones, retos y resultados reales</p>
              </div>
              <div className="ag__stat">
                <p className="ag__stat-num">APRENDIZAJE ÚTIL</p>
                <p className="ag__stat-txt">Contenido que puedes llevar al trabajo</p>
              </div>
            </div>
          </article>

          {/* RIGHT — canvas with 3 floating cards */}
          <div className="ag__canvas">
            <span className="ag__ghost ag__ghost--tl" aria-hidden="true">ARCHITECTURE · APIS · AI</span>
            <span className="ag__ghost ag__ghost--br" aria-hidden="true">LIVE / COMMUNITY / TOOLING</span>

            {CARDS.map((c) => (
              <article key={c.id} className={`ag__card ag__card--${c.id}`}>
                <span className="ag__card-id">{c.id}</span>
                <h4 className="ag__card-title">{c.title}</h4>
                <p className="ag__card-text">{c.text}</p>
                <span className="ag__card-chip">{c.chip}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
