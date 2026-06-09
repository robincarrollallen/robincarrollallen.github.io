import { Slot } from 'one'
import { YStack } from 'tamagui'
import { useSafeAreaInsets } from 'one'
import { useTabbarState } from './state'
import { useTabbarNavigation } from './logic'
import { CustomTabBar } from './modules/CustomTabbar'

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