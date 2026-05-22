import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { memo, useCallback, useMemo } from 'react'
import { SimpleItem } from './components/SimpleItem'
import { MiddleItem } from './components/MiddleItem'
import { useStyleStore } from '~/store/modules/style'
import { Slot, Tabs, useRouter, type Href } from 'one'
import { useSizeTokens } from '~/store/modules/responsive'
import { getRouteForRouteName, ROUTES } from '~/router/routes'
import { StyleSheet, type LayoutChangeEvent } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme, XStack, useThemeName, isWeb, YStack } from 'tamagui'
import type { TabNavigationState, ParamListBase } from '@react-navigation/native'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

/** Tabbar Wrapper */
export function TabbarWrapper() {
  const theme = useTheme()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const state = {
    routeNames: [
      ROUTES.home.name,
      ROUTES.activity.name,
      ROUTES.invite.name,
      ROUTES.deposit.name,
      ROUTES.profile.name
    ]
  } as TabNavigationState<ParamListBase>
  const descriptors = {} as BottomTabBarProps['descriptors']
  const navigation = {
    navigate: (routeName: string) => {
      const route = getRouteForRouteName(routeName)
      router.push(route?.path as Href ?? ROUTES.root.path)
    }
  } as BottomTabBarProps['navigation']

  return (
    isWeb
    ? <YStack height="100%">
        <Slot />
        <CustomTabBar state={state} descriptors={descriptors} navigation={navigation} insets={insets} />
      </YStack>
    : <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: {
            backgroundColor: theme.backgroundBody?.val
          }
        }}
        tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
      >
        {state.routeNames.map((routeName) => (
          <Tabs.Screen key={routeName} name={routeName} />
        ))}
      </Tabs>
  )
}

/** Custom TabBar */
const CustomTabBar = memo((props: BottomTabBarProps) => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const themeName = useThemeName()
  const insets = useSafeAreaInsets()

  /** Tabbar Layout Event Callback Function */
  const onTabbarLayout = useCallback((event: LayoutChangeEvent) => {
    const setTabbarLayout = useStyleStore.getState().setTabbarLayout
    setTabbarLayout(event.nativeEvent.layout)
  }, [])

  const styles = useMemo(() => StyleSheet.create({
    backgroundImage: {
      position: 'absolute'
    },
    backgroundColor: {
      backgroundColor: theme.backgroundFootBar?.val
    }
  }), [themeName])

  return (
    <XStack onLayout={onTabbarLayout} width="100%" height={insets.bottom + rem[90]} position='absolute' b={0} pb={insets.bottom}>
      <SvgXml xml={SVG.tabbar_background_25} preserveAspectRatio="none" width="100%" height={rem[90]} style={styles.backgroundImage} />
      <XStack width="100%" style={styles.backgroundColor} height={insets.bottom} position='absolute' b={0}></XStack>
      {props.state.routeNames.map((routeName) => (
        <TabBarItem key={routeName} routeName={routeName} navigation={props.navigation} />
      ))}
    </XStack>
  )
})

/** Tabbar Item */
const TabBarItem = memo(({ routeName, navigation }: { routeName: string, navigation: BottomTabBarProps['navigation'] }) => {

  return (
    routeName === ROUTES.invite.name
      ? <MiddleItem routeName={routeName} navigation={navigation} />
      : <SimpleItem routeName={routeName} navigation={navigation} />
  )
})

