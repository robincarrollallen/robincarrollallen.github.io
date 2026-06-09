import { Image } from '~/components/Image'
import { XStack, Text, useTheme } from 'tamagui'
import { useSizeTokens } from '~/store/modules/responsive'
import { VerticalInfiniteScroll } from '~/widgets/VerticalInfiniteScroll'

export function HomeRankingList({ list = [] }: { list?: Recordable[] }) {
  const theme = useTheme()
  const rem = useSizeTokens()
  
  const renderRankItem = (item: any, index: number) => (
    <XStack
      px={rem[15]}
      height="100%"
      items="center"
      justify="space-between"
      bg={index % 2 === 0 ? theme.backgroundSurfaceRaisedL1?.val : theme.backgroundSurfaceRaisedL2?.val}
    >
      <Text
        fontSize={rem[14]}
        fontWeight="600"
        color={theme.textBrandPrimary?.val}
      >
        {item.rank}
      </Text>
      <XStack flex={1} justify="center" items="center" gap={rem[8]}>
        <Image
          width={rem[20]}
          height={rem[20]}
          src={item.avatar}
          borderTopLeftRadius={rem[10]}
          borderTopRightRadius={rem[10]}
          borderBottomLeftRadius={rem[10]}
          borderBottomRightRadius={rem[10]}
        />
        <Text fontSize={rem[14]} color={theme.textWeak?.val}>{item.userId}</Text>
      </XStack>
      <Text fontSize={rem[14]} fontWeight="600">
        {item.rankValue}
      </Text>
    </XStack>
  )
  
  return (
    <>
      <XStack gap={rem[8]} items="center" justify="center" py={rem[4]}>
        <Text fontSize={rem[12]} color={theme.textWeakest?.val} fontWeight="bold" text="center" width={rem[50]}>Rank</Text>
        <Text flex={1} fontSize={rem[12]} color={theme.textWeakest?.val} fontWeight="bold" text="center">Member</Text>
        <Text fontSize={rem[12]} color={theme.textWeakest?.val} fontWeight="bold" text="center" width={rem[100]}>Amount</Text>
      </XStack>
      <VerticalInfiniteScroll
        data={list}
        itemHeight={rem[50]}
        speed={30} // 每秒30像素
        renderItem={renderRankItem}
        bg={theme.background?.val}
        width="100%"
      />
    </>
  )
}