import { ethers } from 'ethers'
import web3Wallet from '@/utils/web3-wallet.js'
import poposABI from '@/assets/abi/popos.json'
import Erc20ABI from '@/assets/abi/erc20.json'
import message from '@/components/message'

const contracts = {
    popos: {
        address: '0xed1d5f7c24d523381de22c36cd4d2cdbd658bf52',
        abi: poposABI
    },
    erc20: {
        address: '0x2b8af5414fc5c40a4ae9228bad0a83d485e029b0',
        abi: Erc20ABI
    }
}
// https://goerli.etherscan.io/address/0xb8416ccf3cb8c325a6718d7b3855d6509a94b2e3
export default class ethersContract {
    constructor() {
        // 单例模式
        if (!ethersContract.instance) {
            ethersContract.instance = this
            this.contractCaller = {}
            this.contractSender = {}
            this.web3WalletNow = {}
        }
        return ethersContract.instance
    }
    async getContract(types = 'popos') {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const address = contracts[types].address
            const abi = contracts[types].abi
            this.contractCaller = new ethers.Contract(address, abi, provider)
            this.contractSender = this.contractCaller.connect(signer)
        } catch (e) {
            console.error(e)
        }
    }
    async getWalletAddress() {
        this.web3WalletNow = new web3Wallet()
    }
    async sendClaim() {
        try {
            await this.getWalletAddress()
            const res1 = await this.web3WalletNow.getWalletAddress()
            const res2 = await this.web3WalletNow.switchChain()
            await this.getContract('popos')
            if (res1 && res2) {
                return await this.contractSender.claim()
            }
        } catch (error) {
            this.messageError(error)
        }
    }
    async getBalanceOf() {
        try {
            await this.getContract('erc20')
            const res = await this.contractCaller.balanceOf(contracts.popos.address)
            return parseInt(Number(res._hex) / '1000000000000000000')
        } catch (error) {
            this.messageError(error)
        }
    }
    messageError(error) {
        message.error({
            content: 'Internal JSON-RPC error.',
            duration: 3000,
            iconShow: false
        })
    }
}
