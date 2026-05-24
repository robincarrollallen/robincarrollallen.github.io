import { fonts } from './fonts'
import { createTamagui } from 'tamagui'
import { animationsRoot } from './animationsRoot'
import { defaultConfig } from '@tamagui/config/v5'
import { customTheme, supremeGreenTheme } from './customTheme'

/** Tamagui Configuration */
export const config = createTamagui({
  ...defaultConfig,
  animations: animationsRoot,
  fonts,
  // tamagui optimization - reduce bundle size by avoiding themes js on client
  // tamagui will hydrate it from CSS which improves lighthouse scores
  themes: {
    ...defaultConfig.themes,
    light: {
      ...defaultConfig.themes.light,
    },
    dark: {
      ...supremeGreenTheme,
    },
    ...customTheme,
  }
})

type TamaguiConfigType = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends TamaguiConfigType {}

  interface TypeOverride {
    groupNames(): 'button' | 'message' | 'icon' | 'item' | 'frame' | 'card'
  }
}