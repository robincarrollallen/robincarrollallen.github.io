import { createAnimations } from '@tamagui/animations-reanimated'
import { animations } from '@tamagui/config/v5-reanimated'

export const animationsRoot = createAnimations({
  ...animations.animations,
  sheet: {
    damping: 25,
    stiffness: 300,
    mass: 0.3,
    velocity: 0,
  },
})
