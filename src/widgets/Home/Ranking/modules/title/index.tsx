import { useTheme } from 'tamagui'
import { XStack, Text } from 'tamagui'
import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'

export function HomeRankingTitle() {
  const theme = useTheme()

  return (
    <XStack gap={8} items="center" justify="center" py={24}>
      <SvgXml xml={SVG.starFull} width={12} height={12} color={theme.iconBrandSecondary?.val} />
      <Text fontSize={20} color={theme.textBrandPrimary?.val} fontWeight="bold">Betting Rank</Text>
      <SvgXml xml={SVG.starFull} width={12} height={12} color={theme.iconBrandSecondary?.val} />
    </XStack>
  )
}