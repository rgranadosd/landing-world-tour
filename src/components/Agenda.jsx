import { useTranslation } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import './Agenda.css';

export default function Agenda() {
  const { t } = useTranslation();
  const { agenda } = t;
  const [hRef, hVis] = useScrollReveal();
  const [pRef, pStyle] = useParallax(0.12, 'up');
  const [layoutRef, layoutVis] = useScrollReveal(0.12);

  const heroLines = agenda.heroTitle.split('\n');

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
            <p className="ag__subtitle">{agenda.heroSubtitle}</p>
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
              <p className="ag__eyebrow">{agenda.heroEyebrow}</p>
              <p className="ag__idx">{agenda.heroIdx}</p>
              <h3 className="ag__hero-title">
                {heroLines.map((line, i) => (
                  <span key={i}>{line}{i < heroLines.length - 1 && <br />}</span>
                ))}
              </h3>
              <p className="ag__hero-body">{agenda.heroBody}</p>
            </div>

            <div className="ag__ticker">
              <div className="ag__ticker-rail">
                <div className="ag__ticker-track">
                  {[...agenda.ticker, ...agenda.ticker].map((item, i) => (
                    <span key={`${item}-${i}`} className="ag__ticker-pill">{item}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="ag__stats">
              {agenda.stats.map((s, i) => (
                <div key={i} className="ag__stat">
                  <p className="ag__stat-num">{s.num}</p>
                  <p className="ag__stat-txt">{s.txt}</p>
                </div>
              ))}
            </div>
          </article>

          {/* RIGHT — canvas with 3 floating cards */}
          <div className="ag__canvas">
            <span className="ag__ghost ag__ghost--tl" aria-hidden="true">ARCHITECTURE · APIS · AI</span>
            <span className="ag__ghost ag__ghost--br" aria-hidden="true">LIVE / COMMUNITY / TOOLING</span>

            {agenda.cards.map((c) => (
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
