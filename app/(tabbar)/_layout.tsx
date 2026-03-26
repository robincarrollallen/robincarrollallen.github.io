import { usePathname, Tabs } from 'one'
import { memo, useCallback } from 'react'
import { Text, XStack, YStack } from 'tamagui'
import { ToastProvider } from '~/interface/toast/Toast'
import { PATH_TO_NAME, ROUTES } from '~/navigation/routes'
import { DialogProvider } from '~/interface/dialogs/Dialog'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

export function TabbarLayout() {

  return (
    <ToastProvider>
      <DialogProvider>
        <YStack height="100vh" bg="green">
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
        </YStack>
      </DialogProvider>
    </ToastProvider>
  )
}

/** 自定义TabBar */
const CustomTabBar = memo((props: BottomTabBarProps) => {

  return (
    <XStack height={50} width="100%" position='absolute' b={0}>
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
    <YStack key={routeName} flex={1} justify="center" items="center" onPress={tabbarPress}>
      <Text color={labelColor}>{routeName}</Text>
    </YStack>
  )
})