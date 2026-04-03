import { useEffect } from 'react'
import { Image } from 'expo-image'
import { LinearGradient } from 'tamagui/linear-gradient'
import { Text, YStack, XStack, useTheme } from 'tamagui'
import { useSizeTokens } from '~/store/modules/responsive'
import { useActivityStore } from '~/store/modules/activity'
import sideBarActivityData from '~/data/lobbySidebarBannerList.json'

export const SidebarActivity = () => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const sideBarActivityList = useActivityStore(state => state.sideBarActivityList)

  useEffect(() => {
    const setSideBarActivityList = useActivityStore.getState().setSideBarActivityList

    setSideBarActivityList(sideBarActivityData)
  }, [])

  return (
    <YStack py={rem[12]} gap={rem[12]}>
      <Text color={theme.textWeak?.val} fontSize={rem[14]}>Hot Events</Text>
      <XStack gap={rem[12]} flexWrap="wrap">
        {sideBarActivityList.map((item: Record<string, any>) => (
          <YStack
            key={item.id}
            p={rem[6]}
            gap={rem[4]}
            width={rem[130]}
            bg={theme.backgroundSurfaceRaisedL2?.val}
            borderWidth={rem[1]}
            borderColor={theme.borderDefault?.val}
            borderTopLeftRadius={rem[6]}
            borderTopRightRadius={rem[6]}
            borderBottomLeftRadius={rem[6]}
            borderBottomRightRadius={rem[6]}
          >
            <XStack items="center" gap={rem[4]}>
              <Image source={item.logoSrc} style={{ width: rem[24], height: rem[24] }} />
              <Text fontSize={rem[12]} fontWeight="bold">{item.name}</Text>
            </XStack>
            <XStack justify="flex-end">
              <LinearGradient
                py={rem[2]}
                px={rem[6]}
                borderWidth={rem[1]}
                borderColor={theme.borderBrand?.val}
                borderTopLeftRadius={rem[4]}
                borderTopRightRadius={rem[4]}
                borderBottomLeftRadius={rem[4]}
                borderBottomRightRadius={rem[4]}
                colors={['$gradientsPrimaryA', '$gradientsPrimaryB']}
                locations={[0, 1]}
                start={[0, 0]}
                end={[1, 1]}
              >
                <YStack z={1}>
                  <Text fontSize={rem[10]} color={theme.textInverse?.val}>Go!</Text>
                </YStack>
              </LinearGradient>
            </XStack>
          </YStack>
        ))}
      </XStack>
    </YStack>
  )
}