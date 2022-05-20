import { use } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './translations/en.json'
import sr from './translations/sr.json'

export async function initTranslations() {
  return use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translations: en,
        },
        sr: {
          translations: sr,
        },
      },
      fallbackLng: 'en',
      debug: process.env.NODE_ENV !== 'production',
      ns: ['translations'],
      defaultNS: 'translations',
      interpolation: {
        escapeValue: false,
      },
      react: {
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
      },
    })
}
