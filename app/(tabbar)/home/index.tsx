import { useEffect } from 'react'
import { ScrollView } from 'tamagui'
import { Banner } from '~/widgets/Home/Banner'
import { Jackpot } from '~/widgets/Home/Jackpot'
import { Marquee } from '~/widgets/Home/Marquee'
import { HomePageSign } from '~/widgets/Home/sign'
import { useGameStore } from '~/store/modules/game'
import { useSizeTokens } from '~/store/modules/responsive'
import homeListData from '~/data/homeList.json'

/** Home Page */
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
      {/* Module - Sign */}
      <HomePageSign />
      {/* Module - Banner */}
      <Banner />
      {/* Module - Marquee */}
      <Marquee />
      {/* Module - Jackpot */}
      <Jackpot />
    </ScrollView>
  )
}
