import { memo } from "react"
import { useRouter } from "one"
import { Pressable } from "react-native"
import { SvgXml } from "react-native-svg"
import { SVG } from "~/assets/modules/svg"
import { useTheme, YStack, XStack, Text } from "tamagui"
import { useSizeTokens } from "~/store/modules/responsive"
import { useSafeAreaInsets } from "react-native-safe-area-context"

/** Game Search Page Header */
export const Navigation = memo(({ title = '', right }: { title?: string, right?: React.ReactNode }) => {
  const theme = useTheme()
  const router = useRouter()
  const rem = useSizeTokens()
  const { top } = useSafeAreaInsets()
  
  return (
    <YStack bg={theme.backgroundSurfaceLowered?.val} pt={top}>
      <XStack height={rem[50]} items="center" px={rem[12]}>
        <Pressable onPress={() => router.back()}>
          <SvgXml xml={SVG.chevron_left} width={rem[20]} height={rem[20]} color={theme.textDefault?.val} />
        </Pressable>
        <Text flex={1} text="center" fontSize={rem[18]} fontWeight="bold" color={theme.textDefault?.val}>
          {title}
        </Text>
        {right && right}
      </XStack>
    </YStack>
  )
})