import { SvgXml } from "react-native-svg"
import { SVG } from "~/assets/modules/svg"
import { ImageBackground } from "expo-image"
import { VipTag } from "~/components/VipTag"
import { IMAGES } from "~/assets/modules/images"
import { useVipStore } from "~/store/modules/vip"
import { ProgressBar } from "~/components/ProgressBar"
import { LinearGradient } from "tamagui/linear-gradient"
import { useSizeTokens } from "~/store/modules/responsive"
import { useTheme, YStack, Text, XStack, isWeb } from "tamagui"

/** VIP Wrapper */
export function VipWrapper() {
  const rem = useSizeTokens()
  const theme = useTheme()
  const vipInfo = useVipStore(state => state.vipInfo)

  return (
    <YStack pt={rem[12]}>
      <ImageBackground source={IMAGES.bg_card_level_1} contentPosition="top" contentFit="fill" style={{ paddingTop: rem[16], paddingBottom: rem[14], paddingInline: rem[12] }}>
        <VipTag level={vipInfo.currentVipLevel?.level ?? 0} size={rem[36]} fontSize={rem[12]} />
        <XStack pt={rem[16]} pb={rem[12]} px={rem[4]} items="center" justify="space-between">
          <YStack flex={1} pr={rem[8]}>
            <ProgressBar value={rem[50]} size={rem[4]} indicatorColor={theme.iconBrandPrimary?.val} bg="#ffffff33" />
          </YStack>
          <VipTag level={(vipInfo.currentVipLevel?.level ?? 0) + 1} />
        </XStack>
        <YStack gap={isWeb ? rem[0] : rem[8]} px={rem[4]} z={1}>
          <Text fontSize={rem[12]} color={theme.textHighlightWhiteWeaker?.val} fontWeight="bold">Promotion Criteria</Text>
          <XStack gap={rem[6]}>
            <Text fontSize={rem[10]} color={theme.textHighlightWhiteWeaker?.val}>{`‧  Deposit Required:`}</Text>
            <Text fontSize={rem[10]} color={theme.textWarning?.val}>0.00</Text>
            <Text fontSize={rem[10]} color={theme.textHighlightWhite?.val}>{`(0.00 / 1.00)`}</Text>
          </XStack>
          <XStack gap={rem[6]}>
            <Text fontSize={rem[10]} color={theme.textHighlightWhiteWeaker?.val}>{`‧  Required Bet:`}</Text>
            <Text fontSize={rem[10]} color={theme.textWarning?.val}>0.00</Text>
            <Text fontSize={rem[10]} color={theme.textHighlightWhite?.val}>{`(0.00 / 1.00)`}</Text>
          </XStack>
        </YStack>
    </ImageBackground>
    <YStack position="absolute" t={0} r={0} width="32%" aspectRatio={57/23} >
      <LinearGradient
        bg="#1E1E1C"
        width="100%"
        height="100%"
        start={[.5, 0]}
        items="center"
        justify="center"
        end={[.5, 4]}
        borderTopLeftRadius={rem[390]}
        borderTopRightRadius={rem[390]}
        borderBottomLeftRadius={rem[390]}
        borderBottomRightRadius={rem[390]}
        colors={['#000', 'rgba(252, 209, 126, 0.05)']}
      >
        <XStack gap={rem[4]} items="center" justify="center">
          <Text z={1} fontSize={rem[12]} color={theme.textHighlightWhite?.val}>VIP Details</Text>
          <SvgXml xml={SVG.chevron} width={rem[20]} height={rem[20]} color={theme.textHighlightWhite?.val} transform={`rotate(270)`} />
        </XStack>
      </LinearGradient>
    </YStack>
    </YStack>
  )
}