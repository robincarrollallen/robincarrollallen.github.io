import { Image } from "expo-image"
import { memo, useMemo } from "react"
import { StyleSheet } from "react-native"
import { useTheme, XStack } from "tamagui"
import { isNative } from "~/constants/platform"
import { SlideDialog } from "~/widgets/Sidebar"
import { useTenantStore } from "~/store/modules/tenant"
import { LinearGradient } from "@tamagui/linear-gradient"
import { useSizeTokens } from "~/store/modules/responsive"
import { MainPageLanguageSelector } from "./modules/LanguageSelector"

/** Main Page Header Content */
export const MainPageHeaderNavigation = memo(() => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const siteLogo = useTenantStore(state => state.tenantInfo.siteLogo)

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    heardWrapper: {
      gap: rem[12],
      width: '100%',
      height: rem[50],
      position: 'relative',
      alignItems: 'center',
      paddingInline: rem[12],
      backgroundColor: theme.backgroundTopNavSecondary?.val,
    },
    siteLogo: {
      height: rem[36],
      flex: 1,
    },
  }), [rem])

  return (
    <XStack style={styles.heardWrapper}>
      <LinearGradient
        start={[0, 0]}
        end={isNative ? [.8, 4] : [.1, .5]} // 近似125度角
        colors={[
          'transparent',              // 8%
          'rgba(255,255,255,0.06)', // 8%
          'rgba(255,255,255,0)',    // 20%
          'rgba(255,255,255,0.05)', // 20%
          'rgba(255,255,255,0)',    // 32%
          'rgba(255,255,255,0.04)', // 32%
          'rgba(255,255,255,0)',    // 44%
          'rgba(255,255,255,0.03)', // 44%
          'rgba(255,255,255,0)',    // 56%
          'rgba(255,255,255,0.02)', // 56%
          'rgba(255,255,255,0)',    // 68%
          'rgba(255,255,255,0.01)', // 68%
          'rgba(255,255,255,0)',    // 80%
        ]}
        locations={[0.08, 0.08, 0.2, 0.2, 0.32, 0.32, 0.44, 0.44, 0.56, 0.56, 0.68, 0.68, 0.80]}
        pointerEvents="none"
        position="absolute"
        inset={0}
      />
      <Image source={{ uri: siteLogo }} contentFit="contain" contentPosition="left" style={styles.siteLogo} />
      <MainPageLanguageSelector />
      <SlideDialog side="right" />
    </XStack>
  )
})