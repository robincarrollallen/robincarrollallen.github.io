/** Theme mode type */
export const THEME_MODE_TYPE = {
	DARK: 'dark',
	LIGHT: 'light',
	SYSTEM: 'system',
} as const

/** Theme type */
export const THEME_TYPE = {
	STYLE_1: 'Layout2:DarkGreen',
	STYLE_2: 'Layout2:GoldenYellow',
	STYLE_3: 'Layout2:BluePurple',
	STYLE_4: 'Layout3:AmberPurple',
	STYLE_5: 'Layout1:Blue',
	STYLE_6: 'Layout1:Green',
	STYLE_7: 'Layout1:BlueV01',
	STYLE_8: 'Layout1:GreenV01',
	STYLE_9: 'Layout1:GreenV02',
	STYLE_10: 'Layout1:Blue_V01',
	STYLE_11: 'Layout1:AmberPurple',
	STYLE_12: 'Layout1:PineGreenV01',
	STYLE_13: 'Layout1:PineGreenV02',
	STYLE_14: 'Layout1:BlueV02',
	STYLE_15: 'Layout1:AmberPurpleV01',
	STYLE_16: 'Layout1:AuroraYellow',
	STYLE_17: 'Layout2:PhantomBlue',
	STYLE_18: 'Layout2:NeoBlue',
	STYLE_19: 'Layout2:MystLightBlue',
	STYLE_20: 'Layout2:MidnightPurple',
	STYLE_25: 'Layout2:SupremeGreen'
} as const

/** Theme mode [dark, light] */
export const THEME_MODE = {
	STYLE_1: THEME_MODE_TYPE.DARK,
	STYLE_2: THEME_MODE_TYPE.DARK,
	STYLE_3: THEME_MODE_TYPE.DARK,
	STYLE_4: THEME_MODE_TYPE.DARK,
	STYLE_5: THEME_MODE_TYPE.DARK,
	STYLE_6: THEME_MODE_TYPE.DARK,
	STYLE_7: THEME_MODE_TYPE.DARK,
	STYLE_8: THEME_MODE_TYPE.DARK,
	STYLE_9: THEME_MODE_TYPE.DARK,
	STYLE_10: THEME_MODE_TYPE.DARK,
	STYLE_11: THEME_MODE_TYPE.DARK,
	STYLE_12: THEME_MODE_TYPE.DARK,
	STYLE_13: THEME_MODE_TYPE.DARK,
	STYLE_14: THEME_MODE_TYPE.DARK,
	STYLE_15: THEME_MODE_TYPE.DARK,
	STYLE_16: THEME_MODE_TYPE.DARK,
	STYLE_17: THEME_MODE_TYPE.DARK,
	STYLE_18: THEME_MODE_TYPE.DARK,
	STYLE_19: THEME_MODE_TYPE.LIGHT,
	STYLE_20: THEME_MODE_TYPE.DARK,
	STYLE_25: THEME_MODE_TYPE.DARK,
} as const

/** Theme mode type { STYLE_25: dark, ... } */
export type ThemeMode = typeof THEME_MODE_TYPE[keyof typeof THEME_MODE_TYPE]

/** Theme type { STYLE_25: SupremeGreen, ... } */
export const THEME = Object.fromEntries(
  Object.entries(THEME_TYPE).map(([k, v]) => [k, v.replace(/^Layout\d+:/, '')])
) as Record<keyof typeof THEME_TYPE, string>

/** Theme type [SupremeGreen, ...] */
export type ThemeName = typeof THEME[keyof typeof THEME]

/** Theme type [Layout2:SupremeGreen, ...] */
export type ThemeType = typeof THEME_TYPE[keyof typeof THEME_TYPE]

/** Theme key [style_25, ...] */
export type ThemeKEY = Lowercase<keyof typeof THEME>;

/** Theme mode key [style_25, ...] */
export type ThemeModeKey = keyof typeof THEME_MODE

/** Theme style map type */
export type ThemeStyleMapType = {
  readonly [K in ThemeType]: Lowercase<keyof typeof THEME_TYPE>
}

/** Theme key map type { STYLE_25: style_25, ... } */
export type ThemeKeyMapType = {
  readonly [K in keyof typeof THEME]: Lowercase<K & string>
}

/** Theme value map type { STYLE_25: t_SupremeGreen, ... } */
export type ThemeValueMapType = {
  readonly [K in keyof typeof THEME]: `t_${typeof THEME[K]}`
}

/** Supported themes array [Layout2:SupremeGreen, ...] */
export const ThemeSupport = Object.values(THEME_TYPE)

/** Theme Style type { Layout2:SupremeGreen: style_25, ... } */
export const THEME_STYLE_TYPE = Object.fromEntries(
	Object.entries(THEME_TYPE).map(([key, value]) => [value, key.toLowerCase()])
) as ThemeStyleMapType

/** Theme Style mode { SupremeGreen: STYLE_25, ... } */
export const THEME_STYLE = Object.fromEntries(
	Object.entries(THEME).map(([key, value]) => [value, key])
)

/** Theme key { STYLE_25: style_25, ... } */
export const THEME_KEY = Object.fromEntries(
	Object.entries(THEME).map(([key, _value]) => [key, key.toLowerCase()])
) as ThemeKeyMapType

/** Theme value { STYLE_25: t_SupremeGreen, ... } */
export const THEME_VALUE = Object.fromEntries(
	Object.entries(THEME).map(([key, value]) => [key, `t_${value}`])
) as ThemeValueMapType
