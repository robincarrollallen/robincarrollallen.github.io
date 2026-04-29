import maintain from '../images/maintain.webp';
import bg_tabbar_flexible_25 from '../images/tabbar/bg-flexible-25.webp';
import bg_game_category_CHESS_25 from '../images/sort/bg-game-category-CHESS-25.webp';
import bg_game_category_VIDEO_25 from '../images/sort/bg-game-category-VIDEO-25.webp';
import bg_game_category_SPORTS_25 from '../images/sort/bg-game-category-SPORTS-25.webp';
import bg_game_category_FISHING_25 from '../images/sort/bg-game-category-FISHING-25.webp';
import bg_game_category_LOTTERY_25 from '../images/sort/bg-game-category-LOTTERY-25.webp';
import bg_game_category_ELECTRONIC_25 from '../images/sort/bg-game-category-ELECTRONIC-25.webp';
import bg_game_category_ONE_API_HOT_25 from '../images/sort/bg-game-category-ONE_API_HOT-25.webp';

const category_game_bg_25 = {
  ONE_API_HOT: bg_game_category_ONE_API_HOT_25,
  ELECTRONIC: bg_game_category_ELECTRONIC_25,
  LOTTERY: bg_game_category_LOTTERY_25,
  FISHING: bg_game_category_FISHING_25,
  SPORTS: bg_game_category_SPORTS_25,
  CHESS: bg_game_category_CHESS_25,
  VIDEO: bg_game_category_VIDEO_25,
} as const;

export const IMAGES = {
  bg_tabbar_flexible_25,
  category_game_bg_25,
  maintain,
} as const;