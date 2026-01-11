import { appWindow } from '@tauri-apps/api/window'
import { open as openExternal } from '@tauri-apps/api/shell'
import { getVersion } from '@tauri-apps/api/app'
import { open as openDialog } from '@tauri-apps/api/dialog'
import { v4 as uuidv4 } from 'uuid'

type SuccessResult<T = any> = {
  success: true
  data?: T
  [key: string]: any
}

type FailureResult = {
  success: false
  error?: string
  [key: string]: any
}

const SETTINGS_KEY = 'uintskin:tauri:settings'
const FAVORITES_KEY = 'uintskin:tauri:favorites'
const PRESETS_KEY = 'uintskin:tauri:presets'
const DOWNLOADS_KEY = 'uintskin:tauri:downloads'

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`[tauri-api] Failed to persist ${key}:`, error)
  }
}

const settingsStore: Record<string, any> = loadFromStorage(SETTINGS_KEY, {})
const favoritesStore: Record<string, Array<{ skinId: string; chromaId?: string; name?: string }>> =
  loadFromStorage(FAVORITES_KEY, {})
const presetsStore: any[] = loadFromStorage(PRESETS_KEY, [])
const downloadsStore: any[] = loadFromStorage(DOWNLOADS_KEY, [])

function persistAll() {
  saveToStorage(SETTINGS_KEY, settingsStore)
  saveToStorage(FAVORITES_KEY, favoritesStore)
  saveToStorage(PRESETS_KEY, presetsStore)
  saveToStorage(DOWNLOADS_KEY, downloadsStore)
}

const noopUnsubscribe = () => {}

const eventStub = (_: any) => {
  console.warn('[tauri-api] Event bridge not implemented in Tauri port yet')
  return noopUnsubscribe
}

async function getAppVersion(): Promise<string> {
  try {
    return await getVersion()
  } catch {
    return __APP_VERSION__ || '0.0.0-tauri'
  }
}

async function getSettings(key?: string) {
  if (!key) return settingsStore
  return settingsStore[key]
}

async function setSettings(key: string, value: any) {
  settingsStore[key] = value
  saveToStorage(SETTINGS_KEY, settingsStore)
  return true
}

async function getSystemLocale() {
  return navigator.language || 'en-US'
}

async function detectGame(): Promise<SuccessResult> {
  return { success: true, gamePath: settingsStore.gamePath || null }
}

async function browseGameFolder(): Promise<SuccessResult> {
  const selected = await openDialog({
    directory: true,
    title: 'Select League of Legends folder'
  })

  if (selected && typeof selected === 'string') {
    settingsStore.gamePath = selected
    saveToStorage(SETTINGS_KEY, settingsStore)
    return { success: true, gamePath: selected }
  }

  return { success: false, gamePath: null }
}

async function listDownloadedSkins(): Promise<SuccessResult> {
  return { success: true, skins: downloadsStore }
}

async function downloadSkin(url: string): Promise<SuccessResult> {
  const entry = {
    id: uuidv4(),
    skinName: url.split('/').pop() || 'Unknown Skin',
    championName: 'Unknown',
    source: 'placeholder',
    downloadedAt: new Date().toISOString()
  }
  downloadsStore.push(entry)
  saveToStorage(DOWNLOADS_KEY, downloadsStore)
  return { success: true, skin: entry }
}

async function deleteSkin(championName: string, skinName: string): Promise<SuccessResult> {
  const index = downloadsStore.findIndex(
    (skin) => skin.championName === championName && skin.skinName === skinName
  )
  if (index >= 0) {
    downloadsStore.splice(index, 1)
    saveToStorage(DOWNLOADS_KEY, downloadsStore)
  }
  return { success: true }
}

async function getFavoritesByChampion(championKey: string): Promise<SuccessResult> {
  return { success: true, favorites: favoritesStore[championKey] || [] }
}

async function getFavorites(): Promise<SuccessResult> {
  return { success: true, favorites: favoritesStore }
}

async function addFavorite(
  championKey: string,
  skinId: string,
  skinName: string,
  chromaId?: string,
  chromaName?: string
): Promise<SuccessResult> {
  const list = favoritesStore[championKey] || []
  list.push({ skinId, chromaId, name: chromaName || skinName })
  favoritesStore[championKey] = list
  saveToStorage(FAVORITES_KEY, favoritesStore)
  return { success: true, favorites: list }
}

async function removeFavorite(
  championKey: string,
  skinId: string,
  chromaId?: string
): Promise<SuccessResult> {
  const list = favoritesStore[championKey] || []
  favoritesStore[championKey] = list.filter(
    (fav) => !(fav.skinId === skinId && fav.chromaId === chromaId)
  )
  saveToStorage(FAVORITES_KEY, favoritesStore)
  return { success: true, favorites: favoritesStore[championKey] }
}

