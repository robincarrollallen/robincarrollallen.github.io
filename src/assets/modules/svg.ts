import { isIos } from '@tamagui/constants';

import { pig } from '../svg/pig';
import { eye } from '../svg/eye';
import { copy } from '../svg/copy';
import { menu } from '../svg/menu';
import { BR } from '../svg/flag/br';
import { CN } from '../svg/flag/cn';
import { US } from '../svg/flag/us';
import { earth } from '../svg/earth';
import { close } from '../svg/close';
import { empty } from '../svg/empty';
import { wallet } from '../svg/wallet';
import { search } from '../svg/search';
import { recent } from '../svg/recent';
import { loading } from '../svg/loading';
import { chevron } from '../svg/chevron';
import { popular } from '../svg/popular';
import { support } from '../svg/support';
import { favorite } from '../svg/favorite';
import { starFull } from '../svg/star-full';
import { magnifier } from '../svg/magnifier';
import { key_round } from '../svg/key-round';
import { eye_closed } from '../svg/eye-closed';
import { smartPhone } from '../svg/smartphone';
import { report } from '../svg/profile/report';
import { invite } from '../svg/profile/invite';
import { redeem } from '../svg/profile/redeem';
import { logout } from '../svg/profile/logout';
import { bg_vip_1 } from '../svg/vip/bg-vip-1';
import { bg_vip_2 } from '../svg/vip/bg-vip-2';
import { bg_vip_3 } from '../svg/vip/bg-vip-3';
import { bg_vip_4 } from '../svg/vip/bg-vip-4';
import { bg_vip_5 } from '../svg/vip/bg-vip-5';
import { bg_vip_6 } from '../svg/vip/bg-vip-6';
import { square_user } from '../svg/square-user';
import { security } from '../svg/profile/security';
import { language } from '../svg/profile/language';
import { circle_alert } from '../svg/circle-alert';
import { loader_circle } from '../svg/loader-circle';
import { cloud_download } from '../svg/cloud-download';
import { tabbar_home_25 } from '../svg/tabbar/home-25';
import { tabbar_promo_25 } from '../svg/tabbar/promo-25';
import { tabbar_profile_25 } from '../svg/tabbar/profile-25';
import { tabbar_deposit_25 } from '../svg/tabbar/deposit-25';
import { bg_rank_header_25 } from '../svg/home/bg-rank-header-25';
import { tabbar_home_active_25 } from '../svg/tabbar/home-active-25';
import { tabbar_promo_active_25 } from '../svg/tabbar/promo-active-25';
import { tabbar_background_25 } from '../svg/tabbar/tabbar_background_25';
import { tabbar_profile_active_25 } from '../svg/tabbar/profile-active-25';
import { tabbar_deposit_active_25 } from '../svg/tabbar/deposit-active-25';

export const SVG = {
  loading: isIos ? loading : loader_circle,
  tabbar_deposit_active_25,
  tabbar_profile_active_25,
  tabbar_promo_active_25,
  tabbar_home_active_25,
  tabbar_background_25,
  tabbar_profile_25,
  tabbar_deposit_25,
  bg_rank_header_25,
  tabbar_promo_25,
  tabbar_home_25,
  cloud_download,
  circle_alert,
  square_user,
  smartPhone,
  eye_closed,
  key_round,
  magnifier,
  favorite,
  starFull,
  security,
  language,
  bg_vip_1,
  bg_vip_2,
  bg_vip_3,
  bg_vip_4,
  bg_vip_5,
  bg_vip_6,
  popular,
  support,
  chevron,
  logout,
  report,
  invite,
  redeem,
  recent,
  search,
  wallet,
  empty,
  close,
  earth,
  menu,
  copy,
  eye,
  pig,
  
  // 国旗 SVG 库: https://github.com/lipis/flag-icons/tree/main/flags
  CN,
  US,
  BR,
} as const;

/** Flag SVG type */
export type FlagSvgType = keyof typeof SVG