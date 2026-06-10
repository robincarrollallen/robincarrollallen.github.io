import { ScrollView } from 'react-native'
import { YStack, Text, useTheme } from 'tamagui'
import { useStyleStore } from '~/store/modules/style'
import { ActionButton } from '~/components/ActionButton'
import { useSizeTokens } from '~/store/modules/responsive'
import { PasswordInput } from '~/components/PasswordInput'
import { NavigationBar } from '~/components/NavigationBar'

export const WithdrawPinPage = () => {
  const tabbarLayout = useStyleStore(state => state.tabbarLayout)
  const size = useSizeTokens()
  const theme = useTheme()

  const handleInput = (value: string) => {
    
  }

  return (
    <YStack flex={1} width="100%" bg={theme.background?.val}>
      <NavigationBar title="Transaction Pin" />
      <YStack flex={1}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: size[16], paddingBottom: tabbarLayout.height, paddingTop: size[16] }}>
          <Text fontSize={size[14]} fontWeight="600">Set Withdraw Password</Text>
          <Text mt={size[16]} mb={size[10]} fontSize={size[12]} color={theme.textWeaker?.val}>New Withdraw Password</Text>
          <PasswordInput onInput={handleInput} />
          <Text mt={size[16]} mb={size[10]} fontSize={size[12]} color={theme.textWeaker?.val}>Confirm New Withdraw Password</Text>
          <PasswordInput onInput={handleInput} />
          <Text mt={size[16]} mb={size[28]} color={theme.textWarning?.val} fontSize={size[10]}>The first withdrawal, you need to set the withdrawal password first</Text>
          <ActionButton enableShimmer>
            <Text fontSize={size[12]} fontWeight="600">Withdraw Now</Text>
          </ActionButton>
        </ScrollView>
      </YStack>
    </YStack>
  )
}