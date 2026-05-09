import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import { THEME, type ThemeName, type ThemeMode, THEME_STYLE, THEME_MODE, type ThemeModeKey, THEME_MODE_TYPE } from '~/theme'
import type { BaseStore } from '../types'

interface ThemeState extends BaseStore {
  themeMode: ThemeMode
  style: ThemeName
  
  // Actions
  setThemeMode: (themeMode: ThemeMode) => void
  setStyle: (style: ThemeName) => void
}

const initialState = {
  themeMode: THEME_MODE_TYPE.SYSTEM,
  style: THEME.STYLE_25 as ThemeName,
  _hasHydrated: false,
}

export const useThemeStore = create<ThemeState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      setThemeMode: (themeMode: ThemeMode) => set({ themeMode }),

      setStyle: (style: ThemeName) => {
        const themeStyleKey = THEME_STYLE[style] as ThemeModeKey // SupremeGreen -> style_25
        const themeMode = THEME_MODE[themeStyleKey] ?? THEME_MODE_TYPE.SYSTEM

        set({ style, themeMode })
      },
      
      reset: () => set(initialState),
    }),
    {
      name: 'theme-store',
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (!error && state) {
            state.setHasHydrated(true)
          }
        }
      },
    }
  )
)