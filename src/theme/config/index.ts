import { THEME_CODE, THEME_ENUM, THEME_MODE, THEME_NAME } from "../type";
import { customTheme } from "~/tamagui/customTheme";

export const themeConfig = {
  [THEME_ENUM.STYLE_1]: {
    index: 1,
    code: THEME_CODE.STYLE_1,
    name: THEME_NAME.STYLE_1,
    mode: THEME_MODE.DARK,
    color: customTheme.DarkGreen?.textSelected,
  },
  [THEME_ENUM.STYLE_2]: {
    index: 2,
    code: THEME_CODE.STYLE_2,
    name: THEME_NAME.STYLE_2,
    mode: THEME_MODE.DARK,
    color: customTheme.GoldenYellow?.textSelected,
  },
  [THEME_ENUM.STYLE_3]: {
    index: 3,
    code: THEME_CODE.STYLE_3,
    name: THEME_NAME.STYLE_3,
    mode: THEME_MODE.DARK,
    color: customTheme.BluePurple?.textSelected,
  },
  [THEME_ENUM.STYLE_4]: {
    index: 4,
    code: THEME_CODE.STYLE_4,
    name: THEME_NAME.STYLE_4,
    mode: THEME_MODE.DARK,
    color: customTheme.AmberPurple?.textSelected,
  },
  [THEME_ENUM.STYLE_5]: {
    index: 5,
    code: THEME_CODE.STYLE_5,
    name: THEME_NAME.STYLE_5,
    mode: THEME_MODE.DARK,
    color: customTheme.Blue?.textSelected,
  },
  [THEME_ENUM.STYLE_6]: {
    index: 6,
    code: THEME_CODE.STYLE_6,
    name: THEME_NAME.STYLE_6,
    mode: THEME_MODE.DARK,
    color: customTheme.Green?.textSelected,
  },
  [THEME_ENUM.STYLE_25]: {
    index: 25,
    code: THEME_CODE.STYLE_25,
    name: THEME_NAME.STYLE_25,
    mode: THEME_MODE.DARK,
    color: customTheme.SupremeGreen?.textSelected,
  }
}