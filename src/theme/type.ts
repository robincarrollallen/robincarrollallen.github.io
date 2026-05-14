/** Theme mode enum */
export const THEME_MODE = {
	DARK: 'dark',
	LIGHT: 'light',
	SYSTEM: 'system',
} as const

/** Theme mode type "dark" | "light" | "system" */
export type ThemeModeType = typeof THEME_MODE[keyof typeof THEME_MODE]

/** Theme enum */
export const THEME_ENUM = {
	STYLE_1: 'Layout2:DarkGreen',
	STYLE_2: 'Layout2:GoldenYellow',
	STYLE_3: 'Layout2:BluePurple',
	STYLE_4: 'Layout3:AmberPurple',
	STYLE_5: 'Layout1:Blue',
	STYLE_6: 'Layout1:Green',
	STYLE_25: 'Layout2:SupremeGreen'
} as const

/** Theme Key full name Enum */
export const THEME_KEY_ENUM = Object.fromEntries(
	Object.entries(THEME_ENUM).map(([key, value]) => [value, key ])
) as Record<ThemeFullNameType, keyof typeof THEME_ENUM>

/** Supported themes array [Layout2:SupremeGreen, ...] */
export const ThemeSupport = Object.values(THEME_ENUM)

/** Theme full name type [Layout2:SupremeGreen, ...] */
export type ThemeFullNameType = typeof THEME_ENUM[keyof typeof THEME_ENUM]

/** Theme Key Type [STYLE_1, ...] */
export type ThemeKeyType =  keyof typeof THEME_ENUM

/** Theme code map type { STYLE_25: style_25, ... } */
export type ThemeCodeMapType = {
  readonly [K in keyof typeof THEME_ENUM]: Lowercase<K & string>
}

/** Theme code enum { STYLE_25: style_25, ... } */
export const THEME_CODE = Object.fromEntries(
	Object.entries(THEME_ENUM).map(([key, _value]) => [key, key.toLowerCase()])
) as Record<keyof typeof THEME_ENUM, Lowercase<keyof typeof THEME_ENUM>>

/** Theme key enum { style_25: STYLE_25, ... } */
export const THEME_KEY = Object.fromEntries(
	Object.entries(THEME_ENUM).map(([key, _value]) => [key.toLowerCase(), key ])
) as Record<Lowercase<keyof typeof THEME_ENUM>, keyof typeof THEME_ENUM>

/** Theme name from value type */
type ThemeNameFromValue<V extends string> = V extends `Layout${number}:${infer N}` ? N : V

/** Theme Name Map Type { STYLE_25: SupremeGreen, ... } */
export type ThemeNameMapType = {
	readonly [K in keyof typeof THEME_ENUM]: ThemeNameFromValue<(typeof THEME_ENUM)[K]>
}

/** Theme name enum { STYLE_25: SupremeGreen, ... } */
export const THEME_NAME = Object.fromEntries(
	Object.entries(THEME_ENUM).map(([k, v]) => [k, v.replace(/^Layout\d+:/, '')])
) as ThemeNameMapType

/** Theme display name union: DarkGreen | GoldenYellow | ... */
export type ThemeNameType = ThemeNameMapType[keyof ThemeNameMapType]

/** Theme code type [style_25, ...] */
export type ThemeCodeType = Lowercase<keyof typeof THEME_NAME>;

/** Theme style map type */
export type ThemeStyleMapType = {
  readonly [K in ThemeFullNameType]: Lowercase<keyof typeof THEME_ENUM>
}

/** Theme value map type { STYLE_25: t_SupremeGreen, ... } */
export type ThemeValueMapType = {
  readonly [K in keyof typeof THEME_NAME]: `t_${typeof THEME_NAME[K]}`
}

/** Theme Style type { Layout2:SupremeGreen: style_25, ... } */
export const THEME_STYLE_TYPE = Object.fromEntries(
	Object.entries(THEME_ENUM).map(([key, value]) => [value, key.toLowerCase()])
) as ThemeStyleMapType

/** Theme Style mode { SupremeGreen: STYLE_25, ... } */
export const THEME_STYLE = Object.fromEntries(
	Object.entries(THEME_NAME).map(([key, value]) => [value, key])
) as Record<ThemeNameType, ThemeKeyType>

/** Theme value { STYLE_25: t_SupremeGreen, ... } */
export const THEME_VALUE = Object.fromEntries(
	Object.entries(THEME_NAME).map(([key, value]) => [key, `t_${value}`])
) as ThemeValueMapType
