import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/locale-en.json';
import translationAr from './locales/locale-ar.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en-US',
  lng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
