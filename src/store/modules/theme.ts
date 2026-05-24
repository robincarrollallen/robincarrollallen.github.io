import { create } from 'zustand'
import { themeConfig } from '~/theme/config'
import { createPersistStore } from '../middleware/persist'
import { THEME_STYLE, THEME_ENUM, THEME_MODE, THEME_NAME, type ThemeNameType, type ThemeModeType } from '~/theme'
import type { BaseStore } from '../types'

interface ThemeState extends BaseStore {
  themeMode: ThemeModeType
  style: ThemeNameType
  
  // Actions
  setThemeMode: (themeMode: ThemeModeType) => void
  setStyle: (style: ThemeNameType) => void
}

const initialState = {
  themeMode: THEME_MODE.DARK,
  style: THEME_MODE.DARK as ThemeNameType,
  _hasHydrated: false,
}

export const useThemeStore = create<ThemeState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      setThemeMode: (themeMode: ThemeModeType) => set({ themeMode }),

      setStyle: (style: ThemeNameType) => {
        const themeStyleKey = THEME_ENUM[THEME_STYLE[style]]
        const themeMode = themeConfig[themeStyleKey]?.mode ?? THEME_MODE.SYSTEM

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