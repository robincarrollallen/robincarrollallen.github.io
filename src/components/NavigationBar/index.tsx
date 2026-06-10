
import { forwardRef } from "react"
import { useRouter } from '~/router'
import { useSafeAreaInsets } from 'one'
import { Pressable } from "react-native"
import { SvgXml } from "react-native-svg"
import { SVG } from "~/assets/modules/svg"
import { useSizeTokens } from '~/store/modules/responsive'
import { YStack, XStack, Text, type YStackProps, useTheme } from "tamagui"

export const NavigationBar = forwardRef<
  React.ComponentRef<typeof YStack>,
  YStackProps & { title?: string }
>(({ title = "", ...props }, ref) => {
  const theme = useTheme()
  const router = useRouter()
  const rem = useSizeTokens()
  const safeArea = useSafeAreaInsets()

  return (
    <YStack ref={ref} width="100%" {...props} pt={safeArea.top} bg={theme.background?.val}>
      <XStack items="center" px={rem[12]} height={rem[50]}>
        <Pressable onPress={() => router.back()}>
          <SvgXml xml={SVG.chevron} width={rem[24]} height={rem[24]} transform={`rotate(90)`} color={theme.iconDefault?.val} />
        </Pressable>
        <Text flex={1} fontSize={rem[14]} items="center" fontWeight="600" text="center">{title}</Text>
      </XStack>
    </YStack>
  )
})