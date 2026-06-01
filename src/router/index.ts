import { useMemo } from 'react'
import { isWeb } from 'tamagui'
import { useRouter as useOneRouter, type Href } from 'one'
import { ROUTES, isAuthRoute, getRouteForRouteName, PATH_TO_NAME } from './routes'

/** App Router Hook */
function useRouter() {
  const router = useOneRouter()

  return useMemo(() => ({
    push: (href: Href | string) => {
      if (isWeb && typeof window !== 'undefined') {
        window.history.pushState(window.history.state, '', `${href}`)
        // window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }))
        // window.location.href = `${href}`
        router.replace(href as Href)
        return
      }

      router.push(href as Href)
    },
    replace: (href: Href | string) => {
      if (isWeb && typeof window !== 'undefined') {
        // window.location.replace(`${href}`)
        router.replace(href as Href)
        return
      }

      router.replace(href as Href)
    },
    navigate: (href: Href | string) => {
      if (isWeb && typeof window !== 'undefined') {
        // window.history.pushState(window.history.state, '', `${href}`)
        // window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }))
        router.navigate(href as Href)
        return
      }

      router.navigate(href as Href)
    },
    back: router.back,
  }), [router])
}

export { 
  ROUTES,
  PATH_TO_NAME,
  getRouteForRouteName,
  isAuthRoute,
  useRouter,
}