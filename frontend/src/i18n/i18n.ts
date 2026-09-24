import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import te from './locales/te.json';
import hi from './locales/hi.json';

/**
 * Auto-detect user's preferred language from browser settings.
 * Supports Telugu (te, te-IN), Hindi (hi, hi-IN), English (en, en-IN).
 * Defaults to English if unknown.
 */
function detectBrowserLanguage(): string {
  // 1. Highest priority: user's saved preference
  const saved = localStorage.getItem('kisan_lang');
  if (saved && ['te', 'hi', 'en'].includes(saved)) return saved;

  // 2. Browser language setting
  const browserLangs = navigator.languages || [navigator.language || 'en'];
  for (const lang of browserLangs) {
    const code = lang.toLowerCase();
    if (code.startsWith('te')) return 'te';
    if (code.startsWith('hi')) return 'hi';
    if (code.startsWith('en')) return 'en';
  }
  return 'en';
}

const detectedLang = detectBrowserLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      te: { translation: te },
      hi: { translation: hi }
    },
    lng: detectedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
