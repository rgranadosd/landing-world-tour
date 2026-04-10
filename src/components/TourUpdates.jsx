import { useTranslation } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import './TourUpdates.css';

function UpdateCard({ item, index, moreInfoLabel }) {
  const [ref, isVisible] = useScrollReveal(0.1);
  const mediaStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.74)), url(${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')})`,

  };

  return (
    <article
      ref={ref}
      className={`tour-updates__card reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="tour-updates__media" style={mediaStyle}>
        <span className="tour-updates__media-city">{item.city}</span>
      </div>
      <div className="tour-updates__meta">
        <span>{item.category}</span>
        <span>{item.date}</span>
      </div>
      <h3 className="tour-updates__headline">{item.title}</h3>
      <p className="tour-updates__city">{item.city}</p>
      <p className="tour-updates__description">{item.description}</p>
      <a href="#reserva" className="tour-updates__link">{moreInfoLabel}</a>
    </article>
  );
}

export default function TourUpdates() {
  const { t } = useTranslation();
  const { tourUpdates } = t;
  const [ref, isVisible] = useScrollReveal();
  const [headerPRef, headerPStyle] = useParallax(0.065, 'up');
  const [galleryPRef, galleryPStyle] = useParallax(0.06, 'up');

  return (
    <section id="tour-updates" className="tour-updates">
      <div className="container">
        <div
          ref={(node) => { ref.current = node; headerPRef.current = node; }}
          className={`tour-updates__header reveal ${isVisible ? 'visible' : ''}`}
          style={headerPStyle}
        >
          <h2 className="tour-updates__title">{tourUpdates.sectionTitle}</h2>
          <p className="tour-updates__subtitle">{tourUpdates.sectionSubtitle}</p>
        </div>

        <div className="tour-updates__grid">
          {tourUpdates.items.map((item, index) => (
            <UpdateCard key={`${item.city}-${item.date}`} item={item} index={index} moreInfoLabel={tourUpdates.moreInfo} />
          ))}
        </div>

        <div className="tour-updates__photos">
          <div className="tour-updates__photos-header">
            <p className="tour-updates__photos-kicker">{tourUpdates.photosKicker}</p>
            <h3 className="tour-updates__photos-title">{tourUpdates.photosTitle}</h3>
          </div>

          <div ref={galleryPRef} className="tour-updates__photos-grid" style={galleryPStyle}>
            {tourUpdates.gallery.map((item) => {
              const photoStyle = {
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.82)), url(${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')})`,

                backgroundPosition: item.position || 'center center',
                backgroundSize: item.size || 'cover',
                backgroundRepeat: 'no-repeat',
              };

              return (
                <article key={`photo-${item.title}`} className="tour-updates__photo" style={photoStyle}>
                  <div className="tour-updates__photo-overlay">
                    <span className="tour-updates__photo-date">{item.subtitle}</span>
                    <h4 className="tour-updates__photo-city">{item.title}</h4>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="tour-updates__credits">{tourUpdates.credits}</p>
        </div>
      </div>
    </section>
  );
}
