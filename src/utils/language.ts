import { LANGUAGE_NAME } from "~/enums/language"

/**
 * @description 获取指定语言的语言名称
 * @param language 语言标记
 */
export function getLanguageName(language: string): string {
	return LANGUAGE_NAME[language as keyof typeof LANGUAGE_NAME] || 'Unknown'
}