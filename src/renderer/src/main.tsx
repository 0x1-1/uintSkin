import './assets/main.css'
import './i18n'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Import themes and apply default theme before React renders
import { getThemeById, defaultLightTheme, defaultDarkTheme } from './themes/themes'
import { applyTheme } from './themes/utils'

// Apply initial theme based on stored preference or system preference
const THEME_STORAGE_KEY = 'mythicshift-theme-config'
const storedConfig =
  localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem('bocchi-theme-config')
let initialTheme = defaultLightTheme

if (storedConfig) {
  try {
    const config = JSON.parse(storedConfig)
    const isDark =
      config.mode === 'dark' ||
      (config.mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    const baseThemeId = config.themeId === 'default' ? 'mythic' : config.themeId
    const themeId = `${baseThemeId}-${isDark ? 'dark' : 'light'}`
    initialTheme = getThemeById(themeId) || (isDark ? defaultDarkTheme : defaultLightTheme)
  } catch {
    // Use default
  }
} else {
  // Check legacy dark mode setting
  const legacyDarkMode = localStorage.getItem('darkMode')
  if (legacyDarkMode === 'true') {
    initialTheme = defaultDarkTheme
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    initialTheme = defaultDarkTheme
  }
}

// Apply theme before React renders to prevent flash
applyTheme(initialTheme)

// Add loaded class to body to fade in the content
document.body.classList.add('loaded')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
