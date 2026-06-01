import { useEffect } from 'react'
import { isWeb } from 'tamagui'
import { useRouter, ROUTES } from '~/router'

export default function IndexPage() {
  const router = useRouter()

  useEffect(() => {
    if (isWeb && typeof window !== 'undefined') {
      window.location.replace(ROUTES.home.path)
    }
  }, [])

  return null
}