function basicOk(data: Record<string, any> = {}): SuccessResult {
  return { success: true, ...data }
}

function basicNotImplemented(message: string): FailureResult {
  return { success: false, error: message }
}

const api = {
  // App/window controls
  getAppVersion,
  minimizeWindow: () => appWindow.minimize(),
  maximizeWindow: () => appWindow.toggleMaximize(),
  isWindowMaximized: () => appWindow.isMaximized(),
  closeWindow: () => appWindow.close(),
  openExternal: (url: string) => openExternal(url),

  // Settings and locale
  getSettings,
  setSettings,
  getSystemLocale,
  onSettingsChanged: eventStub,

  // Game detection
  detectGame,
  browseGameFolder,

  // Downloads and skin management (placeholder implementations)
  downloadSkin,
  downloadAllSkinsBulk: async () => basicNotImplemented('Bulk download not implemented for Tauri yet'),
  pauseBatchDownload: async () => basicOk(),
  resumeBatchDownload: async () => basicOk(),
  cancelBatchDownload: async () => basicOk(),
  retryFailedDownloads: async () => basicOk({ failed: [] }),
  getBatchDownloadState: async () => basicOk({ active: false }),
  onDownloadAllSkinsProgress: eventStub,
  onDownloadAllSkinsBulkProgress: eventStub,
  listDownloadedSkins,
  deleteSkin,
  deleteCustomSkin: async () => basicOk(),
  clearSkinCache: async () => basicOk(),
  clearAllSkinsCache: async () => basicOk(),
  getCacheInfo: async () => basicOk({ cacheSize: 0 }),

  // Favorites
  getFavoritesByChampion,
  getFavorites,
  addFavorite,
  removeFavorite,

  // Settings-driven behavior
  setOverlayAutoSelectedSkin: async () => basicOk(),
  notifyRendererReady: async () => basicOk(),
  getPendingFiles: async () => [],
  clearPendingFiles: async () => basicOk(),
  onFilesToImport: eventStub,

  // Patcher/skin apply - stubbed for now
  runPatcher: async () => basicOk(),
  stopPatcher: async () => basicOk(),
  cancelApply: async () => basicOk(),
  isPatcherRunning: async () => false,
  isApplying: async () => false,
  getSmartApplySummary: async () => basicOk({ summary: null }),
  smartApplySkins: async () => basicOk(),
  getTeamComposition: async () => basicOk({ champions: [] }),
  onTeamCompositionUpdated: eventStub,
  onReadyForSmartApply: eventStub,
  onTeamReset: eventStub,

  // Champion data
  fetchChampionData: async (language?: string) => basicOk({ language, champions: [] }),
  loadChampionData: async (language?: string) => basicOk({ language, champions: [] }),
  checkChampionUpdates: async () => basicOk({ updateAvailable: false }),
  onLanguageChanged: eventStub,

  // Repository operations
  repositoryConstructUrl: async () => basicOk({ url: 'about:blank' }),
  repositoryGetAll: async () => basicOk({ repositories: [] }),
  repositoryGetActive: async () => basicOk({ repository: null }),
  repositorySetActive: async () => basicOk(),
  repositoryValidate: async () => basicOk({ valid: false }),
  repositoryRedetectStructure: async () => basicOk(),
  repositoryRemove: async () => basicOk(),
  repositoryAddWithDetection: async () => basicOk({ repository: null }),

  // File import/export (stubbed)
  importSkinFile: async () => basicNotImplemented('Skin import not implemented for Tauri yet'),
  importSkinFilesBatch: async () => basicNotImplemented('Batch import not implemented'),
  validateSkinFile: async () => basicOk({ valid: false }),
  extractModInfo: async () => basicOk({ info: null }),
  browseSkinFile: async () => basicOk({ filePath: null }),
  browseSkinFiles: async () => basicOk({ filePaths: [] }),
  browseImageFile: async () => basicOk({ filePath: null }),
  getPathForFile: (file: File) => file.name,
  readImageAsBase64: async () => basicOk({ data: null }),
  extractImageFromMod: async () => basicOk({ image: null }),
  onExtractImageStatus: eventStub,

  // CSLol tools
  checkToolsExist: async () => false,
  downloadTools: async () => basicNotImplemented('Tools download not implemented for Tauri yet'),
  onToolsDownloadProgress: eventStub,
  onToolsDownloadDetails: eventStub,
  checkCslolToolsUpdate: async () =>
    basicNotImplemented('Auto-update for cslol-tools not implemented for Tauri'),

  // Update system
  checkForUpdates: async () => basicNotImplemented('Auto-updater not wired for Tauri yet'),
  getUpdateInfo: async () => basicOk({ updateAvailable: false }),
  getUpdateChangelog: async () => basicOk({ changelog: '' }),
  downloadUpdate: async () => basicNotImplemented('Update download not available'),
  cancelUpdate: async () => basicOk(),
  onUpdateAvailable: eventStub,
  onUpdateDownloadProgress: eventStub,
  onUpdateDownloaded: eventStub,
  onUpdateError: eventStub,

  // LCU / overlay hooks (stubbed)
  lcuGetStatus: async () => basicOk({ connected: false }),
  lcuConnect: async () => basicOk(),
  lcuDisconnect: async () => basicOk(),
  lcuGetOwnedChampions: async () => basicOk({ champions: [] }),
  lcuGetAllChampions: async () => basicOk({ champions: [] }),
  onLcuConnected: eventStub,
  onLcuDisconnected: eventStub,
  onLcuPhaseChanged: eventStub,
  onLcuQueueIdDetected: eventStub,
  onLcuChampionSelected: eventStub,
  onLcuReadyCheckAccepted: eventStub,
  onPreselectModeDetected: eventStub,
  onPreselectChampionsChanged: eventStub,
  onPreselectSnapshotTaken: eventStub,
  onPreselectQueueCancelled: eventStub,
  onPreselectCancelApply: eventStub,
  onPreselectReadyForApply: eventStub,

  // Presets (stored locally for Tauri)
  createPreset: async (name: string, description: string | undefined, selectedSkins: any[]) => {
    const preset = {
      id: uuidv4(),
      name,
      description,
      selectedSkins,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    presetsStore.push(preset)
    saveToStorage(PRESETS_KEY, presetsStore)
    return basicOk({ data: preset })
  },
  listPresets: async () => basicOk({ data: presetsStore }),
  getPreset: async (id: string) => {
    const preset = presetsStore.find((p) => p.id === id) || null
    return basicOk({ data: preset })
  },
  updatePreset: async (id: string, updates: any) => {
    const index = presetsStore.findIndex((p) => p.id === id)
    if (index >= 0) {
      presetsStore[index] = {
        ...presetsStore[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      saveToStorage(PRESETS_KEY, presetsStore)
      return basicOk({ data: presetsStore[index] })
    }
    return basicNotImplemented('Preset not found')
  },
  deletePreset: async (id: string) => {
    const index = presetsStore.findIndex((p) => p.id === id)
    if (index >= 0) {
      presetsStore.splice(index, 1)
      saveToStorage(PRESETS_KEY, presetsStore)
    }
    return basicOk()
  },
  duplicatePreset: async (id: string, newName: string) => {
    const preset = presetsStore.find((p) => p.id === id)
    if (!preset) return basicNotImplemented('Preset not found')
    const copy = {
      ...preset,
      id: uuidv4(),
      name: newName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    presetsStore.push(copy)
    saveToStorage(PRESETS_KEY, presetsStore)
    return basicOk({ data: copy })
  },
  validatePreset: async () => basicOk({ data: { valid: true } }),
  exportPreset: async () =>
    basicNotImplemented('Preset export not implemented for Tauri placeholder port'),
  importPreset: async () => basicNotImplemented('Preset import not implemented'),

  // Misc placeholders
  generateMetadataForExistingSkins: async () => basicOk({ generated: 0 }),
  checkSkinUpdates: async () => basicOk({ updates: [] }),
  updateSkin: async () => basicOk(),
  swapCustomModFile: async () => basicOk(),
  editCustomSkin: async () => basicNotImplemented('Custom skin editing not implemented'),
  getCustomSkinImage: async () => basicOk({ image: null }),
  getCustomSkinImages: async () => basicOk({ images: [] }),
  onFixModProgress: eventStub,
  fixModIssues: async () => basicNotImplemented('Mod fixing not implemented'),

  // P2P placeholders
  prepareTempFile: async () => basicOk({ path: '' }),
  readFileChunk: async () => basicOk({ chunk: null }),
  writeFileFromChunks: async () => basicOk({ path: '' }),
  importFile: async () => basicNotImplemented('P2P import not implemented'),
  getModFileInfo: async () => basicOk({ info: null }),

  // Tray/menu compatibility
  onOpenSettings: eventStub
}

declare global {
  interface Window {
    api: typeof api
  }
}

// Expose the shim globally so existing renderer code can keep using window.api
window.api = api
