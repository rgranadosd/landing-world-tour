import { useTranslation } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import './Kit.css';

export default function Kit() {
  const { t } = useTranslation();
  const { kit } = t;
  const [titleRef, titleVisible] = useScrollReveal();
  const [pRef, pStyle] = useParallax(0.06, 'up');
  const [photoParallaxRef, photoParallaxStyle] = useParallax(0.07, 'down');
  const [boxRef, boxVisible] = useScrollReveal(0.15);

  // Force editorial order: Golden Ticket first, book last right after it.
  const ticketItem = kit.items.find((item) => item.title.toLowerCase().includes('ticket'));
  const bookItem = kit.items.find((item) => item.title.toLowerCase().includes('libro'));
  const baseItems = kit.items.filter((item) => item !== ticketItem && item !== bookItem);
  const orderedItems = [
    ...baseItems,
    ...(ticketItem ? [ticketItem] : []),
    ...(bookItem ? [bookItem] : []),
  ];

  return (
    <section id="kit" className="kit">
      <div className="container">
        <div
          ref={(node) => { titleRef.current = node; pRef.current = node; }}
          className={`kit__header reveal ${titleVisible ? 'visible' : ''}`}
          style={pStyle}
        >
          <span className="kit__kicker">{kit.kicker}</span>
          <h2 className="kit__title">{kit.sectionTitle}</h2>
          <p className="kit__subtitle">{kit.description}</p>
        </div>

        <div ref={boxRef} className={`kit__layout ${boxVisible ? 'kit__layout--visible' : ''}`}>

          {/* Left: sticky photo */}
          <div className="kit__sticky-col">
            <div ref={photoParallaxRef} className="kit__photo-wrap" style={photoParallaxStyle}>
              <img
                className="kit__photo"
                src={`${import.meta.env.BASE_URL}tour/pizza.png`}
                alt={kit.photoAlt}
                loading="lazy"
                draggable="false"
              />
            </div>
          </div>

          {/* Right: numbered items */}
          <div className="kit__scroll-col">
            {orderedItems.map((item, i) => {
              const isTicket = item.title.toLowerCase().includes('ticket');
              const num = String(i + 1).padStart(2, '0');
              return (
                <article
                  key={item.title}
                  className={`kit__item ${boxVisible ? 'kit__item--show' : ''} ${isTicket ? 'kit__item--gold' : ''} ${item.comingSoon ? 'kit__item--soon' : ''}`}
                  style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                >
                  <span className="kit__item-num">{num}</span>
                  <div className="kit__item-body">
                    <h3 className="kit__item-title">
                      {item.title}
                      {item.comingSoon && <span className="kit__soon-tag">{kit.comingSoonTag}</span>}
                    </h3>
                    <p className="kit__item-desc">{item.description}</p>
                  </div>
                </article>
              );
            })}

            <p className="kit__note">
              {kit.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
