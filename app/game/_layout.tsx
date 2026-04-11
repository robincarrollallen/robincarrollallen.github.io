import { Stack } from 'one'
import { ROUTES } from '~/navigation/routes'
import { ToastProvider } from '~/interface/toast/Toast'
import { DialogProvider } from '~/interface/dialogs/Dialog'

/** Tabbar Page Layout */
export function TabbarLayout() {

  return (
    <ToastProvider>
      <DialogProvider>
        <Stack>
          <Stack.Screen name={ROUTES.search.name} />
        </Stack>
      </DialogProvider>
    </ToastProvider>
  )
}