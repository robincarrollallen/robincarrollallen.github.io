import { Text, YStack } from "tamagui"
import { NavigationBar } from "~/components/NavigationBar"

export const DepositPage = () => {

  return (
    <YStack flex={1} width="100%">
      <NavigationBar title="Deposit" />
      <YStack flex={1} justify="center" items="center">
        <Text>DepositPage</Text>
      </YStack>
    </YStack>
  )
}