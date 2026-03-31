import { Slot, Stack } from 'one'

export function StartLayout() {
  return (
    <>
      {process.env.VITE_PLATFORM === 'web' ? (
        <Slot />
      ) : (
        // We need Stack here for transition animation to work on native
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="settings" />
        </Stack>
      )}
    </>
  )
}
