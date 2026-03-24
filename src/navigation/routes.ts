/** 路由映射Map */
export const ROUTES = {
  root: {
    path: '/' as const,
    auth: false,
  },
  auth: {
    path: '/auth' as const,
    auth: false,
  },
  authLogin: {
    path: '/auth/login' as const,
    auth: false,
  },
  authLoginPassword: {
    path: '/auth/login/password' as const,
    auth: false,
  },
  authSignup: {
    path: '/auth/signup/:method' as const,
    auth: false,
  },
  home: {
    path: '/home' as const,
    auth: true,
  },
  homeFeed: {
    path: '/home/feed' as const,
    auth: false,
  },
  homeSettings: {
    path: '/home/settings' as const,
    auth: true,
  },
  homeSettingsEditProfile: {
    path: '/home/settings/edit-profile' as const,
    auth: true,
  },
  homeSettingsBlockedUsers: {
    path: '/home/settings/blocked-users' as const,
    auth: true,
  },
} as const

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