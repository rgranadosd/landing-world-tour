import content from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useParallax } from '../hooks/useParallax';
import './Kit.css';

export default function Kit() {
  const { kit } = content;
  const [titleRef, titleVisible] = useScrollReveal();
  const [pRef, pStyle] = useParallax(0.11, 'up');
  const [photoParallaxRef, photoParallaxStyle] = useParallax(0.13, 'down');
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
          <span className="kit__kicker">TANGIBLE EXPERIENCE</span>
          <h2 className="kit__title">{kit.sectionTitle}</h2>
          <p className="kit__subtitle">{kit.description}</p>
        </div>

        <div ref={boxRef} className={`kit__layout ${boxVisible ? 'kit__layout--visible' : ''}`}>

          {/* Left: sticky photo */}
          <div className="kit__sticky-col">
            <div ref={photoParallaxRef} className="kit__photo-wrap" style={photoParallaxStyle}>
              <div className="kit__corner kit__corner--tl" aria-hidden="true" />
              <div className="kit__corner kit__corner--br" aria-hidden="true" />
              <img
                className="kit__photo"
                src="/tour/pizza.png"
                alt="Caja de pizza WSO2 abierta con el Golden Ticket y camiseta dentro"
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
                      {item.comingSoon && <span className="kit__soon-tag">COMING SOON</span>}
                    </h3>
                    <p className="kit__item-desc">{item.description}</p>
                  </div>
                </article>
              );
            })}

            <p className="kit__note">
              Para recibir el kit, los asistentes deben registrarse en la comunidad WSO2 Spain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
