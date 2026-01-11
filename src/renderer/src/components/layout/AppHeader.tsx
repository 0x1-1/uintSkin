import { memo } from 'react'
import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAtom, useAtomValue } from 'jotai'
import { useTheme } from '../../contexts/ThemeContext'
import { gamePathAtom } from '../../store/atoms/game.atoms'
import { showFavoritesOnlyAtom } from '../../store/atoms'
import { showSettingsDialogAtom } from '../../store/atoms/ui.atoms'
import {
  leagueClientEnabledAtom,
  championDetectionEnabledAtom
} from '../../store/atoms/settings.atoms'
import { lcuConnectedAtom, isInChampSelectAtom } from '../../store/atoms/lcu.atoms'
import { useGameDetection } from '../../hooks/useGameDetection'
import { LCUStatusIndicator } from '../LCUStatusIndicator'
import { RoomPanel } from '../RoomPanel'

export const AppHeader = memo(() => {
  const { t } = useTranslation()
  const gamePath = useAtomValue(gamePathAtom)
  const [showFavoritesOnly, setShowFavoritesOnly] = useAtom(showFavoritesOnlyAtom)
  const [, setShowSettingsDialog] = useAtom(showSettingsDialogAtom)
  const leagueClientEnabled = useAtomValue(leagueClientEnabledAtom)
  const championDetectionEnabled = useAtomValue(championDetectionEnabledAtom)
  const lcuConnected = useAtomValue(lcuConnectedAtom)
  const isInChampSelect = useAtomValue(isInChampSelectAtom)
  const { theme } = useTheme()

  const { browseForGame } = useGameDetection()
  const loading = false

  const gradient = theme.isDark
    ? 'linear-gradient(90deg, #0c1530 0%, #0f1135 50%, #1a0f3b 100%)'
    : `linear-gradient(90deg, ${theme.colors.background.surface} 0%, ${theme.colors.background.elevated} 60%, ${theme.colors.primary[50]} 100%)`

  const favoritesStyle = showFavoritesOnly
    ? {
        backgroundColor: theme.isDark ? theme.colors.secondary[500] : theme.colors.secondary[100],
        borderColor: theme.isDark ? theme.colors.secondary[400] : theme.colors.secondary[200],
        color: theme.colors.text.primary
      }
    : {
        backgroundColor: theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        borderColor: theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        color: theme.colors.text.primary
      }

  const settingsStyle = {
    backgroundColor: theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
    borderColor: theme.isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
    color: theme.colors.text.primary
  }

  return (
    <div className="px-6 pt-3 pb-2">
      <div
        className="relative overflow-hidden rounded-2xl border border-border-subtle shadow-[0_24px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(900px_at_12%_20%,rgba(0,176,240,0.18),transparent),radial-gradient(780px_at_80%_8%,rgba(241,99,184,0.2),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="relative px-5 py-4 lg:px-7 lg:py-5 flex flex-col gap-4 text-[color:var(--color-text-primary)]">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-[320px] bg-white/6 border border-white/10 rounded-xl px-4 py-3 shadow-soft">
              <div className="flex-1 truncate rounded-lg bg-black/10 dark:bg-black/20 px-3 py-2 text-sm border border-white/10 text-[color:var(--color-text-primary)]">
                {gamePath || t('status.gameNotFound')}
              </div>
              <button
                className="px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-soft hover:shadow-medium active:scale-[0.98]"
                onClick={browseForGame}
                disabled={loading}
              >
                {t('actions.browse')}
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 ml-auto">
              <LCUStatusIndicator
                connected={lcuConnected}
                inChampSelect={isInChampSelect}
                enabled={leagueClientEnabled && championDetectionEnabled}
              />
              <RoomPanel />
              <button
                className="px-4 py-2.5 text-sm rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold tracking-wide border shadow-soft hover:brightness-[1.03]"
                style={favoritesStyle}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                disabled={loading}
                aria-pressed={showFavoritesOnly}
                aria-label={t('nav.favorites')}
              >
                <Heart
                  className="w-4 h-4"
                  aria-hidden="true"
                  strokeWidth={showFavoritesOnly ? 2.4 : 2}
                  fill={showFavoritesOnly ? 'currentColor' : 'none'}
                />
                {t('nav.favorites')}
              </button>
              <button
                className="px-4 py-2.5 text-sm rounded-full font-semibold transition-all duration-200 border shadow-soft flex items-center gap-2 hover:brightness-[1.03]"
                style={settingsStyle}
                onClick={() => setShowSettingsDialog(true)}
                title={t('settings.title')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {t('settings.title')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

AppHeader.displayName = 'AppHeader'
