import { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import './Header.css';

export default function Header() {
  const { lang, t, toggleLang } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="#inicio" className="header__logo">
          <img src={`${import.meta.env.BASE_URL}wso2-logo.svg`} alt="WSO2" />
        </a>

        <button
          className={`header__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.cta ? 'header__cta' : 'header__link'}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button className="header__lang" onClick={toggleLang} aria-label="Change language">
            {lang === 'es' ? '🇬🇧' : '🇪🇸'}
          </button>
        </nav>
      </div>
    </header>
  );
}
