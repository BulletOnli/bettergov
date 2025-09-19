import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enCommon from './i18n/en/common.json'
import filCommon from './i18n/fil/common.json'
import cebCommon from './i18n/ceb/common.json'
import hilCommon from './i18n/hil/common.json'
import iloCommon from './i18n/ilo/common.json'
import warCommon from './i18n/war/common.json'

// TODO: Will make this more dynamic later. Trying to avoid more conflicts.
const resources = {
  en: {
    common: enCommon,
  },
  fil: {
    common: filCommon,
  },
  ceb: {
    common: cebCommon,
  },
  hil: {
    common: hilCommon,
  },
  ilo: {
    common: iloCommon,
  },
  war: {
    common: warCommon,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    defaultNS: 'common',
    ns: ['common'],

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n