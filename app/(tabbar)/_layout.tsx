import { useI18n } from '~/i18n'
import { Image } from 'expo-image'
import { usePathname, Tabs } from 'one'
import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { ICONS } from '~/assets/modules/icons'
import { IMAGES } from '~/assets/modules/images'
import { Text, useTheme, XStack } from 'tamagui'
import { memo, useCallback, useMemo } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { ToastProvider } from '~/interface/toast/Toast'
import { useSizeTokens } from '~/store/modules/responsive'
import { PATH_TO_NAME, ROUTES } from '~/navigation/routes'
import { DialogProvider } from '~/interface/dialogs/Dialog'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

/** Tabbar Page Layout */
export function TabbarLayout() {

  return (
    <ToastProvider>
      <DialogProvider>
        <Tabs
          initialRouteName={ROUTES.home.name}
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
        >
          <Tabs.Screen name={ROUTES.home.name} />
          <Tabs.Screen name={ROUTES.activity.name} />
          <Tabs.Screen name={ROUTES.search.name} />
          <Tabs.Screen name={ROUTES.deposit.name} />
          <Tabs.Screen name={ROUTES.profile.name} />
        </Tabs>
      </DialogProvider>
    </ToastProvider>
  )
}

/** Custom TabBar */
const CustomTabBar = memo((props: BottomTabBarProps) => {
  const rem = useSizeTokens()
  const insets = useSafeAreaInsets()
  const theme = useTheme()

  return (
    <XStack width="100%" height={insets.bottom + rem[90]} position='absolute' b={0} pb={insets.bottom}>
      <SvgXml xml={SVG.tabbar_background_25} preserveAspectRatio="none" width="100%" height={rem[90]} style={{ position: 'absolute' }} />
      <XStack width="100%" bg={theme.backgroundFootBar} height={insets.bottom} position='absolute' b={0}></XStack>
      {props.state.routeNames.map((routeName) => (
        <TabBarItem key={routeName} routeName={routeName} navigation={props.navigation} />
      ))}
    </XStack>
  )
})

/** Tabbar Item */
const TabBarItem = memo(({ routeName, navigation }: { routeName: string, navigation: BottomTabBarProps['navigation'] }) => {
  
  return (
    routeName === 'search'
      ? <MiddleItem routeName={routeName} navigation={navigation} />
      : <SimpleItem routeName={routeName} navigation={navigation} />
  )
})

/** Simple Item */
const SimpleItem = memo(({ routeName, navigation }: { routeName: string, navigation: BottomTabBarProps['navigation'] }) => {
  const { t } = useI18n()
  const rem = useSizeTokens()
  const currentPath = usePathname() as keyof typeof PATH_TO_NAME // Current Route Path
  const labelColor = routeName === PATH_TO_NAME[currentPath] ? 'white' : 'gray' // Tabbar Label Color
  const icon = routeName === PATH_TO_NAME[currentPath] ? SVG[`tabbar_${routeName}_active_25` as keyof typeof SVG] : SVG[`tabbar_${routeName}_25` as keyof typeof SVG] // Current Tabbar Icon
  
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
    middleBackground: {
      position: 'absolute',
      width: rem[110],
      height: rem[110],
      marginTop: rem[6],
    },
    middleIcon: {
      position: 'absolute',
      width: rem[40],
      height: rem[40],
      marginTop: rem[6],
    },
  }), [rem])

  return (
    <Pressable style={styles.middleItem} onPress={tabbarPress}>
      <Image source={IMAGES.bg_tabbar_flexible_25} style={styles.middleBackground} />
      <Image source={ICONS.tabbar_flexible_25} style={styles.middleIcon} />
    </Pressable>
  )
})