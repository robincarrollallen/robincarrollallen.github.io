import { Image } from '~/components/Image';
import { ICONS } from "~/assets/modules/icons";
import { useTenantStore } from '~/store/modules/tenant';
import { useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from '@tamagui/linear-gradient';
import { useSizeTokens } from '~/store/modules/responsive';
import { StyleSheet, type LayoutChangeEvent } from 'react-native'
import { useState, useRef, useCallback,  memo, useMemo } from 'react'
import { XStack, YStack, Text, useTheme, Circle, Square } from 'tamagui'
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';

/** Sidebar Banner */
export function SidebarBanner() {
  const rem = useSizeTokens() // 响应式尺寸
  const theme = useTheme() // 主题

  return (
    <LinearGradient
      p={rem[1]}
      end={[1, 1]}
      width="100%"
      start={[0, 0]}
      borderTopLeftRadius={rem[12]}
      borderTopRightRadius={rem[12]}
      borderBottomLeftRadius={rem[12]}
      borderBottomRightRadius={rem[12]}
      colors={[theme.glowPrimaryOpacity40?.val, theme.backgroundSurfaceRaisedL2?.val]}
      locations={[0, .3]}
    >
      <YStack
        z={1}
        px={rem[16]}
        pt={rem[10]}
        pb={rem[10]}
        width="100%"
        bg={theme.backgroundSurfaceRaisedL2?.val}
        borderTopLeftRadius={rem[12]}
        borderTopRightRadius={rem[12]}
        borderBottomLeftRadius={rem[12]}
        borderBottomRightRadius={rem[12]}
      >
        <XStack pb={rem[8]} items="center" justify="space-between">
          <XStack gap={rem[4]} items="center">
            <Image src={ICONS.tabbar_promo_25} width={rem[24]} height={rem[24]} />
            <Text fontSize={rem[16]} fontWeight="bold">Banner</Text>
          </XStack>
          <Text fontSize={rem[12]} color={theme.textBrandPrimary?.val}>All</Text>
        </XStack>
        <BannerWrapper />
      </YStack>
    </LinearGradient>
  )
}

/** Banner Wrapper */
const BannerWrapper = memo(() => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  const bannerList = useTenantStore(state => state.bannerList)
  const [bannerWidth, setBannerWidth] = useState(1);
  const [index, setIndex] = useState(0);

   /** Banner wrapper layout */
   const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setBannerWidth(width)
  }, [rem])

  /** Handle banner item press */
  const handleBannerItemPress = useCallback((index: number) => {
    ref.current?.scrollTo({ index, animated: true })
  }, [ref])

  return (
    <YStack onLayout={handleLayout}>
      <Carousel
        loop
        ref={ref}
        snapEnabled
        pagingEnabled
        height={rem[160]}
        data={bannerList}
        width={bannerWidth}
        onSnapToItem={setIndex}
        onProgressChange={progress}
        renderItem={({ item }) => <BannerItem item={item} />}
      />
      <XStack
        justify="center"
        items="center"
        gap={rem[8]}
        mt={rem[12]}
      >
        {bannerList.map((_, idx) =>
        idx === index
        ? (<Square
            key={idx}
            height={rem[6]}
            width={rem[20]}
            bg={theme.iconBrandPrimary?.val}
            borderTopLeftRadius={rem[3]}
            borderTopRightRadius={rem[3]}
            borderBottomLeftRadius={rem[3]}
            borderBottomRightRadius={rem[3]}
            pressStyle={{ scale: 0.9 }}
            onPress={() => handleBannerItemPress(idx)}
          />)
        : (<Circle
            key={idx}
            size={6}
            bg={theme.iconWeaker?.val}
            pressStyle={{ scale: 0.9 }}
            onPress={() => handleBannerItemPress(idx)}
          />)
        )}
      </XStack>
    </YStack>
  )
})

/** Banner Item */
const BannerItem = memo(({ item }: { item: Recordable }) => {
  const rem = useSizeTokens()

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    image: {
      width: '100%',
      height: '100%',
      borderRadius: rem[12],
    },
  }), [])

  return (
    <Image src={item.imageUrl} width="100%" height="100%" borderTopLeftRadius={rem[12]} borderTopRightRadius={rem[12]} borderBottomLeftRadius={rem[12]} borderBottomRightRadius={rem[12]} />
  )
})