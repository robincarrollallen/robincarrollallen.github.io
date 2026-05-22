/** Load more status enum */
export const LOAD_MORE_STATUS = {
  LOADING: 'loading',
  MORE: 'more',
  NO_MORE: 'noMore',
} as const

/** Load more type */
export type LoadMoreType = typeof LOAD_MORE_STATUS[keyof typeof LOAD_MORE_STATUS];

/** Login popup type enum */
export const LOGIN_POPUP_TYPE = {
  LOGIN: 0,
  REGISTER: 1,
} as const

/** Login popup type */
export type LoginPopupType = typeof LOGIN_POPUP_TYPE[keyof typeof LOGIN_POPUP_TYPE];
