import { forwardRef } from "react"
import { Image } from "~/components/Image"
import { useSizeTokens } from "~/store/modules/responsive"
import { XStack, YStack, type XStackProps, type TamaguiElement } from "tamagui"
import { GameCard } from "~/widgets/GameCard"

export const GameWrapperContent = forwardRef<TamaguiElement, XStackProps & { showAll?: boolean, platform?: Recordable }>((
  {
    showAll,
    platform = {},
    ...props
  },
  ref
) => {

  const rem = useSizeTokens()
  
  return (
    <XStack p={12} gap={10} flexWrap="wrap" ref={ref} {...props}>
      {
        platform.target === 'hall'
        ? <Image width="100%" height={100}  src={platform.background} loading="lazy"/>
        : platform.gameList.map((game: Recordable, index: number) => (
          (showAll || index < 12) && (
            <YStack
              key={game.id}
              width={rem[78]}
              aspectRatio={57/77}
            >
              <GameCard item={game} borderRadius={rem[10]} gap={0} p={rem[2]} lazy={index < 12}/>
            </YStack>
          )
        ))
      }
      </XStack>
  )
})