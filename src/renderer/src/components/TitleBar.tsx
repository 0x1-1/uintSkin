import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Minus, Square, X } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemePicker } from './ThemePicker'
import { Button } from './ui/button'
import { useTheme } from '../contexts/ThemeContext'

interface TitleBarProps {
  appVersion?: string
}

export function TitleBar({ appVersion }: TitleBarProps) {
  const { t } = useTranslation()
  const [isMaximized, setIsMaximized] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const poll = async () => {
      const maximized = await window.api.isWindowMaximized()
      setIsMaximized(maximized)
    }
    poll()
    const interval = setInterval(poll, 160)
    return () => clearInterval(interval)
  }, [])

  const handleMinimize = () => window.api.minimizeWindow()
  const handleMaximize = () => window.api.maximizeWindow()
  const handleClose = () => window.api.closeWindow()

  const barBackground = theme.isDark
    ? 'linear-gradient(90deg, #0b1124 0%, #101a34 50%, #1b1533 100%)'
    : `linear-gradient(90deg, ${theme.colors.background.surface} 0%, ${theme.colors.background.elevated} 50%, ${theme.colors.primary[50]} 100%)`

  const buttonHover = theme.isDark ? 'hover:bg-white/10 hover:border-white/10' : 'hover:bg-black/5'
  const buttonText = theme.isDark ? 'text-white/80 hover:text-white' : 'text-[color:var(--color-text-primary)]'

  return (
    <div className="fixed top-0 left-0 right-0 h-[54px] z-50 select-none">
      <div
        className="absolute inset-0 border-b border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
        style={{ background: barBackground, borderColor: theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
      />
      <div
        className="relative h-full px-3 lg:px-4 flex items-center gap-3"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        <div className="flex items-center gap-3 h-full">
          <div className="leading-tight" style={{ color: 'var(--color-text-primary)' }}>
            <div className="text-sm font-semibold tracking-[0.12em]">
              uintSkin{appVersion ? ` v${appVersion}` : ''}
            </div>
          </div>
        </div>

        <div
          className="ml-auto flex items-center gap-2"
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        >
          <ThemePicker />
          <LanguageSwitcher />
          <div className="flex items-center gap-1 ml-1">
            <Button
              variant="ghost"
              size="icon"
              className={`w-9 h-9 rounded-lg border border-transparent ${buttonHover} ${buttonText}`}
              onClick={handleMinimize}
              aria-label={t('actions.minimize')}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`w-9 h-9 rounded-lg border border-transparent ${buttonHover} ${buttonText}`}
              onClick={handleMaximize}
              aria-label={isMaximized ? t('actions.restore') : t('actions.maximize')}
            >
              <Square className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`w-9 h-9 rounded-lg border border-transparent ${buttonText} ${
                theme.isDark
                  ? 'hover:bg-error/12 hover:text-error hover:border-error/25'
                  : 'hover:bg-error/10 hover:text-error'
              }`}
              onClick={handleClose}
              aria-label={t('actions.close')}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
