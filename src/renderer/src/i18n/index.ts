import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enUS from '../locales/en_US/translation.json'
import ruRU from '../locales/ru_RU/translation.json'
import trTR from '../locales/tr_TR/translation.json'

export const supportedLanguages = [
  { code: 'en_US', name: 'English', flag: 'EN' },
  { code: 'tr_TR', name: 'Türkçe', flag: 'TR' },
  { code: 'ru_RU', name: 'Русский', flag: 'RU' }
] as const

export type LanguageCode = (typeof supportedLanguages)[number]['code']

const resources = {
  en_US: {
    translation: enUS
  },
  tr_TR: {
    translation: trTR
  },
  ru_RU: {
    translation: ruRU
  }
}

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  lng: 'en_US',
  fallbackLng: 'en_US',
  debug: false,

  interpolation: {
    escapeValue: false
  },

  react: {
    useSuspense: false
  }
})

export default i18n
