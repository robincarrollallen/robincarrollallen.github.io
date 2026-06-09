import { Redirect } from 'one'
import { isWeb } from 'tamagui'
import { ROUTES } from '~/router/routes'

export function IndexPage() {
  return <>
    {isWeb && <Redirect href={ROUTES.home.path} />}
  </>
}
