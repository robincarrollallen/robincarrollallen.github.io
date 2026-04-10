import { createAnimations } from '@tamagui/animations-css'
import { animationsCSS } from '@tamagui/config/v5-css'

export const animationsRoot = createAnimations({
  ...animationsCSS.animations,
  sheet: {
    damping: 25,
    stiffness: 300,
    mass: 0.3,
    velocity: 0,
  },
})
