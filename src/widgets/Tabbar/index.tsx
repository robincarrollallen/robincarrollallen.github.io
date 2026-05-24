import { Slot } from 'one'
import { YStack } from 'tamagui'
import { useTabbarState } from './state'
import { useTabbarNavigation } from './logic'
import { CustomTabBar } from './modules/CustomTabbar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

/** Tabbar Wrapper */
export function TabbarWrapper() {
  const insets = useSafeAreaInsets()
  const navigation = useTabbarNavigation()
  const { state, descriptors } = useTabbarState()

  return (
    <YStack height="100%">
      <Slot />
      <CustomTabBar state={state} descriptors={descriptors} navigation={navigation} insets={insets} />
    </YStack>
  )
}