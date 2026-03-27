import { Slot, Stack } from 'one'
import { Text } from 'tamagui'

export const MainLayout = () => {
  return <>
    <Stack.Screen
      options={{
        title: '首页',
        headerShown: true,
        headerRight: () => <Text>Test</Text>,
      }}
    />
    <Slot />
  </>
}
