import { Stack } from 'one'
import { useTheme } from 'tamagui'
import { ROUTES } from '~/navigation/routes'

/** Tabbar Page Layout */
export function TabbarLayout() {
  const theme = useTheme()
  
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: theme.background?.val } }}>
      <Stack.Screen name={ROUTES.search.name} />
    </Stack>
  )
}