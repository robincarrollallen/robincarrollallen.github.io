import { menu } from '../svg/menu';
import { CN } from '../svg/flag/cn';
import { US } from '../svg/flag/us';
import { earth } from '../svg/earth';
import { close } from '../svg/close';
import { tabbar_home_25 } from '../svg/tabbar/home-25';
import { tabbar_profile_25 } from '../svg/tabbar/profile-25';
import { tabbar_deposit_25 } from '../svg/tabbar/deposit-25';
import { tabbar_activity_25 } from '../svg/tabbar/activity-25';
import { tabbar_home_active_25 } from '../svg/tabbar/home-active-25';
import { tabbar_background_25 } from '../svg/tabbar/tabbar_background_25';
import { tabbar_profile_active_25 } from '../svg/tabbar/profile-active-25';
import { tabbar_deposit_active_25 } from '../svg/tabbar/deposit-active-25';
import { tabbar_activity_active_25 } from '../svg/tabbar/activity-active-25';

export const SVG = {
  tabbar_activity_active_25,
  tabbar_deposit_active_25,
  tabbar_profile_active_25,
  tabbar_home_active_25,
  tabbar_background_25,
  tabbar_activity_25,
  tabbar_profile_25,
  tabbar_deposit_25,
  tabbar_home_25,
  close,
  earth,
  menu,
  
  // 国旗 SVG 库: https://github.com/lipis/flag-icons/tree/main/flags
  CN,
  US,
} as const;