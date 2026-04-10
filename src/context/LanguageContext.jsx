import { createContext, useContext, useState, useCallback } from 'react';
import es from '../i18n/es.json';
import en from '../i18n/en.json';

const translations = { es, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es');
  const t = translations[lang];
  const toggleLang = useCallback(() => setLang((l) => (l === 'es' ? 'en' : 'es')), []);
  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
