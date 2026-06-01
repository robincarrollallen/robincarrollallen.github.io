import { ScrollView } from "tamagui"
import { Sticky } from "~/widgets/Home/sticky"
import { Banner } from "~/widgets/Home/Banner"
import { Jackpot } from "~/widgets/Home/Jackpot"
import { Marquee } from "~/widgets/Home/Marquee"
import { GameList } from "~/widgets/Home/GameList"
import { HomePageSign } from "~/widgets/Home/sign"
import { useStyleStore } from "~/store/modules/style"
import { useSizeTokens } from "~/store/modules/responsive"

/** Home Page (Content) */
export const MainPageContent = () => {
  const rem = useSizeTokens()
  const tabbarLayout = useStyleStore(state => state.tabbarLayout) // TabBar Layout

  return (
    <ScrollView
      flex={1}
      pt={rem[12]}
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
      {/* Module - Games List */}
      <GameList />
    </ScrollView>
  )
}
