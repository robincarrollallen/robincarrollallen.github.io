import { createAnimations } from '@tamagui/animations-css'
import { animationsCSS } from '@tamagui/config/v5-css'

const easeOut = 'cubic-bezier(0.25, 0.1, 0.25, 1)'

export const animationsRoot = createAnimations({
  ...animationsCSS.animations,
  sheet: `200ms ${easeOut}`
})
