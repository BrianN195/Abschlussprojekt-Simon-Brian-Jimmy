import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import de from './locales/de';
import fr from './locales/fr';
import es from './locales/es';
import ar from './locales/ar';
import zh from './locales/zh';

const rtlLanguages = new Set(['ar']);

const resources = {
  en: { translation: en },
  de: { translation: de },
  fr: { translation: fr },
  es: { translation: es },
  ar: { translation: ar },
  zh: { translation: zh },
} as const;

const setDocumentLanguage = (language: string) => {
  const baseLanguage = language.split('-')[0];
  document.documentElement.lang = baseLanguage;
  document.documentElement.dir = rtlLanguages.has(baseLanguage) ? 'rtl' : 'ltr';
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'de', 'fr', 'es', 'ar', 'zh'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

setDocumentLanguage(i18n.resolvedLanguage ?? i18n.language ?? 'en');

i18n.on('languageChanged', setDocumentLanguage);

export default i18n;