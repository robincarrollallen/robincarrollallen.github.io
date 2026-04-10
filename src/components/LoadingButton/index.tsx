import { SvgXml } from 'react-native-svg'
import { StyleSheet } from 'react-native'
import { SVG } from '~/assets/modules/svg'
import { Animated, Easing } from 'react-native'
import { memo, useMemo, useRef, useEffect } from 'react'
import { useSizeTokens } from '~/store/modules/responsive'
import { Button, isWeb, useTheme, type ButtonProps, type GetThemeValueForKey } from 'tamagui'

/** LoadingButton component props */
interface LoadingButtonProps extends ButtonProps {
  color?: GetThemeValueForKey<"color">
  loading?: boolean
  iconSize?: number
  onPress: () => void
}

/** LoadingButton component */
export const LoadingButton = memo(({
  onPress,
  children,
  iconSize = 24,
  disabled = false,
  loading = false,
  bg = '$gradientsPrimaryB' as GetThemeValueForKey<"backgroundColor">,
  ...props
}: LoadingButtonProps) => {
  const size = useSizeTokens()

  const styles = useMemo(() => StyleSheet.create({
    buttonDisabled: {
      opacity: 0.5
    },
    buttonHover: {
      backgroundColor: '$gradientsPrimaryA'
    } as any
  }), [])
  
  return (
    <Button
      bg={bg}
      onPress={onPress}
      disabled={disabled || loading}
      borderTopLeftRadius={size[6]}
      borderTopRightRadius={size[6]}
      borderBottomLeftRadius={size[6]}
      borderBottomRightRadius={size[6]}
      disabledStyle={styles.buttonDisabled}
      hoverStyle={styles.buttonHover}
      pressStyle={styles.buttonHover}
      icon={loading ? <LoadingIcon iconSize={iconSize} /> : null}
      {...props}
    >
      {children}
    </Button>
  )
})

/** LoadingIcon component */
const LoadingIcon = memo(({ iconSize = 24 }: { iconSize?: number }) => {
  const theme = useTheme()
  const spinAnim = useRef(new Animated.Value(0)).current // 创建动画值

  useEffect(() => {
    // 设置无限循环动画
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,  // 线性缓动，保证旋转匀速
        useNativeDriver: !isWeb,   // 使用原生驱动，性能最佳
      })
    ).start()
  }, [spinAnim])

  // 插值：0 -> 1 转换为 0deg -> 360deg
  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.View
      style={{
        transform: [{ rotate }],
      }}
    >
      <SvgXml xml={SVG.loading} width={iconSize} height={iconSize} color={theme.textInverse?.val} />
    </Animated.View>
  )
})