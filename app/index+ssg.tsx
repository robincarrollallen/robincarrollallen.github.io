import { useEffect } from 'react'
import { useRouter, ROUTES } from '~/router'

export default function IndexPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace(ROUTES.home.path)
  }, [router])

  return null
}
