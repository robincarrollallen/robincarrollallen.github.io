import { useMemo } from 'react'
import { isWeb } from 'tamagui'
import { useRouter as useOneRouter, type Href } from 'one'
import { ROUTES, isAuthRoute, getRouteForRouteName, PATH_TO_NAME } from './routes'
import { useUserStore } from '~/store/modules/user'
import { useStatusStore } from '~/store/modules/status'

/** App Router Hook */
function useRouter() {
  const router = useOneRouter()
  const showLoginPopup = useStatusStore.getState().showLoginPopup

  return useMemo(() => ({
    push: (href: Href | string, options?: any) => {
      const token = useUserStore.getState().token
      const blocked = !token && isAuthRoute(href as string)
      if (blocked) {
        return showLoginPopup();
      }

      if (isWeb && typeof window !== 'undefined') {
        window.history.pushState(window.history.state, '', `${href}`)
        // window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }))
        // window.location.href = `${href}`
        router.replace(href as Href, options)
        return 
      }

      router.push(href as Href)
    },
    replace: (href: Href | string, options?: any) => {
      const token = useUserStore.getState().token
      const blocked = !token && isAuthRoute(href as string)
      if (blocked) {
        return showLoginPopup();
      }

      router.replace(href as Href, options)
    },
    navigate: (href: Href | string, options?: any) => {
      const token = useUserStore.getState().token
      const blocked = !token && isAuthRoute(href as string)
      if (blocked) {
        return showLoginPopup();
      }

      if (isWeb && typeof window !== 'undefined') {
        return router.push(href as Href, options)
      }

      router.navigate(href as Href)
    },
    back: router.back,
  }), [])
}

export { 
  ROUTES,
  PATH_TO_NAME,
  getRouteForRouteName,
  isAuthRoute,
  useRouter,
}