import { Text, XStack } from 'tamagui'
import { usePathname, Tabs } from 'one'
import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { memo, useCallback, useMemo } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { ToastProvider } from '~/interface/toast/Toast'
import { PATH_TO_NAME, ROUTES } from '~/navigation/routes'
import { DialogProvider } from '~/interface/dialogs/Dialog'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

/** tabbar页面布局 */
export function TabbarLayout() {

  return (
    <ToastProvider>
      <DialogProvider>
        <Tabs
          initialRouteName={ROUTES.main.name}
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
        >
          <Tabs.Screen name={ROUTES.main.name} />
          <Tabs.Screen name={ROUTES.activity.name} />
          <Tabs.Screen name={ROUTES.search.name} />
          <Tabs.Screen name={ROUTES.deposit.name} />
          <Tabs.Screen name={ROUTES.profile.name} />
        </Tabs>
      </DialogProvider>
    </ToastProvider>
  )
}

/** 自定义TabBar */
const CustomTabBar = memo((props: BottomTabBarProps) => {
  const insets = useSafeAreaInsets()

  return (
    <XStack width="100%" height={insets.bottom + 91} position='absolute' b={0}>
      <SvgXml xml={SVG.tabbar_background_25} preserveAspectRatio="none" width="100%" height={91} style={{ position: 'absolute' }} />
      <XStack width="100%" bg="#0A0D0A" height={insets.bottom} position='absolute' b={0}></XStack>
      {props.state.routeNames.map((routeName) => (
        <TabBarItem key={routeName} routeName={routeName} navigation={props.navigation} />
      ))}
    </XStack>
  )
})

/** tabbar标签项 */
const TabBarItem = memo(({ routeName, navigation }: { routeName: string, navigation: BottomTabBarProps['navigation'] }) => {
  const insets = useSafeAreaInsets()
  const currentPath = usePathname() as keyof typeof PATH_TO_NAME // 当前路由路径
  const labelColor = routeName === PATH_TO_NAME[currentPath] ? 'white' : 'gray' // tabbar标签颜色
  
  /** tabbar标签点击事件回调函数 */
  const tabbarPress = useCallback(() => {
    navigation.navigate(routeName)
  }, [navigation, routeName])

  /** 样式表 */
  const styles = useMemo(() => StyleSheet.create({
    tabbarItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: insets.bottom,
    }
  }), [])

  return (
    <Pressable onPress={tabbarPress} style={styles.tabbarItem}>
      {routeName === 'search' ? null: <SvgXml xml={SVG[`tabbar_${routeName}_25` as keyof typeof SVG]} preserveAspectRatio="none" width={34} height={34} />}
      <Text color={labelColor}>{routeName}</Text>
    </Pressable>
  )
})