import { memo } from 'react'
import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAtom, useAtomValue } from 'jotai'
import { gamePathAtom } from '../../store/atoms/game.atoms'
import { championDataAtom } from '../../store/atoms/champion.atoms'
import { showFavoritesOnlyAtom } from '../../store/atoms'
import { showSettingsDialogAtom } from '../../store/atoms/ui.atoms'
import {
  leagueClientEnabledAtom,
  championDetectionEnabledAtom
} from '../../store/atoms/settings.atoms'
import { lcuConnectedAtom, isInChampSelectAtom } from '../../store/atoms/lcu.atoms'
import { useGameDetection } from '../../hooks/useGameDetection'
import { useChampionData } from '../../hooks/useChampionData'
import { LCUStatusIndicator } from '../LCUStatusIndicator'
import { RoomPanel } from '../RoomPanel'

export const AppHeader = memo(() => {
  const { t } = useTranslation()
  const gamePath = useAtomValue(gamePathAtom)
  const championData = useAtomValue(championDataAtom)
  const [showFavoritesOnly, setShowFavoritesOnly] = useAtom(showFavoritesOnlyAtom)
  const [, setShowSettingsDialog] = useAtom(showSettingsDialogAtom)
  const leagueClientEnabled = useAtomValue(leagueClientEnabledAtom)
  const championDetectionEnabled = useAtomValue(championDetectionEnabledAtom)
  const lcuConnected = useAtomValue(lcuConnectedAtom)
  const isInChampSelect = useAtomValue(isInChampSelectAtom)

  const { browseForGame } = useGameDetection()
  const { fetchChampionData, isLoadingChampionData } = useChampionData()

  const loading = isLoadingChampionData

  return (
    <div className="px-6 pt-4 pb-2">
      <div className="relative rounded-2xl border border-border-subtle bg-surface/80 shadow-medium overflow-hidden backdrop-blur-xl">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(500px_at_8%_20%,rgba(0,176,240,0.18),transparent),radial-gradient(420px_at_85%_10%,rgba(240,55,172,0.16),transparent)]" />
        <div className="relative px-5 py-4 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full bg-primary-500/10 border border-primary-500/30 text-text-primary">
                {t('app.subtitle')}
              </div>
              <LCUStatusIndicator
                connected={lcuConnected}
                inChampSelect={isInChampSelect}
                enabled={leagueClientEnabled && championDetectionEnabled}
              />
              <RoomPanel />
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`px-4 py-2.5 text-sm rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold tracking-wide
            ${
              showFavoritesOnly
                ? 'bg-secondary-500/15 text-secondary-900 dark:text-secondary-50 border border-secondary-500/50 shadow-soft'
                : 'bg-primary-500/10 text-text-primary border border-border-subtle shadow-soft hover:border-primary-500/30'
            }`}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                disabled={loading}
                aria-pressed={showFavoritesOnly}
                aria-label={t('nav.favorites')}
              >
                <Heart
                  className={`w-4 h-4 ${
                    showFavoritesOnly ? 'text-secondary-700 dark:text-secondary-200' : 'text-primary-600'
                  } transition-colors`}
                  aria-hidden="true"
                  strokeWidth={showFavoritesOnly ? 2.4 : 2}
                  fill={showFavoritesOnly ? 'currentColor' : 'none'}
                />
                {t('nav.favorites')}
              </button>
              <button
                className="px-3 py-2.5 text-sm bg-primary-500/15 hover:bg-primary-500/25 text-text-primary font-semibold rounded-lg transition-all duration-200 border border-primary-500/40 shadow-soft flex items-center gap-2"
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

          <div className="grid gap-3 lg:grid-cols-[1.4fr_auto_auto] md:grid-cols-[1fr]">
            <div className="flex items-center gap-3 bg-elevated/70 border border-border-subtle rounded-xl px-4 py-3 shadow-soft">
              <div className="flex flex-col gap-0.5 w-full">
                <div className="text-[11px] uppercase tracking-[0.16em] text-text-muted font-semibold">
                  {t('status.gameDetected')}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={gamePath}
                    placeholder={t('status.gameNotFound')}
                    readOnly
                    className="flex-1 px-0 py-1.5 text-sm bg-transparent border-0 text-text-primary placeholder-text-muted focus:outline-none"
                  />
                  <button
                    className="px-4 py-2 text-sm bg-primary-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-soft hover:shadow-medium active:scale-[0.98]"
                    onClick={browseForGame}
                    disabled={loading}
                  >
                    {t('actions.browse')}
                  </button>
                </div>
              </div>
            </div>

            {!championData && (
              <button
                className="px-5 py-3 text-sm bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_12px_32px_rgba(0,176,240,0.35)] hover:brightness-[1.03] active:scale-[0.98]"
                onClick={fetchChampionData}
                disabled={loading}
              >
                {t('champion.downloadData')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

AppHeader.displayName = 'AppHeader'
