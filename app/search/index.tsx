import { Text, YStack } from "tamagui"
import { NavigationBar } from "~/components/NavigationBar"

export const SearchPage = () => {

  return (
    <YStack flex={1} width="100%">
      <NavigationBar title="Search" />
      <YStack flex={1} justify="center" items="center">
        <Text>SearchPage</Text>
      </YStack>
    </YStack>
  )
}