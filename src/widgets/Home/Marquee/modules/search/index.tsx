import { useMemo } from 'react'
import { useRouter } from 'one'
import { SvgXml } from 'react-native-svg'
import { Square, useTheme } from 'tamagui'
import { SVG } from '~/assets/modules/svg'
import { Pressable, StyleSheet } from 'react-native'
import { useSizeTokens } from '~/store/modules/responsive'

/** Marquee Search Trigger */
export function MarqueeSearch() {
  const theme = useTheme()
  const router = useRouter()
  const rem = useSizeTokens()

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    trigger: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: rem[1],
      borderColor: theme.borderDefault?.val,
      backgroundColor: theme.backgroundSurfaceRaisedL1?.val,
      borderRadius: rem[8],
    },
  }), [rem, theme])

  return (
    <Square size={rem[40]} onPress={() => router.push('/search')}>
      <Pressable style={styles.trigger}>
        <SvgXml xml={SVG.search} width={rem[20]} height={rem[20]} color={theme.iconBrandPrimary?.val} />
      </Pressable>
    </Square>
  )
}