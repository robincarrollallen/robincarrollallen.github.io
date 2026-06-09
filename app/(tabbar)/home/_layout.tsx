import { MainPageContent } from '.'
import { StyleSheet } from 'react-native'
import { Stack, useSafeAreaInsets } from 'one'
import { memo, useEffect, useMemo } from 'react'
import { isWeb, useTheme, YStack } from 'tamagui'
import { useGameStore } from '~/store/modules/game'
import { MainPagePwaNavigation } from '~/widgets/Home/PwaNavigation'
import { MainPageHeaderNavigation } from '~/widgets/Home/HeaderNavigation'
import homeListData from '~/data/homeList.json'

/** Main Page Layout */
export const HomeLayout = () => {
  const setHomeList = useGameStore.getState().setHomeList
  
  useEffect(() => {
    // TODO: get home list from API
    setHomeList(homeListData)
  }, [])

  return (
    isWeb
    ? <YStack height="100%">
        <MainPageHeader />
        <MainPageContent />
      </YStack>
    : <>
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => <MainPageHeader />,
          }}
        />
        <MainPageContent />
      </>
  )
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
