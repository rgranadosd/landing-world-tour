import content from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Cities.css';

function TourDate({ location, index }) {
  const [ref, isVisible] = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`tour__date reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="tour__date-left">
        <span className="tour__venue">{location.venue}</span>
        <span className="tour__when">{location.date}</span>
      </div>
      <h3 className="tour__city">{location.name}</h3>
      <a href="#reserva" className="tour__tickets">RESERVA TU PLAZA</a>
    </div>
  );
}

export default function Cities() {
  const { cities } = content;
  const [titleRef, titleVisible] = useScrollReveal();

  return (
    <section id="tour" className="tour">
      <div className="container">
        <div
          ref={titleRef}
          className={`tour__header reveal ${titleVisible ? 'visible' : ''}`}
        >
          <div className="tour__tabs" aria-label="Tour navigation">
            {cities.tabs.map((tab, index) => (
              <span
                key={tab}
                className={`tour__tab ${index === 0 ? 'tour__tab--active' : ''}`}
              >
                {tab}
              </span>
            ))}
          </div>
          <span className="tour__label">{cities.sectionSubtitle}</span>
          <p className="tour__desc">{cities.description}</p>
        </div>

        <div className="tour__list">
          {cities.locations.map((loc, i) => (
            <TourDate key={loc.name} location={loc} index={i} />
          ))}

          {/* Finale — Madrid */}
          <div className="tour__date tour__date--finale">
            <div className="tour__date-left">
              <span className="tour__venue">{cities.finale.venue}</span>
              <span className="tour__when">{cities.finale.date}</span>
            </div>
            <h3 className="tour__city">{cities.finale.city}</h3>
            <span className="tour__finale-badge">{cities.finale.tagline}</span>
          </div>
        </div>

        <p className="tour__finale-desc">{cities.finale.description}</p>
      </div>
    </section>
  );
}
