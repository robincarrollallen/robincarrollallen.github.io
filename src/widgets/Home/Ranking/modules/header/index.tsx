import { Image } from '~/components/Image'
import { Sprite } from '~/components/Sprite'
import { SPRITE_NAME } from '~/assets/modules/sprite'
import { YStack, XStack, Text, useTheme } from 'tamagui'
import { useSizeTokens } from '~/store/modules/responsive'


export function HomeRankingHeader({ list = [] }: { list?: Recordable[] }) {
  const rem = useSizeTokens()
  const theme = useTheme()

  return (
    <YStack px={rem[12]}>
      <XStack
        py={rem[32]}
        gap={rem[16]}
        justify="center"
        borderTopLeftRadius={rem[12]}
        borderTopRightRadius={rem[12]}
        bg={theme.backgroundSurfaceRaisedL1?.val}
        style={{ boxShadow: `0 ${-rem[1]}px 0 0 ${theme.borderDefault?.val}` }}
      >
        {list.map((item) => (
          <YStack key={item.rank} pt={rem[22]} mt={item.rank !== 1 ? rem[32] : 0} width={rem[94]} height={rem[188]} position="relative" items="center">
            <Image
              width={rem[64]}
              height={rem[64]}
              src={item.avatar}
              borderTopLeftRadius={rem[32]}
              borderTopRightRadius={rem[32]}
              borderBottomLeftRadius={rem[32]}
              borderBottomRightRadius={rem[32]}
            />
            <Sprite
              source={SPRITE_NAME.RANK_AVATAR_BORDER_25}
              iconName={item.rank}
              position='absolute'
              height={rem[188]}
              width={rem[94]}
              inset={0}
            />
            <Text z={1} fontSize={rem[12]} mt={rem[16]} color={theme.textHighlightWhite?.val}>{item.userId}</Text>
            <Text z={1} fontSize={rem[12]} fontWeight="bold" color={theme.textWarning?.val}>{item.rankValue}</Text>
          </YStack>
        ))}
      </XStack>
    </YStack>
  )
}