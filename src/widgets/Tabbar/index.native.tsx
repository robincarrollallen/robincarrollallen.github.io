import { Tabs } from 'one'
import { useTheme } from 'tamagui'
import { useTabbarState } from './state'
import { CustomTabBar } from './modules/CustomTabbar'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

/** Tabbar Wrapper */
export function TabbarWrapper() {
  const theme = useTheme()
  const { state } = useTabbarState()

  return (
    <Tabs
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
