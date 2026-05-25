import { LOAD_MORE_STATUS } from '~/enums/status'
import { RANGE_TIME } from '~/enums/options'
import type { LoadMoreType } from '~/enums/status'
import { create } from 'zustand'

/** Unclaimed State Type */
interface UnclaimedState {
  date: number
  page: number
  recordList: Recordable[]
  loadingMore: LoadMoreType
  setLoadingMore: (loadingMore: LoadMoreType) => void
  setRecordList: (list: Recordable[]) => void
  setDate: (date: number) => void
  setPage: (page: number) => void
  reset: () => void
}

/** Initial State Value */
const initialState = {
  date: RANGE_TIME.TODAY,
  page: 1,
  recordList: [],
  loadingMore: LOAD_MORE_STATUS.MORE,
}

/** Unclaimed State Hook */
export const useUnclaimedState = create<UnclaimedState>((set) => ({
  ...initialState,

  setLoadingMore: (loadingMore: LoadMoreType) => set({ loadingMore }),
  setRecordList: (list: Recordable[]) => {
    set({ recordList: list })
  },
  setDate: (date: number) => set({ date }),
  setPage: (page: number) => set({ page }),

  reset: () => set(initialState),
}))