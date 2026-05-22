import { createRoute } from 'one'
import { useEffect } from 'react'
import { Text } from 'tamagui'

const route = createRoute<'/game/[type]/[id]'>()

export const GameCategoryPage = () => {
  const { type, id } = route.useParams()

  return <>
    <Text>GameCategoryPage</Text>
    <Text>{type}</Text>
    <Text>{id}</Text>
  </>
}