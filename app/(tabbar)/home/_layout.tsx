import { THEME } from '~/theme'
import { Slot, Stack } from 'one'
import { memo, useMemo } from 'react'
import { isNative } from '~/constants/platform'
import { useThemeStore } from '~/store/modules/theme'
import { Pressable, StyleSheet } from 'react-native'
import { Text, YStack, XStack, useTheme } from 'tamagui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { useSizeTokens } from '~/store/modules/responsive'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

/** Main Page Layout */
export const HomeLayout = () => {
  return <>
    <Stack.Screen
      options={{
        headerShown: true,
        header: () => <MainPageHeader />,
      }}
    />
    <Slot />
  </>
}

/** Main Page Header */
const MainPageHeader = memo(() => {
  const insets = useSafeAreaInsets()

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    wrapper: {
      paddingTop: insets.top,
      backgroundColor: 'red',
    },
  }), [insets])
  
  return (
    <YStack style={styles.wrapper}>
      <MainPagePwaNavigation />
      <MainPageHeaderNavigation />
    </YStack>
  )
})

/** Main Page Header Content */
const MainPagePwaNavigation = memo(() => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const setStyle = useThemeStore().setStyle

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    wrapper: {
      width: '100%',
      height: rem[50],
      backgroundColor: theme.backgroundSurfaceLowered?.val,
    },
  }), [rem])

  return (
    <XStack style={styles.wrapper}>
      <Pressable onPress={() => setStyle(THEME.STYLE_25)}>
        <Text color="$color">PWA Navigation</Text>
      </Pressable>
    </XStack>
  )
})

/** Main Page Header Content */
const MainPageHeaderNavigation = memo(() => {
  const rem = useSizeTokens()
  const theme = useTheme()

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    wrapper: {
      width: '100%',
      height: rem[50],
      backgroundColor: theme.backgroundTopNavSecondary?.val,
    },
  }), [rem])

  return (
    <LinearGradient
      start={[0, 0]}
      end={isNative ? [.8, 4] : [.1, .5]} // 近似125度角
      colors={[
        'transparent',              // 8%
        'rgba(255,255,255,0.06)', // 8%
        'rgba(255,255,255,0)',    // 20%
        'rgba(255,255,255,0.05)', // 20%
        'rgba(255,255,255,0)',    // 32%
        'rgba(255,255,255,0.04)', // 32%
        'rgba(255,255,255,0)',    // 44%
        'rgba(255,255,255,0.03)', // 44%
        'rgba(255,255,255,0)',    // 56%
        'rgba(255,255,255,0.02)', // 56%
        'rgba(255,255,255,0)',    // 68%
        'rgba(255,255,255,0.01)', // 68%
        'rgba(255,255,255,0)',    // 80%
      ]}
      locations={[0.08, 0.08, 0.2, 0.2, 0.32, 0.32, 0.44, 0.44, 0.56, 0.56, 0.68, 0.68, 0.80]}
    >
      <XStack style={styles.wrapper}>
        <Text>Header Navigation</Text>
      </XStack>
    </LinearGradient>
  )
})
