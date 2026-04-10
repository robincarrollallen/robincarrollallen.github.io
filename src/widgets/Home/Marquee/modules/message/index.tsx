import { useMemo } from 'react';
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'
import { XStack, useTheme } from 'tamagui'
import { ICONS } from '~/assets/modules/icons'
import { MarqueeComponent } from '~/components/Marquee'
import { useTenantStore } from '~/store/modules/tenant'
import { useSizeTokens } from '~/store/modules/responsive'

export function MarqueeMessage() {
  const theme = useTheme()
  const rem = useSizeTokens()
  const marqueeList= useTenantStore(state => state.marqueeList)

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    broadcast: {
      width: rem[20],
      height: rem[20],
    },
  }), [rem])
  
  return (
    <XStack
      flex={1}
      p={rem[8]}
      gap={rem[8]}
      height="100%"
      borderWidth={rem[1]}
      borderTopLeftRadius={rem[6]}
      borderTopRightRadius={rem[6]}
      borderBottomLeftRadius={rem[6]}
      borderBottomRightRadius={rem[6]}
      borderColor={theme.borderDefault?.val}
      bg={theme.backgroundSurfaceRaisedL1?.val}
    >
      <Image source={ICONS.broadcast_25} contentFit="contain" contentPosition="left" style={styles.broadcast} />
      <MarqueeComponent color={theme?.textSuccess?.get()} flex={1} messages={marqueeList} />
    </XStack>
  )
}