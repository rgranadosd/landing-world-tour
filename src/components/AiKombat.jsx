import { useTranslation } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import './AiKombat.css';

export default function AiKombat() {
  const { t } = useTranslation();
  const { aiKombat } = t;
  const [ref, isVisible] = useScrollReveal();
  const [pRef, pStyle] = useParallax(0.07, 'up');

  return (
    <section id="aikombat" className="kombat">
      <div className="container">
        <div
          ref={(node) => { ref.current = node; pRef.current = node; }}
          className={`kombat__content reveal ${isVisible ? 'visible' : ''}`}
          style={pStyle}
        >
          <span className="kombat__label">{aiKombat.label}</span>
          <div className="kombat__layout">
            <div className="kombat__main">
              <h2 className="kombat__title">{aiKombat.sectionTitle}</h2>
              <p className="kombat__subtitle">{aiKombat.sectionSubtitle}</p>
              <p className="kombat__desc">{aiKombat.description}</p>

              <div className="kombat__features">
                {aiKombat.features.map((f) => (
                  <span key={f} className="kombat__feature">{f}</span>
                ))}
              </div>

              <a href="#reserva" className="kombat__cta">{aiKombat.cta}</a>
            </div>

            <aside className="book-card" aria-label={aiKombat.book.title}>
              <div className="book-cover" role="img" aria-label={`${aiKombat.book.title} - ${aiKombat.book.authors}`}>
                <div className="book-cover__top">{aiKombat.book.series}</div>
                <div className="book-cover__title-box">
                  <h3 className="book-cover__title">{aiKombat.book.title}</h3>
                  <p className="book-cover__subtitle">{aiKombat.book.subtitle}</p>
                </div>
                <p className="book-cover__authors">{aiKombat.book.authors}</p>
              </div>

              <p className="book-card__meta">{aiKombat.book.badge}</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
