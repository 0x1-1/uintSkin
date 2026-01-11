import { memo } from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAtom, useAtomValue } from 'jotai'
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

  const { browseForGame } = useGameDetection()
  const loading = false

  return (
    <div className="px-6 pt-3 pb-2">
      <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-r from-[#0c1530] via-[#0f1135] to-[#1a0f3b] shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(900px_at_12%_20%,rgba(0,176,240,0.25),transparent),radial-gradient(780px_at_80%_8%,rgba(241,99,184,0.28),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="relative px-5 py-4 lg:px-7 lg:py-5 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="flex items-center gap-2 text-xs text-white/75 bg-white/5 border border-white/10 rounded-full px-3 py-2 shadow-soft">
              <Sparkles className="w-3.5 h-3.5 text-secondary-300" />
              <span className="font-semibold tracking-wide uppercase">{t('status.gameDetected')}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <LCUStatusIndicator
                connected={lcuConnected}
                inChampSelect={isInChampSelect}
                enabled={leagueClientEnabled && championDetectionEnabled}
              />
              <RoomPanel />
              <button
                className={`px-4 py-2.5 text-sm rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold tracking-wide
            ${
              showFavoritesOnly
                ? 'bg-secondary-500/20 text-white border border-secondary-400/60 shadow-soft'
                : 'bg-white/10 text-white border border-white/10 shadow-soft hover:border-white/30'
            }`}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                disabled={loading}
                aria-pressed={showFavoritesOnly}
                aria-label={t('nav.favorites')}
              >
                <Heart
                  className={`w-4 h-4 ${showFavoritesOnly ? 'text-white' : 'text-white/70'} transition-colors`}
                  aria-hidden="true"
                  strokeWidth={showFavoritesOnly ? 2.4 : 2}
                  fill={showFavoritesOnly ? 'currentColor' : 'none'}
                />
                {t('nav.favorites')}
              </button>
              <button
                className="px-4 py-2.5 text-sm rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold transition-all duration-200 border border-white/20 shadow-soft flex items-center gap-2"
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

          <div className="grid gap-3">
            <div className="flex items-center gap-3 bg-white/6 border border-white/10 rounded-xl px-4 py-3 shadow-soft">
              <div className="flex flex-col gap-1 w-full text-white/80">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/65 font-semibold">
                  {t('status.gameDetected')}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 truncate rounded-lg bg-black/20 px-3 py-2 text-sm border border-white/10">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

AppHeader.displayName = 'AppHeader'
