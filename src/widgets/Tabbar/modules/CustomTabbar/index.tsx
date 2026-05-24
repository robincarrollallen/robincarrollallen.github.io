import { useSafeAreaInsets } from "one"
import { ROUTES } from "~/router/routes"
import { SvgXml } from "react-native-svg"
import { SVG } from "~/assets/modules/svg"
import { memo, useCallback, useMemo } from "react"
import { useStyleStore } from "~/store/modules/style"
import { MiddleItem } from "../../components/MiddleItem"
import { SimpleItem } from "../../components/SimpleItem"
import { useTheme, useThemeName, XStack } from "tamagui"
import { useSizeTokens } from "~/store/modules/responsive"
import { StyleSheet, type LayoutChangeEvent } from "react-native"
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

/** Custom TabBar */
export const CustomTabBar = memo((props: BottomTabBarProps) => {
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
      {props.state.routeNames.map((routeName: string) => (
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

