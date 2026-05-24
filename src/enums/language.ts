/** Supported language enum */
export const LANGUAGE_TYPE = {
	/** English */
	'en-US': 'English',
	/** Portuguese */
	'pt-BR': 'Português',
	/** Chinese */
	'zh-CN': '中文',
	/** Indonesian */
	'id-ID': 'Bahasa Indonesia',
	/** Hindi */
	'hi-IN': 'हिंदी',
	/** Vietnamese */
	'vi-VN': 'Tiếng Việt',
	/** English (Philippines) */
	'en-PH': 'English (Philippines)',
} as const

/** Language names enum */
export const LANGUAGE_NAME = {
	'en-US': 'English (United States)',
	'pt-BR': 'Português (Brasil)',
	'zh-CN': '中文 (中国)',
	'id-ID': 'Bahasa Indonesia',
	'hi-IN': 'Hindi (India)',
	'vi-VN': 'Tiếng Việt (Việt Nam)',
	'en-PH': 'English (Philippines)',
} as const

/** Language code enum */
export const LANGUAGE_CODE = {
	EN_US: 'en-US',
	PT_BR: 'pt-BR',
	ZH_CN: 'zh-CN',
	ID_ID: 'id-ID',
	HI_IN: 'hi-IN',
	VI_VN: 'vi-VN',
	EN_PH: 'en-PH',
} as const

/** Default language */
export const DEFAULT_LANGUAGE = LANGUAGE_CODE.ZH_CN

/** Supported language type */
export type LanguageType = keyof typeof LANGUAGE_TYPE;
export type LanguageValue = typeof LANGUAGE_TYPE[LanguageType]

/** Supported languages array */
export const LanguageSupport = Object.keys(LANGUAGE_TYPE) as LanguageType[]
export const LanguageSupportValue = Object.values(LANGUAGE_TYPE)

/** Reverse mapping for language values */
export const LANGUAGE_TYPE_REVERSE = Object.fromEntries(
	Object.entries(LANGUAGE_TYPE).map(([key, value]) => [value, key])
) as Record<LanguageValue, LanguageType>
