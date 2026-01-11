import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
    const checkMaximized = async () => {
      const maximized = await window.api.isWindowMaximized()
      setIsMaximized(maximized)
    }

    checkMaximized()

    // Check when window state changes
    const interval = setInterval(checkMaximized, 100)
    return () => clearInterval(interval)
  }, [])

  const handleMinimize = () => {
    window.api.minimizeWindow()
  }

  const handleMaximize = () => {
    window.api.maximizeWindow()
  }

  const handleClose = () => {
    window.api.closeWindow()
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-[rgba(8,12,24,0.9)] backdrop-blur-xl border-b border-border/60 flex items-center justify-between select-none z-50 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      <div
        className="flex-1 h-full flex items-center"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface/70 border border-border-subtle shadow-soft">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500/80 via-primary-600/70 to-secondary-500/70 flex items-center justify-center shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
            <img src={logoMark} alt="uintSkin logo" className="w-6 h-6 object-contain" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-text-primary uppercase">uintSkin</div>
            <div className="text-[11px] font-medium text-text-muted tracking-[0.08em]">
              {t('app.subtitle')}
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-2 pl-3"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        {appVersion && (
          <span className="px-3 py-1 text-[11px] font-semibold rounded-lg bg-primary-500/15 text-text-primary border border-primary-500/30 uppercase tracking-wide">
            v{appVersion}
          </span>
        )}
        <ThemePicker />
        <LanguageSwitcher />
      </div>

      <div
        className="flex items-center gap-1 pl-3"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-12 rounded-md hover:bg-primary-500/10 border border-transparent hover:border-border-subtle"
          onClick={handleMinimize}
          aria-label={t('actions.minimize')}
        >
          <div className="w-4 h-[2px] bg-text-secondary group-hover:bg-text-primary transition-colors"></div>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-12 rounded-md hover:bg-primary-500/10 border border-transparent hover:border-border-subtle"
          onClick={handleMaximize}
          aria-label={isMaximized ? t('actions.restore') : t('actions.maximize')}
        >
          <div
            className={`${isMaximized ? 'w-3 h-3 border-[1.5px] border-text-secondary group-hover:border-text-primary' : 'w-3.5 h-3.5 border-[1.5px] border-text-secondary group-hover:border-text-primary'} transition-colors rounded-[2px]`}
          ></div>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-12 rounded-md hover:bg-secondary-500/10 hover:border border-transparent"
          onClick={handleClose}
          aria-label={t('actions.close')}
        >
          <svg
            className="w-3.5 h-3.5 text-text-secondary group-hover:text-error transition-colors"
            viewBox="0 0 12 12"
          >
            <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
