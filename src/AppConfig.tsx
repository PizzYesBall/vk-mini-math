import vkBridge, { parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge'
import { useAdaptivity, useAppearance, useInsets } from '@vkontakte/vk-bridge-react'
import { RouterProvider } from '@vkontakte/vk-mini-apps-router'
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui'
import { App } from './App'

import { router } from './routes'
import { transformVKBridgeAdaptivity } from './utils'
import '@vkontakte/vkui/dist/vkui.css'

export function AppConfig() {
  const vkBridgeAppearance = useAppearance() || undefined
  const vkBridgeInsets = useInsets() || undefined
  const adaptivity = transformVKBridgeAdaptivity(useAdaptivity())
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(window.location.search)

  return (
    <ConfigProvider
      appearance={vkBridgeAppearance}
      platform={vk_platform === 'desktop_web' ? 'vkcom' : undefined}
      isWebView={vkBridge.isWebView()}
      hasCustomPanelHeaderAfter
    >
      <AdaptivityProvider {...adaptivity}>
        <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}
