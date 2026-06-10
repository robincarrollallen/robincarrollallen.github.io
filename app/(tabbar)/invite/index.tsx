import { Text, YStack } from "tamagui"
import { NavigationBar } from "~/components/NavigationBar"

export const InvitePage = () => {

  return (
    <YStack flex={1} width="100%">
      <NavigationBar title="Invite" />
      <YStack flex={1} justify="center" items="center">
        <Text>InvitePage</Text>
      </YStack>
    </YStack>
  )
}