import { useTranslation } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const { footer } = t;

  return (
    <footer id="reserva" className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={`${import.meta.env.BASE_URL}wso2-logo.svg`} alt="WSO2" className="footer__logo" />
            <p className="footer__tagline">{footer.tagline}</p>
          </div>

          <div className="footer__right">
            <a href={footer.community.href} className="footer__community" target="_blank" rel="noopener noreferrer">
              {footer.community.label}
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            {footer.legal.map((link) => (
              <a key={link.label} href={link.href} className="footer__legal-link">
                {link.label}
              </a>
            ))}
          </div>
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} WSO2 Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
