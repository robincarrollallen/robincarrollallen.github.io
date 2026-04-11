import { useI18n } from "~/i18n"

/** 获取输入错误信息 */
export const useInputErrorMessage = () => {
	const { t } = useI18n()

	return {
		account: t('hint.invalidUsername'),
		password: t('hint.invalidPassword')
	}
}