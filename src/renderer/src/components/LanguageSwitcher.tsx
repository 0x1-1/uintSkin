import React from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useLocale } from '../contexts/useLocale'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage, languages } = useLocale()

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  const handleLanguageChange = async (langCode: (typeof languages)[number]['code']) => {
    await setLanguage(langCode)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 px-3 py-2 h-10 rounded-lg border-border-subtle bg-surface/80 backdrop-blur-md"
          aria-label="Select language"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Globe className="w-4 h-4 flex-shrink-0 text-primary-600" />
            <div className="flex flex-col items-start min-w-0">
              <span className="text-xs font-semibold leading-none truncate max-w-[110px]">
                {currentLang?.name || 'Language'}
              </span>
              <span className="text-[11px] text-text-muted leading-none uppercase tracking-[0.12em]">
                {currentLang?.flag}
              </span>
            </div>
          </div>
          <ChevronDown className="w-3 h-3 opacity-60 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-surface/95 backdrop-blur-md border-border-subtle shadow-large"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs uppercase tracking-[0.14em] text-text-muted">
          Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currentLanguage}
          onValueChange={(value) => handleLanguageChange(value as typeof currentLanguage)}
        >
          {languages.map((lang) => (
            <DropdownMenuRadioItem
              key={lang.code}
              value={lang.code}
              className="flex items-center gap-3 py-2 cursor-pointer text-text-primary"
            >
              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-primary-500/10 border border-primary-500/30">
                {lang.flag}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-text-primary truncate">{lang.name}</span>
            <span className="text-[11px] text-text-muted uppercase tracking-[0.12em]">
              {lang.code}
            </span>
          </div>
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
    </DropdownMenu>
  )
}
