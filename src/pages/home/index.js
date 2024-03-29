import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import web3Wallet from '@/utils/web3-wallet.js'
import './index.scss'
import home1 from '@/assets/image/home1.png'
import home2 from '@/assets/image/home2.png'
import home3 from '@/assets/image/home3.png'
import home4 from '@/assets/image/home4.png'
import home16 from '@/assets/image/home16.png'
import home12 from '@/assets/image/home12.png'
import home18 from '@/assets/image/home18.png'
import home20 from '@/assets/image/home20.png'
import home13 from '@/assets/image/home13.png'
import home14 from '@/assets/image/home14.png'
import home11 from '@/assets/image/home11.png'
import home8 from '@/assets/image/home8.png'
import home9 from '@/assets/image/home9.png'
import home10 from '@/assets/image/home10.png'
import home21 from '@/assets/image/home21.png'
import home19 from '@/assets/image/home19.png'
import styled from 'styled-components'
import LinearProgress from '@mui/material/LinearProgress'
import TextField from '@mui/material/TextField'
import { MyButton } from '@/assets/mui-css/mui-css.js'
import { useNavigate } from 'react-router-dom'
import wen3Contract from '@/utils/wen3-contract.js'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { oauthRequestToken } from '@/api/index.js'

const BorderLinearProgress = styled(LinearProgress)`
    height: 6px !important;
    border-radius: 5px !important;
    background-color: #272012 !important;
    .MuiLinearProgress-bar {
        background-color: #f5d769 !important;
    }
`
const MyTextField = styled(TextField)`
    width: 180px;
    background: #0f0b07;
    border: 1px solid #6b5d2f !important;
    border-radius: 8px !important;
    .MuiInputBase-input {
        color: #f7931b !important;
    }
    .MuiInputBase-root::after {
        border-bottom: 2px solid #f7931b !important;
    }
`
const MyAccordion = styled(Accordion)`
    background-color: #212529 !important;
    color: rgb(247, 147, 27) !important;
    .MuiAccordionDetails-root {
        color: #fff !important;
    }
`
function Home() {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(60)
    const [termdays, setTermdays] = useState(365)
    const [countdown, setCountdown] = useState(`Claim`)
    const web3WalletNow = new web3Wallet()
    const sendClaims = async () => {
        if (countdown === 'Connect Wallet') {
            web3WalletNow.requestSignature()
            return
        }
        if (countdown !== 'Claim') return
        const res = await oauthRequestToken()
        console.log(res)
        // const wen3ContractNow = new wen3Contract()
        // wen3ContractNow.sendClaim()
    }
    const walletAddress = useSelector((state) => state.wallet.walletAddress)

    useEffect(() => {
        if (walletAddress) {
            setCountdown(`Claim`)
        } else {
            setCountdown(`Connect Wallet`)
        }
        const startSetInterval = () => {
            setInterval(() => {
                // 设置结束时间
                var endTime = new Date(1684868400000)
                // 获取当前时间
                var nowTime = new Date()
                if (nowTime >= endTime) {
                    if (walletAddress) {
                        return setCountdown(`Claim`)
                    } else {
                        return setCountdown(`Connect Wallet`)
                    }
                }
                // 计算剩余时间（毫秒）
                var remainingTime = endTime - nowTime
                // 计算天数
                var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24))
                // 计算小时数
                var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                // 计算分钟数
                var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
                // 计算秒数
                var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)
                // 输出倒计时
                setCountdown(`${days} day ${hours}h ${minutes}m ${seconds}s`)
            }, 1000)
        }
        // startSetInterval()
    }, [walletAddress])

    const [linearProgress, setLinearProgress] = useState(20)
    useEffect(() => {
        async function baof() {
            const wen3ContractNow = new wen3Contract()
            const res = await wen3ContractNow.getBalanceOf()
            setLinearProgress(convertToPercentage(23100000000 - res, 23100000000))
        }
        function convertToPercentage(value, total) {
            return (value / total) * 100
        }
        baof()
    }, [])
    return (
        <div className="min-vh-100 overflow-hidden">
            <div className="container mt-8 position-relative z-1">
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="text-white text-center m-auto" style={{ maxWidth: '460px' }}>
                            Redefine BitCoin In The MEME Community
                        </h1>
                        <h5 className="mt-4 text-center text-white">Chancellor On Brink Of Second Bailout For Banks</h5>
                    </div>
                    <div className="col-md-4">
                        <img
                            className="d-none d-md-block position-relative"
                            style={{
                                width: '244px',
                                height: '244px',
                                top: 50
                            }}
                            src={home16}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0 position-relative z-0 mt-8" style={{ height: 200 }}>
                <img className="position-absolute bottom-0 start-50 translate-middle-x" src={home2} alt="" />
                <img className="btc-logoimg position-absolute" style={{ width: 135, top: -160 }} src={home1} alt="" />
                <img className="position-absolute d-none d-md-block" style={{ width: 97, left: 180, bottom: 140 }} src={home3} alt="" />
                <img
                    className="d-block d-md-none position-absolute"
                    style={{
                        width: '200px',
                        height: '200px',
                        top: 50,
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                    src={home16}
                    alt=""
                />
            </div>
            <div className="container-fluid mt-8 position-relative">
                <img className="position-absolute top-50 start-0 translate-middle-y z-0" style={{ width: '300px' }} src={home21} alt="home21" />
                <div
                    className="p-2 mx-auto position-relative z-1 position-relative"
                    style={{
                        background: '#F7931B',
                        borderRadius: '26px',
                        maxWidth: '570px',
                        backdropFilter: 'blur(4px)'
                    }}>
                    <div
                        className="w-100 h-100 p-4 px-6"
                        id="mint"
                        style={{
                            background: '#09090B',
                            borderRadius: '26px'
                        }}>
                        <h3 className="text-white text-center mt-4">
                            You Can Claim <span style={{ color: '#F7931B' }}>$BTCMEME Now!</span>
                        </h3>
                        <img className="d-block mx-auto mt-3" style={{ width: 72 }} src={home12} alt="" />
                        <p className="my-4 text-center text-white fs-6">
                            A total of <span style={{ color: '#F7931B' }}>23,100,000,000</span>
                            $BTCMEME tokens are now available to be claimed by those who have claimed the $ARB airdrop.
                            <br />
                            $BTCMEME tokens that have not been claimed within 31 days will be used for the Community Long-Term Incentive Reward Program. <br />
                            The $BTCMEME will be distributed to the top contributors of Arbitrum community and burned."
                        </p>
                        <div className="mt-4">
                            <div className="d-flex-between-center">
                                <span style={{ color: '#6B5D2F' }}>0</span>
                                <span style={{ color: '#6B5D2F' }}>23,100,000,000</span>
                            </div>
                            <BorderLinearProgress className="mt-1" variant="determinate" value={linearProgress}></BorderLinearProgress>
                        </div>
                        <div className="mt-5 mb-5 d-flex-center">
                            <MyButton
                                className="text-nowrap px-7"
                                onClick={() => {
                                    sendClaims()
                                }}>
                                {/* Coming Soon */}
                                {countdown}
                            </MyButton>
                        </div>
                        <img className="position-absolute top-100 start-100 translate-middle" style={{ width: 197 }} src={home4} alt="" />
                    </div>
                </div>
            </div>
            <div className="container mt-9 pt-5" id="about">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            className="d-none d-md-block"
                            style={{
                                width: 261
                            }}
                            src={home18}
                            alt=""
                        />
                    </div>
                    <div className="col-md-8">
                        <h2 className="text-white text-center m-auto" style={{ maxWidth: 476 }}>
                            Chancellor on brink of second bank bailout.
                        </h2>
                        <img className="d-block mx-auto my-4" style={{ width: 72 }} src={home12} alt="" />
                        <p className="mt-4 text-center text-white fs-6">
                            The design of BTCMEME is inspired by
                            <span style={{ color: '#F7931B' }}>the world's first cryptocurrency</span>: BitCoin. We have the same belief, because this is a completely decentralized travel, and all
                            decisions will be completely handed over to the community. BTCMEME will redefine BitCoin's position in the MEME community, wait and see.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mt-9 position-relative">
                <img style={{ width: '100%' }} src={home20} alt="" />
                <div className="text-white position-absolute top-50 start-50 translate-middle z-1" style={{ width: 340 }}>
                    <h2 className="text-center">Earn BitCoin</h2>
                    <img className="d-block mx-auto my-3" style={{ width: 72 }} src={home12} alt="" />
                    <p className="fs-7 text-center">Use BTCMEME as your savings to earn BTC.</p>
                </div>
                <img className="btc-home13 position-absolute z-0" style={{ width: 250, bottom: -150 }} src={home13} alt="" />
                <div className="btc-home14 position-absolute" style={{ right: -60, bottom: 90 }}>
                    <img style={{ width: 307 }} src={home14} alt="" />
                    <span
                        className="hover-cooming-soon position-absolute text-white fs-3"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%) rotate(13deg)',
                            whiteSpace: 'nowrap'
                        }}>
                        Coming Soon
                    </span>
                </div>
            </div>
            <div className="container mt-9 py-9 position-relative" id="economics">
                <img className="position-absolute" style={{ width: 418, bottom: 0, left: -20 }} src={home19} alt="" />
                <div className="row">
                    <div className="col-md-7">
                        <h2 className="text-white text-center m-auto" style={{ maxWidth: 476 }}>
                            completely fair distribution
                        </h2>
                        <img className="d-block mx-auto my-4" style={{ width: 72 }} src={home12} alt="" />
                        <p className="mt-4 text-center text-white fs-7" style={{ lineHeight: 3 }}>
                            No holdings, fully distributed to the community and liquidity, no taxes, no whales, no giant pumps
                        </p>
                        <div className="d-flex-center mt-6">
                            <div className="mx-3">
                                <img className="mb-3" style={{ width: 73 }} src={home8} alt="" />
                                <p className="text-white fs-8">88% Liquidity</p>
                            </div>
                            <div className="mx-3">
                                <img className="mb-3" style={{ width: 73 }} src={home9} alt="" />
                                <p className="text-white fs-8">11% AirDrop</p>
                            </div>
                            <div className="mx-3">
                                <img className="mb-3" style={{ width: 73 }} src={home10} alt="" />
                                <p className="text-white fs-8">1% CEX</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <img
                            className="d-block m-auto"
                            style={{
                                width: 317
                            }}
                            src={home11}
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <div className="container mt-9 pb-9 position-relative" id="economics">
                <h1 className="text-center text-white" style={{ fontSize: 50 }}>
                    F.A.Qs
                </h1>
                <div className="mt-4">
                    <MyAccordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
                            <Typography>What is BECMEME?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>btcmeme is a meme coin issued to commemorate Satoshi Nakamoto, btcmeme coin is the real meme coin</Typography>
                        </AccordionDetails>
                    </MyAccordion>
                    <MyAccordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
                            <Typography>How do I claim the $BTCMEME airdrop?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                1. Connect your wallet <br />
                                2. Check if you are eligible <br />
                                3. Claim your free tokens
                            </Typography>
                        </AccordionDetails>
                    </MyAccordion>
                    <MyAccordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
                            <Typography>Will there be more NFTs in the future?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>A series of NFTs will be launched in the future for adopters, AI peripheral product development, and more.</Typography>
                        </AccordionDetails>
                    </MyAccordion>
                    <MyAccordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
                            <Typography>Where can I trade $BTCMEME?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>BTCMEME already trading on MEXC, LBANK , CAMELOT DEX, BITKAN & ASCENDEX. Stay tuned for more exchange listings.</Typography>
                        </AccordionDetails>
                    </MyAccordion>
                </div>
            </div>
        </div>
    )
}

export default Home
