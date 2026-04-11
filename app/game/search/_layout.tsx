import { useI18n } from '~/i18n'
import { Slot, Stack } from 'one'
import { Navigation } from '~/components/Navigation'

/** Game Search Page Layout */
export const GameSearchLayout = () => {
  const { t } = useI18n()
  
  return <>
    <Stack.Screen
      options={{
        headerShown: true,
        header: () => <Navigation
                        title={t('navigation.search')}
                      />,
      }}
    />
    <Slot />
  </>
}
