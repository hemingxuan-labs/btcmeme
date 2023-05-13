import service from '@/utils/request.js'
import { store } from '@/store/index.js'
// import { objToUrl } from '@/utils/utils.js'

const formatting = (data) => {
    return {
        ...data,
        token: store.getState().wallet.userToken,
    }
}
// callApi 保留原本方法
export const callApi = (url, data) => {
    return service({
        url: `/api/auth.Nonce`,
        method: 'post',
        data,
    })
}
// 获取授权消息提示
export const authNonce = (data) => {
    return service({
        url: `/api/auth.Nonce`,
        method: 'post',
        data,
    })
}
// 用户签名
export const authWalletLogin = (data) => {
    return service({
        url: `/api/auth.WalletLogin`,
        method: 'post',
        data,
    })
}
// 购买 market Box
export const marketBuyBlindBox = (data) => {
    return service({
        url: `/api/market.BuyBlindBox`,
        method: 'post',
        data: formatting(data),
    })
}
// 获取合约地址
export const w3GetAddress = (data) => {
    return service({
        url: `/api/w3.GetAddress`,
        method: 'post',
        data: formatting(data),
    })
}
// 获取合约ABI
export const w3GetContractABI = (data) => {
    return service({
        url: `/api/w3.GetContractABI`,
        method: 'post',
        data: formatting(data),
    })
}
// 购买 market Box 后回调
export const tradeMarinerCallback = (data) => {
    return service({
        url: `/api/trade.MarinerCallback`,
        method: 'post',
        data: formatting(data),
    })
}
// 获取 UserGuides
export const guideGetUserGuides = (data) => {
    return service({
        url: `/api/guide.GetUserGuides`,
        method: 'post',
        data: formatting(data),
    })
}
//  guideMarkFinish
export const guideMarkFinish = (data) => {
    return service({
        url: `/api/guide.MarkFinish`,
        method: 'post',
        data: formatting(data),
    })
}
// 查询自己mint的NFT
export const gameGetNFTs = (data) => {
    return service({
        url: `/api/game.GetNFTs`,
        method: 'post',
        data: formatting(data),
    })
}

//  获取地图路径FindPath
export const mapFindPath = (data) => {
    return service({
        url: `/api/map.FindPath`,
        method: 'post',
        data: formatting(data),
    })
}
