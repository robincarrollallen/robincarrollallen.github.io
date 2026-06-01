import { forwardRef, useState } from "react"
import { GameWrapperFooter } from "../GameWrapperFooter"
import { GameWrapperHeader } from "../GameWrapperHeader"
import { GameWrapperContent } from "../GameWrapperContent"
import { YStack, useTheme, type YStackProps, type TamaguiElement } from "tamagui"

export const GameWrapperWidget = forwardRef<TamaguiElement, YStackProps & { platform?: Recordable }>((
  {
    platform = {},
    ...props
  },
  ref
) => {
  const theme = useTheme()
  const [showAll, setShowAll] = useState(false)

  return platform.target === 'hall' || platform.gameList?.length > 0
  ? <YStack key={platform.id} bg={theme.backgroundSurfaceRaisedL1?.val} overflow="hidden" style={{ borderRadius: 10 }} ref={ref} {...props}>
      {/* 头部 */}
      <GameWrapperHeader platform={platform} />
      {/* 内容 */}
      <GameWrapperContent showAll={showAll} platform={platform} />
      {/* 底部 */}
      {platform.gameList?.length > 0 && <GameWrapperFooter showAll={showAll} onPress={() => setShowAll(!showAll)} />}
    </YStack>
  : null
})