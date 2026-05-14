import { defaultConfig } from "@tamagui/config/v5";
import { style_25, THEME_NAME } from "~/theme";
import type { ThemeNameType } from "~/theme/type";

const supremeGreenTheme = {
  ...defaultConfig.themes.dark,
  ...style_25,
};

/** Only some display names are defined; others are `undefined` until added. */
export const customTheme: Partial<Record<ThemeNameType, typeof supremeGreenTheme>> = {
  [THEME_NAME.STYLE_25]: supremeGreenTheme,
};