import { Image } from '~/components/Image'
import { ICONS } from '~/assets/modules/icons'
import { IMAGES } from '~/assets/modules/images'
import { memo, useCallback, useMemo } from "react"
import { Pressable, StyleSheet } from "react-native"
import { useSizeTokens } from "~/store/modules/responsive"
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

/** Tabbar Middle Item */
export const MiddleItem = memo(({ routeName, navigation }: { routeName: string, navigation: BottomTabBarProps['navigation'] }) => {
  const rem = useSizeTokens()
  
  /** Tabbar Label Click Event Callback Function */
  const tabbarPress = useCallback(() => {
    navigation.navigate(routeName)
  }, [navigation, routeName])

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    middleItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
  }), [rem])

  return (
    <Pressable style={styles.middleItem} onPress={tabbarPress}>
      <Image src={IMAGES.bg_tabbar_flexible_25} position='absolute' width={rem[110]} height={rem[110]} mt={rem[6]} />
      <Image src={ICONS.tabbar_flexible_25} position='absolute' width={rem[40]} height={rem[40]} mt={rem[6]} />
    </Pressable>
  )
})