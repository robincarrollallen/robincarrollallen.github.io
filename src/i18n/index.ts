import { resources } from './resources'
import { isWeb, isServer } from 'tamagui'
import { getLocales } from 'expo-localization'
import { isNative } from '~/constants/platform'
import { DEFAULT_LANGUAGE } from '~/enums/language'
import { initReactI18next, useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Cookies from 'js-cookie'
import i18n from 'i18next'

/** Get i18n options */
const getI18nOptions = (lng: string) => ({
  resources,
  lng,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
})

/** Init default i18n */
if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    ...getI18nOptions(DEFAULT_LANGUAGE),
    initAsync: false,
  })
}

/** Init i18n */
export const initI18n = async () => {
  let lang: string | undefined = ''

  const storageLang = await getStorageLang()

  if (storageLang) {
    lang = storageLang
  } else {
    lang = getLocalLang() || DEFAULT_LANGUAGE
  }

  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      ...getI18nOptions(lang),
    })
    return
  }

  if (i18n.language !== lang) {
    await i18n.changeLanguage(lang)
  }
}

/** Set language */
export const setLanguage = (language: string) => {
  void i18n.changeLanguage(language)
  AsyncStorage.setItem('lang', language)
  if (isWeb && !isServer) {
    document.cookie = `lang=${language}; path=/; max-age=${60 * 60 * 24 * 30}`
  }
}

/** Get local language */
const getLocalLang = () => {
  if (isNative) {
    const locale = getLocales()[0]

    if (locale) {
      return getLanguageCode(locale.languageTag, locale.languageCode || '')
    }
  }
}

/** Get storage language */
const getStorageLang = async () => {
  if (isNative) {
    return await AsyncStorage.getItem('lang')
  }
  return Cookies.get('lang')
}

/** Language map */
const languageMap: Record<string, string> = {
  'zh': 'zh-CN',      // 中文 -> 简体中文
  'zh-hans': 'zh-CN', // 简体中文 -> zh-CN
  'zh-hant': 'zh-TW', // 繁体中文 -> zh-TW
  'en': 'en-US',      // 英文 -> 美式英文
}

/** Get language code */
const getLanguageCode = (languageTag: string, languageCode: string) => {
  const langTag= languageTag.split('-').slice(0, 2).join('-').toLowerCase()

  return languageMap[langTag] || languageMap[languageCode]
}

/** I18n hook */
export const useI18n = () => {
  return useTranslation(undefined, { i18n, useSuspense: false })
}
