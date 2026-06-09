import { useEffect } from 'react'
import { UserInfo } from './modules/userInfo'
import { useVipStore } from '~/store/modules/vip'
import { VipWrapper } from '~/widgets/VipWrapper'
import { useUserStore } from '~/store/modules/user'
import { useStyleStore } from '~/store/modules/style'
import { ScrollView, useTheme, YStack } from 'tamagui'
import { NavigationWrapper } from './modules/navigation'
import { useSizeTokens } from '~/store/modules/responsive'
import userInfoData from '~/data/userInfo.json'
import vipInfoData from '~/data/vipInfo.json'

export function ProfilePage() {
  const theme = useTheme()
  const rem = useSizeTokens()
  const token = useUserStore(state => state.token)
  const tabbarLayout = useStyleStore(state => state.tabbarLayout) // TabBar 布局

  useEffect(() => {
    if (token) {
      useUserStore.getState().setUserInfo(userInfoData)
      useVipStore.getState().setVipInfo(vipInfoData.data)
    }
  }, [token])

  return <>
    <UserInfo />
    <ScrollView flex={1} bg={theme.background?.val}>
      <YStack px={rem[12]}>
        <VipWrapper />
      </YStack>
      <NavigationWrapper />
      <YStack height={tabbarLayout.height} />
    </ScrollView>
  </>
}