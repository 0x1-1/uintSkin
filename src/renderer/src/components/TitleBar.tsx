import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Minus, Square, X } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemePicker } from './ThemePicker'
import { Button } from './ui/button'
import logoMark from '../assets/images/mythicshift-mark.svg'

interface TitleBarProps {
  appVersion?: string
}

export function TitleBar({ appVersion }: TitleBarProps) {
  const { t } = useTranslation()
  const [isMaximized, setIsMaximized] = useState(false)

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

  return (
    <div className="fixed top-0 left-0 right-0 h-[54px] z-50 select-none">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1124] via-[#101a34] to-[#1b1533] border-b border-white/8 shadow-[0_12px_30px_rgba(0,0,0,0.45)]" />
      <div
        className="relative h-full px-3 lg:px-4 flex items-center gap-3"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        <div className="flex items-center gap-3 h-full">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 border border-white/12 shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
            <img src={logoMark} alt="uintSkin logo" className="w-5 h-5 object-contain drop-shadow" />
          </div>
          <div className="leading-tight text-white">
            <div className="text-sm font-semibold tracking-[0.18em] uppercase">uintSkin</div>
            <div className="text-[11px] font-medium text-white/70 tracking-[0.12em]">
              {t('app.subtitle')}
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div
            className="flex items-center gap-2 rounded-2xl bg-white/6 border border-white/12 px-3 py-2 shadow-[0_10px_26px_rgba(0,0,0,0.35)] backdrop-blur"
            style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
          >
            {appVersion && (
              <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-white/12 text-white border border-white/25 uppercase tracking-[0.12em]">
                v{appVersion}
              </span>
            )}
            <div className="h-6 w-px bg-white/15" aria-hidden="true" />
            <ThemePicker />
            <LanguageSwitcher />
            <div className="h-6 w-px bg-white/15" aria-hidden="true" />
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/15 text-white/80 hover:text-white"
                onClick={handleMinimize}
                aria-label={t('actions.minimize')}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/15 text-white/80 hover:text-white"
                onClick={handleMaximize}
                aria-label={isMaximized ? t('actions.restore') : t('actions.maximize')}
              >
                <Square className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 rounded-lg hover:bg-error/12 hover:text-error border border-transparent hover:border-error/30 text-white/80"
                onClick={handleClose}
                aria-label={t('actions.close')}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
