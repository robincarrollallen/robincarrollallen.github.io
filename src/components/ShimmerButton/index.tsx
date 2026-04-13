import { useRef, useEffect, memo, useMemo } from "react"
import { useSizeTokens } from '~/store/modules/responsive'
import { Animated, Easing, StyleSheet } from 'react-native'
import { Button, useTheme, YStack, type ButtonProps} from "tamagui"

/** ShimmerButton component props */
interface ShimmerButtonProps extends ButtonProps {
  enableShimmer?: boolean
  shimmerInterval?: number
}

/** ShimmerButton component */
export const ShimmerButton = memo(({ 
  children,
  disabled = false,
  enableShimmer = false,
  shimmerInterval = 3000,
  ...props 
}: ShimmerButtonProps) => {
  const theme = useTheme()
  const rem = useSizeTokens()

  return (
    <YStack position="relative" overflow="hidden" width="100%" style={{ borderRadius: rem[6] }}>
      <Button
        width="100%"
        borderWidth={0}
        height={rem[48]}
        bg={theme.activePrimary?.val}
        disabled={disabled}
        disabledStyle={{ bg: theme.disabled?.val }}
        hoverStyle={{ bg: theme.activeActive?.val }}
        pressStyle={{ bg: theme.surfaceRaisedL2?.val }}
        {...props}
      >
        {children}
      </Button>
      
      {enableShimmer && !disabled && <ShimmerEffect enabled={enableShimmer} interval={shimmerInterval} />}
    </YStack>
  )
})

/** ShimmerEffect component props */
interface ShimmerEffectProps {
  enabled: boolean
  interval?: number
  duration ?: number
}

/** ShimmerEffect component */
const ShimmerEffect = memo(({ 
  enabled, 
  interval = 3000,
  duration  = 1500,
}: ShimmerEffectProps) => {
  const scaleAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(1)).current
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)

  useEffect(() => {
    if (!enabled) {
      if (animationRef.current) {
        animationRef.current.stop()
        animationRef.current = null
      }
      return
    }

    scaleAnim.setValue(0)
    opacityAnim.setValue(1)

    const createAnimation = () => {
      return Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 4,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(interval),
      ])
    }

    animationRef.current = Animated.loop(createAnimation())
    animationRef.current.start()

    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
        animationRef.current = null
      }
    }
  }, [enabled, interval, scaleAnim, opacityAnim])

  if (!enabled) return null

  /** stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    animatedView: {
      zIndex: 1,
      bottom: 0,
      left: '-100%',
      width: '100%',
      aspectRatio: 1,
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      transform: [{ scale: scaleAnim }, { rotate: '45deg' }],
      opacity: opacityAnim,
    },
  }), [scaleAnim, opacityAnim])

  return (
    <Animated.View
      style={styles.animatedView}
    />
  )
})
