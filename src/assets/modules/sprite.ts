import categoryGame25 from '../sprite/game-category-25.webp'
import categoryPlatform25 from '../sprite/game-category-25.webp'
import rankAvatarBorder25 from '../sprite/rank-avatar-border-25.webp'

const categoryGameNames = ['ONE_API_HOT', 'ELECTRONIC', 'CHESS', 'FISHING', 'VIDEO', 'SPORTS', 'LOTTERY'] as const
const categoryPlatformNames = ['ONE_API_HOT', 'ELECTRONIC', 'CHESS', 'FISHING', 'VIDEO', 'SPORTS', 'LOTTERY'] as const
const rankAvatarBorderNames = [1, 2, 3] as const;

/** 精灵图配置 */
export const SPRITES = {
  category_game_25: {
    source: categoryGame25,
    rows: 1,
    names: categoryGameNames,
  },
  category_platform_25: {
    source: categoryPlatform25,
    rows: 1,
    names: categoryPlatformNames,
  },
  rank_avatar_border_25: {
    source: rankAvatarBorder25,
    rows: 1,
    names: rankAvatarBorderNames,
  },
} as const;

/** 精灵图名称映射 */
export const SPRITE_NAME = Object.fromEntries(
  Object.keys(SPRITES).map(key => [
    key.toUpperCase(),
    key
  ])
) as Record<Uppercase<keyof typeof SPRITES>, keyof typeof SPRITES>;

/** 分类游戏名称映射 */
export const GAME_CATEGORY_NAME = Object.fromEntries(
  categoryGameNames.map(name => [name, name])
) as Record<typeof categoryGameNames[number], typeof categoryGameNames[number]>

/** 排名头像边框名称映射 */
export const RANK_AVATAR_BORDER_NAME = Object.fromEntries(
  rankAvatarBorderNames.map(name => [name, name])
) as Record<typeof rankAvatarBorderNames[number], typeof rankAvatarBorderNames[number]>