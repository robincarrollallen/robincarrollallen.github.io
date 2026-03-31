import { fonts } from './fonts'
import { createTamagui } from 'tamagui'
import { animationsRoot } from './animationsRoot'
import { defaultConfig } from '@tamagui/config/v5'
import { customTheme } from './customTheme'

/** Tamagui theme configuration */
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
      ...defaultConfig.themes.dark,
    },
    ...customTheme,
  }
})

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}

  interface TypeOverride {
    groupNames(): 'button' | 'message' | 'icon' | 'item' | 'frame' | 'card'
  }
}
