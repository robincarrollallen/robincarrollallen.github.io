import { usePathname, Tabs } from 'one'
import { Pressable } from 'react-native'
import { memo, useCallback } from 'react'
import { Text, XStack, YStack } from 'tamagui'
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
    <XStack height={insets.bottom + 56} width="100%" position='absolute' b={0}>
      {props.state.routeNames.map((routeName) => (
        <TabBarItem key={routeName} routeName={routeName} navigation={props.navigation} />
      ))}
    </XStack>
  )
})

/** tabbar标签项 */
const TabBarItem = memo(({ routeName, navigation }: { routeName: string, navigation: BottomTabBarProps['navigation'] }) => {
  const currentPath = usePathname() as keyof typeof PATH_TO_NAME // 当前路由路径
  const labelColor = routeName === PATH_TO_NAME[currentPath] ? 'white' : 'gray' // tabbar标签颜色
  
  /** tabbar标签点击事件回调函数 */
  const tabbarPress = useCallback(() => {
    navigation.navigate(routeName)
  }, [navigation, routeName])

  return (
    <YStack flex={1} justify="center" items="center">
      <Pressable onPress={tabbarPress}>
        <Text color={labelColor}>{routeName}</Text>
      </Pressable>
    </YStack>
  )
})