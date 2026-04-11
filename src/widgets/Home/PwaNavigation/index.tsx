import { THEME } from "~/theme"
import { useI18n } from "~/i18n"
import { Image } from "expo-image"
import { memo, useMemo } from "react"
import { SvgXml } from "react-native-svg"
import { SVG } from "~/assets/modules/svg"
import { ICONS } from "~/assets/modules/icons"
import { XStack, Text, useTheme } from "tamagui"
import { StyleSheet, Pressable } from "react-native"
import { useThemeStore } from "~/store/modules/theme"
import { useTenantStore } from "~/store/modules/tenant"
import { LinearGradient } from '@tamagui/linear-gradient'
import { useSizeTokens } from "~/store/modules/responsive"

/** Main Page Header Content */
export const MainPagePwaNavigation = memo(() => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const appIcon = useTenantStore(state => state.tenantInfo.appIcon)
  const setStyle = useThemeStore().setStyle
  const { t } = useI18n()

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    closeButton: {
      width: rem[60],
      height: rem[60],
      borderRadius: '50%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      backgroundColor: theme.neutralWhite10?.val,
      position: 'absolute',
      padding: rem[14],
      left: -rem[30],
      top: -rem[30],
    },
    closeIcon: {
      aspectRatio: 1,
      height: rem[38],
    },
    moneyIcon: {
      aspectRatio: 1,
      height: rem[32],
      marginLeft: rem[8],
      marginRight: rem[18],
    },
    downloadIcon: {
      zIndex: 1,
      width: rem[26],
      height: rem[26],
      color: theme.iconInverse?.val,
    },
  }), [rem])

  return (
    <XStack width="100%" height={rem[50]} pl={rem[40]} pr={rem[12]} items="center" overflow="hidden">
      <Pressable style={styles.closeButton} onPress={() => setStyle(THEME.STYLE_25)}>
        <SvgXml xml={SVG.close} width={rem[10]} height={rem[10]} color={theme.iconDefault?.val} />
      </Pressable>
      <XStack flex={1} gap={rem[6]}>
        <Image source={{ uri: appIcon }} contentFit="contain" contentPosition="left" style={styles.closeIcon} />
        <Text fontSize={rem[12]} z={1} shrink={1} lineHeight={rem[16]} color={theme.textDefault?.val}>{t('tip.pwaBarTip')}</Text>
      </XStack>
      <Image source={ICONS.pwa_money_25} contentFit="contain" style={styles.moneyIcon} />
      <Pressable onPress={() => {}}>
        <LinearGradient
          px={rem[10]}
          py={rem[4]}
          gap={rem[8]}
          items="center"
          justify="center"
          flexDirection="row"
          borderTopLeftRadius={rem[6]}
          borderBottomLeftRadius={rem[6]}
          borderTopRightRadius={rem[6]}
          borderBottomRightRadius={rem[6]}
          colors={[theme.gradientsTertiaryA?.val, theme.gradientsTertiaryB?.val]}
          start={[0, 0]}
          end={[1, 0]}
        >
          <SvgXml xml={SVG.cloud_download} style={styles.downloadIcon} />
          <Text fontSize={rem[12]} fontWeight="bold" z={1} color={theme.iconInverse?.val}>Update</Text>
        </LinearGradient>
      </Pressable>
    </XStack>
  )
})