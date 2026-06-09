import { StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { useTheme, YStack } from 'tamagui'
import { maskMiddle } from '~/utils/format/string'
import { useEffect, useMemo, useState } from 'react'
import { useSizeTokens } from '~/store/modules/responsive'
import { formatMoney as formatMoneyUtil } from '~/utils/format/number'
import { HomeRankingList, HomeRankingTitle, HomeRankingHeader } from './modules'
import rankData from '~/data/rank.json'

const rankType = {
  'bet': 'homeRank.000004',
  'profit': 'homeRank.000007',
  'bonus': 'homeRank.000006',
  'commission': 'homeRank.000005',
}

export function Ranking() {
  const [rankType, setRankType] = useState('commission')
  const [topThreeList, setTopThreeList] = useState<Recordable[]>([])
  const [rankingList, setRankingList] = useState<Recordable[]>([])
  const rem = useSizeTokens()
  const theme = useTheme()

  /** 获取随机数 */
  const getRandomNumber = (min: number = 1, max: number = 20): number => {
    if (min >= max) throw new Error('Min must be less than max');
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** 获取随机头像 */
  const getRandomAvatar = () => {
    const list = ['male', 'female']
    const avatarIndex = getRandomNumber(0, list.length - 1)
  
    const prefix = 'first_'

    return `${prefix}${list[avatarIndex]}_${getRandomNumber()}.jpg`
  }

  /** 格式化排行榜项 */
  const formatRankItem = (rankItem: Recordable, formatMoney = true) => {
    const url = 'https://upload-dev.b83.xyz/avatar/'
    return {
      ...rankItem,
      userId: maskMiddle(rankItem.userId),
      rankValue: formatMoney ? formatMoneyUtil(rankItem.rankValue) : rankItem.rankValue,
      avatar: `${url}${rankItem.avatar || getRandomAvatar()}`
    }
  }

  /** 获取用户排行榜列表 */
  const getUserTopList = () => {
    const userRankList = rankData.userRankList.sort((a, b) => b.rankValue - a.rankValue)

    // 获取前三名
    const rawTopThreeList= [
      { ...formatRankItem(userRankList[1] as Recordable), rank: 2 },
      { ...formatRankItem(userRankList[0] as Recordable), rank: 1 },
      { ...formatRankItem(userRankList[2] as Recordable), rank: 3 },
    ]
    setTopThreeList(rawTopThreeList)

    // 获取其他用户
    const rawRankingList = userRankList.slice(3).map((item: Recordable, index: number) =>
      formatRankItem({ ...item, rank: index + 4 >= 10 ? index + 4 : `0${index + 4}` })
    )
    setRankingList(rawRankingList)
  }

  useEffect(() => {
    setRankType(rankData.rankType)
    getUserTopList()
  }, [])

  // styles
  const styles = useMemo(() => StyleSheet.create({
    bgIcon: {
      zIndex: -1,
      position: 'absolute',
      top: 0,
    },
  }), [rem])

  return (
    <YStack p={rem[12]}>
      <YStack overflow='hidden' position='relative' borderTopLeftRadius={rem[12]} borderTopRightRadius={rem[12]} bg={theme.backgroundSurfaceRaisedL1?.val}>
        <SvgXml xml={SVG.bg_rank_header_25} width="100%" height={rem[120]} style={styles.bgIcon} />
        <HomeRankingTitle />
        <HomeRankingHeader list={topThreeList} />
        <HomeRankingList list={rankingList} />
      </YStack>
    </YStack>
  )
}
