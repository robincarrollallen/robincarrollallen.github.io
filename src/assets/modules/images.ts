import maintain from '../images/maintain.webp';
import bg_card_level_1 from '../images/vip/bg-card-level-1.webp';
import bg_invite_level_0 from '../images/invite/bg-invite-level-0.webp';
import bg_invite_level_1 from '../images/invite/bg-invite-level-1.webp';
import bg_invite_level_2 from '../images/invite/bg-invite-level-2.webp';
import bg_invite_level_3 from '../images/invite/bg-invite-level-3.webp';
import bg_invite_level_4 from '../images/invite/bg-invite-level-4.webp';
import bg_invite_level_5 from '../images/invite/bg-invite-level-5.webp';
import bg_invite_level_6 from '../images/invite/bg-invite-level-6.webp';
import bg_dialog_confirm from '../images/dialog/bg-dialog-confirm.webp';
import bg_tabbar_flexible_25 from '../images/tabbar/bg-flexible-25.webp';
import yellow_dark_top_bg from '../images/profile/yellow-dark-top-bg.webp';
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
  yellow_dark_top_bg,
  bg_invite_level_0,
  bg_invite_level_1,
  bg_invite_level_2,
  bg_invite_level_3,
  bg_invite_level_4,
  bg_invite_level_5,
  bg_invite_level_6,
  bg_dialog_confirm,
  bg_card_level_1,
  maintain,
} as const;