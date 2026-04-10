import { useTranslation } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import './AiKombat.css';

export default function AiKombat() {
  const { t } = useTranslation();
  const { aiKombat } = t;
  const [headerRef, headerVis] = useScrollReveal();
  const [bookRef, bookVis] = useScrollReveal(0.15);
  const [pRef, pStyle] = useParallax(0.06, 'up');

  return (
    <section id="aikombat" className="kombat">
      {/* Decorative grid lines */}
      <div className="kombat__gridlines" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="container">
        {/* ── HEADER ── */}
        <div
          ref={(n) => { headerRef.current = n; pRef.current = n; }}
          className={`kombat__header reveal ${headerVis ? 'visible' : ''}`}
          style={pStyle}
        >
          <span className="kombat__kicker">{aiKombat.label}</span>
          <h2 className="kombat__title">{aiKombat.sectionTitle}</h2>
          <p className="kombat__subtitle">{aiKombat.sectionSubtitle}</p>
        </div>

        {/* ── BOOK LAYOUT ── */}
        <div
          ref={bookRef}
          className={`kombat__stage ${bookVis ? 'kombat__stage--vis' : ''}`}
        >
          {/* Cover */}
          <div className="kombat__cover-wrap">
            <div className="kombat__cover-glow" aria-hidden="true" />
            <div className="book-cover">
              <div className="book-cover__spine" aria-hidden="true" />
              <div className="book-cover__front">
                <div className="book-cover__top">{aiKombat.book.series}</div>
                <div className="book-cover__mid">
                  <h3 className="book-cover__title">{aiKombat.book.title}</h3>
                  <p className="book-cover__sub">{aiKombat.book.subtitle}</p>
                </div>
                <div className="book-cover__bottom">
                  <p className="book-cover__authors">{aiKombat.book.authors}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="kombat__body">
            <p className="kombat__desc">{aiKombat.description}</p>

            <div className="kombat__pills">
              {aiKombat.features.map((f) => (
                <span key={f} className="kombat__pill">{f}</span>
              ))}
            </div>

            <div className="kombat__exclusive">
              <span className="kombat__exclusive-icon" aria-hidden="true">★</span>
              <p className="kombat__exclusive-text">{aiKombat.exclusive}</p>
            </div>

            <a href="#reserva" className="kombat__cta">{aiKombat.cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
