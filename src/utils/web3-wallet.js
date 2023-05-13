import { store } from '@/store/index.js'
import { setWalletAddress, setWalletToken } from '@/store/wallet.js'
import { ethers } from 'ethers'
export default class web3Wallet {
    constructor() {
        // 单例模式
        if (!web3Wallet.instance) {
            web3Wallet.instance = this
        }
        this.getProviderSigner()
        return web3Wallet.instance
    }
    getProviderSigner() {
        try {
            this.provider = new ethers.providers.Web3Provider(window.ethereum)
            this.signer = this.provider.getSigner()
        } catch (error) {
            this.messageError(error)
            return false
        }
    }
    async getWalletAddress() {
        // 返回钱包地址 建立连接
        try {
            const accounts = await this.provider.send('eth_requestAccounts', [])
            this.modifyWalletAddress(accounts[0])
            return accounts[0]
        } catch (error) {
            this.messageError(error)
            return false
        }
    }
    async requestSignature() {
        // 请求钱包签名
        let walletAddress = await this.getWalletAddress()
        if (!walletAddress) return
        if (store.getState().wallet.walletToken) return
        try {
            let signature = await this.signer.signMessage('POPOS')
            this.setWalletToken(signature)
            return {
                address: walletAddress,
                signature
            }
        } catch (error) {
            this.messageError(error)
            return false
        }
    }
    async switchChain(chainId) {
        // 切换网络
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        chainId: '0x1'
                    }
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }
    async switchAddChain(chainObject) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainObject.chainId }]
            })
            return true
        } catch (e) {
            if (e.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: chainObject.chainId,
                                chainName: chainObject.chainName,
                                nativeCurrency: {
                                    name: chainObject.name,
                                    symbol: chainObject.symbol, // 2-6 characters long
                                    decimals: chainObject.decimals
                                },
                                blockExplorerUrls: chainObject.blockExplorerUrls,
                                rpcUrls: chainObject.rpcUrls
                            }
                        ]
                    })
                } catch (addError) {
                    ElMessage({
                        grouping: true,
                        message: addError.message,
                        type: 'error'
                    })
                    return false
                }
            }
            if (e.code === 4001) {
                ElMessage({
                    grouping: true,
                    message: e.message,
                    type: 'error'
                })
                return false
            }
        }
    }
    modifyWalletAddress(address) {
        store.dispatch(setWalletAddress(address))
    }
    setWalletToken(signature) {
        store.dispatch(setWalletToken(signature))
    }
    setAssetsChina(china) {
        store.dispatch(setWalletToken(china))
    }
    messageError(error) {
        console.log(error, 'Sbackbar.current')
        // SimpleSnackbarRef.current.open({ message: error })
    }
    web3Listen() {
        // this.getAssetsChina()
        // this.onChainChanged()
    }
}
