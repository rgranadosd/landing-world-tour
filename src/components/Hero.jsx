import content from '../data/content.json';
import { useParallax } from '../hooks/useParallax';
import './Hero.css';

export default function Hero() {
  const { hero } = content;
  const [parallaxRef, parallaxStyle] = useParallax(0.14, 'up');

  return (
    <section id="inicio" className="hero">
      <div className="hero__content" ref={parallaxRef} style={parallaxStyle}>
        <span className="hero__badge">{hero.badge}</span>
        <h1 className="hero__title">{hero.title}</h1>
        <h1 className="hero__title hero__title--accent">{hero.subtitle}</h1>
        <p className="hero__tagline">{hero.tagline}</p>
        <p className="hero__description">{hero.description}</p>
      </div>
    </section>
  );
}
