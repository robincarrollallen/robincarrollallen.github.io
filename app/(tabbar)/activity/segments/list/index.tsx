import { Image } from 'expo-image'
import { List } from '~/widgets/List'
import { YStack, Text } from 'tamagui'
import { ActivityListData } from './data'
import { useTranslation } from 'react-i18next'
import { useStyleStore } from '~/store/modules/style'
import { useSizeTokens } from '~/store/modules/responsive'
import { ShimmerButton } from '~/components/ShimmerButton'
import { ImageBackground, StyleSheet } from 'react-native'
import { useActivityStore } from '~/store/modules/activity'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { type LanguageType } from '~/enums/language'
import BigList from 'react-native-big-list'

/** Activity List component */
export const ActivityList = () => {
  const rem = useSizeTokens()
  const activityStore = useActivityStore()
  const listRef = useRef<BigList<any>>(null)
  const tabbarLayout = useStyleStore(state => state.tabbarLayout) // TabBar 布局
  const activityList = useActivityStore(state => state.activityList)
  const [refreshing, setRefreshing] = useState(false)
  const { i18n } = useTranslation()

  const renderItem = useCallback(({ item, index }: { item: Recordable; index: number }) => (
    <RenderItem item={item} index={index} />
  ), [])

  const styles = useMemo(() => StyleSheet.create({
    list: {
      paddingBottom: tabbarLayout?.height || 0
    }
  }), [rem])
  
  useEffect(() => {
    activityStore.setActivityList(ActivityListData.activityList, i18n.language as LanguageType) // 设置活动列表
  }, [i18n.language])

  /** 下拉刷新 */
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      // 模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 1500))
    } finally {
      console.log('下拉刷新完成')
      setRefreshing(false)
    }
    listRef.current?.scrollToOffset({ offset: 132, animated: true })
  }, [])

  const onScroll = useCallback((event: any) => {
    console.log('onScroll', event.nativeEvent.contentOffset.y)
  }, [])

  return (
    <YStack flex={1} px={rem[12]}>
      <List
        ref={listRef}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onScroll={onScroll}
        data={activityList}
        itemHeight={rem[130]}
        footerHeight={0}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </YStack>
  )
}

/** 活动列表项 */
const RenderItem = memo<{ item: Recordable; index: number }>(({ item, index }) => {
  const rem = useSizeTokens()

  const handleItemPress = useCallback(() => {
    console.log('onPress', item)
  }, [item])

  const styles = useMemo(() => StyleSheet.create({
    imageBackground: {
      width: '100%',
      height: rem[120],
      overflow: 'hidden',
      borderRadius: rem[10],
    },
    shimmerPress: {
      bg: 'transparent',
    } as any,
    shimmerHover: {
      bg: 'transparent',
    } as any,
  }), [rem])

  const imageBackgroundSource = useMemo(() => ({ uri: item.bannerBackground }), [item.bannerBackground])
  const imageSource = useMemo(() => ({ uri: item.bannerLogo }), [item.bannerLogo])

  return (
    <YStack height="100%" justify="flex-end">
      <ImageBackground source={imageBackgroundSource} style={styles.imageBackground}>
        <ShimmerButton onPress={handleItemPress} height={rem[120]} enableShimmer bg="transparent" pressStyle={styles.shimmerPress} hoverStyle={styles.shimmerHover}>
          <Text flex={1} fontSize={rem[12]}>{item.name}</Text>
          <Image source={imageSource} style={{ width: rem[154], height: rem[84] }} contentFit='contain' />
        </ShimmerButton>
      </ImageBackground>
    </YStack>
  )
})