import { createRoute } from 'one'
import { useEffect } from 'react'
import { Text } from 'tamagui'

const route = createRoute<'/game/[type]/[id]'>()

export const GameCategoryPage = () => {
  const { type, id } = route.useParams()
  console.log('window.location BEFORE next tick:', window.location.pathname)
setTimeout(() => {
  console.log('window.location AFTER next tick:', window.location.pathname)
}, 0)

  useEffect(() => {
    console.log('GameCategoryPage >>>>>>>>>>>>>>', type, id)
  }, [])

  return <>
    <Text>GameCategoryPage</Text>
    <Text>{type}</Text>
    <Text>{id}</Text>
  </>
}