import { defaultConfig } from "@tamagui/config/v5";
import { style_25, THEME } from "~/theme";

export const customTheme = {
  [THEME.STYLE_25]: {
    ...defaultConfig.themes.dark,
    ...style_25,
  },
}