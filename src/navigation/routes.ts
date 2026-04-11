/** 路由映射Map */
export const ROUTES = {
  root: {
    name: 'root',
    path: '/',
    auth: false,
  },
  tabbar: {
    name: '(tabbar)',
    path: '/(tabbar)',
    auth: false,
  },
  home: {
    name: 'home',
    path: '/home',
    auth: false,
  },
  activity: {
    name: 'activity',
    path: '/activity',
    auth: false,
  },
  deposit: {
    name: 'deposit',
    path: '/deposit',
    auth: true,
  },
  game: {
    name: 'game',
    path: '/game',
    auth: false,
  },
  search: {
    name: 'search',
    path: '/game/search',
    auth: false,
  },
  profile: {
    name: 'profile',
    path: '/profile',
    auth: false,
  },
  auth: {
    name: 'auth',
    path: '/auth',
    auth: false,
  },
  authLogin: {
    name: 'authLogin',
    path: '/auth/login',
    auth: false,
  },
  authLoginPassword: {
    name: 'authLoginPassword',
    path: '/auth/login/password',
    auth: false,
  },
  authSignup: {
    name: 'authSignup',
    path: '/auth/signup/:method',
    auth: false,
  },
  start: {
    name: 'start',
    path: '/start',
    auth: false,
  },
  startFeed: {
    name: 'startFeed',
    path: '/start/feed',
    auth: false,
  },
  startSettings: {
    name: 'startSettings',
    path: '/start/settings',
    auth: true,
  },
  startSettingsEditProfile: {
    name: 'startSettingsEditProfile',
    path: '/start/settings/edit-profile',
    auth: true,
  },
  startSettingsBlockedUsers: {
    name: 'startSettingsBlockedUsers',
    path: '/start/settings/blocked-users',
    auth: true,
  },
} as const

/** 路径映射Map */
export const PATH_TO_NAME = Object.fromEntries(
  Object.values(ROUTES).map((route) => [route.path, route.name])
) as {
  readonly [K in keyof typeof ROUTES as (typeof ROUTES)[K]['path']]: (typeof ROUTES)[K]['name']
}

/** 判断路由path是否需要鉴权。 */
export function isAuthRoute(path: string): boolean {
  /** 先匹配静态path。 */
  const route = Object.values(ROUTES).find((route) => route.path === path)
  if (route) {
    return route.auth
  }
  
  /** 再匹配动态path。 */
  for (const route of Object.values(ROUTES)) {
    if (pathMatchesRoute(path, route.path)) {
      return route.auth
    }
  }

  return true // 保守：未配置视为需登录
}

/** 判断path是否匹配route。 */
function pathMatchesRoute(actualPath: string, pattern: string): boolean {
  const norm = (p: string) => p.replace(/\/+$/, '') || '/'
  const a = norm(actualPath)
  const b = norm(pattern)

  if (!b.includes('/:')) {
    return a === b
  }

  const aParts = a === '/' ? [] : a.split('/').filter(Boolean)
  const bParts = b === '/' ? [] : b.split('/').filter(Boolean)
  if (aParts.length !== bParts.length) return false

  for (let i = 0; i < bParts.length; i++) {
    if (bParts[i]?.startsWith(':')) continue
    if (aParts[i] !== bParts[i]) return false
  }
  
  return true
}