import { useI18n } from '~/i18n'
import { Tabs, usePathname } from 'one'
import { SvgXml } from 'react-native-svg'
import { Image } from '~/components/Image'
import { SVG } from '~/assets/modules/svg'
import { ICONS } from '~/assets/modules/icons'
import { IMAGES } from '~/assets/modules/images'
import { memo, useCallback, useMemo } from 'react'
import { useStyleStore } from '~/store/modules/style'
import { PATH_TO_NAME, ROUTES } from '~/router/routes'
import { useSizeTokens } from '~/store/modules/responsive'
import { useTheme, XStack, Text, useThemeName } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Pressable, StyleSheet, type LayoutChangeEvent } from 'react-native'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

/** Tabbar Page Layout */
export function TabbarLayout() {
  const theme = useTheme()

  return (
    <Tabs
      initialRouteName={ROUTES.home.name}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: theme.backgroundBody?.val
        }
      }}
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name={ROUTES.home.name} />
      <Tabs.Screen name={ROUTES.activity.name} />
      <Tabs.Screen name={ROUTES.invite.name} />
      <Tabs.Screen name={ROUTES.deposit.name} />
      <Tabs.Screen name={ROUTES.profile.name} />
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

/** Simple Item */
const SimpleItem = memo(({ routeName, navigation }: { routeName: string, navigation: BottomTabBarProps['navigation'] }) => {
  const rem = useSizeTokens()
  const currentPath = usePathname() as keyof typeof PATH_TO_NAME // Current Route Path
  const labelColor = routeName === PATH_TO_NAME[currentPath] ? 'white' : 'gray' // Tabbar Label Color
  const icon = routeName === PATH_TO_NAME[currentPath] ? SVG[`tabbar_${routeName}_active_25` as keyof typeof SVG] : SVG[`tabbar_${routeName}_25` as keyof typeof SVG] // Current Tabbar Icon
  const { t } = useI18n()

  /** Tabbar Label Click Event Callback Function */
  const tabbarPress = useCallback(() => {
    navigation.navigate(routeName)
  }, [navigation, routeName])

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    tabbarItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: rem[6],
    },
  }), [rem])

  return (
    <Pressable onPress={tabbarPress} style={styles.tabbarItem}>
      <SvgXml xml={icon} width={rem[34]} height={rem[34]} />
      <Text color={labelColor} fontSize={rem[10]} lineHeight={rem[14]}>{t(`tab.${routeName}`)}</Text>
    </Pressable>
  )
})

/** Middle Item */
const MiddleItem = memo(({ routeName, navigation }: { routeName: string, navigation: BottomTabBarProps['navigation'] }) => {
  const rem = useSizeTokens()
  
  /** Tabbar Label Click Event Callback Function */
  const tabbarPress = useCallback(() => {
    navigation.navigate(routeName)
  }, [navigation, routeName])

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    middleItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
  }), [rem])

  return (
    <Pressable style={styles.middleItem} onPress={tabbarPress}>
      <Image src={IMAGES.bg_tabbar_flexible_25} position='absolute' width={rem[110]} height={rem[110]} mt={rem[6]} />
      <Image src={ICONS.tabbar_flexible_25} position='absolute' width={rem[40]} height={rem[40]} mt={rem[6]} />
    </Pressable>
  )
})