import { Stack } from 'one'
import { useTheme } from 'tamagui'
import { ROUTES } from '~/navigation/routes'
import { ToastProvider } from '~/interface/toast/Toast'
import { DialogProvider } from '~/interface/dialogs/Dialog'

/** Tabbar Page Layout */
export function TabbarLayout() {
  const theme = useTheme()
  
  return (
    <ToastProvider>
      <DialogProvider>
        <Stack screenOptions={{ contentStyle: { backgroundColor: theme.background?.val } }}>
          <Stack.Screen name={ROUTES.search.name} />
        </Stack>
      </DialogProvider>
    </ToastProvider>
  )
}