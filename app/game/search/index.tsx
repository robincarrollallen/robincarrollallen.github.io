import { useI18n } from '~/i18n'
import { Hot } from './segments/hot'
import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { Search } from './segments/search'
import { Recent } from './segments/recent'
import { Favorite } from './segments/favorite'
import { SearchBar } from '~/components/SearchBar'
import { useSizeTokens } from '~/store/modules/responsive'
import { createElement, useCallback, useMemo, useState } from 'react'
import { Tabs, SizableText, XStack, YStack, useTheme, isWeb } from 'tamagui'

/** Game Search Page */
export function GameSearchPage() {
  const theme = useTheme()
  const rem = useSizeTokens()
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [activeTab, setActiveTab] = useState('tab2')
  const { t } = useI18n()

   /** tabs 列表 */
   const activityTabs = useMemo(() => [
    { label: t('Search'), value: 'tab1', icon: SVG.magnifier, component: Search },
    { label: t('Hot'), value: 'tab2', icon: SVG.popular, component: Hot },
    { label: t('Recent'), value: 'tab3', icon: SVG.recent, component: Recent },
    { label: t('Favorite'), value: 'tab4', icon: SVG.favorite, component: Favorite },
  ], [])

  /** 搜索点击事件 */
  const handleSearch = useCallback(() => {
    if (!searchValue) return
    setActiveTab('tab1')
    setSearchLoading(true)
    setTimeout(() => {
      setSearchLoading(false)
    }, 2000)
  }, [searchValue])
  
  return (
    <>
      <YStack p={rem[8]}>
        <SearchBar loading={searchLoading} value={searchValue} onChangeText={setSearchValue} onPress={handleSearch} />
      </YStack>
      <YStack
        width="100%"
        flex={1}
        {...(isWeb && {
          position: 'unset' as any,
        })}
      >
        <Tabs
          flex={1}
          overflow="hidden"
          flexDirection="column"
          borderTopLeftRadius={0}
          defaultValue={activeTab}
          orientation="horizontal"
          onValueChange={setActiveTab}
        >
          <Tabs.List
            width="100%"
            px={12}
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
            borderBottomWidth={1}
            borderBottomColor={theme.borderDefault?.val}
            aria-label="Search Games"
          >
            {activityTabs.map((tab) => (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                focusStyle={{
                  bg: '$background',
                }}
                p={0}
              >
                <XStack
                  gap={rem[8]}
                  px={rem[10]}
                  height="100%"
                  items="center"
                  bg="$background"
                  justify="flex-end"
                  borderBottomColor={theme.textSelected?.val}
                  borderBottomWidth={activeTab === tab.value ? 2 : 0}
                >
                  <SvgXml xml={tab.icon} width={rem[18]} height={rem[18]} color={activeTab === tab.value ? theme.textSelected?.val : theme.textWeaker?.val}/>
                  <SizableText text="center" color={activeTab === tab.value ? theme.textSelected?.val : theme.textWeaker?.val}>
                    {tab.label}
                  </SizableText>
                </XStack>
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
      </YStack>
    </>
  )
}
