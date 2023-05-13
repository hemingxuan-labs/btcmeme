import { ethers } from 'ethers'
import web3Wallet from '@/utils/web3-wallet.js'
import poposABI from '@/assets/abi/popos.json'
import mintpoolABI from '@/assets/abi/mintpool.json'

const contracts = {
    popos: {
        address: '0xd6127A1763b8E314089d57bbD1fF3fE080991C83',
        abi: poposABI
    },
    mintpool: {
        address: '0xdE3b84fC3b8BA2BC169A87eb9C1bdA85c42845f0',
        abi: mintpoolABI
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
        await this.web3WalletNow.getWalletAddress()
        // await this.web3WalletNow.switchChain()
    }
    async sendClaim() {
        try {
            await this.getWalletAddress()
            await this.getContract('popos')
            return await this.contractSender.claim()
        } catch (e) {
            console.error(e)
        }
    }
}
