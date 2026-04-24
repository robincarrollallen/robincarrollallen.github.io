import { useMemo } from 'react';
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { XStack, useTheme } from 'tamagui'
import { ICONS } from '~/assets/modules/icons'
import { MarqueeComponent } from '~/components/Marquee'
import { useTenantStore } from '~/store/modules/tenant'
import { LinearGradient } from '@tamagui/linear-gradient'
import { useSizeTokens } from '~/store/modules/responsive'

/** Marquee Message Module */
export function MarqueeMessage() {
  const theme = useTheme()
  const rem = useSizeTokens()
  const marqueeList= useTenantStore(state => state.marqueeList)

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    broadcast: {
      width: rem[20],
      height: rem[20],
      marginRight: rem[6],
    },
  }), [rem])
  
  return (
    <LinearGradient
      flex={1}
      p={rem[8]}
      borderWidth={rem[1]}
      borderTopLeftRadius={rem[6]}
      borderTopRightRadius={rem[6]}
      borderBottomLeftRadius={rem[6]}
      borderBottomRightRadius={rem[6]}
      borderColor={theme.borderDefault?.val}
      colors={[theme.gradientsSecondaryA?.val, theme.gradientsSecondaryB?.val]}
      locations={[0, 1]}
      start={[0, 0]}
      end={[1, 1]}
    >
      <XStack>
        <Image source={ICONS.broadcast_25} contentFit="contain" contentPosition="left" style={styles.broadcast} />
        <MarqueeComponent color={theme?.textSuccess?.get()} flex={1} messages={marqueeList} />
      </XStack>
    </LinearGradient>
  )
}