import { useI18n } from '~/i18n'
import { ActivityList } from './segments/list'
import { Unclaimed } from './segments/unclaimed'
import { Tabs, SizableText, YStack, useTheme } from 'tamagui'
import { createElement, useCallback, useMemo, useState } from 'react'
import { useSafeArea } from '~/hooks/client'

/** Game Search Page */
export function GameSearchPage() {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState('tab1')
  const { top } = useSafeArea()
  const { t } = useI18n()

   /** tabs list */
   const activityTabs = useMemo(() => [
    { label: t('label.events'), value: 'tab1', component: ActivityList },
    { label: t('label.unclaimed'), value: 'tab2', component: Unclaimed },
  ], [])

  /** tab change handler */
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value)
  }, [])

  return (
    <Tabs
      flex={1}
      overflow="hidden"
      flexDirection="column"
      borderTopLeftRadius={0}
      defaultValue={activeTab}
      orientation="horizontal"
      onValueChange={handleTabChange}
    >
      <Tabs.List
        width="100%"
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        aria-label="Manage your account"
        pt={top}
      >
        {activityTabs.map((tab) => (
          <Tabs.Tab
            p={0}
            key={tab.value}
            value={tab.value}
            bg="transparent"
          >
            <YStack height="100%" px={10} items="flex-end" justify="flex-end" borderBottomWidth={activeTab === tab.value ? 1 : 0} borderBottomColor={theme.borderDefault?.val}>
              <SizableText text="center">
                {tab.label}
              </SizableText>
            </YStack>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {activityTabs.map((tab) => (
        <Tabs.Content
          key={tab.value}
          value={tab.value}
          items="center"
          justify="center"
          flex={1}
        >
          {createElement(tab.component)}
        </Tabs.Content>
      ))}
    </Tabs>
  )
}
