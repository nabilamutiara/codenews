// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'id',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      id: {
        translation: require('./public/locales/id/translation.json'),
      },
      en: {
        translation: require('./public/locales/en/translation.json'),
      },
    },
  });

export default i18n;

