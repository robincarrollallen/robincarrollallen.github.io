import { List } from '~/widgets/List'
import { useMemo, memo } from 'react'
import { useSafeAreaInsets } from 'one'
import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { useUnclaimedLogic } from './logic'
import { Picker } from '~/components/Picker'
import { formatTimeByDay } from '~/utils/format/time'
import { useRangeTimeOptions } from '~/enums/options'
import { useSizeTokens } from '~/store/modules/responsive'
import { YStack, Text, Card, XStack, useTheme } from 'tamagui'

export const Unclaimed = () => {
  const { date, recordList, tabbarLayout, loadingMore, rem, theme, refreshing, onChange, onEndReached, onRefresh } = useUnclaimedLogic()
  const items = useRangeTimeOptions() // 日期选项
  const insets = useSafeAreaInsets()

  return (
    <YStack flex={1} width="100%" px={12} pt={12}>
      <XStack justify="space-between">
        <Picker items={items} onChange={onChange} value={date}>
          <Card bg={theme.backgroundSurfaceRaisedL1?.val} px={rem[12]} py={rem[6]} borderRadius={rem[4]} flexDirection="row" items="center" gap={2}>
            <Text fontSize={rem[12]} color={theme.textWeaker?.get()}>See the date: </Text>
            <Text fontSize={rem[12]} fontWeight="700">{items.find(item => item.value === date)?.label}</Text>
            <SvgXml xml={SVG.chevron} width={rem[12]} height={rem[12]} color={theme.textWeaker?.val} />
          </Card>
        </Picker>
        <XStack>
          <Text>Bonus: </Text>
          <Text fontWeight="700" color={theme.textWarning?.get()}>0.00</Text>
        </XStack>
      </XStack>
      <List
        data={recordList}
        itemHeight={rem[46]}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loadingMore={loadingMore}
        onEndReached={onEndReached}
        footerHeight={tabbarLayout.height + insets.bottom} 
        renderItem={
          ({ item, index }) => <RenderItem item={item} index={index} />
        }
      />
    </YStack>
  )
}

/** 历史取记录列表项 */
const RenderItem = memo<{ item: any; index: number }>(({ item, index }) => {
  const theme = useTheme()
  const rem = useSizeTokens()

  // 缓存格式化结果
  const formattedTime = useMemo(
    () => formatTimeByDay(item.time),
    [item.time]
  )

  return (
    <Card height="100%" bg={index % 2 === 0 ? theme.surfaceLowered?.get() : null} px={rem[12]} py={rem[6]} borderRadius={rem[4]} flexDirection="row" items="center" gap={2}>
      <Text width="25%" text="center" fontSize={rem[12]} color={theme.textWeak?.get()}>{formattedTime}</Text>
      <Text width="25%" text="center" fontSize={rem[12]} color={theme.textWeaker?.get()}>{item.activityName}</Text>
      <Text width="25%" text="center" fontSize={rem[12]} color={theme.textWarning?.get()}>{item.minAwardCount && item.maxAwardCount ? `${item.minAwardCount} ~ ${item.maxAwardCount}` : item.awardCount}</Text>
      <Text width="25%" text="center" fontSize={rem[12]} color={theme.textWeaker?.get()}>{item.awardType}</Text>
    </Card>
  )
}, (prevProps, nextProps) => {
  return prevProps.item.remake === nextProps.item.remake
})