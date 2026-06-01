import { YStack } from "tamagui"
import { useGameStore } from "~/store/modules/game"
import { GameWrapperWidget } from "../GameWrapper"


export const GameList = () => {
  const homeList = useGameStore(state => state.homeList)
  
  return <>
    {homeList.map((item) => ( 
      <YStack key={item.id} gap={10} mb={10} px={12}>
        {item.platformList.map((platform: Recordable) => <GameWrapperWidget key={platform.id} platform={platform} />)}
      </YStack>
    ))}
  </>
}