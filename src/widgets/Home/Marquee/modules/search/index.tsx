import { useMemo } from 'react'
import { useRouter } from 'one'
import { ROUTES } from '~/router/routes'
import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { Pressable, StyleSheet } from 'react-native'
import { Square, useTheme, useThemeName } from 'tamagui'
import { useSizeTokens } from '~/store/modules/responsive'

/** Marquee Search Trigger */
export function MarqueeSearch() {
  const theme = useTheme()
  const router = useRouter()
  const rem = useSizeTokens()
  const themeName = useThemeName()

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    trigger: {
      width: '100%',
      height: '100%',
      borderWidth: rem[1],
      borderRadius: rem[8],
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.borderDefault?.val,
      backgroundColor: theme.backgroundSurfaceRaisedL1?.val,
    },
  }), [rem, themeName])

  return (
    <Square size={rem[40]}>
      <Pressable style={styles.trigger} onPress={() => {router.push(ROUTES.search.path)}}>
        <SvgXml xml={SVG.search} width={rem[20]} height={rem[20]} color={theme.iconBrandPrimary?.val} />
      </Pressable>
    </Square>
  )
}