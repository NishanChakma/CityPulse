import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../utils/en.json';
import es from '../utils/es.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
