import { Theme } from './types'

// MythicShift palette — focused on electric teal and magenta accents
export const mythicLightTheme: Theme = {
  id: 'mythic-light',
  name: 'MythicShift Light',
  description: 'Crisp studio look with electric teal and magenta cues',
  isDark: false,
  colors: {
    primary: {
      50: '#e6f9ff',
      100: '#c0f1ff',
      200: '#8de4ff',
      300: '#52d4ff',
      400: '#1bc3ff',
      500: '#00b0f0',
      600: '#0097d1',
      700: '#0077a6',
      800: '#005c82',
      900: '#004766',
      950: '#022b3d'
    },
    secondary: {
      50: '#fff0fb',
      100: '#ffd5f4',
      200: '#ffade7',
      300: '#ff7ed6',
      400: '#ff55c5',
      500: '#f037ac',
      600: '#d11f8f',
      700: '#ac1774',
      800: '#84125b',
      900: '#5f0c42',
      950: '#3a072a'
    },
    background: {
      base: '#f6f7fb',
      surface: '#ffffff',
      elevated: '#e8edff'
    },
    text: {
      primary: '#0b1024',
      secondary: '#1f2a44',
      muted: '#4b5879',
      inverse: '#f6f7fb'
    },
    border: {
      default: '#dfe4f5',
      strong: '#c7d0eb',
      subtle: '#eef2ff'
    },
    state: {
      success: '#12c48b',
      warning: '#f2b34d',
      error: '#f97066',
      info: '#2bb0f5'
    }
  }
}

export const mythicDarkTheme: Theme = {
  id: 'mythic-dark',
  name: 'MythicShift Dark',
  description: 'Obsidian base with neon teal glow',
  isDark: true,
  colors: {
    primary: {
      50: '#e6f9ff',
      100: '#c0f1ff',
      200: '#8de4ff',
      300: '#52d4ff',
      400: '#1bc3ff',
      500: '#00b0f0',
      600: '#0097d1',
      700: '#0077a6',
      800: '#005c82',
      900: '#004766',
      950: '#022b3d'
    },
    secondary: {
      50: '#fff0fb',
      100: '#ffd5f4',
      200: '#ffade7',
      300: '#ff7ed6',
      400: '#ff55c5',
      500: '#f037ac',
      600: '#d11f8f',
      700: '#ac1774',
      800: '#84125b',
      900: '#5f0c42',
      950: '#3a072a'
    },
    background: {
      base: '#050914',
      surface: '#0c1426',
      elevated: '#121c30'
    },
    text: {
      primary: '#e6edff',
      secondary: '#c1cffb',
      muted: '#8ba1d5',
      inverse: '#050914'
    },
    border: {
      default: '#1a2540',
      strong: '#263454',
      subtle: '#0c1426'
    },
    state: {
      success: '#21d8a4',
      warning: '#f2c45d',
      error: '#ff6b6b',
      info: '#4ecbff'
    }
  }
}

export const defaultLightTheme = mythicLightTheme
export const defaultDarkTheme = mythicDarkTheme

export const themes: Theme[] = [mythicLightTheme, mythicDarkTheme]

export const lightThemes = themes.filter((t) => !t.isDark)
export const darkThemes = themes.filter((t) => t.isDark)

export function getThemeById(id: string): Theme | undefined {
  return themes.find((t) => t.id === id)
}

export function getThemeForMode(themeId: string, isDark: boolean): Theme | undefined {
  const baseThemeName = themeId.replace(/-light|-dark/, '')
  const suffix = isDark ? '-dark' : '-light'
  return getThemeById(`${baseThemeName}${suffix}`)
}
