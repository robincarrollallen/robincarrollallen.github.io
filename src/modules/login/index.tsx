import { Image } from 'expo-image'
import { delay } from '~/utils/time'
import { BlurView } from 'expo-blur'
import { SvgXml } from 'react-native-svg'
import { useMemo, useState } from 'react'
import { SVG } from '~/assets/modules/svg'
import { Field } from '~/components/Field'
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
  
  /** 账号类型切换 */
  const handleTabChange = (value: number | string) => {
    setActiveTab(Number(value))
  }

  /** 账号验证成功 */
  const handleAccountValidate = (value: boolean) => {
    setAccountValid(value)
  }

  /** 密码验证成功 */
  const handlePasswordValidate = (value: boolean) => {
    setPasswordValid(value)
  }

  /** 登录信息验证 */
  const loginValid = useMemo(() => {
    return accountValid && passwordValid && account && password
  }, [accountValid, passwordValid, account, password])

  /** Login handler */
  const loginHandler = async () => {
    setLoginLoading(true)
    try {
      await delay(1000)
      const res = loginInfo

      if (res.token) {
        useUserStore.getState().setToken(res.token) // 设置 token
        useUserStore.getState().setUserInfo(userInfoData) // 更新用户信息
        useStatusStore.getState().hideLoginPopup()
      }
    }
    catch (error) {
      console.error("Login failed:", error) // 添加错误处理
    }
    finally {
      setTimeout(() => {
        setAccount('') // 清空账号
        setPassword('') // 清空密码
        setLoginLoading(false)
      }, 500)
    }
  }

  /** stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    siteLogo: {
      width: rem[130],
      height: rem[30],
    },
  }), [rem])

  return (
    <Sheet
      modal // 是否模态框(全屏)
      transition="sheet" // 过渡效果
      snapPoints={[100]} // 弹窗高度(%)
      disableDrag={true} // 禁止拖拽手势
      open={loginScreenVisible} // 登录弹窗是否显示
      dismissOnSnapToBottom={false} // 禁止向下滑动关闭
      dismissOnOverlayPress={false} // 禁止点击遮罩关闭
    >
      <Sheet.Overlay
        bg="$shadow4"
        transition="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      >
        <BlurView
          intensity={40}
          tint="dark"
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // 轻微背景色
          }}
        />
      </Sheet.Overlay>
      {/* 头部/关闭按钮 */}
      <Sheet.Handle bg="transparent" margin={0} width="100%" height={rem[100]} pt={top}>
        <XStack width="100%" justify="space-between" items="flex-start" p={rem[10]}>
          <Image source={{ uri: tenantInfo.siteLogo }} contentFit='contain' style={styles.siteLogo} />
          <YStack height={rem[30]} bg={theme.textWeakest?.val} p={6} style={{ borderRadius: rem[15] }}>
          <Pressable
            onPress={() => {
              hideLoginPopup()
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          >
            <SvgXml xml={SVG.close} width={rem[18]} height={rem[18]} />
          </Pressable>
          </YStack>
        </XStack>
      </Sheet.Handle>
      {/* 内容 */}
      <Sheet.Frame
        pt={rem[2]}
        px={rem[12]}
        borderTopLeftRadius={rem[20]}
        borderTopRightRadius={rem[20]}
        bg={theme.backgroundSurfaceRaisedL1?.val}
        style={{ boxShadow: `0 ${-rem[3]}px 0 0 ${theme.iconDefault?.val}` }}
      >
          {/* 标题 */}
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
                ? <Anchor color={theme.textHighlight?.val} onPress={showRegisterPopup}>Register</Anchor>
                : <Anchor color={theme.textHighlight?.val} onPress={showLoginPopup}>Login</Anchor>
              }
            </XStack>
          </YStack>
          {/* 账号类型切换 */}
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
          {/* 表单 */}
          <Field
            type="account"
            error required
            value={account}
            placeholder="Username"
            onChangeText={setAccount}
            onValidate={handleAccountValidate}
            label={<SvgXml xml={SVG.square_user} width={rem[20]} height={rem[20]} color={theme.textWeaker?.val} />}
          />
          <Field
            type="password"
            error required
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
            onValidate={handlePasswordValidate}
            label={<SvgXml xml={SVG.key_round} width={rem[20]} height={rem[20]} color={theme.textWeaker?.val} />}
          />
          {/* 按钮 */}
          <LoadingButton loading={loginLoading} disabled={!loginValid} onPress={loginHandler}>Login</LoadingButton>
      </Sheet.Frame>
    </Sheet>
  )
}
