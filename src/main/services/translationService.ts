import * as path from 'path'
import * as fs from 'fs'
import { app } from 'electron'

export type LanguageCode = 'en_US' | 'tr_TR' | 'ru_RU'

export const supportedLanguages = [
  { code: 'en_US' as const, name: 'English', flag: 'EN' },
  { code: 'tr_TR' as const, name: 'Türkçe', flag: 'TR' },
  { code: 'ru_RU' as const, name: 'Русский', flag: 'RU' }
] as const

interface Translation {
  [key: string]: string | Translation
}

class TranslationService {
  private static instance: TranslationService
  private currentLanguage: LanguageCode = 'en_US'
  private translations: Translation = {}

  private constructor() {
    this.loadTranslations(this.currentLanguage)
  }

  static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService()
    }
    return TranslationService.instance
  }

  private loadTranslations(language: LanguageCode): void {
    try {
      // Get the path to the locales in the renderer directory
      let localesPath: string

      if (app.isPackaged) {
        // In production, translations should be in the renderer dist folder
        localesPath = path.join(__dirname, '../renderer/locales')
      } else {
        // In development, use the source locales from the project root
        localesPath = path.join(process.cwd(), 'src/renderer/src/locales')
      }

      const translationPath = path.join(localesPath, language, 'translation.json')

      if (fs.existsSync(translationPath)) {
        const data = fs.readFileSync(translationPath, 'utf-8')
        this.translations = JSON.parse(data)
      } else {
        console.warn(
          `Translation file not found at ${translationPath} for ${language}, falling back to English`
        )
        if (language !== 'en_US') {
          this.loadTranslations('en_US')
        }
      }
    } catch (error) {
      console.error('Failed to load translations:', error)
      this.translations = {}
    }
  }

  setLanguage(language: LanguageCode): void {
    this.currentLanguage = language
    this.loadTranslations(language)
  }

  getCurrentLanguage(): LanguageCode {
    return this.currentLanguage
  }

  t(key: string, fallback?: string): string {
    try {
      const keys = key.split('.')
      let value: any = this.translations

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return fallback || key
        }
      }

      return typeof value === 'string' ? value : fallback || key
    } catch {
      return fallback || key
    }
  }
}

export const translationService = TranslationService.getInstance()
