import { memo, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Image } from '~/components/Image'
import { View, type ViewProps } from 'tamagui'
import { IMAGES } from '~/assets/modules/images'
import { useSizeTokens } from '~/store/modules/responsive'
import { LinearGradient } from 'tamagui/linear-gradient'

export const GameCard = memo(({ item, gap = 0, p = 0, borderRadius, lazy = false, ...props }: { item: Recordable, gap?: number, p?: number, borderRadius?: number, lazy?: boolean } & ViewProps) => {
  const rem = useSizeTokens()
  const radius = borderRadius || rem[8]
  const logo = item.logo ? item.logo : `https://game-logo.d-e-7-f.com/pre/style1/en/${item.logoFlag}.jpg`

  const styles = useMemo(() => StyleSheet.create({
    wrapper: {
      padding: p,
    },
    image: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: radius - p,
    },
    maintain: {
      position: 'absolute',
    },
    gradient: {
      borderRadius: radius,
    },
  }), [rem])

  return (
    <View
      flex={1}
      items="center"
      justify="center"
      aspectRatio={3/4}
      position="relative"
      p={gap/2}
      {...props}
    >
      <LinearGradient
        inset={0}
        end={[1, 1]}
        start={[0, 0]}
        overflow="hidden"
        position="absolute"
        style={styles.gradient}
        locations={[0, .0258, .5,  .9772, 1]}
        colors={['#fff', '#fff', `rgba(255, 255, 255, 0)`, '#fff', '#fff']}
      />
      <View width="100%" height="100%" position="relative" z={1} style={styles.wrapper}>
        <Image style={styles.image} src={logo} loading="lazy" />
        {item.platformStatus === 'MAINTAIN' && <Image src={IMAGES.maintain} style={styles.maintain} loading="lazy"/>}
      </View>
    </View>
  )
})