import { forwardRef } from "react"
import { Icon } from "~/components/Icon"
import { isNative } from '~/constants/platform'
import { LinearGradient } from "tamagui/linear-gradient"
import { XStack, Text, useTheme, type XStackProps, type TamaguiElement } from "tamagui"

export const GameWrapperHeader = forwardRef<TamaguiElement, XStackProps & { platform?: Recordable }>((
  {
    platform = {},
    ...props
  },
  ref
) => {
  const theme = useTheme()

  return (
    <XStack bg={theme.backgroundSurfaceRaisedL2?.val}>
      <LinearGradient
        start={[0, 0]}
        end={isNative ? [.8, 4] : [.1, .5]} // 近似125度角
        width="100%"
        colors={[
          'transparent',              // 48%
          'rgba(255,255,255,0.06)', // 48%
          'rgba(255,255,255,0)',    // 58%
          'rgba(255,255,255,0.05)', // 58%
          'rgba(255,255,255,0)',    // 68%
          'rgba(255,255,255,0.04)', // 68%
          'rgba(255,255,255,0)',    // 78%
          'rgba(255,255,255,0.03)', // 78%
        ]}
        locations={[0.48, 0.48, 0.58, 0.58, 0.68, 0.68, 0.78, 0.78]}
      >
        <XStack ref={ref} p={12} items="center" justify="space-between" {...props}>
          <XStack items="center" gap={6}>
            <Icon width={24} height={24} src={platform.logo} color={theme.iconBrandPrimary?.get()} />
            <Text>{platform.name}</Text>
          </XStack>
          <XStack items="center" bg={theme.backgroundSurfaceRaisedL2?.val} px={10} py={4} style={{ borderRadius: 6 }} gap={6}>
            <Text fontSize={14} color={theme.textSelected?.val}>All</Text>
          </XStack>
        </XStack>
      </LinearGradient>
    </XStack>
  )
})