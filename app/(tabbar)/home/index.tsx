import { useEffect } from 'react'
import { ScrollView } from 'tamagui'
import { Sticky } from '~/widgets/Home/sticky'
import { Banner } from '~/widgets/Home/Banner'
import { Jackpot } from '~/widgets/Home/Jackpot'
import { Marquee } from '~/widgets/Home/Marquee'
import { HomePageSign } from '~/widgets/Home/sign'
import { useGameStore } from '~/store/modules/game'
import { useSizeTokens } from '~/store/modules/responsive'
import homeListData from '~/data/homeList.json'
import { useStyleStore } from '~/store/modules/style'

/** Home Page */
export function MainPage() {
  const rem = useSizeTokens()
  const setHomeList = useGameStore.getState().setHomeList
  const tabbarLayout = useStyleStore(state => state.tabbarLayout) // TabBar Layout
  
  useEffect(() => {
    setHomeList(homeListData)
  }, [])

  return (
    <ScrollView
      pt={rem[12]}
      flex={1}
      overScrollMode="never"
      scrollEventThrottle={16}
      pb={tabbarLayout.height}
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
      {/* Module - Games Tab Sticky */}
      <Sticky />
    </ScrollView>
  )
}
