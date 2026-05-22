import { INPUT_TYPE } from "~/enums/types"
import { useTenantStore } from "~/store/modules/tenant"
import { REGULAR, type RegularKeyType } from "~/enums/regular"

/** 验证输入是否合法 */
export function validateInput(value: string, type: RegularKeyType) {
	if (type === INPUT_TYPE.PHONE) {
		const phoneCode  = useTenantStore.getState().tenantInfo.region.code as RegularKeyType
		const phoneRegex = REGULAR[phoneCode]
		return phoneRegex?.test(value)
	}
	const regex = REGULAR[type]
	return regex?.test(value)
}
