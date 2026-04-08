import { Slot, Stack } from 'one'
import { memo, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { YStack, useTheme } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MainPagePwaNavigation } from '~/widgets/Home/PwaNavigation'
import { MainPageHeaderNavigation } from '~/widgets/Home/HeaderNavigation'

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
  const theme = useTheme()
  const { top } = useSafeAreaInsets()

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    wrapper: {
      paddingTop: top,
      backgroundColor: theme.backgroundSurfaceLowered?.val,
    },
  }), [top])
  
  return (
    <YStack style={styles.wrapper}>
      <MainPagePwaNavigation />
      <MainPageHeaderNavigation />
    </YStack>
  )
})
