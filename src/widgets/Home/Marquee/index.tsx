import { XStack } from 'tamagui'
import { MarqueeSearch } from './modules/search'
import { MarqueeMessage } from './modules/message'
import { useSizeTokens } from '~/store/modules/responsive'

export function Marquee() {
  const rem = useSizeTokens()
  
  return (
    <XStack gap={rem[10]} p={rem[12]}>
      <MarqueeMessage />
      <MarqueeSearch />
    </XStack>
  )
}
