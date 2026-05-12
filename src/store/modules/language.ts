import { useMemo } from 'react'
import { create } from 'zustand'
import { useTenantStore } from './tenant'
import { createPersistStore } from '../middleware/persist'
import { LANGUAGE_CODE, LANGUAGE_NAME } from '~/enums/language'
import type { OptionsType } from '~/types/options'
import type { BaseStore } from '../types'

interface LanguageState extends BaseStore {
  supportedLanguages: OptionsType[]
}

const initialState = {
  supportedLanguages: [{ label: LANGUAGE_NAME[LANGUAGE_CODE.EN_US], value: LANGUAGE_CODE.EN_US }],
  _hasHydrated: false,
}

export const useLanguageStore = create<LanguageState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'language-store',
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (!error && state) {
            state.setHasHydrated(true)
          }
        }
      },
    }
  )
)

/** 获取语言映射 */
export const useLanguageSupported = () => {
  const tenantInfo = useTenantStore(state => state.tenantInfo)
  
  return useMemo(() => {
    return tenantInfo.appLanguage.map((lang: keyof typeof LANGUAGE_NAME) => ({ label: LANGUAGE_NAME[lang], value: lang }))
  }, [tenantInfo.appLanguage])
}