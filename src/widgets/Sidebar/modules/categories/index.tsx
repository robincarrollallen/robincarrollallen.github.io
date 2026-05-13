import { Sprite } from '~/components/Sprite'
import { isNative } from '~/constants/platform'
import { useGameStore } from '~/store/modules/game'
import { SPRITE_NAME } from '~/assets/modules/sprite'
import { LinearGradient } from 'tamagui/linear-gradient'
import { Text, YStack, XStack, useTheme } from 'tamagui'
import { useSizeTokens } from '~/store/modules/responsive'

export const SidebarCategories = () => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const homeList = useGameStore(state => state.homeList)

  return (
    <YStack py={rem[12]} gap={rem[12]}>
      <Text color={theme.textWeak?.val} fontSize={rem[14]}>Hot Events</Text>
      <XStack gap={rem[12]} flexWrap="wrap">
        {homeList.map((item: Recordable) => (
          <LinearGradient
            key={item.code}
            p={rem[6]}
            borderWidth={rem[1]}
            bg={theme.backgroundSurfaceRaisedL2?.val}
            borderColor={theme.borderDefault?.val}
            borderTopLeftRadius={rem[6]}
            borderTopRightRadius={rem[6]}
            borderBottomLeftRadius={rem[6]}
            borderBottomRightRadius={rem[6]}
            start={[0, 0]}
            width={rem[130]}
            end={isNative ? [.85, 2] : [.1, .25]} // 近似125度角
            colors={[
              'transparent',              // 48%
              'rgba(255,255,255,0.06)', // 48%
              'rgba(255,255,255,0)',    // 58%
              'rgba(255,255,255,0.05)', // 58%
              'rgba(255,255,255,0)',    // 68%
              'rgba(255,255,255,0.04)', // 68%
            ]}
            locations={[0.68, 0.68, 0.78, 0.78, 0.88, 0.88]}
          >
            <XStack items="center" gap={rem[8]}>
              <Sprite iconName={item.code} source={SPRITE_NAME.CATEGORY_GAME_25} width={rem[24]} height={rem[24]} />
              <Text fontSize={rem[12]} fontWeight="bold">{item.name}</Text>
            </XStack>
          </LinearGradient>
        ))}
      </XStack>
    </YStack>
  )
}