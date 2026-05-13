import { useMemo } from 'react'
import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { Image } from '~/components/Image'
import { Pressable, StyleSheet } from 'react-native'
import { useTenantStore } from '~/store/modules/tenant'
import { useSizeTokens } from '~/store/modules/responsive'
import { XStack, useDialogContext, useTheme } from "tamagui"
import { useSafeAreaInsets } from 'react-native-safe-area-context'

/** Sidebar Header */
export const SidebarHeader = () => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const siteLogo = useTenantStore(state => state.tenantInfo.siteLogo)
  const { onOpenChange } = useDialogContext()
  const { top } = useSafeAreaInsets()
  
  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    siteLogo: {
      flex: 1,
      height: rem[36],
    },
    closeButton: {
      padding: rem[10],
      borderRadius: rem[10],
      backgroundColor: theme.backgroundSurfaceRaisedL2?.val,
    },
  }), [rem])

  return (
    <XStack mt={top - rem[10]} items="center" justify="space-between" height={rem[50]} py={rem[10]}>
      <Image src={siteLogo} objectFit="contain" objectPosition="left" height={rem[36]} flex={1} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close menu"
        style={styles.closeButton}
        onPress={() => onOpenChange(false)}
      >
        <SvgXml
          pointerEvents="none"
          xml={SVG.close}
          width={rem[16]}
          height={rem[16]}
          color={theme.iconDefault?.val}
        />
      </Pressable>
    </XStack>
  )
}