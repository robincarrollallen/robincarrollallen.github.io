import { Image } from '~/components/Image';
import { useTenantStore } from '~/store/modules/tenant';
import { useSharedValue } from 'react-native-reanimated';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, type LayoutChangeEvent } from 'react-native';
import { useResponsiveStore, useSizeTokens } from '~/store/modules/responsive';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';

/** Home Banner */
export function Banner() {
  const rem = useSizeTokens()
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  const bannerList = useTenantStore(state => state.bannerList)
  const screenWidth = useResponsiveStore(state => state.screenWidth) || 0
  const [bannerWidth, setBannerWidth] = useState(1);
  const [index, setIndex] = useState(0);

  /** Banner wrapper layout */
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setBannerWidth(width - rem[12] * 2)
  }, [rem])

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    wrapper: { width: '100%', flex: 1, paddingHorizontal: rem[12] },
    slide: {
      flex: 1,
      borderRadius: 12,
      width: bannerWidth,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: { color: '#fff', fontSize: 22, fontWeight: '700' },
    dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 12 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc' },
    dotActive: { backgroundColor: '#333', width: 20 },
    row: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 16 },
    btn: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#eee', borderRadius: 8 },
  }), [screenWidth, bannerWidth, rem])

  return (
    <View style={styles.wrapper} onLayout={handleLayout}>
      <Carousel
        loop
        ref={ref}
        snapEnabled
        pagingEnabled
        height={rem[228]}
        data={bannerList}
        width={bannerWidth}
        onSnapToItem={setIndex}
        onProgressChange={progress}
        renderItem={({ item }) => <BannerItem item={item} />}
      />
    </View>
  );
}

/** Home Banner Item */
const BannerItem = memo(({ item }: { item: Recordable }) => {
  const rem = useSizeTokens()

  return (
    <Image src={item.imageUrl} width="100%" height="100%" borderTopLeftRadius={rem[12]} borderTopRightRadius={rem[12]} borderBottomLeftRadius={rem[12]} borderBottomRightRadius={rem[12]} />
  )
})