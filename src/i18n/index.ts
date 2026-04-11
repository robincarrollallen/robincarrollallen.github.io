import { resources } from './resources'
import { changeLanguage } from 'i18next'
import { isWeb, isServer } from 'tamagui'
import { getLocales } from 'expo-localization'
import { isNative } from '~/constants/platform'
import { initReactI18next, useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cookies from 'js-cookie'
import i18n from 'i18next'
import { LANGUAGE_CODE } from '~/enums/language'

export const initI18n = async () => {
  if (!i18n.isInitialized) {
    let lang: string | undefined = ''

    const storageLang = await getStorageLang()

    if (storageLang) {
      lang = storageLang
    }else {
      const defaultLang = LANGUAGE_CODE.EN_US

      if (defaultLang) {
        lang = defaultLang
      } else {
        lang = getLocalLang()
      }
    }
 
    await i18n.use(initReactI18next).init({
      resources,
      lng: lang,
      fallbackLng: LANGUAGE_CODE.EN_US,
      interpolation: {
        escapeValue: false,
      },
    })
  }
}

export const setLanguage = (language: string) => {
  changeLanguage(language)
  AsyncStorage.setItem('lang', language)
  if (isWeb && !isServer) {
    document.cookie = `lang=${language}; path=/; max-age=${60 * 60 * 24 * 30}`
  }
}

/** 获取本地设备语言 */
const getLocalLang = () => {
  if (isNative) {
    return 'en-US'
  }
}

/** 获取本地存储的语言 */
const getStorageLang = async () => {
  if (isNative) {
    return await AsyncStorage.getItem('lang')
  }
  return Cookies.get('lang')
}

/** 语言映射 */
const languageMap: Record<string, string> = {
  'zh': 'zh-CN',      // 中文 -> 简体中文
  'zh-hans': 'zh-CN', // 简体中文 -> zh-CN
  'zh-hant': 'zh-TW', // 繁体中文 -> zh-TW
  'en': 'en-US',      // 英文 -> 美式英文
}

/** 获取语言代码 */
const getLanguageCode = (languageTag: string, languageCode: string) => {
  const langTag= languageTag.split('-').slice(0, 2).join('-').toLowerCase()

  return languageMap[langTag] || languageMap[languageCode]
}

/** i18n hook */
export const useI18n = () => {  
  return useTranslation(undefined, { i18n })
}
