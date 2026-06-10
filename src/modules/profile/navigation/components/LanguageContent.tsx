import { useCallback } from "react"
import { setLanguage } from '~/i18n'
import { Icon } from "~/components/Icon"
import { SVG } from "~/assets/modules/svg"
import { useTranslation } from "react-i18next"
import { Text, XStack, YStack } from "tamagui"
import { Selection } from '~/components/Selection'
import { getLanguageName } from "~/utils/language"
import { useSizeTokens } from "~/store/modules/responsive"
import { useLanguageStore } from "~/store/modules/language"


/** 语言选择内容 */
export function LanguageContent() {
  const { i18n } = useTranslation()
  const supportedLanguages = useLanguageStore(state => state.supportedLanguages)
  const languageName = getLanguageName(i18n.language)
  const flag = i18n.language.split('-')[1]
  const rem = useSizeTokens()

  /** 选择回调事件 */
  const onChange = useCallback((value: string) => {
    setLanguage(value)
  }, [])

  return (
    <Selection value={i18n.language} items={supportedLanguages} onChange={onChange}>
      <XStack items="center" gap={rem[8]}>
        <YStack style={{ borderRadius: '50%', overflow: "hidden" }}>
          <Icon src={SVG[flag as keyof typeof SVG]} width={rem[20]} height={rem[20]} />
        </YStack>
        <Text fontSize={rem[12]} fontWeight="bold">{languageName}</Text>
      </XStack>
    </Selection>
  )
}