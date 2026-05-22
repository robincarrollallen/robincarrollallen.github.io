import { Text } from "tamagui"
import { useI18n } from "~/i18n"
import { usePathname } from "one"
import { SvgXml } from "react-native-svg"
import { SVG } from "~/assets/modules/svg"
import { PATH_TO_NAME } from "~/router/routes"
import { memo, useCallback, useMemo } from "react"
import { Pressable, StyleSheet } from "react-native"
import { useSizeTokens } from "~/store/modules/responsive"
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

/** Tabbar Simple Item */
export const SimpleItem = memo(({ routeName, navigation }: { routeName: string, navigation: BottomTabBarProps['navigation'] }) => {
  const rem = useSizeTokens()
  const currentPath = usePathname() as keyof typeof PATH_TO_NAME // Current Route Path
  const labelColor = routeName === PATH_TO_NAME[currentPath] ? 'white' : 'gray' // Tabbar Label Color
  const icon = routeName === PATH_TO_NAME[currentPath] ? SVG[`tabbar_${routeName}_active_25` as keyof typeof SVG] : SVG[`tabbar_${routeName}_25` as keyof typeof SVG] // Current Tabbar Icon
  const { t } = useI18n()

  /** Tabbar Label Click Event Callback Function */
  const tabbarPress = useCallback(() => {
    navigation.navigate(routeName)
  }, [navigation, routeName])

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    tabbarItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: rem[6],
    },
  }), [rem])

  return (
    <Pressable onPress={tabbarPress} style={styles.tabbarItem}>
      <SvgXml xml={icon} width={rem[34]} height={rem[34]} />
      <Text color={labelColor} fontSize={rem[10]} lineHeight={rem[14]}>{t(`tab.${routeName}`)}</Text>
    </Pressable>
  )
})