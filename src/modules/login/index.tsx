import { delay } from '~/utils/time'
import { BlurView } from 'expo-blur'
import { SvgXml } from 'react-native-svg'
import { useMemo, useState } from 'react'
import { SVG } from '~/assets/modules/svg'
import { Field } from '~/components/Field'
import { Image } from '~/components/Image'
import { Segment } from '~/components/Segment'
import { useUserStore } from '~/store/modules/user'
import { useToastController } from '@tamagui/toast'
import { Pressable, StyleSheet } from 'react-native'
import { useTenantStore } from '~/store/modules/tenant'
import { LoadingButton } from '~/components/LoadingButton'
import { useSizeTokens } from '~/store/modules/responsive'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStatusStore, statusSelectors } from '~/store/modules/status'
import { Sheet, XStack, YStack, Anchor, SizableText, useTheme } from 'tamagui'
import userInfoData from '~/data/userInfo.json'
import loginInfo from '~/data/loginInfo.json'

/** Tabs data */
const tabs = [
  { label: 'Account', value: 0 },
  { label: 'Phone', value: 1 },
]

/** Login Screen */
export function LoginScreen() {
  const { top } = useSafeAreaInsets() // 安全区域
  const { tenantInfo } = useTenantStore() // 租户信息
  const [account, setAccount] = useState('') // 账号
  const [password, setPassword] = useState('') // 密码
  const [activeTab, setActiveTab] = useState(0) // 账号类型
  const [loginLoading, setLoginLoading] = useState(false) // 登录加载中
  const [accountValid, setAccountValid] = useState(false) // 账号验证成功
  const [passwordValid, setPasswordValid] = useState(false) // 密码验证成功
  const { loginScreenVisible, hideLoginPopup, showRegisterPopup, showLoginPopup } = useStatusStore() // 状态管理
  const isLogin = statusSelectors.isLogin(useStatusStore.getState()) // 是否登录
  const toast = useToastController() // 提示框
  const rem = useSizeTokens() // 响应式尺寸
  const theme = useTheme() // 主题
  
  /** Account type switch */
  const handleTabChange = (value: number | string) => {
    setActiveTab(Number(value))
  }

  /** Account validation success */
  const handleAccountValidate = (value: boolean) => {
    setAccountValid(value)
  }

  /** Password validation success */
  const handlePasswordValidate = (value: boolean) => {
    setPasswordValid(value)
  }

  /** Login information validation */
  const loginValid = useMemo(() => {
    return accountValid && passwordValid && account && password
  }, [accountValid, passwordValid, account, password])

  /** Login handler */
  const loginHandler = async () => {
    setLoginLoading(true)
    // TODO: login API
    try {
      await delay(1000)
      const res = loginInfo

      if (res.token) {
        useUserStore.getState().setToken(res.token) // Set token
        useUserStore.getState().setUserInfo(userInfoData) // Update user information
        useStatusStore.getState().hideLoginPopup()
      }
    }
    catch (error) {
      console.error("Login failed:", error) // Add error handling
    }
    finally {
      setTimeout(() => {
        setAccount('') // Clear account
        setPassword('') // Clear password
        setLoginLoading(false)
      }, 500)
    }
  }

  /** Register handler */
  const registerHandler = async () => {
    setLoginLoading(true)
    // TODO: register API
    try {
      await delay(1000)
      const res = loginInfo

      if (res.token) {
        useUserStore.getState().setToken(res.token) // Set token
        useUserStore.getState().setUserInfo(userInfoData) // Update user information
        useStatusStore.getState().hideLoginPopup()
      }
    }
    catch (error) {
      console.error("Login failed:", error) // Add error handling
    }
    finally {
      setTimeout(() => {
        setAccount('') // Clear account
        setPassword('') // Clear password
        setLoginLoading(false)
      }, 500)
    }
  }

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    sheetFrame: {
      boxShadow: `0 ${-rem[3]}px 0 0 ${theme.iconDefault?.val}`
    },
  }), [rem, theme])

  return (
    <Sheet
      modal // Whether to use a modal (full screen)
      snapPoints={[100]} // Modal height (%)
      disableDrag={true} // Disable drag gesture
      transition="sheet" // Transition effect
      open={loginScreenVisible} // Whether to show the login popup
      dismissOnSnapToBottom={false} // Disable swipe down to close
      dismissOnOverlayPress={false} // Disable click on the overlay to close
    >
      <Sheet.Overlay
        bg={theme.shadow4?.val}
        transition="sheet"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      >
        <BlurView
          intensity={40}
          tint="dark"
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight background color
          }}
        />
      </Sheet.Overlay>
      {/* Header/Close Button */}
      <Sheet.Frame bg="transparent" maxH={rem[80] + top} pt={top}>
        <XStack width="100%" justify="space-between" items="flex-start" p={rem[10]}>
          <Image src={tenantInfo.siteLogo} objectFit='contain' width={rem[130]} height={rem[30]} />
            <Pressable
              onPress={() => {
                hideLoginPopup()
              }}
            >
            <YStack height={rem[30]} bg={theme.textWeakest?.val} p={6} style={{ borderRadius: rem[15] }}>
              <SvgXml xml={SVG.close} width={rem[18]} height={rem[18]} color={theme.iconDefault?.val} />
            </YStack>
          </Pressable>
        </XStack>
      </Sheet.Frame>
      {/* Content */}
      <Sheet.Frame
        pt={rem[2]}
        px={rem[12]}
        borderTopLeftRadius={rem[20]}
        borderTopRightRadius={rem[20]}
        bg={theme.backgroundSurfaceRaisedL1?.val}
        style={styles.sheetFrame}
      >
          {/* Title */}
          <YStack gap={rem[4]} pt={rem[40]} pb={rem[32]}>
            { isLogin
              ? <SizableText fontSize={rem[24]} fontWeight="bold">Log in to your account</SizableText>
              : <SizableText fontSize={rem[24]} fontWeight="bold">Create a game account</SizableText>
            }
            <XStack gap="$3" style={{ fontSize: rem[14] }}>
              { isLogin
                ? <SizableText color={theme.textWeaker?.val} fontWeight="bold">Don't have an account?</SizableText>
                : <SizableText color={theme.textWeaker?.val} fontWeight="bold">Already have an account?</SizableText>
              }
              { isLogin
                ? <Pressable onPress={showRegisterPopup}>
                    <SizableText color={theme.textHighlight?.val} fontWeight="bold">Register</SizableText>
                  </Pressable>
                : <Pressable onPress={showLoginPopup}>
                    <SizableText color={theme.textHighlight?.val} fontWeight="bold">Login</SizableText>
                  </Pressable>
              }
            </XStack>
          </YStack>
          {/* Account Type Switch */}
          <XStack width="100%" pb={rem[20]} justify="center">
            <Segment
              block
              shrink
              tabs={tabs}
              height={rem[32]}
              fontSize={rem[12]}
              active={activeTab}
              activeTextWeight="700"
              borderTopLeftRadius={rem[6]}
              borderTopRightRadius={rem[6]}
              bg={theme.surfaceLowered?.val}
              onValueChange={handleTabChange}
              borderBottomLeftRadius={rem[6]}
              borderBottomRightRadius={rem[6]}
              activeColor={theme.surfaceRaisedL2?.val}
              activeTextColor={theme.borderSelected?.val}
            />
          </XStack>
          {/* Form */}
          {activeTab === 0
            && <Field
                type="account"
                error required
                value={account}
                placeholder="Username"
                onChangeText={setAccount}
                onValidate={handleAccountValidate}
                label={<SvgXml xml={SVG.square_user} width={rem[20]} height={rem[20]} color={theme.textWeaker?.val} />}
              />
          }
          {activeTab === 1
            && <Field
                type="phone"
                error required
                value={account}
                placeholder="Phone"
                onChangeText={setAccount}
                onValidate={handleAccountValidate}
                label={<SvgXml xml={SVG.smartPhone} width={rem[20]} height={rem[20]} color={theme.textWeaker?.val} />}
              />
          }
          <Field
            type="password"
            error required
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
            onValidate={handlePasswordValidate}
            label={<SvgXml xml={SVG.key_round} width={rem[20]} height={rem[20]} color={theme.textWeaker?.val} />}
          />
          {/* Submit Button */}
          { isLogin
            ? <LoadingButton loading={loginLoading} disabled={!loginValid} onPress={loginHandler}>Login</LoadingButton>
            : <LoadingButton loading={loginLoading} disabled={!loginValid} onPress={registerHandler}>Register</LoadingButton>
          }
      </Sheet.Frame>
    </Sheet>
  )
}
