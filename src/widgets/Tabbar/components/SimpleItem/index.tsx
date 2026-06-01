import { isWeb, Text } from "tamagui"
import { useI18n } from "~/i18n"
import { usePathname, type Href } from "one"
import { SvgXml } from "react-native-svg"
import { SVG } from "~/assets/modules/svg"
import { getRouteForRouteName, PATH_TO_NAME, ROUTES } from "~/router/routes"
import { memo, useCallback, useMemo } from "react"
import { Pressable, StyleSheet } from "react-native"
import { useSizeTokens } from "~/store/modules/responsive"
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useRouter } from "~/router"

/** Tabbar Simple Item */
export const SimpleItem = memo(({ routeName, navigation }: { routeName: string, navigation: BottomTabBarProps['navigation'] }) => {
  const router = useRouter()
  const rem = useSizeTokens()
  const currentPath = usePathname() as keyof typeof PATH_TO_NAME // Current Route Path（/home, /promo, /invite, /deposit, /profile）
  const labelColor = routeName === PATH_TO_NAME[currentPath] ? 'white' : 'gray' // Tabbar Label Color
  const currentRouteName = PATH_TO_NAME[currentPath] // Current Route Name
  const icon = routeName === currentRouteName ? SVG[`tabbar_${routeName}_active_25` as keyof typeof SVG] : SVG[`tabbar_${routeName}_25` as keyof typeof SVG] // Current Tabbar Icon
  const { t } = useI18n()

  /** Tabbar Label Click Event Callback Function */
  const tabbarPress = useCallback(() => {
    navigation.navigate(routeName)
  }, [])

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