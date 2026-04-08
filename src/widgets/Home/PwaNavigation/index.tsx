import { THEME } from "~/theme"
import { memo, useMemo } from "react"
import { XStack, Text } from "tamagui"
import { StyleSheet, Pressable } from "react-native"
import { useThemeStore } from "~/store/modules/theme"
import { useSizeTokens } from "~/store/modules/responsive"

/** Main Page Header Content */
export const MainPagePwaNavigation = memo(() => {
  const rem = useSizeTokens()
  const setStyle = useThemeStore().setStyle

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    wrapper: {
      width: '100%',
      height: rem[50],
    },
  }), [rem])

  return (
    <XStack style={styles.wrapper}>
      <Pressable onPress={() => setStyle(THEME.STYLE_25)}>
        <Text>PWA Navigation</Text>
      </Pressable>
    </XStack>
  )
})