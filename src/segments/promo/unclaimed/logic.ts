import { useTheme } from 'tamagui'
import { delay } from '~/utils/time'
import { useUnclaimedState } from './state'
import { RANGE_TIME } from '~/enums/options'
import { LOAD_MORE_STATUS } from '~/enums/status'
import { useStyleStore } from '~/store/modules/style'
import { useSizeTokens } from '~/store/modules/responsive'
import { useGlobalLoading } from '~/provider/LoadingProvider'
import { useCallback, useEffect, useRef, useState } from 'react'
import activityRecordHistory from '~/data/activityRecordHistory.json'

/** Unclaimed Logic Hook */
export const useUnclaimedLogic = () => {
  const [refreshing, setRefreshing] = useState(false) // 下拉刷新状态
  const date = useUnclaimedState(state => state.date) // 日期缓存状态
  const tabbarLayout = useStyleStore(state => state.tabbarLayout) // TabBar 布局
  const recordList = useUnclaimedState(state => state.recordList) // 记录列表缓存状态
  const loadingMore = useUnclaimedState(state => state.loadingMore) // 加载更多状态
  const setLoadingMore = useUnclaimedState.getState().setLoadingMore // 设置加载更多状态
  const setRecordList = useUnclaimedState.getState().setRecordList // 设置记录列表
  const setDate = useUnclaimedState.getState().setDate // 设置日期
  const setPage = useUnclaimedState.getState().setPage // 设置页码
  const loading = useGlobalLoading() // 全局加载状态
  const initialized = useRef(false) // 是否初始化
  const rem = useSizeTokens() // 响应式尺寸
  const theme = useTheme()


  /** Change Date Callback */
  const onChange = useCallback(async (value: number | string) => {
    loading.show()
    setDate(Number(value))
    try {
      setPage(1)
      await mockRecordList()
    } finally {
      loading.hide()
    }
  }, [])

  /** End Reached Callback */
  const onEndReached = useCallback(() => {
    console.log('unclaimed 即将到达底部，可以加载更多')
    setLoadingMore(LOAD_MORE_STATUS.LOADING)
    mockRecordList()
  }, [])

  /** Refresh Callback */
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      setPage(1)
      await mockRecordList()
    } finally {
      console.log('下拉刷新完成')
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    if (initialized.current || recordList.length) return
    initialized.current = true
    onChange(RANGE_TIME.TODAY)
  }, [])

  // TODO: Mock Network Request
  const mockRecordList = useCallback(async () => {
    await delay(1500)
    const result = activityRecordHistory
    const currentPage = useUnclaimedState.getState().page // 获取最新值
    const currentRecordList = useUnclaimedState.getState().recordList // 获取最新值
    const nextPage = currentPage + 1
    if (currentPage === 1) {
      setPage(nextPage)
      setRecordList(result.recordList)
      setLoadingMore(LOAD_MORE_STATUS.MORE)
    } else if (currentPage < 3) {
      setPage(nextPage)
      setRecordList(currentRecordList.concat(result.recordList))
      setLoadingMore(LOAD_MORE_STATUS.MORE)
    } else {
      const list = result.recordList.slice(0, 5)
      setRecordList(currentRecordList.concat(list))
      setLoadingMore(LOAD_MORE_STATUS.NO_MORE)
    }
  }, [])

  return {
    rem,
    date,
    theme,
    recordList,
    refreshing,
    loadingMore,
    tabbarLayout,
    onEndReached,
    onRefresh,
    onChange,
  }
}