import { Redirect } from 'one'
import { ROUTES } from '~/router/routes'

export default function IndexPage() {
  return <Redirect href={ROUTES.home.path} />
}
