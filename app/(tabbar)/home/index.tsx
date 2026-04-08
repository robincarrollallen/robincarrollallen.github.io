import { useEffect } from 'react'
import { ScrollView } from 'tamagui'
import { Banner } from '~/widgets/Home/Banner'
import homeListData from '~/data/homeList.json'
import { Marquee } from '~/widgets/Home/Marquee'
import { useGameStore } from '~/store/modules/game'
import { useSizeTokens } from '~/store/modules/responsive'

export function MainPage() {
  const rem = useSizeTokens()
  const setHomeList = useGameStore.getState().setHomeList
  
  useEffect(() => {
    setHomeList(homeListData)
  }, [])

  return (
    <ScrollView
      pt={rem[12]}
      flex={1}
      overScrollMode="never"
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Banner />
      <Marquee />
    </ScrollView>
  )
}
