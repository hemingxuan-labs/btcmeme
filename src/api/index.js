import service from '@/utils/request.js'
import { store } from '@/store/index.js'
// import { objToUrl } from '@/utils/utils.js'

// 验证钱包签名，执行登录流程，无账号自动创建
export const btcmemeUserDoLong = (data) => {
    return service({
        url: `/btcmeme/user/doLong`,
        method: 'post',
        data
    })
}
// 应用程序创建请求以获取请求令牌
export const oauthRequestToken = (data) => {
    return service({
        url: `/btcmeme/twitter/oauth1/requestToken`,
        method: 'get',
        data
    })
}
