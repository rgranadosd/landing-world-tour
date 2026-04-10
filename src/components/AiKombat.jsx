import { useTranslation } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import './AiKombat.css';

export default function AiKombat() {
  const { t } = useTranslation();
  const { aiKombat } = t;
  const [headerRef, headerVis] = useScrollReveal();
  const [sceneRef, sceneVis] = useScrollReveal(0.08);
  const [contentRef, contentVis] = useScrollReveal(0.12);
  const [pRef, pStyle] = useParallax(0.05, 'up');
  const base = import.meta.env.BASE_URL;

  return (
    <section id="aikombat" className="libro">
      {/* Background: subtle blueprint grid */}
      <div className="libro__grid" aria-hidden="true" />
      {/* Background: orange gradient accents */}
      <div className="libro__gradient" aria-hidden="true" />

      <div className="libro__wrap">
        {/* ── EDITORIAL HEADER ── */}
        <header
          ref={(n) => { headerRef.current = n; pRef.current = n; }}
          className={`libro__header reveal ${headerVis ? 'visible' : ''}`}
          style={pStyle}
        >
          <span className="libro__kicker">{aiKombat.label}</span>
          <h2 className="libro__title">{aiKombat.sectionTitle}</h2>
          <div className="libro__authors">
            <span className="libro__authors-rule" aria-hidden="true" />
            <span className="libro__authors-name">{aiKombat.sectionSubtitle}</span>
            <span className="libro__authors-rule" aria-hidden="true" />
          </div>
        </header>

        {/* ── BOOK STAGE — Theatrical display ── */}
        <div
          ref={sceneRef}
          className={`libro__stage ${sceneVis ? 'libro__stage--vis' : ''}`}
        >
          {/* Ghost technical labels */}
          <span className="libro__ghost libro__ghost--tl" aria-hidden="true">
            ARCHITECTURE · AGENTS · LLMs
          </span>
          <span className="libro__ghost libro__ghost--br" aria-hidden="true">
            MCPs · RAGs · APIs · ENTERPRISE
          </span>

          {/* Spotlight halo */}
          <div className="libro__spotlight" aria-hidden="true" />

          {/* Book image */}
          <div className="libro__book-frame">
            <img
              src={`${base}libro.png`}
              alt={aiKombat.sectionTitle}
              className="libro__book"
              loading="lazy"
              width="600"
              height="600"
            />
            {/* Dark multiply overlay — pulls white asset into the dark scene */}
            <div className="libro__book-overlay" aria-hidden="true" />
          </div>
        </div>

        {/* ── FEATURE CHIPS ── */}
        <div className={`libro__chips ${sceneVis ? 'libro__chips--vis' : ''}`}>
          {aiKombat.features.map((f, i) => (
            <span
              key={f}
              className="libro__chip"
              style={{ transitionDelay: `${0.3 + i * 0.08}s` }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* ── EDITORIAL CONTENT ── */}
        <div
          ref={contentRef}
          className={`libro__content ${contentVis ? 'libro__content--vis' : ''}`}
        >
          <p className="libro__desc">{aiKombat.description}</p>

          <div className="libro__callout">
            <span className="libro__callout-mark" aria-hidden="true">★</span>
            <p className="libro__callout-text">{aiKombat.exclusive}</p>
          </div>

          <a href="#ciudades" className="libro__cta">
            <span className="libro__cta-label">{aiKombat.cta}</span>
            <span className="libro__cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
