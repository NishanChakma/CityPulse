import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../utils/en.json';
import ar from '../utils/ar.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
