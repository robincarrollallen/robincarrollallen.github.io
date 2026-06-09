import { useMemo } from 'react'
import { create } from 'zustand'
import { useTenantStore } from './tenant'
import { STORE_NAME, type BaseStore } from '../types'
import { createPersistStore } from '../middleware/persist'
import { LANGUAGE_CODE, LANGUAGE_NAME, type LanguageType, type LanguageValue } from '~/enums/language'
import type { OptionsType } from '~/types/options'

interface LanguageState extends BaseStore {
  supportedLanguages: OptionsType[]
  setSupportedLanguages: (languages: OptionsType[]) => void
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
      setSupportedLanguages: (languages: OptionsType[]) => set({ supportedLanguages: languages }),
      
      reset: () => set(initialState),
    }),
    {
      name: STORE_NAME.LANGUAGE,
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
    const supportedLanguages = tenantInfo.appLanguage.map((lang) => ({ label: LANGUAGE_NAME[lang as LanguageType], value: lang as LanguageType }))
    useLanguageStore.setState({ supportedLanguages })
    
    return supportedLanguages
  }, [tenantInfo.appLanguage])
}