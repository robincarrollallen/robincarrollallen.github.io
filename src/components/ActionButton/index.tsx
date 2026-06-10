import { DATA_TYPE } from '~/enums/data'
import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { memo, useEffect, useMemo, useRef } from 'react'
import { useSizeTokens } from '~/store/modules/responsive'
import { Animated, Easing, StyleSheet } from 'react-native'
import { Button, isWeb, useTheme, YStack, Text, type ButtonProps, type GetThemeValueForKey } from 'tamagui'

/** ActionButton component props */
interface ActionButtonProps extends ButtonProps {
  loading?: boolean
  iconSize?: number
  enableShimmer?: boolean
  shimmerInterval?: number
  shimmerDuration?: number
  color?: GetThemeValueForKey<'color'>
}

/** ActionButton component */
export const ActionButton = memo(({
  children,
  disabled = false,
  loading = false,
  iconSize = 24,
  enableShimmer = false,
  shimmerInterval = 3000,
  shimmerDuration = 1500,
  color = '$textHighlightWhite' as GetThemeValueForKey<'color'>,
  bg = '$gradientsPrimaryB' as GetThemeValueForKey<'backgroundColor'>,
  ...props
}: ActionButtonProps) => {
  const theme = useTheme()
  const size = useSizeTokens()

  const styles = useMemo(() => StyleSheet.create({
    root: {
      borderRadius: size[6],
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonHover: {
      backgroundColor: '$gradientsPrimaryA',
    } as any,
  }), [size])

  return (
    <YStack position="relative" overflow="hidden" width={props.width || '100%'} style={styles.root}>
      <Button
        bg={bg}
        width="100%"
        borderWidth={0}
        height={size[48]}
        disabled={disabled}
        borderTopLeftRadius={size[6]}
        borderTopRightRadius={size[6]}
        borderBottomLeftRadius={size[6]}
        borderBottomRightRadius={size[6]}
        disabledStyle={styles.buttonDisabled}
        pointerEvents={loading ? 'none' : 'auto'}
        icon={loading ? <LoadingIcon iconSize={iconSize} /> : null}
        hoverStyle={styles.buttonHover}
        pressStyle={styles.buttonHover}
        {...props}
      >
        {
          typeof children === DATA_TYPE.STRING
          ? <Text color={color}>{children}</Text>
          : children
        }
      </Button>

      {enableShimmer && !disabled && (
        <ShimmerEffect
          enabled={enableShimmer}
          interval={shimmerInterval}
          duration={shimmerDuration}
        />
      )}
    </YStack>
  )
})

/** LoadingIcon component */
const LoadingIcon = memo(({ iconSize = 24 }: { iconSize?: number }) => {
  const theme = useTheme()
  const spinAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: !isWeb,
      })
    )

    animation.start()

    return () => {
      animation.stop()
    }
  }, [spinAnim])

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <SvgXml xml={SVG.loading} width={iconSize} height={iconSize} color={theme.textInverse?.val} />
    </Animated.View>
  )
})

/** ShimmerEffect component props */
interface ShimmerEffectProps {
  enabled: boolean
  interval?: number
  duration?: number
}

/** ShimmerEffect component */
const ShimmerEffect = memo(({
  enabled,
  interval = 3000,
  duration = 1500,
}: ShimmerEffectProps) => {
  const scaleAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(1)).current
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)

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

  useEffect(() => {
    if (!enabled) {
      animationRef.current?.stop()
      animationRef.current = null
      return
    }

    scaleAnim.setValue(0)
    opacityAnim.setValue(1)

    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 4,
            duration,
            easing: Easing.linear,
            useNativeDriver: !isWeb,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration,
            easing: Easing.linear,
            useNativeDriver: !isWeb,
          }),
        ]),
        Animated.delay(interval),
      ])
    )
    animationRef.current.start()

    return () => {
      animationRef.current?.stop()
      animationRef.current = null
    }
  }, [duration, enabled, interval, scaleAnim, opacityAnim])

  if (!enabled) return null

  return <Animated.View pointerEvents="none" style={styles.animatedView} />
})
