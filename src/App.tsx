import type { UserInfo } from '@vkontakte/vk-bridge'
import type { ReactNode } from 'react'
import bridge from '@vkontakte/vk-bridge'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { ScreenSpinner, SplitCol, SplitLayout, View } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'

import { Home, Persik } from './panels'
import { DEFAULT_VIEW_PANELS } from './routes'

export function App() {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation()
  const [fetchedUser, setUser] = useState<UserInfo | undefined>()
  // const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />)

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo')
      setUser(user)
      // setPopout(null);
    }
    fetchData()
  }, [])

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser} />
          <Persik id="persik" />
        </View>
      </SplitCol>
    </SplitLayout>
  )
}
