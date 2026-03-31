import { Redirect } from 'one'
import { ROUTES } from '~/navigation/routes'

export function IndexPage() {
  return <Redirect href={ROUTES.home.path} />
}
