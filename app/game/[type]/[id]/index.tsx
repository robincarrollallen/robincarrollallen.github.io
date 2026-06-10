import { createRoute } from 'one'
import { Text, YStack } from 'tamagui'
import { NavigationBar } from '~/components/NavigationBar'

const route = createRoute<'/game/[type]/[id]'>()

export const GameCategoryPage = () => {
  const { type, id } = route.useParams()

  return (
    <YStack flex={1} width="100%">
      <NavigationBar title="Game" />
      <YStack flex={1} justify="center" items="center">
        <Text>GameCategoryPage</Text>
        <Text>{type}</Text>
        <Text>{id}</Text>
      </YStack>
    </YStack>
    )
}