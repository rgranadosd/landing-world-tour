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
            {lang === 'es' ? (
              <svg viewBox="0 0 60 30" width="24" height="12"><clipPath id="gb"><rect width="60" height="30"/></clipPath><g clipPath="url(#gb)"><path d="M0 0h60v30H0" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/><path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4" clipPath="url(#gb)"/><path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/></g></svg>
            ) : (
              <svg viewBox="0 0 60 30" width="24" height="12"><rect width="60" height="30" fill="#AA151B"/><rect y="7.5" width="60" height="15" fill="#F1BF00"/></svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
