import { ScrollView } from "tamagui"
import { Sticky } from "~/widgets/Home/Sticky"
import { Banner } from "~/widgets/Home/Banner"
import { Jackpot } from "~/widgets/Home/Jackpot"
import { Marquee } from "~/widgets/Home/Marquee"
import { Ranking } from "~/widgets/Home/Ranking"
import { GameList } from "~/widgets/Home/GameList"
import { HomePageSign } from "~/widgets/Home/Sign"
import { useStyleStore } from "~/store/modules/style"
import { useSizeTokens } from "~/store/modules/responsive"

/** Home Page (Content) */
export const MainPageContent = () => {
  const rem = useSizeTokens()
  const tabbarLayout = useStyleStore(state => state.tabbarLayout) // TabBar Layout

  return (
    <ScrollView
      flex={1}
      overScrollMode="never"
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ pt: rem[12], pb: tabbarLayout.height }}
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
      {/* Module - Ranking */}
      <Ranking />
    </ScrollView>
  )
}
